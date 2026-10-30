import Link from "next/link";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { Icon } from "./Icon";
import { ProductMock } from "./productMocks";
import { SectionHead } from "./Section";
import { Reveal, Spot } from "./motion";
import { solutions, ui } from "@/lib/content";
import { href, T, tx, type Lang } from "@/lib/i18n";

export function HubHero({ lang }: { lang: Lang }) {
  const featured = solutions.slice(0, 6);
  const col1 = featured.filter((_, i) => i % 2 === 0);
  const col2 = featured.filter((_, i) => i % 2 === 1);
  const points = [
    T(lang, "8 platforms", "8 پلیٹ فارمز"),
    T(lang, "Built in Lahore", "لاہور میں تیار"),
    T(lang, "Urdu and English", "اردو اور انگریزی"),
  ];

  const card = (s: (typeof solutions)[number], i: number) => (
    <Link
      key={s.slug}
      href={href(lang, `/solutions/${s.slug}`)}
      className={`animate-float-slow group relative block overflow-hidden rounded-3xl bg-gradient-to-br ${s.accent} p-5 text-white shadow-2xl shadow-black/30 transition hover:scale-[1.03]`}
      style={{ animationDelay: `${i * 0.7}s` }}
    >
      <Icon name={s.icon} size={110} strokeWidth={1} className="absolute -end-5 -top-5 text-white/15" />
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/20 backdrop-blur"><Icon name={s.icon} size={22} /></span>
      <p className="relative mt-4 text-lg font-extrabold leading-tight">{tx(s.name, lang)}</p>
      <p className="relative mt-0.5 text-sm text-white/85">{tx(s.tagline, lang)}</p>
    </Link>
  );

  return (
    <section className="bg-hero relative overflow-hidden text-white">
      <div className="bg-grid absolute inset-0" />
      <div className="container-x relative grid items-center gap-16 pb-28 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pb-36 lg:pt-20">
        <div>
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white/90">
              <span className="pulse-ring relative h-2 w-2 rounded-full bg-brand-400 text-brand-400" />
              {T(lang, "Smart platforms built in Lahore", "لاہور میں تیار کردہ سمارٹ پلیٹ فارمز")}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              {T(lang, "Smart platforms for", "اسکولوں، فٹنس، صحت، سیلز اور ریٹیل کے لیے")}{" "}
              <span className="text-gradient">{T(lang, "schools, fitness, healthcare, sales and retail", "سمارٹ پلیٹ فارمز")}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg text-white/75">
              {T(
                lang,
                "ePortal brings together the software people rely on every day: run a school, hire a trainer, code medical records with AI, automate sales or run your shop.",
                "ای پورٹل وہ سافٹ ویئر یکجا کرتا ہے جس پر لوگ روزانہ بھروسا کرتے ہیں: اسکول چلائیں، ٹرینر ہائر کریں، اے آئی سے میڈیکل کوڈنگ کریں، سیلز خودکار بنائیں یا اپنی دکان چلائیں۔",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={href(lang, "/solutions")} className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-500">
                {tx(ui.exploreSolutions, lang)}
                <ArrowRight size={18} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link href={href(lang, "/demo")} className="glass rounded-xl px-6 py-3.5 font-semibold text-white transition hover:bg-white/15">
                {tx(ui.demo, lang)}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-400" />{p}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={40}>
          <div className="mx-auto grid max-w-md grid-cols-2 gap-4 pb-6">
            <div className="space-y-4">{col1.map((s, i) => card(s, i * 2))}</div>
            <div className="mt-10 space-y-4">{col2.map((s, i) => card(s, i * 2 + 1))}</div>
          </div>
        </Reveal>
      </div>
      <svg className="absolute bottom-[-1px] left-0 w-full text-white" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0,40 C240,0 480,60 720,36 C960,12 1200,56 1440,20 L1440,60 L0,60 Z" />
      </svg>
    </section>
  );
}

export function SolutionsGrid({ lang }: { lang: Lang }) {
  return (
    <section className="container-x py-20">
      <SectionHead
        eyebrow={T(lang, "Our solutions", "ہمارے حل")}
        title={T(lang, "Find the platform that fits your need", "اپنی ضرورت کے مطابق پلیٹ فارم چنیں")}
        sub={T(lang, "Each platform does one job really well, and you can use any of them on its own.", "ہر پلیٹ فارم ایک کام بہت اچھی طرح کرتا ہے، اور آپ ان میں سے کوئی بھی الگ سے استعمال کر سکتے ہیں۔")}
      />
      <div className="mt-14 flex flex-wrap justify-center gap-6">
        {solutions.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.07} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
            <Spot className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:border-brand-300 hover:shadow-xl hover:shadow-black/5">
              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${s.accent}`} dir="ltr">
                <div className="bg-grid absolute inset-0 opacity-60" />
                <Icon name={s.icon} size={150} strokeWidth={1} className="absolute -right-6 -top-8 text-white/15" />
                <div className="absolute left-5 top-6 w-[190%] transition duration-500 group-hover:-translate-y-2" style={{ transform: "scale(0.52)", transformOrigin: "top left" }}>
                  <ProductMock slug={s.slug} lang={lang} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white`}><Icon name={s.icon} size={22} /></span>
                  <div>
                    <h3 className="text-xl font-extrabold">{tx(s.name, lang)}</h3>
                    <p className="text-sm font-medium text-brand-600">{tx(s.tagline, lang)}</p>
                  </div>
                </div>
                <p className="mt-4 text-ink-soft">{tx(s.description, lang)}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.features.slice(0, 3).map((f, k) => (
                    <li key={k} className="flex items-start gap-2.5"><Check size={15} className="mt-1.5 shrink-0 text-brand-600" />{tx(f, lang)}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <Link href={href(lang, `/solutions/${s.slug}`)} className="inline-flex items-center gap-1.5 font-semibold text-brand-600">
                    {tx(ui.learnMore, lang)}
                    <ArrowRight size={16} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                  {s.url && (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-soft hover:text-brand-600">
                      {T(lang, "Visit site ↗", "ویب سائٹ ↗")}
                    </a>
                  )}
                </div>
              </div>
            </Spot>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function WhyEportal({ lang }: { lang: Lang }) {
  const items = [
    { icon: "MapPin", t: T(lang, "Built in Pakistan", "پاکستان میں تیار"), d: T(lang, "Designed around local workflows, with Urdu and English where it matters.", "مقامی طریقہ کار کے مطابق، جہاں ضرورت ہو اردو اور انگریزی کے ساتھ۔") },
    { icon: "MousePointerClick", t: T(lang, "Simple for everyone", "سب کے لیے آسان"), d: T(lang, "Clear screens that need no training, on web and mobile.", "واضح اسکرینیں جنہیں سیکھنے کی ضرورت نہیں، ویب اور موبائل پر۔") },
    { icon: "Sparkles", t: T(lang, "Practical AI", "عملی اے آئی"), d: T(lang, "AI that saves time on real tasks, with people always in control.", "اے آئی جو حقیقی کاموں میں وقت بچاتا ہے، فیصلے ہمیشہ انسان کے ہاتھ میں۔") },
    { icon: "Headset", t: T(lang, "Support you can reach", "قابل رسائی سپورٹ"), d: T(lang, "A real person on phone or WhatsApp when you need help.", "ضرورت پر فون یا واٹس ایپ پر حقیقی انسان۔") },
  ];
  return (
    <section className="bg-mist py-24">
      <div className="container-x">
        <SectionHead
          eyebrow={T(lang, "Why ePortal", "ای پورٹل کیوں")}
          title={T(lang, "The same care in everything we build", "ہر چیز میں ایک جیسی توجہ")}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.07}>
              <Spot className="h-full rounded-2xl border border-line bg-white p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon name={x.icon} size={24} /></span>
                <h3 className="mt-4 font-bold">{x.t}</h3>
                <p className="mt-2 text-sm text-ink-soft">{x.d}</p>
              </Spot>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GettingStarted({ lang }: { lang: Lang }) {
  const steps = [
    { title: T(lang, "Tell us what you need", "اپنی ضرورت بتائیں"), desc: T(lang, "A short call or demo so we understand your situation.", "مختصر کال یا ڈیمو تاکہ ہم آپ کی صورتحال سمجھ سکیں۔") },
    { title: T(lang, "We recommend and set up", "ہم تجویز اور سیٹ اپ کرتے ہیں"), desc: T(lang, "The right platform is configured and your data imported.", "درست پلیٹ فارم ترتیب دیا جاتا ہے اور آپ کا ڈیٹا منتقل ہوتا ہے۔") },
    { title: T(lang, "Train your team", "اپنی ٹیم کی تربیت"), desc: T(lang, "Short, practical sessions for everyone who will use it.", "استعمال کرنے والے ہر فرد کے لیے مختصر عملی سیشنز۔") },
    { title: T(lang, "Go live", "لائیو ہو جائیں"), desc: T(lang, "You start using it, with our support beside you.", "آپ استعمال شروع کرتے ہیں، ہماری سپورٹ آپ کے ساتھ۔") },
  ];
  return (
    <section className="container-x py-24">
      <SectionHead
        eyebrow={T(lang, "Getting started", "آغاز")}
        title={T(lang, "From first call to go-live", "پہلی کال سے لائیو ہونے تک")}
        sub={T(lang, "We do the heavy lifting so you can focus on your work.", "بھاری کام ہم کرتے ہیں تاکہ آپ اپنے کام پر توجہ دیں۔")}
      />
      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        <div className="absolute end-[12%] start-[12%] top-7 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 md:block" />
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <li className="relative text-center">
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-extrabold text-white shadow-lg shadow-brand-600/30">{i + 1}</span>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm text-ink-soft">{s.desc}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
