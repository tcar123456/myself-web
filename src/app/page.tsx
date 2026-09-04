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
    featured: true,
    thumbnail: "/cases/voxplan/cover.jpg",
  },
  {
    slug: "gamecoins",
    name: "GameCoins 自動盯盤與成本分析系統",
    tagline:
      "我自己做遊戲幣買賣的營運工具：每 5 秒自動看一次對岸平台的價格，便宜的貨一出現就通知手機，並直接算出這一單賺不賺。再把累積下來的紀錄排成「哪一天的哪個時段最划算」，用資料回答憑感覺答不出來的問題。",
    stack: "Python（零第三方依賴） · 資料抓取 · 統計分析 · Telegram Bot · LINE 官方帳號",
    type: "自有事業營運工具 · 已上線運作中",
    featured: true,
    thumbnail: "/cases/gamecoins/cover.jpg",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      {/* Hero */}
      <section className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_220px] md:items-center md:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            AI 應用整合工程師 · 獨立接案
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.2] tracking-tight md:text-5xl md:leading-[1.15]">
            讓 AI 真的
            <br className="hidden md:block" />
            幫你的生意做事
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-600 md:text-xl dark:text-zinc-400">
            我是 Alvin，AI 應用整合工程師。利用現成、成熟的大型語言模型（Claude、GPT、Gemini）串接、組裝成能解決你實際業務問題、而且能穩定上線運作的系統。<br />
            從 LINE 生態系、全端網站到 AI 自動化，需求釐清、開發到部署上線。
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
            src="/me-v3.jpg"
            alt="Alvin"
            fill
            sizes="(min-width: 768px) 220px, 160px"
            className="object-cover"
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
            這一年我把重心轉到 AI 應用整合：把成熟的大型語言模型串成能解決真實問題的工具——讓 AI 讀懂你自己的資料、幫你跑完多步驟的流程、接上你現有的系統與資料庫。底層需要的 API 串接、後端邏輯、資料庫與部署維運，正是我原本就在做的全端工作，AI 是往上疊、不是砍掉重練。
            <br />
            <br />
            如果你有一個「這件事能不能用 AI 幫我省下來」的想法，歡迎來信或私訊 LINE 官方帳號聊聊。
          </p>
          <ul className="space-y-5 text-zinc-700 dark:text-zinc-300">
            <li>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                AI 應用整合
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                LLM API · RAG 檢索增強 · Agent 自主任務 · MCP 工具協議 · 部署與成本控管
              </p>
            </li>
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
                全端網站與 SaaS
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Next.js · Flutter · Firebase · Supabase · Cloudflare · Zeabur
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
