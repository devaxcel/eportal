"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav, ui } from "@/lib/content";
import { href, tx, type Lang } from "@/lib/i18n";

export function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;
  const other: Lang = lang === "en" ? "ur" : "en";
  const switchHref = pathname.replace(/^\/(en|ur)/, `/${other}`) || `/${other}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href={href(lang)} aria-label="ePortal home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.key}
              href={href(lang, n.path)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-mist hover:text-ink"
            >
              {tx(n.label, lang)}
            </Link>
          ))}
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
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container-x flex flex-col py-3" aria-label="Mobile">
            {nav.map((n) => (
              <Link
                key={n.key}
                href={href(lang, n.path)}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-medium text-ink-soft hover:bg-mist"
              >
                {tx(n.label, lang)}
              </Link>
            ))}
            <Link
              href={href(lang, "/demo")}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-brand-600 px-4 py-3 text-center font-semibold text-white"
            >
              {tx(ui.demo, lang)}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
