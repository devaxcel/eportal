import { notFound } from "next/navigation";
import { AIChat } from "@/components/AIChat";
import { Icon } from "@/components/Icon";
import { CtaBand, FaqList, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/motion";
import { ChildJourney, DayInSchool, EmotionalStatement, MomentsStream, PromiseLetter, TimeBack } from "@/components/heart";
import {
  AppsShowcase, Bento, BeforeAfter, HomeHero, HowItWorks, ModuleMarquee, PortalsSection, PricingTeaser,
  ProductsShowcase, SmsStory,
} from "@/components/home";
import { aiFeatures, faqs } from "@/lib/content";
import { isLang, T, tx, Tm } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: Tm(lang, "eSchool: School Management System", "ای اسکول") };
}

export default async function ESchoolPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <HomeHero lang={lang} />
      <ModuleMarquee lang={lang} />
      <EmotionalStatement lang={lang} variant="school" />
      <BeforeAfter lang={lang} />
      <Bento lang={lang} />
      <MomentsStream lang={lang} />
      <PortalsSection lang={lang} />
      <DayInSchool lang={lang} />
      <ChildJourney lang={lang} />
      <AppsShowcase lang={lang} />

      {/* AI */}
      <section id="ai" className="bg-hero relative scroll-mt-16 overflow-hidden py-24 text-white">
        <div className="bg-grid absolute inset-0" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead
              light
              center={false}
              eyebrow={T(lang, "Built-in AI", "اے آئی شامل")}
              title={T(lang, "AI that handles the repetitive work", "اے آئی جو دہرائے جانے والے کام سنبھالتا ہے")}
              sub={T(lang, "Your staff stay in control. AI drafts, answers and flags, using only your school's own data.", "عملہ کنٹرول میں رہتا ہے۔ اے آئی صرف آپ کے اسکول کے ڈیٹا سے مسودہ بناتا، جواب دیتا اور نشاندہی کرتا ہے۔")}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {aiFeatures.map((f, i) => (
                <Reveal key={f.title.en} delay={i * 0.08}>
                  <div className="glass h-full rounded-2xl p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-500/20 text-brand-300">
                      <Icon name={f.icon} size={20} />
                    </span>
                    <h3 className="mt-3 font-semibold">{tx(f.title, lang)}</h3>
                    <p className="mt-1 text-sm text-white/65">{tx(f.desc, lang)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1} x={30} y={0}>
            <AIChat lang={lang} />
          </Reveal>
        </div>
      </section>

      <SmsStory lang={lang} />
      <TimeBack lang={lang} />
      <HowItWorks lang={lang} />
      <PricingTeaser lang={lang} />
      <PromiseLetter lang={lang} />

      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Questions schools ask us", "اسکول ہم سے کیا پوچھتے ہیں")} />
          <div className="mt-10"><FaqList items={faqs} lang={lang} /></div>
        </div>
      </section>

      <ProductsShowcase lang={lang} />
      <CtaBand lang={lang} />
    </>
  );
}
