import { SECTION_KEYS, type Solution } from "./content";
import { checkSchema } from "./seo";
import { locales } from "./i18n";

/** Everything an editor can change, stored as JSON. The slug lives in its own column. */
export type SolutionContent = Omit<Solution, "slug" | "sort">;

/** Icons the dashboard offers (all exist in lucide-react and in the header menu). */
export const ICON_NAMES = [
  "School", "Dumbbell", "Workflow", "Mail", "Stethoscope", "Car", "Bot", "ShoppingCart", "Briefcase",
  "Building2", "Store", "Landmark", "Truck", "Plane", "Utensils", "Camera", "Scale", "Wrench", "Globe",
  "Shield", "Zap", "Rocket", "BookOpen", "Users", "BarChart3", "Wallet", "House",
] as const;

/** Gradient colours. Written out in full so Tailwind includes every class. */
export const ACCENTS = [
  "from-brand-400 to-brand-700",
  "from-rose-400 to-pink-600",
  "from-sky-400 to-indigo-600",
  "from-cyan-400 to-blue-600",
  "from-amber-400 to-orange-600",
  "from-teal-400 to-emerald-700",
  "from-stone-500 to-stone-800",
  "from-fuchsia-400 to-purple-600",
  "from-lime-400 to-green-700",
  "from-violet-400 to-purple-700",
  "from-red-400 to-rose-600",
  "from-yellow-400 to-amber-600",
] as const;

/** Built-in dashboard pictures a solution can use. */
export const MOCKS = ["eschool", "formed", "workflow-portal", "email-report-portal", "medical-coding-ai", "hayroutes", "ai-sales-agent", "pos"] as const;

export const SECTION_LABELS: Record<(typeof SECTION_KEYS)[number], string> = {
  marquee: "Feature strip (scrolling pills)",
  statement: "Statement (words light up)",
  compare: "Before and after",
  action: "See it in action",
  whoFor: "Who it is for",
  steps: "Getting started steps",
  pricing: "Pricing note",
  faq: "FAQ",
  others: "Other platforms row",
};

export const CATEGORIES = ["education", "health", "business", "retail"] as const;

const blank = { en: "", ur: "" };

/** Starting point for a brand new solution. */
export function newContent(name: string): SolutionContent {
  return {
    icon: "Briefcase",
    status: "new",
    category: "business",
    accent: ACCENTS[0],
    mock: "workflow-portal",
    name: { en: name, ur: "" },
    tagline: { ...blank },
    description: { ...blank },
    features: [{ ...blank }, { ...blank }, { ...blank }, { ...blank }],
    forWho: [{ ...blank }, { ...blank }, { ...blank }],
    story: { statement: { ...blank }, before: [{ ...blank }], after: [{ ...blank }], faqs: [] },
    seo: { langs: {} },
    hidden: [],
  };
}

/** Returns a list of problems; empty means the content can be saved. */
export function validateContent(c: SolutionContent): string[] {
  const errors: string[] = [];
  if (!c?.name?.en?.trim()) errors.push("The English name is required.");
  if (!(ICON_NAMES as readonly string[]).includes(c.icon)) errors.push("Choose an icon from the list.");
  if (!(ACCENTS as readonly string[]).includes(c.accent)) errors.push("Choose a colour from the list.");
  if (c.mock && !(MOCKS as readonly string[]).includes(c.mock)) errors.push("Choose a dashboard picture from the list.");
  if (!(CATEGORIES as readonly string[]).includes(c.category)) errors.push("Choose a category.");
  if (c.url && !/^https?:\/\//i.test(c.url)) errors.push("The website link must start with http:// or https://");
  if (c.seo?.ogImage && !/^https:\/\//i.test(c.seo.ogImage)) errors.push("The share image must be an https:// link.");
  for (const k of c.hidden ?? []) if (!(SECTION_KEYS as readonly string[]).includes(k)) errors.push(`Unknown section: ${k}`);
  for (const lang of locales) {
    const f = c.seo?.langs?.[lang];
    if (!f) continue;
    if ((f.title?.length ?? 0) > 120) errors.push(`SEO title (${lang}) is over 120 characters.`);
    if ((f.description?.length ?? 0) > 320) errors.push(`Meta description (${lang}) is over 320 characters.`);
    const bad = f.schema ? checkSchema(f.schema) : null;
    if (bad) errors.push(`Schema (${lang}): ${bad}`);
  }
  if (JSON.stringify(c).length > 200_000) errors.push("The content is too large.");
  return errors;
}
