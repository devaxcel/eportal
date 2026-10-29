import { notFound } from "next/navigation";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { DemoForm } from "@/components/DemoForm";
import { FaqList, PageHero, SectionHead } from "@/components/Section";
import { Reveal, Spot } from "@/components/motion";
import { hubFaqs } from "@/lib/content";
import { isLang, T, tx } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: lang === "ur" ? "رابطہ" : "Contact" };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const items = [
    { icon: Phone, label: T(lang, "Phone", "فون"), value: site.phone, href: site.phoneHref, ltr: true },
    { icon: MessageCircle, label: "WhatsApp", value: T(lang, "Chat with us", "ہم سے بات کریں"), href: `https://wa.me/${site.whatsapp}` },
    { icon: Mail, label: T(lang, "Email", "ای میل"), value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: T(lang, "Office", "دفتر"), value: tx(site.address, lang) },
    { icon: Clock, label: T(lang, "Hours", "اوقات"), value: tx(site.hours, lang) },
  ];

  return (
    <>
      <PageHero
        eyebrow={T(lang, "Contact", "رابطہ")}
        title={T(lang, "We would love to hear from you", "ہم آپ سے سننا چاہتے ہیں")}
        sub={T(lang, "Questions, demos or support: reach us the way you prefer.", "سوالات، ڈیمو یا سپورٹ: اپنی پسند کے طریقے سے رابطہ کریں۔")}
      />

      <section className="container-x grid gap-10 py-20 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {items.map((i, k) => {
            const body = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><i.icon size={22} /></span>
                <span>
                  <span className="block text-sm text-ink-soft">{i.label}</span>
                  <span className="block font-semibold" dir={i.ltr ? "ltr" : undefined}>{i.value}</span>
                </span>
              </>
            );
            const cls = "flex items-center gap-4 rounded-2xl border border-line bg-white p-5";
            return (
              <Reveal key={i.label} delay={k * 0.06}>
                {i.href ? (
                  <Spot className={`${cls} transition hover:border-brand-300`}>
                    <a href={i.href} className="flex w-full items-center gap-4" {...(i.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{body}</a>
                  </Spot>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold">{T(lang, "Send us a message", "ہمیں پیغام بھیجیں")}</h2>
            <p className="mt-1 text-ink-soft">{T(lang, "Tell us about your institution and we will reply within one working day.", "اپنے ادارے کے بارے میں بتائیں، ہم ایک کاروباری دن میں جواب دیں گے۔")}</p>
          </div>
          <DemoForm lang={lang} />
        </Reveal>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Quick answers", "فوری جوابات")} />
          <div className="mt-10"><FaqList items={hubFaqs} lang={lang} /></div>
        </div>
      </section>
    </>
  );
}
