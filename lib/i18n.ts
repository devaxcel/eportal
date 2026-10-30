import { catalogs } from "./translations";

export const locales = ["en", "ur", "es", "nl", "ar"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "en";

/** Right-to-left languages */
const rtl: readonly Lang[] = ["ur", "ar"];

/** Each language's own name, shown in the language switcher. */
export const langNames: Record<Lang, string> = {
  en: "English",
  ur: "اردو",
  es: "Español",
  nl: "Nederlands",
  ar: "العربية",
};

/** English and Urdu are written inline; Spanish, Dutch and Arabic come from lib/translations by English text. */
export type L = { en: string; ur: string; es?: string; nl?: string; ar?: string };

export const isLang = (v: string): v is Lang => (locales as readonly string[]).includes(v);
export const dirOf = (lang: Lang) => (rtl.includes(lang) ? "rtl" : "ltr");
export const href = (lang: Lang, path = "") => `/${lang}${path}`;

const pick = (lang: Lang, en: string, ur: string) => {
  if (lang === "en") return en;
  if (lang === "ur") return ur;
  return catalogs[lang].get(en) ?? en;
};

/** Dashboard-edited text can carry its own es/nl/ar; otherwise the built-in catalog is used. */
export const tx = (v: L, lang: Lang) => {
  const own = v[lang];
  if (own && own.trim()) return own;
  return pick(lang, v.en, v.ur || v.en);
};

/** Pick the string for the current language: T(lang, "English", "اردو") */
export const T = (lang: Lang, en: string, ur: string) => pick(lang, en, ur);

/** Same as T, for metadata where the language param is still a plain string. */
export const Tm = (lang: string, en: string, ur: string) => (isLang(lang) ? pick(lang, en, ur) : en);
