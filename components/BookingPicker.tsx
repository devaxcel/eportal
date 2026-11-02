"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, Globe } from "lucide-react";
import { bookSlot, getSlots, type SlotsResult } from "@/app/[lang]/demo/actions";
import { errorText, fieldClass } from "./DemoForm";
import { useSolutions } from "./SolutionsProvider";
import { T, tx, type Lang } from "@/lib/i18n";

const dayKey = (ms: number, tz: string) => new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(ms));

/** Pick a day and a time, then leave your details. Times are shown in the visitor's own time zone. */
export function BookingPicker({ lang }: { lang: Lang }) {
  const solutions = useSolutions();
  const [data, setData] = useState<SlotsResult | null>(null);
  const [tz, setTz] = useState("UTC");
  const [month, setMonth] = useState<string>(""); // "2026-11"
  const [day, setDay] = useState<string>("");
  const [start, setStart] = useState<number>(0);
  const [loadedAt, setLoadedAt] = useState(0);
  const [state, action, pending] = useActionState(bookSlot, undefined);

  const load = () => getSlots().then(setData);
  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    setLoadedAt(Date.now());
    void load();
  }, []);
  useEffect(() => {
    if (state && !state.ok && state.error === "taken") {
      setStart(0);
      void load();
    }
  }, [state]);

  const byDay = useMemo(() => {
    const m = new Map<string, number[]>();
    if (data?.ok) for (const s of data.slots) m.set(dayKey(s, tz), [...(m.get(dayKey(s, tz)) ?? []), s]);
    return m;
  }, [data, tz]);
  const months = useMemo(() => [...new Set([...byDay.keys()].map((k) => k.slice(0, 7)))].sort(), [byDay]);
  useEffect(() => {
    if (!month && months.length) setMonth(months[0]);
  }, [months, month]);

  if (!data) return <p className="rounded-2xl border border-line bg-white p-8 text-center text-ink-soft">{T(lang, "Loading available times…", "دستیاب اوقات لوڈ ہو رہے ہیں…")}</p>;
  if (!data.ok) return <p className="rounded-2xl border border-line bg-white p-8 text-center text-ink-soft">{errorText(lang, data.error)}</p>;
  if (byDay.size === 0) return <p className="rounded-2xl border border-line bg-white p-8 text-center text-ink-soft">{T(lang, "No times are open right now. Please send us a message and we will arrange one.", "ابھی کوئی وقت خالی نہیں۔ براہ کرم پیغام بھیجیں، ہم وقت طے کر لیں گے۔")}</p>;

  const fmtTime = (ms: number) => new Intl.DateTimeFormat(lang, { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(ms));
  const fmtLong = (ms: number) => new Intl.DateTimeFormat(lang, { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(ms));

  if (state?.ok) {
    return (
      <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <CalendarCheck className="mx-auto text-brand-600" size={44} />
        <h2 className="mt-4 text-2xl font-extrabold">{T(lang, "Your demo is booked", "آپ کا ڈیمو بک ہو گیا")}</h2>
        <p className="mt-2 text-lg font-semibold" dir="auto">{fmtLong(state.start)}</p>
        <p className="mt-1 text-sm text-ink-soft">{tz}</p>
        <p className="mt-4 text-ink-soft">{T(lang, "We sent a confirmation with a calendar invitation to your email.", "ہم نے کیلنڈر دعوت کے ساتھ تصدیق آپ کی ای میل پر بھیج دی ہے۔")}</p>
        <p className="mt-2 text-sm text-ink-soft">{data.meeting}</p>
      </div>
    );
  }

  // calendar grid for the chosen month, weeks start on Monday
  const [yy, mm] = (month || months[0]).split("-").map(Number);
  const first = new Date(Date.UTC(yy, mm - 1, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const total = new Date(Date.UTC(yy, mm, 0)).getUTCDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  const key = (d: number) => `${yy}-${String(mm).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const mi = months.indexOf(month || months[0]);
  const monthName = new Intl.DateTimeFormat(lang, { timeZone: "UTC", month: "long", year: "numeric" }).format(first);
  const weekdays = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(lang, { timeZone: "UTC", weekday: "short" }).format(new Date(Date.UTC(2024, 0, 1 + i)))); // 1 Jan 2024 is a Monday
  const times = byDay.get(day) ?? [];

  return (
    <div className="space-y-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5"><Clock size={15} /> {T(lang, "{n} minute call", "{n} منٹ کی کال").replace("{n}", String(data.minutes))}</span>
        <span className="inline-flex items-center gap-1.5" dir="ltr"><Globe size={15} /> {tz}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <b dir="auto">{monthName}</b>
            <span className="flex gap-1">
              <button type="button" disabled={mi <= 0} onClick={() => setMonth(months[mi - 1])} aria-label={T(lang, "Previous month", "پچھلا مہینہ")} className="rounded-lg border border-line p-1.5 disabled:opacity-30"><ChevronLeft size={16} className="rtl:rotate-180" /></button>
              <button type="button" disabled={mi >= months.length - 1} onClick={() => setMonth(months[mi + 1])} aria-label={T(lang, "Next month", "اگلا مہینہ")} className="rounded-lg border border-line p-1.5 disabled:opacity-30"><ChevronRight size={16} className="rtl:rotate-180" /></button>
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-ink-soft">{weekdays.map((w, i) => <span key={i} className="py-1">{w}</span>)}</div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <span key={i} />;
              const k = key(d);
              const open = byDay.has(k);
              return (
                <button key={i} type="button" disabled={!open} onClick={() => { setDay(k); setStart(0); }} aria-pressed={day === k}
                  className={`aspect-square rounded-lg text-sm font-semibold transition ${day === k ? "bg-brand-600 text-white" : open ? "bg-brand-50 text-brand-800 hover:bg-brand-100" : "text-ink-soft/40"}`}>
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold">{day ? T(lang, "Choose a time", "وقت چنیں") : T(lang, "Choose a day first", "پہلے دن چنیں")}</p>
          <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto pe-1" dir="ltr">
            {times.map((t) => (
              <button key={t} type="button" onClick={() => setStart(t)} aria-pressed={start === t}
                className={`rounded-lg border px-2 py-2 text-sm font-semibold transition ${start === t ? "border-brand-600 bg-brand-600 text-white" : "border-line hover:border-brand-400"}`}>
                {fmtTime(t)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {start > 0 && (
        <form action={action} className="space-y-4 border-t border-line pt-6">
          <input type="hidden" name="lang" value={lang} />
          <input type="hidden" name="start" value={start} />
          <input type="hidden" name="tz" value={tz} />
          <input type="hidden" name="ts" value={loadedAt} />
          <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800" dir="auto">{fmtLong(start)}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="mb-1.5 block text-sm font-semibold">{T(lang, "Your name", "آپ کا نام")}</span><input name="name" required maxLength={100} autoComplete="name" className={fieldClass} /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold">{T(lang, "Email", "ای میل")}</span><input name="email" type="email" required dir="ltr" maxLength={200} autoComplete="email" className={fieldClass} /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold">{T(lang, "Phone / WhatsApp", "فون / واٹس ایپ")}</span><input name="phone" type="tel" dir="ltr" maxLength={30} autoComplete="tel" className={fieldClass} /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold">{T(lang, "Organisation (school, clinic, company…)", "ادارہ (اسکول، کلینک، کمپنی…)")}</span><input name="org" maxLength={120} autoComplete="organization" className={fieldClass} /></label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">{T(lang, "Which solution are you interested in?", "آپ کس حل میں دلچسپی رکھتے ہیں؟")}</span>
            <select name="solution" className={fieldClass} defaultValue="">
              <option value="">{T(lang, "Not sure yet", "ابھی یقین نہیں")}</option>
              {solutions.map((s) => <option key={s.slug} value={s.slug}>{tx(s.name, lang)}</option>)}
            </select>
          </label>
          <label className="block"><span className="mb-1.5 block text-sm font-semibold">{T(lang, "Anything we should know? (optional)", "کچھ اور بتانا چاہیں؟ (اختیاری)")}</span><textarea name="msg" rows={3} maxLength={2000} className={fieldClass} /></label>
          {state && !state.ok && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorText(lang, state.error)}</p>}
          <button disabled={pending} className="w-full rounded-xl bg-brand-600 px-5 py-3.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">{pending ? T(lang, "Booking…", "بک ہو رہا ہے…") : T(lang, "Confirm booking", "بکنگ کنفرم کریں")}</button>
          <p className="text-center text-xs text-ink-soft">{T(lang, "We use your details only to answer this request.", "ہم آپ کی معلومات صرف اس درخواست کا جواب دینے کے لیے استعمال کرتے ہیں۔")}</p>
        </form>
      )}
    </div>
  );
}
