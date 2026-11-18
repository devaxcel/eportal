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
  async redirects() {
    const gone = [{ source: "/:lang(en|ur|es|nl|ar)/pricing", destination: "/:lang/solutions", permanent: true }];
    return gone.concat(Object.entries(SLUG_RENAMES).map(([from, to]) => ({
      source: `/:lang(en|ur|es|nl|ar)/solutions/${from}`,
      destination: `/:lang/solutions/${to}`,
      permanent: true,
    })));
  },
  // /en/solutions/schooldesk.md serves the markdown twin of the page.
  async rewrites() {
    return [
      { source: "/:lang(en|ur|es|nl|ar).md", destination: "/md/:lang" },
      { source: "/:lang(en|ur|es|nl|ar)/:path*.md", destination: "/md/:lang/:path*" },
    ];
  },
  // Lets `NEXT_DIST_DIR=.next-build npm run build` run beside a dev server without clobbering .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
