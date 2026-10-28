"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  BarChart3, Bell, CalendarCheck, CheckCheck, CreditCard, FileText, GraduationCap, Home, LayoutDashboard,
  MessageSquare, Search, Settings, Users, Wallet, Fingerprint,
} from "lucide-react";
import { motion } from "motion/react";
import { T, type Lang } from "@/lib/i18n";

/* ------------------------------------------------------------------ frames */

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[2.4rem] bg-navy-950 p-[7px] shadow-2xl shadow-navy-950/40 ring-1 ring-white/10 ${className}`}>
      <div className="absolute start-1/2 top-[11px] z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-navy-950 rtl:translate-x-1/2" />
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-white">{children}</div>
    </div>
  );
}

export function PhoneShot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <PhoneFrame className={className}>
      <Image src={src} alt={alt} fill sizes="260px" className="object-cover object-top" />
    </PhoneFrame>
  );
}

export function BrowserFrame({ children, className = "", url = "app.eportal.pk" }: { children: ReactNode; className?: string; url?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-950/30 ring-1 ring-black/5 ${className}`} dir="ltr">
      <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        <span className="ms-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-ink-soft">{url}</span>
      </div>
      {children}
    </div>
  );
}

/* --------------------------------------------------------- admin dashboard */

const chartLine = "M0,78 C30,70 50,52 80,56 C110,60 130,30 165,34 C200,38 220,14 260,18 C290,21 310,8 340,6";
const payments = [
  { n: "Ayesha Khan", c: "6-B", a: "8,500", ok: true },
  { n: "Hamza Ali", c: "8-A", a: "9,200", ok: true },
  { n: "Sara Noor", c: "5-C", a: "7,800", ok: true },
  { n: "Bilal Ahmed", c: "9-A", a: "10,400", ok: false },
];

export function AdminDashboardMock({ lang }: { lang: Lang }) {
  const kpis = [
    { l: T(lang, "Students", "طلبہ"), v: "1,248", d: "+12", tone: "text-brand-600 bg-brand-50", icon: Users },
    { l: T(lang, "Present", "حاضر"), v: "94%", d: "+3.2%", tone: "text-sky-600 bg-sky-50", icon: CalendarCheck },
    { l: T(lang, "Collected", "وصولی"), v: "Rs 4.2M", d: "+18%", tone: "text-amber-600 bg-amber-50", icon: Wallet },
    { l: T(lang, "Results", "نتائج"), v: "86%", d: "+5%", tone: "text-violet-600 bg-violet-50", icon: FileText },
  ];
  const side = [LayoutDashboard, Users, CalendarCheck, Wallet, FileText, BarChart3, Settings];

  return (
    <div className="flex bg-white text-ink" dir="ltr" aria-hidden="true">
      <div className="hidden w-14 shrink-0 flex-col items-center gap-3 bg-navy-900 py-4 sm:flex">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white"><GraduationCap size={16} /></span>
        {side.map((Ic, i) => (
          <span key={i} className={`grid h-8 w-8 place-items-center rounded-lg ${i === 0 ? "bg-white/15 text-white" : "text-white/50"}`}>
            <Ic size={15} />
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold">{T(lang, "Good morning, Principal", "صبح بخیر، پرنسپل")}</p>
            <p className="text-[11px] text-ink-soft">{T(lang, "Here is today's overview", "آج کا خلاصہ")}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[11px] text-ink-soft sm:flex"><Search size={12} /> {T(lang, "Search", "تلاش")}</span>
            <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-line"><Bell size={14} /><i className="absolute end-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" /></span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <motion.div
              key={k.l}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="rounded-xl border border-line p-3"
            >
              <span className={`grid h-7 w-7 place-items-center rounded-lg ${k.tone}`}><k.icon size={14} /></span>
              <p className="mt-2 text-base font-extrabold leading-none">{k.v}</p>
              <p className="mt-1 flex items-center justify-between text-[10px] text-ink-soft">{k.l}<b className="text-brand-600">{k.d}</b></p>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-5">
          <div className="rounded-xl border border-line p-3 lg:col-span-3">
            <p className="text-xs font-bold">{T(lang, "Fee collection", "فیس کی وصولی")}</p>
            <svg viewBox="0 0 340 90" className="mt-2 h-24 w-full overflow-visible">
              <defs>
                <linearGradient id="gArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#1fae58" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#1fae58" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path d={`${chartLine} L340,90 L0,90 Z`} fill="url(#gArea)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }} />
              <motion.path d={chartLine} fill="none" stroke="#1fae58" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }} />
            </svg>
          </div>
          <div className="rounded-xl border border-line p-3 lg:col-span-2">
            <p className="text-xs font-bold">{T(lang, "Recent payments", "حالیہ ادائیگیاں")}</p>
            <ul className="mt-2 space-y-2">
              {payments.map((p) => (
                <li key={p.n} className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-800 text-[9px] font-bold text-white">{p.n[0]}</span>
                    <span className="truncate font-medium">{p.n}</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${p.ok ? "bg-brand-100 text-brand-700" : "bg-amber-100 text-amber-800"}`}>
                    {p.ok ? "Paid" : "Due"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- parent phone */

export function ParentPhoneMock({ lang }: { lang: Lang }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex h-full flex-col bg-mist text-ink" aria-hidden="true">
      <div className="bg-gradient-to-br from-navy-800 to-navy-700 px-4 pb-10 pt-9 text-white">
        <p className="text-[10px] text-white/60">{T(lang, "Welcome back", "خوش آمدید")}</p>
        <p className="text-sm font-bold">{T(lang, "Mrs. Khan", "محترمہ خان")}</p>
      </div>
      <div className="-mt-7 space-y-2.5 px-3">
        <div className="rounded-2xl bg-white p-3 shadow-lg shadow-navy-900/10">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">A</span>
            <div>
              <p className="text-xs font-bold">{T(lang, "Ayesha Khan", "عائشہ خان")}</p>
              <p className="text-[10px] text-ink-soft">{T(lang, "Class 6-B", "جماعت 6-بی")}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <svg viewBox="0 0 80 80" className="h-16 w-16 -rotate-90 shrink-0">
              <circle cx="40" cy="40" r={r} fill="none" stroke="#e2e8f2" strokeWidth="8" />
              <motion.circle
                cx="40" cy="40" r={r} fill="none" stroke="#1fae58" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={c}
                initial={{ strokeDashoffset: c }}
                whileInView={{ strokeDashoffset: c * 0.06 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3 }}
              />
            </svg>
            <div>
              <p className="text-lg font-extrabold leading-none text-brand-600">94%</p>
              <p className="mt-1 text-[10px] text-ink-soft">{T(lang, "Attendance this term", "اس ٹرم کی حاضری")}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 shadow-md shadow-navy-900/5">
          <p className="text-[10px] text-ink-soft">{T(lang, "Fee due", "واجب الادا فیس")}</p>
          <p className="text-base font-extrabold">Rs 8,500</p>
          <div className="shimmer mt-2 rounded-lg bg-brand-600 py-1.5 text-center text-[11px] font-semibold text-white">{T(lang, "Pay now", "ادائیگی کریں")}</div>
        </div>

        <div className="rounded-2xl bg-white p-3 shadow-md shadow-navy-900/5">
          <p className="text-[10px] font-semibold">{T(lang, "Monthly test", "ماہانہ ٹیسٹ")}</p>
          <div className="mt-2 flex h-12 items-end gap-1.5">
            {[90, 85, 78, 75, 82].map((h, i) => (
              <motion.span key={i} className="flex-1 rounded-t bg-gradient-to-t from-navy-700 to-sky-400" initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto flex justify-around border-t border-line bg-white py-2.5 text-ink-soft">
        <Home size={16} className="text-brand-600" /><CalendarCheck size={16} /><CreditCard size={16} /><MessageSquare size={16} />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- bento mocks */

export function FeeMock({ lang }: { lang: Lang }) {
  const rows = [
    { n: "Ayesha Khan", a: "8,500", s: T(lang, "Paid", "ادا"), ok: true },
    { n: "Hamza Ali", a: "9,200", s: T(lang, "Paid", "ادا"), ok: true },
    { n: "Bilal Ahmed", a: "10,400", s: T(lang, "Reminder sent", "یاددہانی بھیج دی"), ok: false },
  ];
  return (
    <div className="space-y-2.5" aria-hidden="true" dir="ltr">
      {rows.map((r, i) => (
        <motion.div
          key={r.n}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.12 }}
          className="flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2.5 text-sm shadow-sm"
        >
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-800 text-xs font-bold text-white">{r.n[0]}</span>
            <span><b className="block text-xs">{r.n}</b><span className="text-[11px] text-ink-soft">Rs {r.a}</span></span>
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${r.ok ? "bg-brand-100 text-brand-700" : "bg-amber-100 text-amber-800"}`}>{r.s}</span>
        </motion.div>
      ))}
      <div className="rounded-xl bg-navy-900 p-3 text-white">
        <div className="flex justify-between text-[11px] text-white/70"><span>{T(lang, "Collected this month", "اس ماہ کی وصولی")}</span><b className="text-white">82%</b></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-sky-400" initial={{ width: 0 }} whileInView={{ width: "82%" }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.4 }} />
        </div>
      </div>
    </div>
  );
}

export function AttendanceMock({ lang }: { lang: Lang }) {
  const days = [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1];
  return (
    <div aria-hidden="true" dir="ltr">
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.04, type: "spring", stiffness: 300 }}
            className={`aspect-square rounded-lg ${d ? "bg-brand-400/80" : "bg-red-400/80"}`}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9 }}
        className="mt-4 flex items-center gap-2.5 rounded-xl bg-white/10 p-3 text-xs text-white backdrop-blur"
      >
        <CheckCheck size={16} className="shrink-0 text-brand-300" />
        {T(lang, "Absent alert sent by SMS to 2 parents", "غیر حاضری کا الرٹ 2 والدین کو ایس ایم ایس سے بھیج دیا گیا")}
      </motion.div>
    </div>
  );
}

export function FingerprintMock({ lang }: { lang: Lang }) {
  return (
    <div className="relative mx-auto grid h-40 w-40 place-items-center" aria-hidden="true">
      <span className="pulse-ring absolute inset-6 rounded-full text-brand-400/40" />
      <span className="absolute inset-0 rounded-full border border-white/15" />
      <span className="absolute inset-3 rounded-full border border-white/10" />
      <span className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-xl shadow-brand-900/40">
        <Fingerprint size={46} />
      </span>
      <span className="absolute -bottom-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-brand-700 shadow-lg">
        {T(lang, "Verified: 07:52", "تصدیق: 07:52")}
      </span>
    </div>
  );
}
