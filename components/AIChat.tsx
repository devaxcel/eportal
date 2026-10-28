"use client";

import { useState } from "react";
import { Bot, Send } from "lucide-react";
import { chatDemo, ui } from "@/lib/content";
import { tx, type Lang } from "@/lib/i18n";

export function AIChat({ lang }: { lang: Lang }) {
  const [asked, setAsked] = useState<number[]>([0]);
  const [typing, setTyping] = useState(false);

  const ask = (i: number) => {
    if (typing || asked.includes(i)) return;
    setTyping(true);
    setAsked((a) => [...a, i]);
    setTimeout(() => setTyping(false), 700);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white text-ink shadow-2xl">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-700">
          <Bot size={18} />
        </span>
        <div>
          <p className="font-semibold leading-tight">{lang === "en" ? "ePortal Assistant" : "ای پورٹل اسسٹنٹ"}</p>
          <p className="text-xs text-ink-soft">{lang === "en" ? "Parent of Ayesha, Class 6-B" : "والدین عائشہ، جماعت 6-بی"}</p>
        </div>
      </div>

      <div className="min-h-72 space-y-3 px-5 py-4" aria-live="polite">
        {asked.map((i, idx) => {
          const last = idx === asked.length - 1;
          return (
            <div key={i} className="animate-fade-up space-y-3">
              <div className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-ee-sm bg-brand-600 px-4 py-2 text-sm text-white">
                  {tx(chatDemo[i].q, lang)}
                </p>
              </div>
              <div className="flex justify-start">
                <p className="max-w-[90%] rounded-2xl rounded-es-sm bg-mist px-4 py-2 text-sm text-ink">
                  {typing && last ? "…" : tx(chatDemo[i].a, lang)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-line px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {chatDemo.map((c, i) => (
            <button
              key={i}
              onClick={() => ask(i)}
              disabled={asked.includes(i) || typing}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 px-3 py-1.5 text-xs font-medium text-brand-700 transition enabled:hover:bg-brand-50 disabled:opacity-40"
            >
              <Send size={12} className="rtl:-scale-x-100" />
              {tx(c.q, lang)}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-soft">{tx(ui.samplePreview, lang)}</p>
      </div>
    </div>
  );
}
