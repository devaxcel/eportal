import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/Icon";
import { SolutionShowcase } from "@/components/SolutionShowcase";
import { CtaBand, PageHero, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/motion";
import { solutions, ui } from "@/lib/content";
import { href, isLang, T, tx } from "@/lib/i18n";

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
        <SolutionShowcase lang={lang} />
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "At a glance", "ایک نظر میں")} title={T(lang, "Which one is right for you?", "آپ کے لیے کون سا درست ہے؟")} />
          <Reveal>
            <ul className="mx-auto mt-10 max-w-4xl divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link href={href(lang, `/solutions/${s.slug}`)} className="group flex items-center gap-4 p-5 transition hover:bg-brand-50/50">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white`}><Icon name={s.icon} size={22} /></span>
                    <span className="min-w-0 flex-1">
                      <b className="block text-lg">{tx(s.name, lang)}</b>
                      <span className="block text-sm text-ink-soft">{tx(s.tagline, lang)}</span>
                    </span>
                    <span className="hidden max-w-[16rem] text-sm text-ink-soft md:block">
                      <span className="font-semibold text-black">{T(lang, "Best for: ", "موزوں برائے: ")}</span>{tx(s.forWho[0], lang)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      <span className="hidden sm:inline">{tx(ui.learnMore, lang)}</span>
                      <ArrowRight size={16} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
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
