import Link from "next/link";
import Image from "next/image";

type CaseItem = {
  slug: string;
  name: string;
  tagline: string;
  stack: string;
  type: string;
  featured?: boolean;
  thumbnail?: string;
};

const cases: CaseItem[] = [
  {
    slug: "nail-art-reservation",
    name: "LINE 一條龍預約系統",
    tagline:
      "建置 LINE 官方帳號 + 預約網頁，讓客人在 LINE 裡完成所有預約流程——加好友、選服務、收提醒，全程不用切換 App。",
    stack: "LINE Bot · LIFF · Cloudflare Worker · Google Apps Script",
    type: "",
    featured: true,
    thumbnail: "/cases/nail-art-reservation/cover.jpg",
  },
  {
    slug: "my-coffee-site",
    name: "暮焙 MUBEI 咖啡豆電商 Demo",
    tagline:
      "咖啡豆網路商店 Demo。顧客端從逛單品、加購物車、結帳付款到看會員等級；店家端從接單、改狀態、調庫存、發優惠碼到印出貨單。",
    stack: "Next.js 16 · Tailwind 4 · Prisma 7 · Supabase · Auth.js v5 · ECPay / LINE Pay",
    type: "個人作品 · 全端電商 Demo",
    featured: true,
    thumbnail: "/cases/my-coffee-site/cover.jpg",
  },
  {
    slug: "condo-management",
    name: "社區物業收費管理系統",
    tagline:
      "給物業公司管多個社區、約 1000 戶的收費系統：算應收、用點陣印表機印三聯單、收款銷帳一條龍，並把自動備份做成最重要的功能，讓資料不再憑空消失。",
    stack: "C# · .NET WinForms · SQLite · 點陣印表機 ESC/P",
    type: "真實接案 · 桌面收費系統",
    featured: true,
    thumbnail: "/cases/condo-management/cover.jpg",
  },
  {
    slug: "voxplan",
    name: "VoxPlan 語音行事曆",
    tagline:
      "用講的就能建立行程。「明天下午兩點在咖啡廳跟 Amy 開會」自動拆成標題、時間、地點、人員。",
    stack: "Flutter · Firebase · FastAPI · Whisper / GPT-4o-mini",
    type: "個人 SaaS · iOS / Android ",
    thumbnail: "/cases/voxplan/cover.jpg",
  },
  {
    slug: "freedunk-hub",
    name: "Freedunk Hub",
    tagline:
      "為《Freedunk》玩家做的戰術分析工具——拖曳球員、Canvas 畫戰術線、一步步推演。",
    stack: "React · Canvas 2D API · 純前端單檔",
    type: "",
    thumbnail: "/cases/freedunk-hub/cover.jpg",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      {/* Hero */}
      <section className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_220px] md:items-center md:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Portfolio
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.2] tracking-tight md:text-5xl md:leading-[1.15]">
            用程式碼
            <br className="hidden md:block" />
            讓世界更便利
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-600 md:text-xl dark:text-zinc-400">
            我是 Alvin ，是一名獨立工程師，善於 LINE 生態系、網頁製作與 AI 應用，致力於替每位客戶客製化最適合的產品。<br />
            從接小型店家的預約系統到自己上架語音行事曆 APP，前端、後端到部署都是由自己開發、上架。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            <span>目前接案中</span>
            <span aria-hidden className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>台灣・繁體中文 / English</span>
          </div>
        </div>
        {/* 個人照片 */}
        <div className="relative aspect-square w-40 self-start overflow-hidden rounded-full md:w-[220px] md:self-center">
          <Image
            src="/me-v2.png"
            alt="Alvin"
            fill
            sizes="(min-width: 768px) 220px, 160px"
            className="origin-top scale-115 object-cover"
            priority
          />
        </div>
      </section>

      {/* Bento Grid: 主打作品 */}
      <section className="mt-24 md:mt-32">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            服務內容  
          </h2>
          
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className={[
                "group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 md:p-8",
                "hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-lg",
                "dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-50",
                c.featured ? "md:col-span-2" : "",
              ].join(" ")}
            >
              {/* 案例縮圖 */}
              <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                {c.thumbnail ? (
                  <Image
                    src={c.thumbnail}
                    alt={c.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-xs text-zinc-400"
                    aria-hidden
                  >
                    {c.name} 縮圖占位
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  {c.type}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                  {c.name}
                  <span
                    className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </h3>
                <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {c.tagline}
                </p>
                <p className="mt-3 text-sm text-zinc-500">{c.stack}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mt-24 md:mt-32">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          關於我
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            從 LINE 一條龍系統開始接案，後來也自己做了一款語音行事曆 APP 上架。
            主要做 LINE 生態系、AI 應用、中小型全端網站這三塊；從需求釐清、寫 code 到部署上線。
            <br />
            <br />
            如果你正在找一個能從零做到上線、過程中持續溝通的工程師，歡迎來信或私訊 LINE 官方帳號聊聊喔。
          </p>
          <ul className="space-y-5 text-zinc-700 dark:text-zinc-300">
            <li>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                LINE 生態系一條龍
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                官方帳號設定 · Bot / Webhook · LIFF · Rich Menu · 後端整合
              </p>
            </li>
            <li>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                AI 應用整合
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Whisper · GPT-4o-mini · Prompt Engineering · NLP Pipeline
              </p>
            </li>
            <li>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                全端網站與 SaaS
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Next.js · Flutter · Firebase · Cloudflare · Zeabur · GAS · Supabase
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 md:mt-32">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 md:p-12 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2 className="max-w-2xl text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
            聯絡 Alvin 討論你的想法，開始你專屬的專案
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            私訊 LINE 官方帳號或寄 Email 聊聊你的想法，評估「能不能做、預估時間、費用」，討論完成後馬上開始屬於你的專案。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://line.me/R/ti/p/%40989evvhq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              LINE
            </a>
            <a
              href="mailto:enghuang100@gmail.com"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t border-zinc-200 pt-8 text-sm text-zinc-500 md:mt-32 dark:border-zinc-800">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 · Built with Next.js + Tailwind</p>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="text-zinc-400 dark:text-zinc-600">聯絡方式</span>
            <p>
              LINE ID:{" "}
              <a
                href="https://line.me/R/ti/p/%40989evvhq"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition hover:text-zinc-900 hover:underline dark:hover:text-zinc-50"
              >
                @989evvhq
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:enghuang100@gmail.com"
                className="underline-offset-4 transition hover:text-zinc-900 hover:underline dark:hover:text-zinc-50"
              >
                enghuang100@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
