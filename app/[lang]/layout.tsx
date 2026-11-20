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

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const names = (await getSolutions()).map((s) => s.name.en).join(", ");
  return {
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
