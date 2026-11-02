"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { submitEnquiry, type ErrorCode } from "@/app/[lang]/demo/actions";
import { TrackedLink } from "./Track";
import { useSolutions } from "./SolutionsProvider";
import { T, tx, type Lang } from "@/lib/i18n";
import { newSlug } from "@/lib/slugs";
import { site } from "@/lib/site";

const sizes = ["< 200", "200 – 600", "600 – 1,500", "1,500+"];

export const errorText = (lang: Lang, code: ErrorCode) =>
  ({
    name: T(lang, "Please enter your name.", "براہ کرم اپنا نام لکھیں۔"),
    contact: T(lang, "Add a valid phone number or an email so we can reply.", "جواب دینے کے لیے درست فون نمبر یا ای میل لکھیں۔"),
    email: T(lang, "That email address does not look right.", "یہ ای میل درست نہیں لگتی۔"),
    long: T(lang, "One of the answers is too long. Please shorten it.", "کوئی جواب بہت لمبا ہے۔ براہ کرم مختصر کریں۔"),
    spam: T(lang, "That looked automatic. Please try again in a moment.", "یہ خودکار لگا۔ براہ کرم کچھ دیر بعد دوبارہ کوشش کریں۔"),
    rate: T(lang, "Too many requests from your connection. Please try again later or message us on WhatsApp.", "آپ کے کنکشن سے بہت زیادہ درخواستیں آئیں۔ بعد میں کوشش کریں یا واٹس ایپ پر پیغام بھیجیں۔"),
    taken: T(lang, "That time was just taken. Please choose another.", "وہ وقت ابھی کسی اور نے لے لیا۔ براہ کرم دوسرا چنیں۔"),
    closed: T(lang, "Booking is not available right now. Please send a message instead.", "بکنگ ابھی دستیاب نہیں۔ براہ کرم پیغام بھیجیں۔"),
    server: T(lang, "Something went wrong on our side. Please try again or message us on WhatsApp.", "ہماری طرف کوئی خرابی ہوئی۔ دوبارہ کوشش کریں یا واٹس ایپ پر پیغام بھیجیں۔"),
  })[code];

export const fieldClass = "w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function DemoForm({ lang }: { lang: Lang }) {
  const solutions = useSolutions();
  const [state, action, pending] = useActionState(submitEnquiry, undefined);
  const [v, setV] = useState({ solution: "", name: "", org: "", phone: "", email: "", students: sizes[0], msg: "" });
  const [loadedAt, setLoadedAt] = useState(0);
  const [page, setPage] = useState("");
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  useEffect(() => {
    setLoadedAt(Date.now());
    setPage(location.pathname);
    // Preselect a solution from ?solution=slug links (old addresses still work)
    const raw = new URLSearchParams(location.search).get("solution");
    const pick = raw ? newSlug(raw) : null;
    if (pick && solutions.some((s) => s.slug === pick)) setV((s) => ({ ...s, solution: pick }));
  }, [solutions]);

  const chosen = solutions.find((s) => s.slug === v.solution);
  const text = ["ePortal request", `Solution: ${chosen ? chosen.name.en : "Not sure yet"}`, `Name: ${v.name}`, `Organisation: ${v.org}`, `Phone: ${v.phone}`, v.email && `Email: ${v.email}`, v.msg && `Notes: ${v.msg}`].filter(Boolean).join("\n");

  if (state?.ok) {
    return (
      <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <CheckCircle2 className="mx-auto text-brand-600" size={44} />
        <h2 className="mt-4 text-2xl font-extrabold">{T(lang, "Thank you, we have your request", "شکریہ، ہمیں آپ کی درخواست مل گئی")}</h2>
        <p className="mt-2 text-ink-soft">{T(lang, "Our team will reply within one working day.", "ہماری ٹیم ایک کاروباری دن میں جواب دے گی۔")}</p>
        <p className="mt-4 text-sm text-ink-soft">{T(lang, "Your reference", "آپ کا حوالہ")}: <b dir="ltr">{state.ref}</b></p>
        <TrackedLink href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white">
          <MessageCircle size={18} /> {T(lang, "Chat on WhatsApp while you wait", "انتظار کے دوران واٹس ایپ پر بات کریں")}
        </TrackedLink>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="page" value={page} />
      <input type="hidden" name="ts" value={loadedAt} />
      {/* honeypot: hidden from people, filled in by simple bots */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">{T(lang, "Which solution are you interested in?", "آپ کس حل میں دلچسپی رکھتے ہیں؟")}</span>
        <select name="solution" className={fieldClass} value={v.solution} onChange={set("solution")}>
          <option value="">{T(lang, "Not sure yet", "ابھی یقین نہیں")}</option>
          {solutions.map((s) => <option key={s.slug} value={s.slug}>{tx(s.name, lang)}</option>)}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">{T(lang, "Your name", "آپ کا نام")}</span>
        <input name="name" className={fieldClass} value={v.name} onChange={set("name")} required maxLength={100} autoComplete="name" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">{T(lang, "Organisation (school, clinic, company…)", "ادارہ (اسکول، کلینک، کمپنی…)")}</span>
        <input name="org" className={fieldClass} value={v.org} onChange={set("org")} maxLength={120} autoComplete="organization" />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{T(lang, "Phone / WhatsApp", "فون / واٹس ایپ")}</span>
          <input name="phone" dir="ltr" type="tel" className={fieldClass} value={v.phone} onChange={set("phone")} maxLength={30} autoComplete="tel" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{T(lang, "Email", "ای میل")}</span>
          <input name="email" dir="ltr" type="email" className={fieldClass} value={v.email} onChange={set("email")} maxLength={200} autoComplete="email" />
        </label>
      </div>
      <p className="-mt-2 text-xs text-ink-soft">{T(lang, "Add a phone number or an email so we can reply.", "جواب دینے کے لیے فون نمبر یا ای میل لکھیں۔")}</p>
      {v.solution === "schooldesk" && (
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{T(lang, "Number of students", "طلبہ کی تعداد")}</span>
          <select name="students" className={fieldClass} value={v.students} onChange={set("students")}>{sizes.map((s) => <option key={s}>{s}</option>)}</select>
        </label>
      )}
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">{T(lang, "Anything we should know? (optional)", "کچھ اور بتانا چاہیں؟ (اختیاری)")}</span>
        <textarea name="msg" rows={3} className={fieldClass} value={v.msg} onChange={set("msg")} maxLength={2000} />
      </label>

      {state && !state.ok && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorText(lang, state.error)}</p>}

      <button disabled={pending} className="w-full rounded-xl bg-brand-600 px-5 py-3.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60">
        {pending ? T(lang, "Sending…", "بھیجا جا رہا ہے…") : T(lang, "Send request", "درخواست بھیجیں")}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-soft">
        <span>{T(lang, "Or reach us directly:", "یا براہ راست رابطہ کریں:")}</span>
        <TrackedLink href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-[#128C4B]"><MessageCircle size={15} /> WhatsApp</TrackedLink>
        <a href={`mailto:${site.email}?subject=${encodeURIComponent("ePortal request")}&body=${encodeURIComponent(text)}`} className="inline-flex items-center gap-1.5 font-semibold text-brand-700"><Mail size={15} /> {T(lang, "Email", "ای میل")}</a>
      </div>
      <p className="text-center text-xs text-ink-soft">{T(lang, "We use your details only to answer this request.", "ہم آپ کی معلومات صرف اس درخواست کا جواب دینے کے لیے استعمال کرتے ہیں۔")}</p>
    </form>
  );
}
