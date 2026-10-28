"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AdminDashboardMock, AttendanceMock, BrowserFrame, ParentPhoneMock, PhoneFrame } from "./visuals";
import { href, T, tx, type L, type Lang } from "@/lib/i18n";

export type ExplorerPortal = {
  slug: string;
  icon: ReactNode;
  name: L;
  tagline: L;
  features: L[];
};

const visualFor: Record<string, "browser" | "phone" | "attendance"> = {
  admin: "browser",
  accounts: "browser",
  campus: "browser",
  parent: "phone",
  student: "phone",
  teacher: "attendance",
};

export function PortalVisual({ slug, lang }: { slug: string; lang: Lang }) {
  const kind = visualFor[slug] ?? "browser";
  if (kind === "phone")
    return (
      <div className="mx-auto w-52 sm:w-56">
        <PhoneFrame><ParentPhoneMock lang={lang} /></PhoneFrame>
      </div>
    );
  if (kind === "attendance")
    return (
      <div className="mx-auto max-w-sm rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 p-6 shadow-2xl shadow-navy-950/30">
        <p className="mb-4 text-sm font-semibold text-white">{T(lang, "Class 6-B · Today", "جماعت 6-بی · آج")}</p>
        <AttendanceMock lang={lang} />
      </div>
    );
  return (
    <BrowserFrame url={`app.eportal.pk/${slug}`} className="mx-auto max-w-xl">
      <AdminDashboardMock lang={lang} />
    </BrowserFrame>
  );
}

export function PortalExplorer({ portals, lang }: { portals: ExplorerPortal[]; lang: Lang }) {
  const [active, setActive] = useState(0);
  const p = portals[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <div role="tablist" aria-label="Portals" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
        {portals.map((x, i) => (
          <button
            key={x.slug}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-start transition ${
              i === active ? "text-white" : "text-ink hover:bg-white/70"
            }`}
          >
            {i === active && (
              <motion.span layoutId="portal-tab" className="absolute inset-0 -z-0 rounded-2xl bg-gradient-to-r from-navy-800 to-navy-700 shadow-lg shadow-navy-900/20" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
            )}
            <span className={`relative grid h-9 w-9 place-items-center rounded-xl ${i === active ? "bg-white/15 text-brand-300" : "bg-brand-50 text-brand-600"}`}>{x.icon}</span>
            <span className="relative whitespace-nowrap text-sm font-semibold">{tx(x.name, lang)}</span>
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-8">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative grid items-center gap-8 xl:grid-cols-2"
          >
            <div>
              <h3 className="text-2xl font-extrabold">{tx(p.name, lang)}</h3>
              <p className="mt-2 text-ink-soft">{tx(p.tagline, lang)}</p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="mt-1.5 shrink-0 text-brand-500" />
                    <span>{tx(f, lang)}</span>
                  </motion.li>
                ))}
              </ul>
              <Link href={href(lang, `/portals/${p.slug}`)} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
                {T(lang, "Explore this portal", "یہ پورٹل دیکھیں")}
                <ArrowRight size={16} className="rtl:rotate-180" />
              </Link>
            </div>
            <PortalVisual slug={p.slug} lang={lang} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
