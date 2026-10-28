import Image from "next/image";

/** Official ePortal logo. `light` renders a white version for dark backgrounds. */
export function Logo({ light = false, className = "h-8 w-[112px]" }: { light?: boolean; className?: string }) {
  return (
    <span className={`relative block overflow-hidden ${className}`} dir="ltr">
      <Image
        src="/img/logo.png"
        alt="ePortal"
        fill
        sizes="160px"
        priority
        className={`object-cover ${light ? "brightness-0 invert" : ""}`}
        style={{ objectPosition: "center 42%" }}
      />
    </span>
  );
}
