"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bot, ChevronDown, Car, Dumbbell, Mail, Menu, School, ShoppingCart, Stethoscope, Workflow, X, type LucideIcon } from "lucide-react";
import { Logo } from "./Logo";
import { nav, solutions, ui } from "@/lib/content";
import { href, T, tx, type Lang } from "@/lib/i18n";

const icons: Record<string, LucideIcon> = { School, Dumbbell, Workflow, Mail, Stethoscope, Car, Bot, ShoppingCart };

export function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;
  const other: Lang = lang === "en" ? "ur" : "en";
  const switchHref = pathname.replace(/^\/(en|ur)/, `/${other}`) || `/${other}`;
  const link = "rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-mist hover:text-black";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href={href(lang)} aria-label="ePortal home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) =>
            n.key === "solutions" ? (
              <div key={n.key} className="group relative">
                <Link href={href(lang, n.path)} className={`${link} inline-flex items-center gap-1`}>
                  {tx(n.label, lang)}
                  <ChevronDown size={14} className="transition group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>
                <div className="invisible absolute start-0 top-full w-[26rem] translate-y-2 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-2xl border border-line bg-white p-2 shadow-2xl shadow-black/10">
                    {solutions.map((s) => {
                      const Ic = icons[s.icon] ?? School;
                      return (
                        <Link key={s.slug} href={href(lang, `/solutions/${s.slug}`)} className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-mist">
                          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white`}><Ic size={19} /></span>
                          <span>
                            <b className="block text-sm text-black">{tx(s.name, lang)}</b>
                            <span className="text-xs text-ink-soft">{tx(s.tagline, lang)}</span>
                          </span>
                        </Link>
                      );
                    })}
                    <Link href={href(lang, "/solutions")} className="mt-1 block rounded-xl bg-brand-50 p-3 text-center text-sm font-semibold text-brand-700 hover:bg-brand-100">
                      {tx(ui.exploreSolutions, lang)}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={n.key} href={href(lang, n.path)} className={link}>
                {tx(n.label, lang)}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            hrefLang={other}
            className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-ink-soft transition hover:border-brand-300 hover:text-brand-700"
          >
            {tx(ui.language, lang)}
          </Link>
          <Link
            href={href(lang, "/demo")}
            className="hidden rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:inline-block"
          >
            {tx(ui.demo, lang)}
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-line bg-white lg:hidden">
          <nav className="container-x flex flex-col py-3" aria-label="Mobile">
            <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">{T(lang, "Solutions", "حل")}</p>
            {solutions.map((s) => {
              const Ic = icons[s.icon] ?? School;
              return (
                <Link key={s.slug} href={href(lang, `/solutions/${s.slug}`)} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-mist">
                  <span className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${s.accent} text-white`}><Ic size={16} /></span>
                  <span className="font-medium">{tx(s.name, lang)}</span>
                </Link>
              );
            })}
            <div className="my-2 h-px bg-line" />
            {nav.filter((n) => n.key !== "solutions").map((n) => (
              <Link key={n.key} href={href(lang, n.path)} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium text-ink-soft hover:bg-mist">
                {tx(n.label, lang)}
              </Link>
            ))}
            <Link href={href(lang, "/demo")} onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-brand-600 px-4 py-3 text-center font-semibold text-white">
              {tx(ui.demo, lang)}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
