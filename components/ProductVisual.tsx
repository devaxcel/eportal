import { Icon } from "./Icon";
import type { Solution } from "@/lib/content";
import { tx, type Lang } from "@/lib/i18n";

/** Gradient panel with the product icon and floating feature chips. */
export function ProductVisual({ s, lang, className = "" }: { s: Solution; lang: Lang; className?: string }) {
  return (
    <div className={`relative isolate overflow-hidden rounded-3xl bg-gradient-to-br ${s.accent} p-8 shadow-2xl ${className}`} aria-hidden="true">
      <div className="bg-grid absolute inset-0 -z-10 opacity-70" />
      <Icon name={s.icon} size={260} strokeWidth={1} className="absolute -end-10 -top-10 -z-10 text-white/15" />
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-white backdrop-blur"><Icon name={s.icon} size={32} /></span>
      <p className="mt-5 text-3xl font-extrabold text-white">{tx(s.name, lang)}</p>
      <p className="mt-1 text-white/85">{tx(s.tagline, lang)}</p>
      <div className="mt-8 space-y-3">
        {s.features.map((f, i) => (
          <div key={i} className={`animate-float-slow glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white ${i % 2 ? "ms-8" : ""}`} style={{ animationDelay: `${i * 0.8}s` }}>
            <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
            {tx(f, lang)}
          </div>
        ))}
      </div>
    </div>
  );
}
