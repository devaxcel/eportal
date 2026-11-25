import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallButton } from "@/components/CallButton";
import { SiteLoader } from "@/components/SiteLoader";
import { MotionProvider, ScrollProgress } from "@/components/motion";
import { SolutionsProvider } from "@/components/SolutionsProvider";
import { Track } from "@/components/Track";
import { JsonLd } from "@/components/JsonLd";
import { organizationGraph } from "@/lib/agents";
import { SITE_URL } from "@/lib/seo";
import { getSolutions } from "@/lib/solutions-data";
import { dirOf, isLang, locales, Tm } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", display: "swap" });

const typekit = process.env.NEXT_PUBLIC_TYPEKIT_ID;
const SHARE_IMAGE = `${SITE_URL}/api/og`;

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const names = (await getSolutions()).map((s) => s.name.en).join(", ");
  const title = Tm(
    lang,
    "ePortal | Smart platforms for schools, fitness, healthcare, sales and retail",
    "ای پورٹل | اسکول، فٹنس، صحت، سیلز اور ریٹیل کے لیے سمارٹ پلیٹ فارمز",
  );
  const description = Tm(lang, `${names}: smart platforms built in Lahore.`, "لاہور میں تیار کردہ سمارٹ پلیٹ فارمز: اسکول ڈیسک اور مزید۔");
  return {
    metadataBase: new URL(SITE_URL),
    openGraph: { type: "website", siteName: "ePortal", title, description, url: "/", locale: lang, images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: "ePortal" }] },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE] },
    title: {
      default: Tm(
        lang,
        "ePortal | Smart platforms for schools, fitness, healthcare, sales and retail",
        "ای پورٹل | اسکول، فٹنس، صحت، سیلز اور ریٹیل کے لیے سمارٹ پلیٹ فارمز",
      ),
      template: "%s | ePortal",
    },
    description: Tm(
      lang,
      `${names}: smart platforms built in Lahore.`,
      "لاہور میں تیار کردہ سمارٹ پلیٹ فارمز: اسکول ڈیسک اور مزید۔",
    ),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const solutions = await getSolutions();

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${inter.variable} ${nastaliq.variable} ${arabic.variable}`}>
      <head>
        {/* roc-grotesk is an Adobe Fonts typeface: set NEXT_PUBLIC_TYPEKIT_ID to your web project id to load it. */}
        {typekit && <link rel="stylesheet" href={`https://use.typekit.net/${typekit}.css`} />}
      </head>
      <body>
        <SiteLoader />
        <JsonLd data={organizationGraph(lang, solutions)} />
        <MotionProvider>
          <SolutionsProvider solutions={solutions}>
            <ScrollProgress />
            <Track />
            <Header lang={lang} />
            <main>{children}</main>
            <Footer lang={lang} />
            <CallButton lang={lang} />
          </SolutionsProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
