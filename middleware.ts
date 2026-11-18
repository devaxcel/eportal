import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAnonKey, supabaseUrl } from "./lib/env";

const locales = ["en", "ur", "es", "nl", "ar"];

function preferred(accept: string) {
  for (const part of accept.split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase();
    if (locales.includes(code)) return code;
  }
  return "en";
}

/** Keeps the dashboard session fresh and sends signed-out visitors to the login page. */
async function adminGate(req: NextRequest) {
  const url = supabaseUrl();
  const key = supabaseAnonKey();
  if (!url || !key) return NextResponse.next(); // the pages explain how to set Supabase up

  let res = NextResponse.next({ request: req });
  const sb = createServerClient(url, key, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list: { name: string; value: string; options: CookieOptions }[]) => {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });
  const { data } = await sb.auth.getUser();
  const onLogin = req.nextUrl.pathname === "/admin/login";

  if (!data.user && !onLogin) {
    const to = req.nextUrl.clone();
    to.pathname = "/admin/login";
    to.search = "";
    return NextResponse.redirect(to);
  }
  if (data.user && onLogin) {
    const to = req.nextUrl.clone();
    to.pathname = "/admin";
    to.search = "";
    return NextResponse.redirect(to);
  }
  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return adminGate(req);
  if (pathname === "/md" || pathname.startsWith("/md/")) return;

  // Addresses carry no language. An old /ur/... link goes to the clean address and remembers the language.
  const old = pathname.match(/^\/(en|ur|es|nl|ar)(\/.*)?$/);
  if (old) {
    const url = req.nextUrl.clone();
    url.pathname = old[2] && old[2] !== "/" ? old[2] : "/";
    const res = NextResponse.redirect(url, 308);
    res.cookies.set("lang", old[1], { path: "/", maxAge: 31536000, sameSite: "lax" });
    return res;
  }

  // Language: the visitor's choice (cookie), else their browser language, else English.
  const saved = req.cookies.get("lang")?.value ?? "";
  const lang = locales.includes(saved) ? saved : preferred(req.headers.get("accept-language") ?? "");
  const rest = pathname === "/" ? "" : pathname;

  const url = req.nextUrl.clone();
  // Agents that ask for markdown get the markdown twin of the page.
  const wantsMarkdown = req.method === "GET" && (req.headers.get("accept") ?? "").includes("text/markdown");
  url.pathname = wantsMarkdown ? `/md/${lang}${rest}` : `/${lang}${rest}`;
  const res = NextResponse.rewrite(url);
  res.headers.set("Vary", "Accept, Accept-Language, Cookie");
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
