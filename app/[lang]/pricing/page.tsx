import { notFound } from "next/navigation";
import { Check, Minus, ShieldCheck, Headset, Rocket } from "lucide-react";
import { Icon } from "@/components/Icon";
import { PricingTable } from "@/components/PricingTable";
import { CtaBand, FaqList, PageHero, SectionHead } from "@/components/Section";
import { Reveal, Spot } from "@/components/motion";
import { faqs, plans } from "@/lib/content";
import { isLang, T, tx } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: lang === "ur" ? "قیمتیں" : "Pricing" };
}

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

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

  const addons = [
    ["MessageSquareText", T(lang, "SMS packs", "ایس ایم ایس پیکجز"), T(lang, "Extra SMS credits when you send more than your plan includes.", "جب آپ پلان سے زیادہ بھیجیں تو اضافی ایس ایم ایس کریڈٹ۔")],
    ["Fingerprint", T(lang, "Biometric setup", "بائیو میٹرک سیٹ اپ"), T(lang, "We connect your fingerprint devices to attendance.", "ہم آپ کی فنگر پرنٹ ڈیوائسز کو حاضری سے جوڑتے ہیں۔")],
    ["Network", T(lang, "Extra campus", "اضافی کیمپس"), T(lang, "Add another branch to your existing account.", "اپنے موجودہ اکاؤنٹ میں نئی برانچ شامل کریں۔")],
    ["GraduationCap", T(lang, "On-site training", "آن سائٹ تربیت"), T(lang, "In-person training for your whole team.", "آپ کی پوری ٹیم کے لیے براہ راست تربیت۔")],
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
        title={T(lang, "Simple pricing that grows with your school", "سادہ قیمتیں جو آپ کے اسکول کے ساتھ بڑھتی ہیں")}
        sub={T(lang, "All prices in PKR. Setup, data import and training are included.", "تمام قیمتیں پاکستانی روپے میں۔ سیٹ اپ، ڈیٹا امپورٹ اور تربیت شامل ہے۔")}
      />

      <section className="container-x py-16"><PricingTable lang={lang} /></section>

      <section className="container-x pb-8">
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

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "Compare plans", "پلانز کا موازنہ")} title={T(lang, "Every feature, side by side", "ہر خصوصیت، ساتھ ساتھ")} />
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
          <SectionHead eyebrow={T(lang, "Add-ons", "اضافی خدمات")} title={T(lang, "Extras when you need them", "ضرورت پڑنے پر اضافی خدمات")} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {addons.map(([ic, t, d], i) => (
              <Reveal key={t} delay={i * 0.07}>
                <Spot className="h-full rounded-2xl border border-line bg-white p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon name={ic} size={22} /></span>
                  <h3 className="mt-4 font-bold">{t}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{d}</p>
                </Spot>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Pricing questions", "قیمتوں کے بارے میں سوالات")} />
        <div className="mt-10"><FaqList items={faqs} lang={lang} /></div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
