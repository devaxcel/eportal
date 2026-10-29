import { notFound } from "next/navigation";
import { CtaBand, FaqList, SectionHead } from "@/components/Section";
import { EmotionalStatement } from "@/components/heart";
import { GettingStarted, HubHero, SolutionsGrid, WhyEportal } from "@/components/hub";
import { hubFaqs } from "@/lib/content";
import { isLang, T } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <HubHero lang={lang} />
      <SolutionsGrid lang={lang} />
      <EmotionalStatement lang={lang} />
      <WhyEportal lang={lang} />
      <GettingStarted lang={lang} />

      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Questions we often hear", "جو سوالات اکثر پوچھے جاتے ہیں")} />
          <div className="mt-10"><FaqList items={hubFaqs} lang={lang} /></div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
