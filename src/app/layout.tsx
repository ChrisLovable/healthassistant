import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n/provider";
import { getLang } from "@/lib/i18n/lang-server";
import { PWARegister } from "@/components/PWARegister";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-playfair", display: "swap" });
const inter    = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "MyMedic — AI Health Navigation for South Africa",
  description: "Multilingual health information and AI chatbot for South Africa. Available in English, Afrikaans, isiZulu, and isiXhosa.",
  applicationName: "MyMedic",
  appleWebApp: {
    capable: true,
    title: "MyMedic",
    statusBarStyle: "default",
  },
  icons: {
    icon: [{ url: "/192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <PWARegister />
        <LangProvider initialLang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}