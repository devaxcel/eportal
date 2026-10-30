import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { GettingStarted } from "@/components/hub";
import { Icon } from "@/components/Icon";
import { CtaBand, PageHero, SectionHead } from "@/components/Section";
import { CountUp, Reveal, Spot } from "@/components/motion";
import { solutions } from "@/lib/content";
import { href, isLang, T, tx } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: lang === "ur" ? "ہمارے بارے میں" : "About" };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const values = [
    { icon: "Languages", t: T(lang, "Built for Pakistan", "پاکستان کے لیے"), d: T(lang, "Urdu and English, local fee systems, Pakistani school workflows.", "اردو اور انگریزی، مقامی فیس نظام، پاکستانی اسکولوں کا طریقہ کار۔") },
    { icon: "Handshake", t: T(lang, "Support you can reach", "قابل رسائی سپورٹ"), d: T(lang, "Talk to a real person on phone or WhatsApp.", "فون یا واٹس ایپ پر حقیقی انسان سے بات کریں۔") },
    { icon: "Sparkles", t: T(lang, "Practical AI", "عملی اے آئی"), d: T(lang, "AI that saves time on daily tasks, with staff always in control.", "اے آئی جو روزمرہ کاموں میں وقت بچائے، عملہ ہمیشہ کنٹرول میں۔") },
    { icon: "ShieldCheck", t: T(lang, "Your data stays yours", "آپ کا ڈیٹا آپ کا"), d: T(lang, "Role-based access, backups and the freedom to export any time.", "کردار پر مبنی رسائی، بیک اپ اور کسی بھی وقت ایکسپورٹ کی آزادی۔") },
  ];

  const nums = [
    { v: 6, s: "", l: T(lang, "Platforms", "پلیٹ فارمز") },
    { v: 15, s: "+", l: T(lang, "eSchool modules", "ای اسکول ماڈیولز") },
    { v: 5, s: "+", l: T(lang, "Years building", "سال کا تجربہ") },
    { v: 2, s: "", l: T(lang, "Languages", "زبانیں") },
  ];

  return (
    <>
      <PageHero
        eyebrow={T(lang, "About us", "ہمارے بارے میں")}
        title={T(lang, "Building platforms that make everyday services simpler", "ایسے پلیٹ فارمز بنانا جو روزمرہ خدمات کو آسان بنائیں")}
        sub={T(lang, `${site.name} is developed by ${site.company} in Lahore. For over five years we have helped people replace paperwork and guesswork with software they actually enjoy using.`, `${site.name} کو لاہور میں ${site.company} نے تیار کیا ہے۔ پانچ سال سے زائد عرصے سے ہم اداروں کو کاغذی رجسٹرز کی جگہ ایسا سافٹ ویئر دے رہے ہیں جو عملہ خوشی سے استعمال کرتا ہے۔`)}
      />

      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal x={-30} y={0}>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{T(lang, "Our story", "ہماری کہانی")}</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{T(lang, "Software should fit the way you already work", "سافٹ ویئر کو آپ کے کام کے طریقے کے مطابق ہونا چاہیے")}</h2>
          <div className="mt-5 space-y-4 text-lg text-ink-soft">
            <p>{T(lang, "We began with schools, listening to principals, cashiers and teachers who were drowning in registers and spreadsheets. They did not need more features. They needed less work.", "ہم نے ان پرنسپلز، کیشیئرز اور اساتذہ کی بات سنی جو رجسٹرز اور اسپریڈ شیٹس میں دبے ہوئے تھے۔ انہیں مزید خصوصیات نہیں، کم کام چاہیے تھا۔")}</p>
            <p>{T(lang, "So we built eSchool around real days in a real school. Today the same approach powers Formed, PRIMA Portal, Email Report Portal, ProEd Medical and HayRoutes: start with the real workflow, keep it simple.", "اس لیے ہم نے ای پورٹل حقیقی اسکول کے حقیقی دنوں کے گرد بنایا: حاضری لگائیں، فیس وصول کریں، نتائج بھیجیں، والدین کو جواب دیں۔ آج یہی طریقہ ہمارے دوسرے پلیٹ فارمز میں بھی ہے۔")}</p>
          </div>
        </Reveal>
        <Reveal x={30} y={0} delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            {nums.map((n) => (
              <div key={n.l} className="rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 p-7 text-center text-white shadow-xl shadow-navy-900/20">
                <CountUp value={n.v} suffix={n.s} className="text-gradient block text-5xl font-extrabold" />
                <p className="mt-2 text-sm text-white/70">{n.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "What we stand for", "ہمارا اصول")} title={T(lang, "Principles behind every product", "ہر مصنوعے کے پیچھے اصول")} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.07}>
                <Spot className="h-full rounded-2xl border border-line bg-white p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon name={v.icon} size={24} /></span>
                  <h3 className="mt-4 font-bold">{v.t}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{v.d}</p>
                </Spot>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GettingStarted lang={lang} />

      <section className="container-x pb-8">
        <SectionHead eyebrow={T(lang, "Our platforms", "ہمارے پلیٹ فارمز")} title={T(lang, "What we have built", "ہم نے کیا بنایا")} />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {solutions.map((s) => (
            <Link key={s.slug} href={href(lang, `/solutions/${s.slug}`)} className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3 font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
              <span className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${s.accent} text-white`}><Icon name={s.icon} size={15} /></span>
              {tx(s.name, lang)}
              <ArrowRight size={15} className="text-ink-soft transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
