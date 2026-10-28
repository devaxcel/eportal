import { notFound } from "next/navigation";
import { Clock, ShieldCheck, Sparkles } from "lucide-react";
import { DemoForm } from "@/components/DemoForm";
import { CtaBand, FaqList, PageHero, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/motion";
import { AdminDashboardMock, BrowserFrame } from "@/components/visuals";
import { faqs } from "@/lib/content";
import { isLang, T } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: lang === "ur" ? "ڈیمو حاصل کریں" : "Request a Demo" };
}

export default async function DemoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const perks = [
    { icon: Clock, t: T(lang, "30 minutes, no commitment", "30 منٹ، کوئی پابندی نہیں") },
    { icon: Sparkles, t: T(lang, "Shown with your own school's workflow", "آپ کے اپنے اسکول کے طریقہ کار کے ساتھ") },
    { icon: ShieldCheck, t: T(lang, "Free data import quote", "ڈیٹا امپورٹ کا مفت تخمینہ") },
  ];
  const expect = [
    [T(lang, "We learn about your school", "ہم آپ کے اسکول کو سمجھتے ہیں"), T(lang, "Size, branches, and what takes the most time today.", "سائز، برانچیں، اور آج سب سے زیادہ وقت کس میں لگتا ہے۔")],
    [T(lang, "Live walkthrough", "لائیو دورہ"), T(lang, "Admin, teacher and parent views, with an AI assistant demo.", "ایڈمن، ٹیچر اور پیرنٹ ویو، اے آئی اسسٹنٹ کے مظاہرے کے ساتھ۔")],
    [T(lang, "A clear plan and price", "واضح منصوبہ اور قیمت"), T(lang, "You get a setup timeline and a quote you can share with your board.", "آپ کو سیٹ اپ کا وقت اور ایسا تخمینہ ملتا ہے جو بورڈ کو دکھا سکیں۔")],
  ];

  return (
    <>
      <PageHero
        eyebrow={T(lang, "Demo", "ڈیمو")}
        title={T(lang, "Request a demo", "ڈیمو کی درخواست کریں")}
        sub={T(lang, "Tell us about your school and we will contact you within one working day.", "اپنے اسکول کے بارے میں بتائیں، ہم ایک کاروباری دن میں رابطہ کریں گے۔")}
      />

      <section className="container-x grid gap-12 py-20 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            {perks.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <li className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700"><p.icon size={20} /></span>
                  <span className="font-semibold">{p.t}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <div className="mt-10 hidden lg:block">
              <BrowserFrame><AdminDashboardMock lang={lang} /></BrowserFrame>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-3"><DemoForm lang={lang} /></Reveal>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "What to expect", "کیا توقع رکھیں")} title={T(lang, "A demo that respects your time", "ایسا ڈیمو جو آپ کے وقت کا احترام کرے")} />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {expect.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <li className="h-full rounded-2xl bg-white p-7 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-extrabold text-white" dir="ltr">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold">{t}</h3>
                  <p className="mt-2 text-ink-soft">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Before you book", "بک کرنے سے پہلے")} />
        <div className="mt-10"><FaqList items={faqs.slice(0, 4)} lang={lang} /></div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
