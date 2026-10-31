import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ExternalLink, Headset, Minus, Rocket, ShieldCheck } from "lucide-react";
import { Icon } from "@/components/Icon";
import { PricingTable } from "@/components/PricingTable";
import { CtaBand, FaqList, PageHero, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/motion";
import { faqs, hubFaqs, plans } from "@/lib/content";
import { getSolutions } from "@/lib/solutions-data";
import { href, isLang, T, tx, Tm } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: Tm(lang, "Pricing", "قیمتیں") };
}

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const solutions = await getSolutions();
  const school = solutions.find((s) => s.slug === "eschool") ?? solutions[0];
  const others = solutions.filter((s) => s.slug !== "eschool");

  // [feature, starter, growth, campus, enterprise]
  const rows: [string, boolean, boolean, boolean, boolean][] = [
    [T(lang, "Admission, attendance, fees, results", "داخلہ، حاضری، فیس، نتائج"), true, true, true, true],
    [T(lang, "Admin and teacher portals", "ایڈمن اور ٹیچر پورٹلز"), true, true, true, true],
    [T(lang, "Parent app", "پیرنٹ ایپ"), true, true, true, true],
    [T(lang, "Biometric attendance integration", "بائیو میٹرک حاضری انضمام"), false, true, true, true],
    [T(lang, "Online lectures and assignments", "آن لائن لیکچرز اور اسائنمنٹس"), false, true, true, true],
    [T(lang, "Transport and library modules", "ٹرانسپورٹ اور لائبریری ماڈیولز"), false, true, true, true],
    [T(lang, "AI parent assistant", "اے آئی پیرنٹ اسسٹنٹ"), false, true, true, true],
    [T(lang, "Payroll and HR", "پے رول اور ایچ آر"), false, false, true, true],
    [T(lang, "AI report card comments", "اے آئی رپورٹ کارڈ تبصرے"), false, false, true, true],
    [T(lang, "Early warning insights", "قبل از وقت انتباہ"), false, false, true, true],
    [T(lang, "Multi-campus HQ portal", "ملٹی کیمپس ہیڈ آفس پورٹل"), false, false, false, true],
    [T(lang, "Custom integrations", "حسب ضرورت انضمام"), false, false, false, true],
  ];

  const promises = [
    { icon: Rocket, t: T(lang, "Free setup", "مفت سیٹ اپ"), d: T(lang, "We import your data and configure everything.", "ہم آپ کا ڈیٹا منتقل کرتے اور سب کچھ ترتیب دیتے ہیں۔") },
    { icon: Headset, t: T(lang, "Real human support", "حقیقی انسانی سپورٹ"), d: T(lang, "Phone and WhatsApp, in Urdu or English.", "فون اور واٹس ایپ، اردو یا انگریزی میں۔") },
    { icon: ShieldCheck, t: T(lang, "No lock-in", "کوئی پابندی نہیں"), d: T(lang, "Export your data any time.", "اپنا ڈیٹا کسی بھی وقت ایکسپورٹ کریں۔") },
  ];

  return (
    <>
      <PageHero
        eyebrow={T(lang, "Pricing", "قیمتیں")}
        title={T(lang, "Clear pricing for every platform", "ہر پلیٹ فارم کے لیے واضح قیمتیں")}
        sub={T(lang, "SchoolDesk has published plans below. For our other platforms we quote based on your needs.", "اسکول ڈیسک کے پلانز نیچے شائع ہیں۔ دوسرے پلیٹ فارمز کی قیمت ہم آپ کی ضرورت کے مطابق بتاتے ہیں۔")}
      />

      <section className="container-x pt-16">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${school.accent} text-white`}><Icon name={school.icon} size={26} /></span>
              <div>
                <h2 className="text-2xl font-extrabold">SchoolDesk</h2>
                <p className="text-ink-soft">{T(lang, "Plans for schools and colleges. All prices in PKR.", "اسکولوں اور کالجوں کے پلانز۔ تمام قیمتیں پاکستانی روپے میں۔")}</p>
              </div>
            </div>
            <Link href={href(lang, "/solutions/eschool")} className="inline-flex items-center gap-1.5 font-semibold text-brand-600">
              {tx({ en: "About SchoolDesk", ur: "اسکول ڈیسک کے بارے میں" }, lang)}<ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>
        <PricingTable lang={lang} />
      </section>

      <section className="container-x pb-8 pt-12">
        <div className="grid gap-5 md:grid-cols-3">
          {promises.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div className="flex items-start gap-4 rounded-2xl bg-mist p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white"><p.icon size={22} /></span>
                <div><h3 className="font-bold">{p.t}</h3><p className="mt-1 text-sm text-ink-soft">{p.d}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHead eyebrow={T(lang, "Compare SchoolDesk plans", "اسکول ڈیسک پلانز کا موازنہ")} title={T(lang, "Every feature, side by side", "ہر خصوصیت، ساتھ ساتھ")} />
        <Reveal>
          <div className="mt-12 overflow-x-auto rounded-3xl border border-line bg-white shadow-sm">
            <table className="w-full min-w-[40rem] text-sm">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="p-4 text-start font-semibold">{T(lang, "Feature", "خصوصیت")}</th>
                  {plans.map((p) => <th key={p.key} className="p-4 text-center font-semibold">{tx(p.name, lang)}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-line even:bg-mist/60">
                    <td className="p-4 font-medium">{r[0]}</td>
                    {r.slice(1).map((v, k) => (
                      <td key={k} className="p-4 text-center">
                        {v ? <Check size={18} className="mx-auto text-brand-600" /> : <Minus size={18} className="mx-auto text-ink-soft/40" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHead
            eyebrow={T(lang, "Other platforms", "دوسرے پلیٹ فارمز")}
            title={T(lang, "Priced around what you need", "آپ کی ضرورت کے مطابق قیمت")}
            sub={T(lang, "Tell us about your needs and we will send a clear quote.", "اپنی ضرورت بتائیں، ہم واضح قیمت بھیجیں گے۔")}
          />
          <Reveal>
            <ul className="mx-auto mt-12 max-w-4xl divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              {others.map((s) => (
                <li key={s.slug} className="flex flex-wrap items-center gap-4 p-5">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white`}><Icon name={s.icon} size={22} /></span>
                  <span className="min-w-0 flex-1">
                    <b className="block text-lg">{tx(s.name, lang)}</b>
                    <span className="block text-sm text-ink-soft">{tx(s.tagline, lang)}</span>
                  </span>
                  <span className="text-sm font-bold text-brand-600">
                    {s.pricingOnSite ? T(lang, "Pricing on its website", "قیمت ان کی ویب سائٹ پر") : T(lang, "Custom quote", "حسب ضرورت قیمت")}
                  </span>
                  <span className="flex gap-2">
                    {s.pricingOnSite && s.url && (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2 text-sm font-semibold hover:border-brand-300">
                        {T(lang, "See pricing", "قیمتیں دیکھیں")}<ExternalLink size={14} />
                      </a>
                    )}
                    <Link href={`${href(lang, "/demo")}?solution=${s.slug}`} className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                      {T(lang, "Get a quote", "قیمت حاصل کریں")}
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Pricing questions", "قیمتوں کے بارے میں سوالات")} />
        <div className="mt-10"><FaqList items={[...hubFaqs.slice(4), ...faqs.slice(0, 3)]} lang={lang} /></div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
