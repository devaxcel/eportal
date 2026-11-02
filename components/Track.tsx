"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type AnchorHTMLAttributes } from "react";

function send(kind: "view" | "whatsapp", ref = "") {
  try {
    if (navigator.doNotTrack === "1") return; // respect the browser's Do Not Track setting
    const body = JSON.stringify({ kind, path: location.pathname, ref });
    // text/plain keeps this a "simple" request, so the browser sends it without a preflight
    if (!navigator.sendBeacon?.("/api/collect", new Blob([body], { type: "text/plain" }))) {
      void fetch("/api/collect", { method: "POST", body, keepalive: true });
    }
  } catch {
    // analytics must never break the page
  }
}

/** Counts a page view on every navigation. No cookies, no personal data. */
export function Track() {
  const path = usePathname();
  const first = useRef(true);
  useEffect(() => {
    send("view", first.current ? document.referrer : "");
    first.current = false;
  }, [path]);
  return null;
}

/** A link that counts a click (for example, on WhatsApp). */
export function TrackedLink({ event = "whatsapp", onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { event?: "whatsapp" }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        send(event);
        onClick?.(e);
      }}
    />
  );
}
