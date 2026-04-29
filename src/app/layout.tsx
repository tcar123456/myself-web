import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "作品集（Portfolio）",
  description: "LINE 生態系與 AI 應用作品集 — 個人作品與接案紀錄",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${inter.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
