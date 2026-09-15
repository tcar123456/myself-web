import type { Metadata } from "next";
import { Inter, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactRail from "@/components/ContactRail";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-tc",
  display: "swap",
  preload: false,
});

const notoSerifTC = Noto_Serif_TC({
  weight: ["700", "900"],
  variable: "--font-noto-serif-tc",
  display: "swap",
  preload: false,
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const siteName = "Alvin · 獨立工程師作品集";
const siteDescription =
  "一個人接案的工程師 Alvin。做 LINE 官方帳號、網站，也把 AI 接進既有流程。需求、開發、上線同一個人。";

/*
  一律開燈進站，所以只有「上次按過關燈」的回訪者需要在畫面畫出來之前補上屬性。
  這段必須同步執行，晚一步就會閃一下白色。
*/
const themeScript = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s · Alvin",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName,
    title: siteName,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${inter.variable} ${notoSansTC.variable} ${notoSerifTC.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ContactRail />
      </body>
    </html>
  );
}
