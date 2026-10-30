"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Bot, Car, CheckCircle2, Dumbbell, ExternalLink, Mail, School, ShoppingCart, Stethoscope, Workflow, type LucideIcon } from "lucide-react";
import { ProductMock } from "./productMocks";
import { solutions, ui } from "@/lib/content";
import { href, T, tx, type Lang } from "@/lib/i18n";

const icons: Record<string, LucideIcon> = { School, Dumbbell, Workflow, Mail, Stethoscope, Car, Bot, ShoppingCart };
const INTERVAL = 7000;

/** One-at-a-time showcase: pick a solution on the left, see it large on the right. */
export function SolutionShowcase({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const s = solutions[active];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % solutions.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <div className="grid gap-6 lg:grid-cols-[19rem_1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Selector */}
      <div role="tablist" aria-label={T(lang, "Solutions", "حل")} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
        {solutions.map((x, i) => {
          const Ic = icons[x.icon] ?? School;
          const on = i === active;
          return (
            <button
              key={x.slug}
              role="tab"
              aria-selected={on}
              onClick={() => { setActive(i); setPaused(true); }}
              className={`relative shrink-0 overflow-hidden rounded-2xl px-4 py-3 text-start transition lg:w-full ${on ? "bg-black text-white shadow-lg" : "hover:bg-mist"}`}
            >
              <span className="relative flex items-center gap-3">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${x.accent} text-white`}><Ic size={19} /></span>
                <span className="whitespace-nowrap lg:whitespace-normal">
                  <b className="block text-sm">{tx(x.name, lang)}</b>
                  <span className={`hidden text-xs lg:block ${on ? "text-white/65" : "text-ink-soft"}`}>{tx(x.tagline, lang)}</span>
                </span>
              </span>
              {on && !paused && (
                <motion.span key={`bar-${active}`} className="absolute bottom-0 start-0 h-0.5 bg-brand-400" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: INTERVAL / 1000, ease: "linear" }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Preview */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${s.accent} p-6 text-white shadow-2xl shadow-black/10 transition-colors duration-500 sm:p-8`}>
        <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div key={s.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="relative">
            <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr] xl:items-start">
              <div>
                <h3 className="text-3xl font-extrabold">{tx(s.name, lang)}</h3>
                <p className="mt-1 text-lg font-medium text-white/90">{tx(s.tagline, lang)}</p>
                <p className="mt-4 text-white/85">{tx(s.description, lang)}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.features.map((f, k) => (
                    <li key={k} className="flex items-start gap-2.5"><CheckCircle2 size={16} className="mt-1 shrink-0 text-white" />{tx(f, lang)}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={href(lang, `/solutions/${s.slug}`)} className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90">
                    {tx(ui.learnMore, lang)}
                    <ArrowRight size={16} className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                  {s.url && (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:bg-white/20">
                      {T(lang, "Visit site", "ویب سائٹ")}<ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              <div className="relative h-64 overflow-hidden rounded-t-2xl xl:h-80" dir="ltr" aria-hidden="true">
                <div className="absolute left-0 top-0 w-[165%]" style={{ transform: "scale(0.6)", transformOrigin: "top left" }}>
                  <ProductMock slug={s.slug} lang={lang} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
