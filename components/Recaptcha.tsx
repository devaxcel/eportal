"use client";

import { useEffect, useState } from "react";
import { T, type Lang } from "@/lib/i18n";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

type Grecaptcha = { ready: (cb: () => void) => void; execute: (key: string, o: { action: string }) => Promise<string> };
declare global {
  interface Window { grecaptcha?: Grecaptcha }
}

function load(): Promise<void> {
  return new Promise((resolve) => {
    if (window.grecaptcha) return resolve();
    const existing = document.getElementById("recaptcha-script");
    if (existing) return existing.addEventListener("load", () => resolve());
    const s = document.createElement("script");
    s.id = "recaptcha-script";
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

/**
 * Invisible reCAPTCHA v3. Renders a hidden field with a fresh token (tokens last two minutes and work once,
 * so it refreshes every 90 seconds and again after each submission, given by `refreshOn`).
 * Renders nothing when no site key is set.
 */
export function Recaptcha({ action, refreshOn }: { action: string; refreshOn?: unknown }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!SITE_KEY) return;
    let stop = false;
    const run = async () => {
      try {
        await load();
        window.grecaptcha?.ready(() => {
          window.grecaptcha?.execute(SITE_KEY, { action }).then((t) => !stop && setToken(t)).catch(() => {});
        });
      } catch {
        // the server decides what to do when there is no token
      }
    };
    void run();
    const id = setInterval(run, 90_000);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, [action, refreshOn]);

  return SITE_KEY ? <input type="hidden" name="recaptcha" value={token} readOnly /> : null;
}

/** Google asks sites that hide the reCAPTCHA badge to show this notice instead. */
export function RecaptchaNotice({ lang }: { lang: Lang }) {
  if (!SITE_KEY) return null;
  return (
    <p className="text-center text-[11px] leading-relaxed text-ink-soft">
      {T(lang, "Protected by reCAPTCHA. The Google", "ری کیپچا سے محفوظ۔ گوگل کی")}{" "}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">{T(lang, "Privacy Policy", "رازداری کی پالیسی")}</a>{" "}
      {T(lang, "and", "اور")}{" "}
      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">{T(lang, "Terms of Service", "شرائط")}</a>{" "}
      {T(lang, "apply.", "لاگو ہیں۔")}
    </p>
  );
}
