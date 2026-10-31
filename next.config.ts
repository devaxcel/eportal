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
    return Object.entries(SLUG_RENAMES).map(([from, to]) => ({
      source: `/:lang(en|ur|es|nl|ar)/solutions/${from}`,
      destination: `/:lang/solutions/${to}`,
      permanent: true,
    }));
  },
  // Lets `NEXT_DIST_DIR=.next-build npm run build` run beside a dev server without clobbering .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
