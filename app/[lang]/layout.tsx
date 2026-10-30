import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MotionProvider, ScrollProgress } from "@/components/motion";
import { dirOf, isLang, locales } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  display: "swap",
});

const typekit = process.env.NEXT_PUBLIC_TYPEKIT_ID;

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const ur = lang === "ur";
  return {
    title: {
      default: ur ? "ای پورٹل | اسکول، فٹنس، صحت اور ڈرائیونگ کے لیے سمارٹ پلیٹ فارمز" : "ePortal | Smart platforms for schools, fitness, healthcare and driving",
      template: "%s | ePortal",
    },
    description: ur
      ? "ای اسکول، فارمڈ، پرائما پورٹل، ای میل رپورٹ پورٹل، پرو ایڈ میڈیکل اور ہے روٹس: لاہور میں تیار کردہ سمارٹ پلیٹ فارمز۔"
      : "eSchool, Formed, PRIMA Portal, Email Report Portal, ProEd Medical and HayRoutes: smart platforms built in Lahore.",
    alternates: { languages: { en: "/en", ur: "/ur" } },
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
    <html lang={lang} dir={dirOf(lang)} className={`${inter.variable} ${nastaliq.variable}`}>
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
