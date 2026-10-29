/** ePortal wordmark. `light` renders the white version for dark backgrounds. */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} dir="ltr">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-lg font-bold leading-none text-white">e</span>
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-black"}`}>
        Portal
      </span>
    </span>
  );
}
