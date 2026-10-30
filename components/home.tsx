import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BellRing, Check, CheckCircle2, Languages, MessageSquareText, X } from "lucide-react";
import { Icon } from "./Icon";
import { PortalExplorer } from "./PortalExplorer";
import { SectionHead } from "./Section";
import { CountUp, Parallax, Reveal, Spot, Tilt } from "./motion";
import {
  AdminDashboardMock, AttendanceMock, BrowserFrame, FeeMock, FingerprintMock, ParentPhoneMock, PhoneFrame, PhoneShot,
} from "./visuals";
import { hero, modules, plans, portals, steps, ui } from "@/lib/content";
import { getSolutions } from "@/lib/solutions-data";
import { dirOf, href, T, tx, type Lang } from "@/lib/i18n";

/* ------------------------------------------------------------------- hero */

export function HomeHero({ lang }: { lang: Lang }) {
  const chips = [
    { t: T(lang, "Fee received · Rs 8,500", "فیس موصول · 8,500 روپے"), c: "-top-4 end-2 sm:-end-4", d: "" },
    { t: T(lang, "SMS sent to 420 parents", "420 والدین کو ایس ایم ایس بھیجا گیا"), c: "bottom-24 -end-2 sm:-end-10", d: "[animation-delay:1.5s]" },
    { t: T(lang, "Result cards ready", "رزلٹ کارڈ تیار"), c: "top-1/2 -start-6 sm:-start-14", d: "[animation-delay:3s]" },
  ];

  return (
    <section className="bg-hero relative overflow-hidden text-white">
      <div className="bg-grid absolute inset-0" />
      <div className="container-x relative grid items-center gap-16 pb-28 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pb-36 lg:pt-20">
        <div>
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white/90">
              <span className="relative h-2 w-2 rounded-full bg-brand-400 text-brand-400 pulse-ring" />
              {tx(hero.badge, lang)}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              {tx(hero.titleA, lang)} <span className="text-gradient">{tx(hero.titleB, lang)}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg text-white/75">{tx(hero.sub, lang)}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={href(lang, "/demo")} className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-400">
                {tx(ui.demo, lang)}
                <ArrowRight size={18} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link href={href(lang, "/portals")} className="glass rounded-xl px-6 py-3.5 font-semibold text-white transition hover:bg-white/15">
                {tx(ui.explorePortals, lang)}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {hero.points.map((p, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-400" />{tx(p, lang)}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={40} className="relative pb-10 ps-0 sm:ps-8">
          <Tilt>
            <BrowserFrame><AdminDashboardMock lang={lang} /></BrowserFrame>
          </Tilt>
          <div className="animate-float-slow absolute -bottom-2 -start-3 w-36 rotate-[-6deg] sm:-start-10 sm:w-44">
            <PhoneFrame><ParentPhoneMock lang={lang} /></PhoneFrame>
          </div>
          {chips.map((c) => (
            <span key={c.t} className={`glass animate-float absolute hidden sm:block ${c.c} ${c.d} rounded-xl px-3.5 py-2 text-xs font-semibold text-white shadow-xl`}>
              <i className="me-2 inline-block h-2 w-2 rounded-full bg-brand-400" />{c.t}
            </span>
          ))}
        </Reveal>
      </div>
      <svg className="absolute bottom-[-1px] left-0 w-full text-white" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0,40 C240,0 480,60 720,36 C960,12 1200,56 1440,20 L1440,60 L0,60 Z" />
      </svg>
    </section>
  );
}

/* --------------------------------------------------------- module marquee */

export function ModuleMarquee({ lang }: { lang: Lang }) {
  const half = Math.ceil(modules.length / 2);
  const rows = [modules.slice(0, half), modules.slice(half)];
  return (
    <section className="marquee relative overflow-hidden py-10" dir="ltr" aria-label="Modules">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <div className="space-y-4">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div className={`marquee-track ${r ? "rev" : ""} gap-4`} style={{ animationDuration: r ? "46s" : "38s" }}>
              {[...row, ...row, ...row, ...row].map((m, i) => (
                <span key={i} className="me-4 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white px-5 py-3 font-semibold shadow-sm" dir={dirOf(lang)}>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-600"><Icon name={m.icon} size={16} /></span>
                  {tx(m.label, lang)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ before/after */

export function BeforeAfter({ lang }: { lang: Lang }) {
  const before = [
    T(lang, "Paper registers for attendance and fees", "حاضری اور فیس کے لیے کاغذی رجسٹر"),
    T(lang, "Parents call the office for every question", "ہر سوال کے لیے والدین دفتر کو فون کرتے ہیں"),
    T(lang, "Result cards typed by hand, for days", "رزلٹ کارڈ کئی دن ہاتھ سے تیار ہوتے ہیں"),
    T(lang, "Fee defaulters found at month end", "فیس نادہندگان مہینے کے آخر میں پتا چلتے ہیں"),
    T(lang, "Data scattered across Excel files", "ڈیٹا ایکسل فائلوں میں بکھرا ہوا"),
  ];
  const after = [
    T(lang, "Attendance in seconds, parents alerted instantly", "سیکنڈوں میں حاضری، والدین کو فوری اطلاع"),
    T(lang, "Parents self-serve in the app or ask the AI", "والدین ایپ سے خود دیکھتے ہیں یا اے آئی سے پوچھتے ہیں"),
    T(lang, "Result cards generated in one click", "ایک کلک میں رزلٹ کارڈ تیار"),
    T(lang, "Live fee dashboard with automatic reminders", "خودکار یاددہانی کے ساتھ لائیو فیس ڈیش بورڈ"),
    T(lang, "One record for every student, always current", "ہر طالب علم کا ایک ہی تازہ ریکارڈ"),
  ];
  return (
    <section className="container-x py-20">
      <SectionHead
        eyebrow={T(lang, "The difference", "فرق")}
        title={T(lang, "From daily chaos to a calm, connected school", "روزمرہ افراتفری سے پرسکون، مربوط اسکول تک")}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal x={-30} y={0}>
          <div className="h-full rounded-3xl border border-line bg-mist p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{T(lang, "Without ePortal", "ای پورٹل کے بغیر")}</p>
            <ul className="mt-6 space-y-4">
              {before.map((b) => (
                <li key={b} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-100 text-red-600"><X size={12} /></span>{b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal x={30} y={0} delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 p-8 text-white shadow-2xl shadow-navy-900/25">
            <div className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" />
            <p className="relative text-sm font-semibold uppercase tracking-wide text-brand-300">{T(lang, "With ePortal", "ای پورٹل کے ساتھ")}</p>
            <ul className="relative mt-6 space-y-4">
              {after.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white"><Check size={12} /></span>{a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ stats */

export function StatsBand({ lang }: { lang: Lang }) {
  const items = [
    { v: 15, s: "+", l: T(lang, "Integrated modules", "مربوط ماڈیولز") },
    { v: 6, s: "", l: T(lang, "Role-based portals", "کردار پر مبنی پورٹلز") },
    { v: 5, s: "+", l: T(lang, "Years of experience", "سال کا تجربہ") },
    { v: 2, s: "", l: T(lang, "Languages: English & Urdu", "زبانیں: اردو اور انگریزی") },
  ];
  return (
    <section className="bg-hero relative overflow-hidden py-16 text-white">
      <div className="bg-grid absolute inset-0" />
      <div className="container-x relative grid grid-cols-2 gap-8 lg:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={i} delay={i * 0.08} className="text-center">
            <CountUp value={s.v} suffix={s.s} className="text-gradient block text-5xl font-extrabold sm:text-6xl" />
            <p className="mt-2 text-sm text-white/70">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ bento */

export function Bento({ lang }: { lang: Lang }) {
  return (
    <section className="container-x py-20">
      <SectionHead
        eyebrow={T(lang, "Why ePortal", "ای پورٹل کیوں")}
        title={T(lang, "Everything a modern school needs, beautifully connected", "ایک جدید اسکول کی ہر ضرورت، خوبصورتی سے مربوط")}
      />
      <div className="mt-12 grid gap-5 md:grid-cols-6">
        <Reveal className="md:col-span-3">
          <Spot className="h-full rounded-3xl border border-line bg-white p-7">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon name="Wallet" size={22} /></span>
            <h3 className="mt-4 text-xl font-bold">{T(lang, "Fees that collect themselves", "فیس جو خود وصول ہو")}</h3>
            <p className="mt-2 text-ink-soft">{T(lang, "Bulk challans, family discounts, instant receipts and automatic reminders for defaulters.", "بلک چالان، فیملی رعایت، فوری رسید اور نادہندگان کے لیے خودکار یاددہانی۔")}</p>
            <div className="mt-6"><FeeMock lang={lang} /></div>
          </Spot>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-3">
          <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 p-7 text-white">
            <div className="pointer-events-none absolute -start-16 -top-16 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl" />
            <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-brand-300"><Icon name="CalendarCheck" size={22} /></span>
            <h3 className="relative mt-4 text-xl font-bold">{T(lang, "Attendance in seconds", "سیکنڈوں میں حاضری")}</h3>
            <p className="relative mt-2 text-white/70">{T(lang, "Teachers mark from the phone. Absences trigger an SMS to parents automatically.", "اساتذہ فون سے حاضری لگاتے ہیں۔ غیر حاضری پر والدین کو خودکار ایس ایم ایس جاتا ہے۔")}</p>
            <div className="relative mt-6"><AttendanceMock lang={lang} /></div>
          </div>
        </Reveal>

        <Reveal delay={0.04} className="md:col-span-2">
          <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 p-7 text-center text-white">
            <h3 className="text-lg font-bold">{T(lang, "Biometric ready", "بائیو میٹرک تیار")}</h3>
            <p className="mt-1 text-sm text-white/65">{T(lang, "Fingerprint devices sync to attendance.", "فنگر پرنٹ ڈیوائسز حاضری سے جڑ جاتی ہیں۔")}</p>
            <div className="mt-8 pb-3"><FingerprintMock lang={lang} /></div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <Spot className="h-full rounded-3xl border border-line bg-gradient-to-br from-brand-50 to-white p-7">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white"><Languages size={22} /></span>
            <h3 className="mt-4 text-lg font-bold">{T(lang, "Urdu and English, natively", "اردو اور انگریزی، مکمل طور پر")}</h3>
            <p className="mt-2 text-sm text-ink-soft">{T(lang, "Portals, notices and result cards in the language your community reads.", "پورٹلز، نوٹس اور رزلٹ کارڈ اس زبان میں جو آپ کی کمیونٹی پڑھتی ہے۔")}</p>
            <div className="mt-6 flex items-center justify-center gap-3 text-3xl font-extrabold">
              <span className="rounded-2xl bg-white px-4 py-2 shadow-sm">EN</span>
              <span className="rounded-2xl bg-navy-800 px-4 py-2 text-white shadow-sm" style={{ fontFamily: "var(--font-urdu)" }}>اردو</span>
            </div>
          </Spot>
        </Reveal>

        <Reveal delay={0.16} className="md:col-span-2">
          <Spot className="h-full rounded-3xl border border-line bg-white p-7">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-amber-600"><MessageSquareText size={22} /></span>
            <h3 className="mt-4 text-lg font-bold">{T(lang, "Bulk SMS from your own SIM", "اپنی سم سے بلک ایس ایم ایس")}</h3>
            <p className="mt-2 text-sm text-ink-soft">{T(lang, "Results, fee reminders and homework alerts to every parent with your normal SMS package.", "نتائج، فیس یاددہانی اور ہوم ورک الرٹ ہر والدین کو آپ کے معمول کے ایس ایم ایس پیکج سے۔")}</p>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-mist p-3 text-xs text-ink-soft">
              <BellRing size={16} className="shrink-0 text-amber-500" />
              {T(lang, "Fee reminder: please submit your dues.", "فیس یاددہانی: براہ کرم اپنے واجبات جمع کرائیں۔")}
            </div>
          </Spot>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- portals */

export function PortalsSection({ lang }: { lang: Lang }) {
  const items = portals.map((p) => ({
    slug: p.slug,
    icon: <Icon name={p.icon} size={18} />,
    name: p.name,
    tagline: p.tagline,
    features: p.features,
  }));
  return (
    <section className="relative overflow-hidden bg-mist py-20">
      <div className="bg-dots pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <SectionHead
          eyebrow={T(lang, "Portals", "پورٹلز")}
          title={T(lang, "A tailored portal for everyone in your school", "آپ کے اسکول میں ہر فرد کے لیے مخصوص پورٹل")}
          sub={T(lang, "Click a role to see what they get.", "کسی کردار پر کلک کریں اور دیکھیں انہیں کیا ملتا ہے۔")}
        />
        <div className="mt-12"><PortalExplorer portals={items} lang={lang} /></div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ apps */

export function AppsShowcase({ lang }: { lang: Lang }) {
  return (
    <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
      <div className="relative mx-auto h-[28rem] w-full max-w-md">
        <Parallax offset={30} className="absolute start-0 top-10 w-40 rotate-[-8deg] sm:w-44">
          <PhoneShot src="/img/shot-150013.jpg" alt="ePortal Android app sign-in screen" />
        </Parallax>
        <Parallax offset={-20} className="absolute start-1/2 top-0 z-10 w-44 -translate-x-1/2 sm:w-52 rtl:translate-x-1/2">
          <PhoneShot src="/img/phone-shot.png" alt="ePortal Android app dashboard" />
        </Parallax>
        <Parallax offset={40} className="absolute end-0 top-14 w-40 rotate-[8deg] sm:w-44">
          <PhoneShot src="/img/shot-150105.jpg" alt="ePortal parent app home screen" />
        </Parallax>
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-40 rounded-full bg-brand-300/40 blur-3xl" />
      </div>
      <div>
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{T(lang, "Real apps", "حقیقی ایپس")}</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{T(lang, "Android apps your staff and parents already know how to use", "اینڈرائیڈ ایپس جنہیں آپ کا عملہ اور والدین آسانی سے استعمال کرتے ہیں")}</h2>
          <p className="mt-4 text-lg text-ink-soft">{T(lang, "Big, clear icons for every task. Parents check attendance, results and fees. Admins and teachers manage the school from their pocket.", "ہر کام کے لیے بڑے اور واضح آئیکن۔ والدین حاضری، نتائج اور فیس دیکھتے ہیں۔ ایڈمن اور اساتذہ جیب سے اسکول چلاتے ہیں۔")}</p>
        </Reveal>
        <ul className="mt-8 space-y-4">
          {[
            T(lang, "Parent app with a separate login for each child", "ہر بچے کے الگ لاگ ان کے ساتھ پیرنٹ ایپ"),
            T(lang, "Admin and teacher app for attendance, marks and notices", "حاضری، نمبر اور نوٹس کے لیے ایڈمن اور ٹیچر ایپ"),
            T(lang, "SMS alert app that sends from your own SIM", "اپنی سم سے بھیجنے والی ایس ایم ایس الرٹ ایپ"),
          ].map((t, i) => (
            <Reveal key={t} delay={0.08 * i} y={14}>
              <li className="flex items-start gap-3"><CheckCircle2 size={20} className="mt-1.5 shrink-0 text-brand-500" />{t}</li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- sms story */

export function SmsStory({ lang }: { lang: Lang }) {
  return (
    <section className="bg-mist py-24">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{T(lang, "Communication", "رابطہ")}</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{T(lang, "From the school desk to every parent's phone in seconds", "اسکول کے ڈیسک سے ہر والدین کے فون تک سیکنڈوں میں")}</h2>
          <p className="mt-4 text-lg text-ink-soft">{T(lang, "One tap sends exam results, absence alerts, fee reminders and homework to the whole school, even to parents without a smartphone.", "ایک ٹیپ سے امتحانی نتائج، غیر حاضری الرٹ، فیس یاددہانی اور ہوم ورک پورے اسکول کو جاتا ہے، ان والدین کو بھی جن کے پاس اسمارٹ فون نہیں۔")}</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              ["FileText", T(lang, "Results", "نتائج")],
              ["CalendarX", T(lang, "Absence alerts", "غیر حاضری الرٹ")],
              ["Wallet", T(lang, "Fee reminders", "فیس یاددہانی")],
              ["BookOpen", T(lang, "Homework", "ہوم ورک")],
            ].map(([ic, label]) => (
              <Spot key={label} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon name={ic} size={20} /></span>
                <b>{label}</b>
              </Spot>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} x={30} y={0}>
          <Tilt>
            <div className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl shadow-navy-900/15">
              <Image src="/img/school.jpg" alt="Illustration: the school admin sends SMS alerts to parents" width={1340} height={520} className="h-auto w-full" />
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- timeline */

export function HowItWorks({ lang }: { lang: Lang }) {
  return (
    <section className="container-x py-24">
      <SectionHead
        eyebrow={T(lang, "Getting started", "آغاز")}
        title={T(lang, "Live in one to two weeks", "ایک سے دو ہفتوں میں لائیو")}
        sub={T(lang, "We do the heavy lifting. You keep teaching.", "بھاری کام ہم کرتے ہیں۔ آپ پڑھاتے رہیں۔")}
      />
      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        <div className="absolute start-[12%] end-[12%] top-7 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 md:block" />
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <li className="relative text-center">
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-extrabold text-white shadow-lg shadow-brand-600/30">{i + 1}</span>
              <h3 className="mt-5 text-lg font-bold">{tx(s.title, lang)}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm text-ink-soft">{tx(s.desc, lang)}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------- products */

export async function ProductsShowcase({ lang, exclude = "eschool" }: { lang: Lang; exclude?: string }) {
  const solutions = await getSolutions();
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="container-x relative text-center">
        <SectionHead
          light
          eyebrow={T(lang, "More from ePortal", "ای پورٹل سے مزید")}
          title={T(lang, "Explore our other platforms", "ہمارے دوسرے پلیٹ فارمز دیکھیں")}
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {solutions.filter((s) => s.slug !== exclude).map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05} y={14}>
              <Link href={href(lang, `/solutions/${s.slug}`)} className="glass group inline-flex items-center gap-3 rounded-full py-2 pe-5 ps-2 font-semibold transition hover:bg-white/15">
                <span className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${s.accent} text-white`}><Icon name={s.icon} size={17} /></span>
                {tx(s.name, lang)}
              </Link>
            </Reveal>
          ))}
        </div>
        <Link href={href(lang, "/solutions")} className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-300 hover:underline">
          {tx(ui.exploreSolutions, lang)}<ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}

export function PricingTeaser({ lang }: { lang: Lang }) {
  const shown = plans.slice(0, 3);
  return (
    <section className="container-x py-24">
      <SectionHead
        eyebrow={T(lang, "Pricing", "قیمتیں")}
        title={T(lang, "Simple plans that grow with your school", "سادہ پلانز جو آپ کے اسکول کے ساتھ بڑھتے ہیں")}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {shown.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.08}>
            <div className={`h-full rounded-3xl p-7 ${p.popular ? "bg-gradient-to-br from-navy-800 to-navy-950 text-white shadow-2xl shadow-navy-900/30 md:-translate-y-3" : "border border-line bg-white"}`}>
              {p.popular && <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">{tx(ui.popular, lang)}</span>}
              <h3 className="mt-3 text-xl font-bold">{tx(p.name, lang)}</h3>
              <p className={`text-sm ${p.popular ? "text-white/65" : "text-ink-soft"}`}>{tx(p.students, lang)}</p>
              <p className="mt-5 text-4xl font-extrabold" dir="ltr">Rs {p.monthly?.toLocaleString("en-US")}<span className={`text-sm font-medium ${p.popular ? "text-white/60" : "text-ink-soft"}`}> {tx(ui.perMonth, lang)}</span></p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.slice(0, 4).map((f, k) => (
                  <li key={k} className="flex items-start gap-2.5"><Check size={16} className={`mt-1.5 shrink-0 ${p.popular ? "text-brand-300" : "text-brand-500"}`} />{tx(f, lang)}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href={href(lang, "/pricing")} className="inline-flex items-center gap-2 font-semibold text-brand-600 hover:underline">
          {T(lang, "Compare all plans", "تمام پلانز کا موازنہ")}<ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
