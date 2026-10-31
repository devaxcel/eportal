/** Page addresses were renamed to match the product names (October 2026). Old addresses redirect permanently. */
export const SLUG_RENAMES: Record<string, string> = {
  eschool: "schooldesk",
  formed: "trainerbook",
  "workflow-portal": "approveflow",
  "email-report-portal": "reportrelay",
  "medical-coding-ai": "medcodex",
  hayroutes: "lessonbook",
  "ai-sales-agent": "leadchat",
  pos: "saledesk",
};

/** The product with its own long page (portals, apps, AI chat…). */
export const MAIN_SLUG = "schooldesk";

/** Old address -> new address. Unknown addresses are returned unchanged. */
export const newSlug = (slug: string) => SLUG_RENAMES[slug] ?? slug;

/** New address -> old address, which is also the key of the built-in dashboard picture. */
export const oldSlug = (slug: string) => Object.entries(SLUG_RENAMES).find(([, v]) => v === slug)?.[0] ?? slug;
