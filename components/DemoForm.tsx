"use client";

import { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

const t = {
  name: { en: "Your name", ur: "آپ کا نام" },
  school: { en: "School or college name", ur: "اسکول یا کالج کا نام" },
  phone: { en: "Phone / WhatsApp", ur: "فون / واٹس ایپ" },
  students: { en: "Number of students", ur: "طلبہ کی تعداد" },
  msg: { en: "Anything we should know? (optional)", ur: "کچھ اور بتانا چاہیں؟ (اختیاری)" },
  whatsapp: { en: "Send on WhatsApp", ur: "واٹس ایپ پر بھیجیں" },
  email: { en: "Send by email", ur: "ای میل سے بھیجیں" },
  hint: {
    en: "Your request opens in WhatsApp or your email app, ready to send.",
    ur: "آپ کی درخواست واٹس ایپ یا ای میل ایپ میں بھیجنے کے لیے تیار کھلے گی۔",
  },
};
const sizes = ["< 200", "200 – 600", "600 – 1,500", "1,500+"];

export function DemoForm({ lang }: { lang: Lang }) {
  const [v, setV] = useState({ name: "", school: "", phone: "", students: sizes[0], msg: "" });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  const body = [
    "ePortal demo request",
    `Name: ${v.name}`,
    `School: ${v.school}`,
    `Phone: ${v.phone}`,
    `Students: ${v.students}`,
    v.msg && `Notes: ${v.msg}`,
  ]
    .filter(Boolean)
    .join("\n");

  const valid = v.name.trim() && v.school.trim() && v.phone.trim();
  const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

  return (
    <form className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8" onSubmit={(e) => e.preventDefault()}>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">{t.name[lang]}</span>
        <input className={field} value={v.name} onChange={set("name")} required autoComplete="name" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">{t.school[lang]}</span>
        <input className={field} value={v.school} onChange={set("school")} required autoComplete="organization" />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{t.phone[lang]}</span>
          <input className={field} dir="ltr" type="tel" value={v.phone} onChange={set("phone")} required autoComplete="tel" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">{t.students[lang]}</span>
          <select className={field} value={v.students} onChange={set("students")}>
            {sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">{t.msg[lang]}</span>
        <textarea className={field} rows={3} value={v.msg} onChange={set("msg")} />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          aria-disabled={!valid}
          href={valid ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}` : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white ${valid ? "hover:brightness-95" : "pointer-events-none opacity-50"}`}
        >
          <MessageCircle size={18} /> {t.whatsapp[lang]}
        </a>
        <a
          aria-disabled={!valid}
          href={valid ? `mailto:${site.email}?subject=${encodeURIComponent("ePortal demo request")}&body=${encodeURIComponent(body)}` : undefined}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:bg-mist ${valid ? "" : "pointer-events-none opacity-50"}`}
        >
          <Mail size={18} /> {t.email[lang]}
        </a>
      </div>
      <p className="text-xs text-ink-soft">{t.hint[lang]}</p>
    </form>
  );
}
