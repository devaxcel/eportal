import { Icon } from "./Icon";
import { ProductMock } from "./productMocks";
import type { Solution } from "@/lib/content";
import { tx, type Lang } from "@/lib/i18n";

/** Product dashboard mockup on a brand-coloured panel, with floating feature chips. */
export function ProductVisual({ s, lang, className = "" }: { s: Solution; lang: Lang; className?: string }) {
  return (
    <div className={`relative isolate overflow-hidden rounded-3xl bg-gradient-to-br ${s.accent} p-4 shadow-2xl sm:p-8 ${className}`}>
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <Icon name={s.icon} size={220} strokeWidth={1} className="absolute -end-10 -top-10 -z-10 text-white/15" />
      <ProductMock slug={s.slug} lang={lang} />
      <div className="pointer-events-none mt-4 flex flex-wrap gap-2" aria-hidden="true">
        {s.features.slice(0, 3).map((f, i) => (
          <span key={i} className="glass animate-float-slow rounded-full px-3 py-1.5 text-xs font-medium text-white" style={{ animationDelay: `${i * 0.9}s` }}>
            {tx(f, lang)}
          </span>
        ))}
      </div>
    </div>
  );
}
