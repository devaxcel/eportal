import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "./motion";
import { ui } from "@/lib/content";
import { href, T, tx, type L, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SectionHead({
  eyebrow,
  title,
  sub,
  center = true,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && (
        <p className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${light ? "text-brand-300" : "text-brand-600"}`}>
          <span className={`h-px w-6 ${light ? "bg-brand-300" : "bg-brand-500"}`} />
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? "text-white" : ""}`}>{title}</h2>
      {sub && <p className={`mt-4 text-lg ${light ? "text-white/75" : "text-ink-soft"}`}>{sub}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, sub, children }: { eyebrow?: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="bg-hero relative overflow-hidden text-white">
      <div className="bg-grid absolute inset-0" />
      <div className="container-x relative py-20 text-center sm:py-24">
        <Reveal>
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">{eyebrow}</p>}
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          {sub && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">{sub}</p>}
          {children}
        </Reveal>
      </div>
      <svg className="absolute bottom-[-1px] left-0 w-full text-white" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0,24 C300,0 600,40 900,20 C1100,8 1300,30 1440,12 L1440,40 L0,40 Z" />
      </svg>
    </section>
  );
}

export function CtaBand({ lang, title, sub, href: to, label }: { lang: Lang; title?: string; sub?: string; href?: string; label?: string }) {
  return (
    <section className="container-x py-20">
      <Reveal>
        <div className="bg-hero relative overflow-hidden rounded-[2rem] px-6 py-16 text-center text-white sm:px-12">
          <div className="bg-grid absolute inset-0" />
          <div className="animate-float-slow pointer-events-none absolute -start-10 top-8 hidden h-28 w-28 rounded-3xl bg-brand-500/25 blur-xl sm:block" />
          <div className="animate-float pointer-events-none absolute -end-6 bottom-6 hidden h-36 w-36 rounded-full bg-brand-400/25 blur-2xl sm:block" />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold sm:text-5xl">
            {title ?? T(lang, "Find the right ePortal solution for you", "اپنے لیے درست ای پورٹل حل تلاش کریں")}
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/75">
            {sub ?? T(lang, "Tell us what you need. A short demo, no commitment.", "اپنی ضرورت بتائیں۔ مختصر ڈیمو، کوئی پابندی نہیں۔")}
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Link href={to ?? href(lang, "/demo")} className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-400">
              {label ?? tx(ui.demo, lang)}
              <ArrowRight size={18} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
            <a href={site.phoneHref} className="glass inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition hover:bg-white/15">
              <Phone size={18} /> {tx(ui.callUs, lang)}: <span dir="ltr">{site.phone}</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** "Need something built for you?" Two cards that send visitors to the made-to-order service pages. */
export function ServiceCtas({ lang }: { lang: Lang }) {
  const items = [
    { path: "/custom-portal", title: T(lang, "Request a custom portal for your business", "اپنے کاروبار کے لیے کسٹم پورٹل کی درخواست کریں"), text: T(lang, "Client, staff, vendor or student portals built around your process.", "آپ کے طریقہ کار کے مطابق کلائنٹ، اسٹاف، وینڈر یا اسٹوڈنٹ پورٹلز۔"), cta: T(lang, "Request a portal", "پورٹل کی درخواست دیں") },
    { path: "/business-website", title: T(lang, "Get your business website", "اپنے کاروبار کی ویب سائٹ بنوائیں"), text: T(lang, "A fast, professional website that shows up on Google and brings enquiries.", "تیز اور پیشہ ورانہ ویب سائٹ جو گوگل پر نظر آئے اور انکوائریاں لائے۔"), cta: T(lang, "Get a website", "ویب سائٹ بنوائیں") },
  ];
  return (
    <section className="container-x py-20">
      <SectionHead eyebrow={T(lang, "Built for you", "آپ کے لیے تیار")} title={T(lang, "Need something made to order?", "کچھ حسب ضرورت بنوانا ہے؟")} sub={T(lang, "Not every business fits a ready made platform. We design and build exactly what you need.", "ہر کاروبار تیار شدہ پلیٹ فارم میں فٹ نہیں ہوتا۔ ہم بالکل وہی بناتے ہیں جو آپ کو چاہیے۔")} />
      <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
        {items.map((i, k) => (
          <Reveal key={i.path} delay={k * 0.08}>
            <Link href={href(lang, i.path)} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/10">
              <h3 className="text-xl font-extrabold">{i.title}</h3>
              <p className="mt-2 flex-1 text-ink-soft">{i.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-600">
                {i.cta}
                <ArrowRight size={16} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg viewBox="0 0 20 20" className="mt-1.5 h-4 w-4 shrink-0 text-brand-500" fill="currentColor" aria-hidden="true">
        <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export function FaqList({ items, lang }: { items: { q: L; a: L }[]; lang: Lang }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((f, i) => (
        <Reveal key={i} delay={i * 0.05} y={16}>
          <details className="group rounded-2xl border border-line bg-white p-5 transition open:shadow-lg open:shadow-navy-900/5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {tx(f.q, lang)}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-xl leading-none text-brand-600 transition group-open:rotate-45 group-open:bg-brand-600 group-open:text-white" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 text-ink-soft">{tx(f.a, lang)}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
