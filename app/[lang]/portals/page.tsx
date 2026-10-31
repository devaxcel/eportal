import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Icon } from "@/components/Icon";
import { PortalVisual } from "@/components/PortalExplorer";
import { CtaBand, FaqList, PageHero, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/motion";
import { faqs, portals, ui } from "@/lib/content";
import { href, isLang, T, tx, Tm } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: Tm(lang, "Portals", "پورٹلز") };
}

export default async function PortalsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <PageHero
        eyebrow={T(lang, "SchoolDesk portals", "اسکول ڈیسک پورٹلز")}
        title={T(lang, "One system, a portal for every role", "ایک سسٹم، ہر کردار کے لیے پورٹل")}
        sub={T(lang, "Everyone sees exactly what they need, on web and mobile, in English or Urdu.", "ہر شخص وہی دیکھتا ہے جو اسے چاہیے، ویب اور موبائل پر، اردو یا انگریزی میں۔")}
      />

      <div className="container-x space-y-24 py-20">
        {portals.map((p, i) => (
          <div key={p.slug} className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal x={i % 2 ? 30 : -30} y={0} className={i % 2 ? "lg:order-2" : ""}>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-lg shadow-brand-600/25">
                <Icon name={p.icon} size={28} />
              </span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight">{tx(p.name, lang)}</h2>
              <p className="mt-2 text-lg text-ink-soft">{tx(p.tagline, lang)}</p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f, k) => (
                  <li key={k} className="flex items-start gap-2.5"><CheckCircle2 size={18} className="mt-1.5 shrink-0 text-brand-500" />{tx(f, lang)}</li>
                ))}
              </ul>
              <Link href={href(lang, `/portals/${p.slug}`)} className="group mt-7 inline-flex items-center gap-2 font-semibold text-brand-600">
                {tx(ui.learnMore, lang)}
                <ArrowRight size={16} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} x={i % 2 ? -30 : 30} y={0}>
              <div className="relative rounded-3xl bg-mist p-6 sm:p-10">
                <div className="bg-dots absolute inset-0 rounded-3xl" />
                <div className="relative"><PortalVisual slug={p.slug} lang={lang} /></div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Good to know", "جاننا ضروری")} />
          <div className="mt-10"><FaqList items={faqs.slice(0, 4)} lang={lang} /></div>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
