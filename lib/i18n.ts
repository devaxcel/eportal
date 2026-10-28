export const locales = ["en", "ur"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "en";

export type L = { en: string; ur: string };

export const isLang = (v: string): v is Lang => (locales as readonly string[]).includes(v);
export const dirOf = (lang: Lang) => (lang === "ur" ? "rtl" : "ltr");
export const tx = (v: L, lang: Lang) => v[lang];
export const href = (lang: Lang, path = "") => `/${lang}${path}`;

/** Pick the string for the current language: T(lang, "English", "اردو") */
export const T = (lang: Lang, en: string, ur: string) => (lang === "en" ? en : ur);
