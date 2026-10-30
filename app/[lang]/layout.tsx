import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MotionProvider, ScrollProgress } from "@/components/motion";
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
      "eSchool, Formed, Workflow Portal, Email Report Portal, Medical Coding AI, HayRoutes, AI Sales Agent and AXCEL POS: smart platforms built in Lahore.",
      "ای اسکول، فارمڈ، ورک فلو پورٹل، ای میل رپورٹ پورٹل، میڈیکل کوڈنگ اے آئی، ہے روٹس، اے آئی سیلز ایجنٹ اور ایکسل پی او ایس: لاہور میں تیار کردہ سمارٹ پلیٹ فارمز۔",
    ),
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
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

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${inter.variable} ${nastaliq.variable} ${arabic.variable}`}>
      <head>
        {/* roc-grotesk is an Adobe Fonts typeface: set NEXT_PUBLIC_TYPEKIT_ID to your web project id to load it. */}
        {typekit && <link rel="stylesheet" href={`https://use.typekit.net/${typekit}.css`} />}
      </head>
      <body>
        <MotionProvider>
          <ScrollProgress />
          <Header lang={lang} />
          <main>{children}</main>
          <Footer lang={lang} />
          <WhatsAppButton lang={lang} />
        </MotionProvider>
      </body>
    </html>
  );
}
