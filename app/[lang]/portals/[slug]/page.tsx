import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/Icon";
import { PortalVisual } from "@/components/PortalExplorer";
import { CtaBand, FaqList, SectionHead } from "@/components/Section";
import { Reveal, Spot } from "@/components/motion";
import { faqs, portals, ui } from "@/lib/content";
import { href, isLang, locales, T, tx } from "@/lib/i18n";

export const generateStaticParams = () =>
  locales.flatMap((lang) => portals.map((p) => ({ lang, slug: p.slug })));

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const p = portals.find((x) => x.slug === slug);
  return { title: p ? p.name[lang === "ur" ? "ur" : "en"] : "Portal" };
}

export default async function PortalPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const p = portals.find((x) => x.slug === slug);
  if (!isLang(lang) || !p) notFound();

  return (
    <>
      <section className="bg-hero relative overflow-hidden text-white">
        <div className="bg-grid absolute inset-0" />
        <div className="container-x relative grid items-center gap-12 pb-24 pt-14 lg:grid-cols-2 lg:pb-28">
          <Reveal>
            <Link href={href(lang, "/portals")} className="text-sm font-semibold text-brand-300 hover:underline">
              {T(lang, "← All portals", "← تمام پورٹلز")}
            </Link>
            <span className="mt-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-lg shadow-brand-600/30">
              <Icon name={p.icon} size={32} />
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">{tx(p.name, lang)}</h1>
            <p className="mt-4 max-w-lg text-lg text-white/75">{tx(p.tagline, lang)}</p>
            <Link href={href(lang, "/demo")} className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-400">
              {tx(ui.demo, lang)}
              <ArrowRight size={18} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </Reveal>
          <Reveal delay={0.15} y={30}><PortalVisual slug={p.slug} lang={lang} /></Reveal>
        </div>
        <svg className="absolute bottom-[-1px] left-0 w-full text-white" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
          <path fill="currentColor" d="M0,24 C300,0 600,40 900,20 C1100,8 1300,30 1440,12 L1440,40 L0,40 Z" />
        </svg>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "Capabilities", "صلاحیتیں")} title={T(lang, "What you can do", "آپ کیا کر سکتے ہیں")} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <Spot className="h-full rounded-2xl border border-line bg-white p-6">
                <span className="text-4xl font-extrabold text-brand-200" dir="ltr">0{i + 1}</span>
                <p className="mt-3 text-lg font-semibold">{tx(f, lang)}</p>
              </Spot>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "Works together", "مل کر کام کرتے ہیں")} title={T(lang, "Part of one connected system", "ایک مربوط سسٹم کا حصہ")} sub={T(lang, "Everything entered in one portal appears instantly in the others.", "ایک پورٹل میں درج معلومات فوری طور پر دوسروں میں نظر آتی ہیں۔")} />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {portals.filter((x) => x.slug !== p.slug).map((x) => (
              <Link key={x.slug} href={href(lang, `/portals/${x.slug}`)} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
                <Icon name={x.icon} size={16} className="text-brand-600" />
                {tx(x.name, lang)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Questions about this portal", "اس پورٹل کے بارے میں سوالات")} />
        <div className="mt-10"><FaqList items={faqs.slice(0, 3)} lang={lang} /></div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
