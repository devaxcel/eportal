import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Icon } from "@/components/Icon";
import { ProductVisual } from "@/components/ProductVisual";
import { CtaBand, FaqList, SectionHead } from "@/components/Section";
import { Reveal, Spot } from "@/components/motion";
import { faqs, solutions, ui } from "@/lib/content";
import { href, isLang, locales, T, tx } from "@/lib/i18n";

export const generateStaticParams = () =>
  locales.flatMap((lang) => solutions.filter((s) => s.slug !== "eschool").map((s) => ({ lang, slug: s.slug })));

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  return { title: s ? s.name[lang === "ur" ? "ur" : "en"] : "Solution" };
}

export default async function SolutionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!isLang(lang) || !s) notFound();

  const steps = [
    [T(lang, "Talk to us", "ہم سے بات کریں"), T(lang, "Tell us about your needs in a short call.", "مختصر کال میں اپنی ضروریات بتائیں۔")],
    [T(lang, "We set it up", "ہم سیٹ اپ کرتے ہیں"), T(lang, "Your account is configured and your data imported.", "آپ کا اکاؤنٹ ترتیب دیا جاتا ہے اور ڈیٹا منتقل ہوتا ہے۔")],
    [T(lang, "Go live", "لائیو ہوں"), T(lang, "Start using it right away, with our support beside you.", "ہماری مدد کے ساتھ فوراً استعمال شروع کریں۔")],
  ];

  return (
    <>
      <section className="bg-hero relative overflow-hidden text-white">
        <div className="bg-grid absolute inset-0" />
        <div className="container-x relative grid items-center gap-12 pb-24 pt-14 lg:grid-cols-2 lg:pb-28">
          <Reveal>
            <Link href={href(lang, "/solutions")} className="text-sm font-semibold text-brand-300 hover:underline">
              {T(lang, "← All solutions", "← تمام حل")}
            </Link>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">{tx(s.name, lang)}</h1>
            <p className="mt-2 text-xl font-medium text-brand-300">{tx(s.tagline, lang)}</p>
            <p className="mt-5 max-w-lg text-lg text-white/75">{tx(s.description, lang)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href(lang, "/demo")} className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-400">
                {tx(ui.demo, lang)}
                <ArrowRight size={18} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              {s.url && (
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition hover:bg-white/15">
                  {T(lang, "Visit website", "ویب سائٹ دیکھیں")}<ExternalLink size={16} />
                </a>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.15} y={30}><ProductVisual s={s} lang={lang} /></Reveal>
        </div>
        <svg className="absolute bottom-[-1px] left-0 w-full text-white" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
          <path fill="currentColor" d="M0,24 C300,0 600,40 900,20 C1100,8 1300,30 1440,12 L1440,40 L0,40 Z" />
        </svg>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "Key features", "اہم خصوصیات")} title={T(lang, "What you get", "آپ کو کیا ملتا ہے")} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.features.map((f, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <Spot className="h-full rounded-2xl border border-line bg-white p-6">
                <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white`}><Icon name={s.icon} size={22} /></span>
                <p className="mt-4 font-semibold">{tx(f, lang)}</p>
              </Spot>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "Who it is for", "کس کے لیے")} title={T(lang, "Made for people like you", "آپ جیسے لوگوں کے لیے")} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {s.forWho.map((w, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-7 text-center shadow-sm">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-lg font-extrabold text-brand-600" dir="ltr">{i + 1}</span>
                  <p className="mt-4 font-semibold">{tx(w, lang)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "Getting started", "آغاز")} title={T(lang, "Up and running in three steps", "تین مراحل میں شروع")} />
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <li className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-extrabold text-white shadow-lg shadow-brand-600/30">{i + 1}</span>
                <h3 className="mt-5 text-lg font-bold">{t}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-ink-soft">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "More from us", "ہماری مزید مصنوعات")} title={T(lang, "Explore other platforms", "دوسرے پلیٹ فارمز دیکھیں")} />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {solutions.filter((x) => x.slug !== s.slug).map((x) => (
              <Link key={x.slug} href={href(lang, `/solutions/${x.slug}`)} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
                <Icon name={x.icon} size={16} className="text-brand-600" />{tx(x.name, lang)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Questions we often hear", "جو سوالات اکثر پوچھے جاتے ہیں")} />
        <div className="mt-10"><FaqList items={faqs.slice(1, 5)} lang={lang} /></div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
