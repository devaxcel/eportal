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
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    // Agents that ask for markdown get the markdown twin of the page.
    if (req.method === "GET" && (req.headers.get("accept") ?? "").includes("text/markdown")) {
      const url = req.nextUrl.clone();
      url.pathname = `/md${pathname}`;
      return NextResponse.rewrite(url);
    }
    const res = NextResponse.next();
    res.headers.set("Vary", "Accept");
    return res;
  }

  const lang = preferred(req.headers.get("accept-language") ?? "");
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
