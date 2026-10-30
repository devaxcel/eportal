import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "./Icon";
import { ui, type Solution } from "@/lib/content";
import { getSolutions } from "@/lib/solutions-data";
import { href, tx, type Lang } from "@/lib/i18n";

function Card({ s, lang, hidden }: { s: Solution; lang: Lang; hidden: boolean }) {
  return (
    <Link
      href={href(lang, `/solutions/${s.slug}`)}
      tabIndex={hidden ? -1 : undefined}
      className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:border-brand-300 hover:shadow-xl hover:shadow-black/10"
    >
      <div className={`relative h-28 overflow-hidden bg-gradient-to-br ${s.accent}`}>
        <div className="bg-grid absolute inset-0 opacity-50" />
        <Icon name={s.icon} size={130} strokeWidth={1} className="absolute -end-5 -top-6 text-white/20 transition duration-500 group-hover:rotate-6 group-hover:scale-110" />
        <span className="absolute bottom-3 start-4 grid h-11 w-11 place-items-center rounded-xl bg-white/20 text-white backdrop-blur">
          <Icon name={s.icon} size={22} />
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-extrabold leading-tight">{tx(s.name, lang)}</h3>
        <p className="mt-1 text-sm text-ink-soft">{tx(s.tagline, lang)}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          {tx(ui.learnMore, lang)}
          <ArrowRight size={15} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** One vertical slider column. Three copies of the cards scroll by exactly one copy, so the loop is seamless. */
function Column({ items, lang, down, seconds }: { items: Solution[]; lang: Lang; down: boolean; seconds: number }) {
  return (
    <div className="vslide h-[34rem]">
      <div className={`vslide-track ${down ? "down" : ""}`} style={{ ["--dur" as string]: `${seconds}s` }}>
        {[0, 1, 2].map((copy) => (
          <div key={copy} className={copy ? "vslide-dupe" : ""} aria-hidden={copy ? true : undefined}>
            {items.map((s) => (
              <div key={s.slug} className="pb-5">
                <Card s={s} lang={lang} hidden={copy > 0} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Solution cards as vertical sliders: neighbouring columns move in opposite directions. Pauses on hover. */
export async function SolutionColumns({ lang }: { lang: Lang }) {
  const solutions = await getSolutions();
  // Wide screens: 4 columns of 2. Smaller screens: 2 columns of 4.
  const four = [0, 1, 2, 3].map((c) => solutions.filter((_, i) => i % 4 === c)).filter((c) => c.length);
  const two = [0, 1].map((c) => solutions.filter((_, i) => i % 2 === c)).filter((c) => c.length);

  return (
    <>
      <div className="hidden gap-5 lg:grid lg:grid-cols-4" style={{ gridTemplateColumns: `repeat(${four.length}, minmax(0, 1fr))` }}>
        {four.map((items, c) => (
          <Column key={c} items={items} lang={lang} down={c % 2 === 1} seconds={32} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:hidden">
        {two.map((items, c) => (
          <Column key={c} items={items} lang={lang} down={c % 2 === 1} seconds={60} />
        ))}
      </div>
    </>
  );
}
