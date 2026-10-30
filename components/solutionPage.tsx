import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, X } from "lucide-react";
import { Icon } from "./Icon";
import { ProductMock } from "./productMocks";
import { ProductVisual } from "./ProductVisual";
import { BrowserFrame } from "./visuals";
import { CtaBand, FaqList, SectionHead } from "./Section";
import { Reveal, Spot, Tilt } from "./motion";
import { EmotionalStatement } from "./heart";
import { GettingStarted } from "./hub";
import { ProductsShowcase } from "./home";
import { hubFaqs, ui, type Solution } from "@/lib/content";
import type { Story } from "@/lib/stories";
import { JsonLd } from "./JsonLd";
import { solutionSchema } from "@/lib/seo";
import { href, T, tx, type Lang } from "@/lib/i18n";

/* -------------------------------------------------------------- hero */

function SolutionHero({ s, lang }: { s: Solution; lang: Lang }) {
  const chips = s.features.slice(0, 3);
  const pos = ["-top-4 end-2 sm:-end-4", "bottom-20 -start-2 sm:-start-8", "-bottom-3 end-6"];

  return (
    <section className="bg-hero relative overflow-hidden text-white">
      <div className="bg-grid absolute inset-0" />
      <div className="container-x relative grid items-center gap-16 pb-28 pt-14 lg:grid-cols-[1fr_1.1fr] lg:pb-36 lg:pt-20">
        <div>
          <Reveal>
            <Link href={href(lang, "/solutions")} className="text-sm font-semibold text-brand-300 hover:underline">
              {T(lang, "← All solutions", "← تمام حل")}
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <span className="glass mt-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white/90">
              <Icon name={s.icon} size={16} className="text-brand-300" />
              {tx(s.tagline, lang)}
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              <span className="text-gradient">{tx(s.name, lang)}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-xl text-lg text-white/75">{tx(s.description, lang)}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`${href(lang, "/demo")}?solution=${s.slug}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-500"
              >
                {tx(ui.demo, lang)}
                <ArrowRight size={18} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link href={href(lang, "/pricing")} className="glass rounded-xl px-6 py-3.5 font-semibold text-white transition hover:bg-white/15">
                {tx(ui.seePricing, lang)}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-9 space-y-2 text-sm text-white/75">
              {s.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 size={16} className="shrink-0 text-brand-400" />{tx(f, lang)}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={40} className="relative pb-10 ps-0 sm:ps-6">
          <Tilt>
            <ProductMock slug={s.mock ?? s.slug} lang={lang} />
          </Tilt>
          {chips.map((c, i) => (
            <span key={i} className={`glass animate-float absolute hidden rounded-xl px-3.5 py-2 text-xs font-semibold text-white shadow-xl sm:block ${pos[i]}`} style={{ animationDelay: `${i * 1.4}s` }}>
              <i className="me-2 inline-block h-2 w-2 rounded-full bg-brand-400" />
              {tx(c, lang)}
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

/* ----------------------------------------------------------- marquee */

function FeatureMarquee({ s, lang }: { s: Solution; lang: Lang }) {
  const items = [...s.features, ...s.forWho];
  return (
    <section className="marquee relative overflow-hidden py-9" dir="ltr" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <div className="marquee-track gap-4" style={{ animationDuration: "46s" }}>
        {[...items, ...items, ...items, ...items].map((f, i) => (
          <span key={i} className="me-4 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white px-5 py-3 font-semibold shadow-sm" dir={lang === "ur" || lang === "ar" ? "rtl" : "ltr"}>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-600"><Icon name={s.icon} size={16} /></span>
            {tx(f, lang)}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------- before and after */

function ComparePanel({ story, lang }: { story: Story; lang: Lang }) {
  if (!story.before.length && !story.after.length) return null;
  return (
    <section className="container-x py-20">
      <SectionHead
        eyebrow={T(lang, "The difference", "فرق")}
        title={T(lang, "From the old way to a smoother one", "پرانے طریقے سے ایک آسان طریقے تک")}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal x={-30} y={0}>
          <div className="h-full rounded-3xl border border-line bg-mist p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{T(lang, "Without ePortal", "ای پورٹل کے بغیر")}</p>
            <ul className="mt-6 space-y-4">
              {story.before.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-100 text-red-600"><X size={12} /></span>{tx(b, lang)}
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
              {story.after.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white"><Check size={12} /></span>{tx(a, lang)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------- see it in action */

function SeeInAction({ s, lang }: { s: Solution; lang: Lang }) {
  return (
    <section className="relative overflow-hidden bg-mist py-24">
      <div className="bg-dots pointer-events-none absolute inset-0" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <Reveal x={-30} y={0}>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{T(lang, "See it in action", "عملی طور پر دیکھیں")}</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{T(lang, "A closer look at what it does", "یہ کیا کرتا ہے، قریب سے دیکھیں")}</h2>
          <ul className="mt-8 space-y-4">
            {s.features.map((f, i) => (
              <Reveal key={i} delay={i * 0.08} y={14}>
                <li>
                  <Spot className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-lg font-extrabold text-white`} dir="ltr">{i + 1}</span>
                    <span className="font-semibold">{tx(f, lang)}</span>
                  </Spot>
                </li>
              </Reveal>
            ))}
          </ul>
        </Reveal>
        <Reveal x={30} y={0} delay={0.1}>
          <ProductVisual s={s} lang={lang} />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ who it is for */

function WhoFor({ s, lang }: { s: Solution; lang: Lang }) {
  return (
    <section className="container-x py-24">
      <SectionHead eyebrow={T(lang, "Who it is for", "کس کے لیے")} title={T(lang, "Made for people like you", "آپ جیسے لوگوں کے لیے")} />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {s.forWho.map((w, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <Spot className="h-full rounded-2xl border border-line bg-white p-7 text-center">
              <span className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-lg`}><Icon name={s.icon} size={26} /></span>
              <p className="mt-5 text-lg font-bold">{tx(w, lang)}</p>
            </Spot>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- pricing */

function PricingNote({ s, lang }: { s: Solution; lang: Lang }) {
  return (
    <section className="container-x pb-8">
      <Reveal>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-line bg-white p-8 text-center shadow-xl shadow-black/5 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{T(lang, "Pricing", "قیمتیں")}</p>
          <h2 className="text-3xl font-extrabold">{T(lang, "Priced around what you need", "آپ کی ضرورت کے مطابق قیمت")}</h2>
          <p className="max-w-xl text-lg text-ink-soft">{T(lang, "Tell us about your needs and we will send a clear quote.", "اپنی ضرورت بتائیں، ہم واضح قیمت بھیجیں گے۔")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`${href(lang, "/demo")}?solution=${s.slug}`} className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
              {T(lang, "Get a quote", "قیمت حاصل کریں")}
            </Link>
            <Link href={href(lang, "/pricing")} className="rounded-xl border border-line px-6 py-3 font-semibold hover:border-brand-300">
              {tx(ui.seePricing, lang)}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------------- template */

const EMPTY_STORY: Story = { statement: { en: "", ur: "" }, before: [], after: [], faqs: [] };

/** One shared layout for every solution page (eSchool has its own longer page). Each section can be hidden from the dashboard. */
export function SolutionTemplate({ s, lang }: { s: Solution; lang: Lang }) {
  const story = s.story ?? EMPTY_STORY;
  const show = (key: string) => !s.hidden?.includes(key);
  const faqs = [...story.faqs, ...hubFaqs.slice(2, 4)];
  const statement = tx(story.statement, lang);

  return (
    <>
      <JsonLd data={solutionSchema(s, lang)} />
      <SolutionHero s={s} lang={lang} />
      {show("marquee") && <FeatureMarquee s={s} lang={lang} />}
      {show("statement") && statement && <EmotionalStatement lang={lang} text={statement} />}
      {show("compare") && <ComparePanel story={story} lang={lang} />}
      {show("action") && <SeeInAction s={s} lang={lang} />}
      {show("whoFor") && s.forWho.length > 0 && <WhoFor s={s} lang={lang} />}
      {show("steps") && <GettingStarted lang={lang} />}
      {show("pricing") && <PricingNote s={s} lang={lang} />}

      {show("faq") && faqs.length > 0 && (
        <section className="bg-mist py-24">
          <div className="container-x">
            <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Questions we often hear", "جو سوالات اکثر پوچھے جاتے ہیں")} />
            <div className="mt-10"><FaqList items={faqs} lang={lang} /></div>
          </div>
        </section>
      )}

      {show("others") && <ProductsShowcase lang={lang} exclude={s.slug} />}
      <CtaBand lang={lang} />
    </>
  );
}
