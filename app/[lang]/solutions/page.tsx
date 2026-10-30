import { notFound } from "next/navigation";
import { SolutionCategories } from "@/components/SolutionCategories";
import { CtaBand, PageHero, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/motion";
import { isLang, T } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: lang === "ur" ? "حل" : "Solutions" };
}

export default async function SolutionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <PageHero
        eyebrow={T(lang, "Solutions", "حل")}
        title={T(lang, "All ePortal solutions in one place", "ای پورٹل کے تمام حل ایک جگہ")}
        sub={T(lang, "From running a school to hiring a trainer, selling in a shop or automating reports, each platform is built around a real workflow.", "اسکول چلانے سے لے کر ٹرینر ہائر کرنے، دکان چلانے یا رپورٹس خودکار بنانے تک، ہر پلیٹ فارم حقیقی طریقہ کار پر بنایا گیا ہے۔")}
      />

      <section className="container-x py-16">
        <SolutionCategories lang={lang} detailed />
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "Our approach", "ہمارا طریقہ")} title={T(lang, "Built the same way, every time", "ہر بار ایک ہی معیار سے")} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            [T(lang, "Start with the workflow", "طریقہ کار سے آغاز"), T(lang, "We study how the work really happens before writing a line of code.", "کوڈ لکھنے سے پہلے ہم دیکھتے ہیں کہ کام حقیقت میں کیسے ہوتا ہے۔")],
            [T(lang, "Simple for everyone", "سب کے لیے آسان"), T(lang, "Clear screens that staff, parents and customers can use without training.", "واضح اسکرینیں جو عملہ، والدین اور صارفین بغیر تربیت استعمال کر سکیں۔")],
            [T(lang, "AI where it helps", "اے آئی جہاں مفید ہو"), T(lang, "Practical AI features that save time, never replacing human judgement.", "عملی اے آئی خصوصیات جو وقت بچائیں، انسانی فیصلے کی جگہ نہ لیں۔")],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-line bg-white p-7">
                <span className="text-4xl font-extrabold text-brand-200" dir="ltr">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-ink-soft">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
