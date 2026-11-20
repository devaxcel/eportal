import { ArrowRight, MessageCircle } from "lucide-react";
import { DemoForm } from "./DemoForm";
import { Icon } from "./Icon";
import { JsonLd } from "./JsonLd";
import { Check, FaqList, PageHero, SectionHead } from "./Section";
import { Reveal } from "./motion";
import { T, tx, type Lang } from "@/lib/i18n";
import { serviceGraph } from "@/lib/seo";
import type { Service } from "@/lib/services";
import { site } from "@/lib/site";

/** Landing page for a made-to-order service: hero, benefits, what is included, steps, request form and FAQ. */
export function ServicePage({ s, lang }: { s: Service; lang: Lang }) {
  return (
    <>
      <JsonLd data={serviceGraph(s, lang)} />
      <PageHero eyebrow={tx(s.eyebrow, lang)} title={tx(s.title, lang)} sub={tx(s.sub, lang)}>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#request" className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-400">
            {T(lang, "Start your request", "اپنی درخواست شروع کریں")}
            <ArrowRight size={18} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </a>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition hover:bg-white/15">
            <MessageCircle size={18} /> {T(lang, "Chat on WhatsApp", "واٹس ایپ پر بات کریں")}
          </a>
        </div>
      </PageHero>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "Why ePortal", "ای پورٹل کیوں")} title={T(lang, "Built properly, delivered clearly", "درست طریقے سے تیار، واضح انداز میں فراہم")} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.benefits.map((b, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-2xl border border-line bg-white p-6 transition hover:border-brand-300 hover:shadow-lg hover:shadow-brand-600/5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon name={s.icon} size={22} /></span>
                <h3 className="mt-4 text-lg font-bold">{tx(b.title, lang)}</h3>
                <p className="mt-2 text-ink-soft">{tx(b.text, lang)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight">{T(lang, "What you get", "آپ کو کیا ملتا ہے")}</h2>
            <ul className="mt-6 space-y-3">{s.included.map((x, i) => <Check key={i}>{tx(x, lang)}</Check>)}</ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl font-extrabold tracking-tight">{T(lang, "Who it is for", "یہ کس کے لیے ہے")}</h2>
            <ul className="mt-6 space-y-3">{s.forWho.map((x, i) => <Check key={i}>{tx(x, lang)}</Check>)}</ul>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "How it works", "یہ کیسے کام کرتا ہے")} title={T(lang, "From idea to launch in five steps", "خیال سے لانچ تک پانچ مراحل")} />
        <ol className="mx-auto mt-12 max-w-3xl space-y-5">
          {s.steps.map((st, i) => (
            <Reveal key={i} delay={i * 0.05} y={16}>
              <li className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-bold">{tx(st.title, lang)}</h3>
                  <p className="mt-1 text-ink-soft">{tx(st.text, lang)}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="request" className="scroll-mt-20 bg-mist py-20">
        <div className="container-x mx-auto max-w-3xl">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">{tx(s.formTitle, lang)}</h2>
            <p className="mt-2 text-ink-soft">{tx(s.formSub, lang)}</p>
          </div>
          <DemoForm lang={lang} topic={s.slug} />
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={T(lang, "FAQ", "اکثر پوچھے گئے سوالات")} title={T(lang, "Questions we are often asked", "اکثر پوچھے جانے والے سوالات")} />
        <div className="mt-10"><FaqList items={s.faqs} lang={lang} /></div>
      </section>
    </>
  );
}
