import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProductVisual } from "@/components/ProductVisual";
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
        title={T(lang, "Platforms that connect people to the services they need", "ایسے پلیٹ فارمز جو لوگوں کو مطلوبہ خدمات سے جوڑتے ہیں")}
        sub={T(lang, "From running a school to hiring a trainer, each product is built around real workflows.", "اسکول چلانے سے لے کر ٹرینر ہائر کرنے تک، ہر مصنوعہ حقیقی طریقہ کار پر بنایا گیا ہے۔")}
      />

      <div className="container-x space-y-28 py-20">
        {solutions.map((s, i) => (
          <div key={s.slug} className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal x={i % 2 ? 30 : -30} y={0} className={i % 2 ? "lg:order-2" : ""}>
              <ProductVisual s={s} lang={lang} />
            </Reveal>
            <Reveal delay={0.1} x={i % 2 ? -30 : 30} y={0}>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${s.status === "live" ? "bg-brand-100 text-brand-700" : "bg-amber-100 text-amber-800"}`}>
                {tx(s.status === "live" ? ui.liveBadge : ui.newBadge, lang)}
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight">{tx(s.name, lang)}</h2>
              <p className="mt-1 text-lg font-medium text-brand-600">{tx(s.tagline, lang)}</p>
              <p className="mt-4 text-lg text-ink-soft">{tx(s.description, lang)}</p>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-soft">{T(lang, "Built for", "کس کے لیے")}</h3>
              <ul className="mt-3 space-y-2">
                {s.forWho.map((w, k) => (
                  <li key={k} className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />{tx(w, lang)}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={href(lang, `/solutions/${s.slug}`)} className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">
                  {tx(ui.learnMore, lang)}<ArrowRight size={16} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
                {s.url && (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-2.5 font-semibold hover:border-brand-300">
                    {T(lang, "Visit website", "ویب سائٹ دیکھیں")}<ExternalLink size={15} />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      <section className="bg-mist py-24">
        <div className="container-x">
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
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
