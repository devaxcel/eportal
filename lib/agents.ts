import type { Solution } from "./content";
import { hubFaqs } from "./content";
import { tx, T, type Lang } from "./i18n";
import { SITE_URL } from "./seo";
import { site } from "./site";
import { getService, services, type Service } from "./services";
import { getSolution, getSolutions } from "./solutions-data";

/* ------------------------------------------------------------ structured data */

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/** What agents and search engines learn about the business on every page. */
export function organizationGraph(lang: Lang, solutions: Solution[]) {
  const orgId = `${SITE_URL}/#organization`;
  const demo = `${SITE_URL}/demo`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: site.name,
        alternateName: `${site.name} by ${site.company}`,
        url: SITE_URL,
        description: "Smart software platforms built in Lahore: school management, workflow approvals, driving schools, AI sales chat, point of sale, invoicing and short links.",
        email: site.email,
        telephone: site.phone,
        parentOrganization: { "@type": "Organization", name: site.company, url: site.companyUrl },
        sameAs: [site.companyUrl],
        address: { "@type": "PostalAddress", streetAddress: "Barkat Market", addressLocality: "Lahore", postalCode: "54700", addressCountry: "PK" },
        areaServed: { "@type": "Country", name: "Pakistan" },
        availableLanguage: ["English", "Urdu", "Spanish", "Dutch", "Arabic"],
        openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: WEEKDAYS, opens: "09:00", closes: "18:00" }],
        contactPoint: [{ "@type": "ContactPoint", contactType: "sales", telephone: site.phone, email: site.email, availableLanguage: ["English", "Urdu"], hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: WEEKDAYS, opens: "09:00", closes: "18:00" } }],
        potentialAction: {
          "@type": "ReserveAction",
          name: "Book a demo call",
          target: { "@type": "EntryPoint", urlTemplate: demo, actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] },
          result: { "@type": "Reservation", name: "Demo call" },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${site.name} solutions`,
          itemListElement: solutions.map((s) => ({
            "@type": "Offer",
            url: `${SITE_URL}/solutions/${s.slug}`,
            description: "Priced on request: a quote follows a short demo.",
            availability: "https://schema.org/InStock",
            itemOffered: { "@type": "Service", name: tx(s.name, lang), description: tx(s.description, lang), serviceType: tx(s.tagline, lang), provider: { "@id": orgId }, areaServed: "Worldwide" },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        inLanguage: lang,
        publisher: { "@id": orgId },
      },
    ],
  };
}

/** Home page extras: the list of solutions and the common questions. */
export function homeGraph(lang: Lang, solutions: Solution[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: `${site.name} solutions`,
        itemListElement: solutions.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: tx(s.name, lang), url: `${SITE_URL}/solutions/${s.slug}` })),
      },
      {
        "@type": "FAQPage",
        mainEntity: hubFaqs.map((f) => ({ "@type": "Question", name: tx(f.q, lang), acceptedAnswer: { "@type": "Answer", text: tx(f.a, lang) } })),
      },
    ],
  };
}

/* ------------------------------------------------------------------ markdown */

const link = (_lang: Lang, path: string) => `${SITE_URL}${path}`;

function solutionMarkdown(s: Solution, lang: Lang): string {
  const lines = [`# ${tx(s.name, lang)}`, "", `> ${tx(s.tagline, lang)}`, "", tx(s.description, lang), "", "## Features", ...s.features.map((f) => `- ${tx(f, lang)}`), "", "## Who it is for", ...s.forWho.map((f) => `- ${tx(f, lang)}`)];
  if (s.story) {
    lines.push("", "## Before and after", ...s.story.before.map((b) => `- Before: ${tx(b, lang)}`), ...s.story.after.map((a) => `- After: ${tx(a, lang)}`));
    if (s.story.faqs.length) lines.push("", "## Questions", ...s.story.faqs.flatMap((f) => [`### ${tx(f.q, lang)}`, tx(f.a, lang), ""]));
  }
  lines.push("", "## Next steps", `- Book a demo: ${link(lang, `/demo?solution=${s.slug}`)}`, `- Page: ${link(lang, `/solutions/${s.slug}`)}`);
  if (s.url) lines.push(`- Product site: ${s.url}`);
  lines.push("- Pricing: on request, a clear quote follows a short demo.");
  return lines.join("\n");
}

function serviceMarkdown(s: Service, lang: Lang): string {
  return [
    `# ${tx(s.title, lang)}`, "", `> ${tx(s.seoDescription, lang)}`, "", tx(s.sub, lang), "",
    "## What you get", ...s.included.map((x) => `- ${tx(x, lang)}`), "",
    "## Who it is for", ...s.forWho.map((x) => `- ${tx(x, lang)}`), "",
    "## How it works", ...s.steps.map((st, i) => `${i + 1}. **${tx(st.title, lang)}**: ${tx(st.text, lang)}`), "",
    "## Questions", ...s.faqs.flatMap((f) => [`### ${tx(f.q, lang)}`, tx(f.a, lang), ""]),
    "## Next steps", `- Send a request: ${link(lang, s.path)}#request`, "- Pricing: a free consultation, then a clear written quote.", ...contactBlock(lang),
  ].join("\n");
}

const contactBlock = (lang: Lang) => [
  `- Email: ${site.email}`,
  `- Phone: ${site.phone}`,
  `- WhatsApp: https://wa.me/${site.whatsapp}`,
  `- Address: ${tx({ en: site.address.en, ur: site.address.ur }, lang)}`,
  `- Hours: ${tx({ en: site.hours.en, ur: site.hours.ur }, lang)} (Pakistan time)`,
  `- Book a demo online: ${link(lang, "/demo")}`,
];

/** Markdown twin of a public page, or null when there is no such page. `segs` is the path after the language. */
export async function markdownPage(lang: Lang, segs: string[]): Promise<string | null> {
  const solutions = await getSolutions();
  const list = solutions.map((s) => `- [${tx(s.name, lang)}](${link(lang, `/solutions/${s.slug}`)}): ${tx(s.tagline, lang)}`);
  const key = segs.join("/");

  if (key === "") {
    return [
      `# ${site.name}`, "",
      `> Smart software platforms by ${site.company}, built in Lahore. Each platform works on its own.`, "",
      "## Solutions", ...list, "",
      "## Common questions", ...hubFaqs.flatMap((f) => [`### ${tx(f.q, lang)}`, tx(f.a, lang), ""]),
      "## Contact", ...contactBlock(lang),
    ].join("\n");
  }
  if (key === "solutions") return [`# ${site.name} solutions`, "", ...list, "", `Book a demo: ${link(lang, "/demo")}`].join("\n");
  if (segs[0] === "solutions" && segs.length === 2) {
    const s = await getSolution(segs[1]);
    return s ? solutionMarkdown(s, lang) : null;
  }
  const svc = getService(key);
  if (svc) return serviceMarkdown(svc, lang);
  if (key === "contact") return [`# ${T(lang, "Contact", "رابطہ")} ${site.name}`, "", ...contactBlock(lang)].join("\n");
  if (key === "demo") {
    return [`# Book a demo`, "", "A 30 minute call, no commitment. We learn what you need, show the platform that fits and send a clear quote.", "", `- Book a time or send a request: ${link(lang, "/demo")}`, "- Choose a solution with `?solution=<slug>`, for example `?solution=schooldesk`.", "", "## Contact", ...contactBlock(lang)].join("\n");
  }
  if (key === "about") return [`# About ${site.name}`, "", `${site.name} is a set of software platforms from ${site.company} (${site.companyUrl}), built in Lahore, Pakistan.`, "", "## Solutions", ...list].join("\n");
  return null;
}

/** /llms.txt: a short guide for AI agents. */
export async function llmsTxt(): Promise<string> {
  const lang: Lang = "en";
  const solutions = await getSolutions();
  return [
    `# ${site.name}`, "",
    `> ${site.name} is a set of smart software platforms by ${site.company}, built in Lahore, Pakistan. Pages are available in English, Urdu, Spanish, Dutch and Arabic. Every page has a markdown version: send \`Accept: text/markdown\` or add \`.md\` to the page address.`, "",
    "## Solutions", ...solutions.map((s) => `- [${tx(s.name, lang)}](${link(lang, `/solutions/${s.slug}`)}): ${tx(s.description, lang)}`), "",
    "## Services",
    ...services.map((s) => `- [${tx(s.title, lang)}](${link(lang, s.path)}): ${tx(s.seoDescription, lang)}`), "",
    "## Key pages",
    `- [All solutions](${link(lang, "/solutions")})`,
    `- [Book a demo](${link(lang, "/demo")}): pick a time online, 30 minutes, no commitment`,
    `- [Contact](${link(lang, "/contact")})`,
    `- [About](${link(lang, "/about")})`, "",
    "## Pricing", "Quoted per customer after a short demo. Book one at " + link(lang, "/demo") + ".", "",
    "## Contact", ...contactBlock(lang), "",
    "## Optional",
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Markdown of the home page](${SITE_URL}/md/en)`, "",
  ].join("\n");
}
