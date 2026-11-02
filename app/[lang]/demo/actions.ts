"use server";

import { headers } from "next/headers";
import { buildIcs, isOpenSlot, generateSlots } from "@/lib/booking";
import { getBookingSettings, getBusy } from "@/lib/booking-server";
import { notifyEmails, serviceRoleKey, siteUrl, supabaseUrl } from "@/lib/env";
import { recordEvent } from "@/lib/events";
import { isLang, T, type Lang } from "@/lib/i18n";
import { esc, layout, sendMail } from "@/lib/mail";
import { clientIp, ipHash } from "@/lib/privacy";
import { getSolutions } from "@/lib/solutions-data";
import { adminClient } from "@/lib/supabase/admin";
import { formatSlot, isValidTimeZone } from "@/lib/tz";

/** Error codes; the form turns them into text in the visitor's language. */
export type ErrorCode = "name" | "contact" | "email" | "long" | "spam" | "rate" | "taken" | "closed" | "server";
export type EnquiryState = { ok: true; ref: string } | { ok: false; error: ErrorCode } | undefined;

const clean = (v: FormDataEntryValue | null, max: number) =>
  String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max + 1);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-.\s\d]{6,30}$/;

const ready = () => Boolean(supabaseUrl() && serviceRoleKey());

type Fields = { name: string; organisation: string; phone: string; email: string; message: string; solution: string; students: string };

/** Shared checks for the message form and the booking form. */
async function readFields(form: FormData, needEmail: boolean): Promise<{ f: Fields } | { error: ErrorCode }> {
  if (clean(form.get("website"), 50)) return { error: "spam" }; // hidden field a person never fills in
  const loaded = Number(form.get("ts"));
  if (loaded && Date.now() - loaded < 2000) return { error: "spam" }; // sent faster than a person can type

  const f: Fields = {
    name: clean(form.get("name"), 100),
    organisation: clean(form.get("org"), 120),
    phone: clean(form.get("phone"), 30),
    email: clean(form.get("email"), 200),
    message: clean(form.get("msg"), 2000),
    solution: clean(form.get("solution"), 60),
    students: clean(form.get("students"), 20),
  };
  if ([f.name, f.organisation, f.phone, f.email, f.message].some((v, i) => v.length > [100, 120, 30, 200, 2000][i])) return { error: "long" };
  if (f.name.length < 2) return { error: "name" };
  if (f.email && !EMAIL.test(f.email)) return { error: "email" };
  if (needEmail && !f.email) return { error: "email" };
  if (!f.email && !PHONE.test(f.phone)) return { error: "contact" };
  if (f.phone && !PHONE.test(f.phone)) return { error: "contact" };
  if (f.solution) {
    const known = (await getSolutions()).some((s) => s.slug === f.solution);
    if (!known) f.solution = "";
  }
  return { f };
}

async function tooMany(hash: string | null) {
  if (!hash) return false;
  const since = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await adminClient().from("enquiries").select("id", { count: "exact", head: true }).eq("ip_hash", hash).gte("created_at", since);
  return (count ?? 0) >= 5;
}

const solutionName = async (slug: string) => (await getSolutions()).find((s) => s.slug === slug)?.name.en ?? "Not chosen";

/* ------------------------------------------------------------ enquiry form */

export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  if (!ready()) return { ok: false, error: "server" };
  const parsed = await readFields(form, false);
  if ("error" in parsed) return { ok: false, error: parsed.error };
  const { f } = parsed;
  const lang = (isLang(String(form.get("lang"))) ? String(form.get("lang")) : "en") as Lang;
  const page = clean(form.get("page"), 200);

  try {
    const h = await headers();
    const hash = ipHash(clientIp(h));
    if (await tooMany(hash)) return { ok: false, error: "rate" };

    const { data, error } = await adminClient()
      .from("enquiries")
      .insert({ source: "form", solution: f.solution || null, name: f.name, organisation: f.organisation || null, phone: f.phone || null, email: f.email || null, students: f.students || null, message: f.message || null, lang, page, ip_hash: hash })
      .select("id")
      .single();
    if (error || !data) return { ok: false, error: "server" };

    void recordEvent({ kind: "enquiry", solution: f.solution || null, lang, path: page });

    const sol = await solutionName(f.solution);
    await Promise.all([
      sendMail({
        to: notifyEmails(),
        replyTo: f.email || undefined,
        subject: `New enquiry: ${f.name} (${sol})`,
        html: layout("New enquiry from the website", [["Solution", sol], ["Name", f.name], ["Organisation", f.organisation], ["Phone", f.phone], ["Email", f.email], ["Students", f.students], ["Message", f.message], ["Language", lang]], `Open the dashboard: ${esc(siteUrl())}/admin/enquiries`),
      }),
      f.email
        ? sendMail({
            to: f.email,
            subject: T(lang, "We received your request", "ہمیں آپ کی درخواست مل گئی"),
            html: layout(T(lang, "Thank you, we will be in touch within one working day", "شکریہ، ہم ایک کاروباری دن میں رابطہ کریں گے"), [[T(lang, "Solution", "حل"), sol], [T(lang, "Reference", "حوالہ"), data.id.slice(0, 8)]]),
          })
        : Promise.resolve(false),
    ]);
    return { ok: true, ref: data.id.slice(0, 8) };
  } catch {
    return { ok: false, error: "server" };
  }
}

/* -------------------------------------------------------------- booking */

export type SlotsResult = { ok: true; slots: number[]; timezone: string; minutes: number; meeting: string } | { ok: false; error: ErrorCode };

/** Open times the visitor can pick (UTC milliseconds). */
export async function getSlots(): Promise<SlotsResult> {
  if (!ready()) return { ok: false, error: "closed" };
  const s = await getBookingSettings();
  if (!s.enabled) return { ok: false, error: "closed" };
  const slots = generateSlots(s, await getBusy());
  return { ok: true, slots, timezone: s.timezone, minutes: s.slot_minutes, meeting: s.meeting_info };
}

export type BookState = { ok: true; start: number; end: number } | { ok: false; error: ErrorCode } | undefined;

export async function bookSlot(_prev: BookState, form: FormData): Promise<BookState> {
  if (!ready()) return { ok: false, error: "server" };
  const parsed = await readFields(form, true);
  if ("error" in parsed) return { ok: false, error: parsed.error };
  const { f } = parsed;
  const lang = (isLang(String(form.get("lang"))) ? String(form.get("lang")) : "en") as Lang;
  const start = Number(form.get("start"));
  const tz = clean(form.get("tz"), 60);
  const visitorTz = isValidTimeZone(tz) ? tz : "UTC";

  try {
    const settings = await getBookingSettings();
    if (!settings.enabled) return { ok: false, error: "closed" };
    if (!Number.isFinite(start) || !isOpenSlot(settings, await getBusy(), start)) return { ok: false, error: "taken" };
    const end = start + settings.slot_minutes * 60_000;

    const h = await headers();
    const hash = ipHash(clientIp(h));
    if (await tooMany(hash)) return { ok: false, error: "rate" };

    const db = adminClient();
    const sol = await solutionName(f.solution);
    const { data: enquiry } = await db
      .from("enquiries")
      .insert({ source: "booking", solution: f.solution || null, name: f.name, organisation: f.organisation || null, phone: f.phone || null, email: f.email, message: f.message || null, lang, page: `/${lang}/demo`, ip_hash: hash })
      .select("id")
      .single();

    const { data: booking, error } = await db
      .from("bookings")
      .insert({ start_at: new Date(start).toISOString(), end_at: new Date(end).toISOString(), name: f.name, email: f.email, phone: f.phone || null, organisation: f.organisation || null, solution: f.solution || null, notes: f.message || null, lang, visitor_tz: visitorTz, enquiry_id: enquiry?.id ?? null })
      .select("id, cancel_token")
      .single();
    if (error || !booking) return { ok: false, error: error?.code === "23505" ? "taken" : "server" };

    void recordEvent({ kind: "booking", solution: f.solution || null, lang, path: `/${lang}/demo` });

    const when = formatSlot(start, visitorTz, lang);
    const whenTeam = formatSlot(start, settings.timezone, "en");
    const cancel = `${siteUrl()}/${lang}/demo/cancel/${booking.cancel_token}`;
    const ics = buildIcs({ uid: booking.id, start, end, title: `ePortal demo: ${sol}`, description: `${settings.meeting_info}\nChange or cancel: ${cancel}` });

    await Promise.all([
      sendMail({
        to: notifyEmails(),
        replyTo: f.email,
        subject: `Demo booked: ${f.name}, ${whenTeam}`,
        html: layout("New demo booking", [["When", `${whenTeam} (${settings.timezone})`], ["Solution", sol], ["Name", f.name], ["Organisation", f.organisation], ["Email", f.email], ["Phone", f.phone], ["Notes", f.message], ["Visitor time zone", visitorTz]], `Manage bookings: ${esc(siteUrl())}/admin/bookings`),
        attachments: [{ filename: "demo.ics", content: Buffer.from(ics).toString("base64") }],
      }),
      sendMail({
        to: f.email,
        subject: T(lang, "Your demo is booked: {when}", "آپ کا ڈیمو بک ہو گیا: {when}").replace("{when}", when),
        html: layout(T(lang, "Your demo is confirmed", "آپ کا ڈیمو کنفرم ہو گیا"), [[T(lang, "When", "وقت"), when], [T(lang, "Solution", "حل"), sol], [T(lang, "How", "طریقہ"), settings.meeting_info]], `${T(lang, "Need to cancel?", "منسوخ کرنا ہے؟")} <a href="${esc(cancel)}">${esc(cancel)}</a>`),
        attachments: [{ filename: "demo.ics", content: Buffer.from(ics).toString("base64") }],
      }),
    ]);
    return { ok: true, start, end };
  } catch {
    return { ok: false, error: "server" };
  }
}

/* --------------------------------------------------------------- cancel */

export type CancelState = { ok: true } | { ok: false; error: "notfound" | "server" } | undefined;

export async function cancelBooking(_prev: CancelState, form: FormData): Promise<CancelState> {
  const token = clean(form.get("token"), 80);
  if (!ready() || !/^[a-f0-9]{20,80}$/.test(token)) return { ok: false, error: "notfound" };
  try {
    const db = adminClient();
    const { data } = await db.from("bookings").select("id, name, email, start_at, status").eq("cancel_token", token).maybeSingle();
    if (!data || data.status !== "confirmed" || Date.parse(data.start_at) < Date.now()) return { ok: false, error: "notfound" };
    const { error } = await db.from("bookings").update({ status: "cancelled" }).eq("id", data.id);
    if (error) return { ok: false, error: "server" };
    const s = await getBookingSettings();
    await sendMail({ to: notifyEmails(), subject: `Demo cancelled: ${data.name}`, html: layout("Booking cancelled by the visitor", [["Name", data.name], ["Email", data.email], ["Was at", formatSlot(Date.parse(data.start_at), s.timezone, "en")]]) });
    return { ok: true };
  } catch {
    return { ok: false, error: "server" };
  }
}

/** For the cancel page: what is this booking? */
export async function lookupBooking(token: string) {
  if (!ready() || !/^[a-f0-9]{20,80}$/.test(token)) return null;
  const { data } = await adminClient().from("bookings").select("name, start_at, status, solution, lang, visitor_tz").eq("cancel_token", token).maybeSingle();
  return data ?? null;
}
