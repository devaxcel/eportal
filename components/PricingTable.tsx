"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { plans, ui } from "@/lib/content";
import { href, tx, type Lang } from "@/lib/i18n";

const fmt = (n: number, lang: Lang) =>
  `Rs ${n.toLocaleString(lang === "ur" ? "en-PK" : "en-US")}`;

export function PricingTable({ lang }: { lang: Lang }) {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      <div className="mb-10 flex items-center justify-center gap-3">
        <div className="inline-flex rounded-xl border border-line bg-white p-1" role="group">
          {[false, true].map((y) => (
            <button
              key={String(y)}
              onClick={() => setYearly(y)}
              aria-pressed={yearly === y}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                yearly === y ? "bg-brand-600 text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              {tx(y ? ui.yearly : ui.monthly, lang)}
            </button>
          ))}
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{tx(ui.save, lang)}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => {
          const price = p.monthly === null ? null : yearly ? p.monthly * 10 : p.monthly;
          return (
            <div
              key={p.key}
              className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
                p.popular ? "border-brand-500 shadow-xl shadow-brand-900/10 ring-1 ring-brand-500" : "border-line"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 start-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  {tx(ui.popular, lang)}
                </span>
              )}
              <h3 className="text-lg font-bold">{tx(p.name, lang)}</h3>
              <p className="mt-1 text-sm text-ink-soft">{tx(p.students, lang)}</p>

              <p className="mt-5 flex items-baseline gap-1" dir={lang === "ur" ? "rtl" : "ltr"}>
                {price === null ? (
                  <span className="text-3xl font-extrabold">{lang === "en" ? "Custom" : "حسب ضرورت"}</span>
                ) : (
                  <>
                    <span className="text-3xl font-extrabold">{fmt(price, lang)}</span>
                    <span className="text-sm text-ink-soft">{tx(yearly ? ui.perYear : ui.perMonth, lang)}</span>
                  </>
                )}
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check size={16} className="mt-1.5 shrink-0 text-brand-500" />
                    <span>{tx(f, lang)}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={href(lang, "/demo")}
                className={`mt-8 rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
                  p.popular
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "border border-line text-ink hover:border-brand-300 hover:bg-brand-50"
                }`}
              >
                {tx(p.monthly === null ? ui.contactSales : ui.getStarted, lang)}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
