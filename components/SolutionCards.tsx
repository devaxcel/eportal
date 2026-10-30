import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "./Icon";
import { ProductMock } from "./productMocks";
import { Reveal, Spot } from "./motion";
import { solutions, ui } from "@/lib/content";
import { href, tx, type Lang } from "@/lib/i18n";

/** Compact solution cards: dashboard thumbnail, name, one-line tagline. Four across on desktop. */
export function SolutionCards({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {solutions.map((s, i) => (
        <Reveal key={s.slug} delay={(i % 4) * 0.07}>
          <Link href={href(lang, `/solutions/${s.slug}`)} className="group block h-full">
            <Spot className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-black/5">
              <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${s.accent}`} dir="ltr" aria-hidden="true">
                <div className="bg-grid absolute inset-0 opacity-50" />
                <div className="absolute left-4 top-5 w-[190%] transition duration-500 group-hover:-translate-y-1.5" style={{ transform: "scale(0.5)", transformOrigin: "top left" }}>
                  <ProductMock slug={s.slug} lang={lang} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2.5">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${s.accent} text-white`}><Icon name={s.icon} size={18} /></span>
                  <h3 className="text-lg font-extrabold leading-tight">{tx(s.name, lang)}</h3>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{tx(s.tagline, lang)}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-600">
                  {tx(ui.learnMore, lang)}
                  <ArrowRight size={15} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
              </div>
            </Spot>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
