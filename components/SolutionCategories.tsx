import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "./Icon";
import { Reveal } from "./motion";
import { categories, solutions } from "@/lib/content";
import { href, T, tx, type Lang } from "@/lib/i18n";

/** Solutions grouped by category: a quiet, text-first layout with one row per group. */
export function SolutionCategories({ lang, detailed = false }: { lang: Lang; detailed?: boolean }) {
  return (
    <div className="border-b border-line">
      {categories.map((c, ci) => {
        const items = solutions.filter((s) => s.category === c.key);
        return (
          <Reveal key={c.key} delay={0.05}>
            <div className="grid gap-6 border-t border-line py-9 lg:grid-cols-[16rem_1fr] lg:gap-10">
              <div>
                <span className="text-sm font-bold text-brand-600" dir="ltr">0{ci + 1}</span>
                <h3 className="mt-1 text-2xl font-extrabold">{tx(c.title, lang)}</h3>
                <p className="mt-2 text-sm text-ink-soft">{tx(c.caption, lang)}</p>
              </div>

              <div className={`grid gap-4 ${items.length > 1 ? "sm:grid-cols-2" : ""} ${items.length === 3 ? "xl:grid-cols-3" : ""}`}>
                {items.map((s) => (
                  <Link
                    key={s.slug}
                    href={href(lang, `/solutions/${s.slug}`)}
                    className="group flex flex-col rounded-2xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-xl hover:shadow-black/5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition duration-300 group-hover:bg-brand-600 group-hover:text-white">
                        <Icon name={s.icon} size={22} />
                      </span>
                      <ArrowUpRight size={20} className="text-line transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-600 rtl:-scale-x-100" />
                    </div>
                    <h4 className="mt-4 text-lg font-extrabold text-black">{tx(s.name, lang)}</h4>
                    <p className="mt-0.5 text-sm font-medium text-brand-600">{tx(s.tagline, lang)}</p>
                    {detailed && <p className="mt-3 text-sm text-ink-soft">{tx(s.description, lang)}</p>}
                    {detailed && (
                      <p className="mt-3 text-xs text-ink-soft">
                        <b className="text-black">{T(lang, "Best for: ", "موزوں برائے: ")}</b>{tx(s.forWho[0], lang)}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function SeeAllLink({ lang, label }: { lang: Lang; label: string }) {
  return (
    <Link href={href(lang, "/solutions")} className="group inline-flex items-center gap-2 font-semibold text-brand-600">
      {label}
      <ArrowRight size={16} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}
