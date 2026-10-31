/**
 * Old product names -> new names (October 2026 rename). Used once by scripts/rename-products.ts to update
 * stored dashboard content. Page addresses (slugs) are NOT renamed, so existing links keep working.
 */
export const RENAMES: [RegExp, string][] = [
  // English / Latin (also used inside the Spanish, Dutch and Arabic text)
  [/Email Report Portal/g, "ReportRelay"],
  [/Workflow Portal/g, "ApproveFlow"],
  [/Medical Coding AI/g, "MedCodeX"],
  [/AI Sales Agent/g, "LeadChat"],
  [/AXCEL POS/g, "SaleDesk"],
  [/HayRoutes/g, "LessonBook"],
  [/\beSchool\b/g, "SchoolDesk"],
  [/\bFormed\b/g, "TrainerBook"],
  // Urdu
  [/ای میل رپورٹ پورٹل/g, "رپورٹ ریلے"],
  [/ورک فلو پورٹل/g, "اپروو فلو"],
  [/میڈیکل کوڈنگ اے آئی/g, "میڈ کوڈ ایکس"],
  [/اے آئی سیلز ایجنٹ/g, "لیڈ چیٹ"],
  [/ایکسل پی او ایس/g, "سیل ڈیسک"],
  [/ہے روٹس/g, "لیسن بک"],
  [/ای اسکول/g, "اسکول ڈیسک"],
  [/فارمڈ/g, "ٹرینر بک"],
];

export const applyRenames = (text: string) => RENAMES.reduce((t, [re, to]) => t.replace(re, to), text);
