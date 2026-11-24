import type { NextConfig } from "next";

// Old page addresses -> new ones (kept in sync with lib/slugs.ts)
const SLUG_RENAMES: Record<string, string> = {
  eschool: "schooldesk",
  formed: "trainerbook",
  "workflow-portal": "approveflow",
  "email-report-portal": "reportrelay",
  "medical-coding-ai": "medcodex",
  hayroutes: "lessonbook",
  "ai-sales-agent": "leadchat",
  pos: "saledesk",
};

const nextConfig: NextConfig = {
  // The reCAPTCHA site key is public by design. Setting it as RECAPTCHA_SITE_KEY in Vercel avoids the NEXT_PUBLIC_ warning;
  // it is handed to the browser code at build time under the name the components read.
  env: { NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY ?? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "" },
  async redirects() {
    // Old addresses, with and without a language prefix (the middleware removes the prefix afterwards).
    const gone = [
      { source: "/pricing", destination: "/solutions", permanent: true },
      { source: "/:lang(en|ur|es|nl|ar)/pricing", destination: "/:lang/solutions", permanent: true },
    ];
    const renamed = Object.entries(SLUG_RENAMES).flatMap(([from, to]) => [
      { source: `/solutions/${from}`, destination: `/solutions/${to}`, permanent: true },
      { source: `/:lang(en|ur|es|nl|ar)/solutions/${from}`, destination: `/:lang/solutions/${to}`, permanent: true },
    ]);
    return [...gone, ...renamed];
  },
  // /solutions/schooldesk.md serves the markdown twin of the page (English; /ur/... paths pick other languages).
  async rewrites() {
    return [
      { source: "/:lang(en|ur|es|nl|ar).md", destination: "/md/:lang" },
      { source: "/:lang(en|ur|es|nl|ar)/:path*.md", destination: "/md/:lang/:path*" },
      { source: "/index.md", destination: "/md/en" },
      { source: "/:path+.md", destination: "/md/en/:path+" },
    ];
  },
  // Lets `NEXT_DIST_DIR=.next-build npm run build` run beside a dev server without clobbering .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
