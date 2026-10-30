import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ur", "es", "nl", "ar"];

function preferred(accept: string) {
  for (const part of accept.split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase();
    if (locales.includes(code)) return code;
  }
  return "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const lang = preferred(req.headers.get("accept-language") ?? "");
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
