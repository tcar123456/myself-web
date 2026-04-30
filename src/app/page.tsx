import Link from "next/link";

type CaseItem = {
  slug: string;
  name: string;
  tagline: string;
  stack: string;
  type: string;
  featured?: boolean;
};

const cases: CaseItem[] = [
  {
    slug: "nail-art-reservation",
    name: "LINE 美甲預約系統",
    tagline:
      "客人在 LINE 裡完成所有預約流程——加好友、選服務、收提醒，全程不用切換 App。",
    stack: "LINE Bot · LIFF · Cloudflare Worker · Google Apps Script",
    type: "",
    featured: true,
  },
  {
    slug: "voxplan",
    name: "VoxPlan 語音行事曆",
    tagline:
      "用講的就能建立行程。「明天下午兩點在咖啡廳跟 Amy 開會」自動拆成標題、時間、地點、人員。",
    stack: "Flutter · Firebase · FastAPI · Whisper / GPT-4o-mini",
    type: "個人 SaaS · iOS / Android 上架審核中",
  },
  {
    slug: "freedunk-hub",
    name: "Freedunk Hub",
    tagline:
      "為《Freedunk》玩家做的戰術分析工具——拖曳球員、Canvas 畫戰術線、一步步推演。",
    stack: "React · Canvas 2D API · 純前端單檔",
    type: "個人作品",
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
            把 LINE 變成一條
            <br className="hidden md:block" />
            完整的服務動線。
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-600 md:text-xl dark:text-zinc-400">
            獨立工程師，專注 LINE 生態系與 AI 應用。
            從接小型店家的預約系統到自己上架語音行事曆 APP，從前端、後端到部署都是由自己開發。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            <span>目前接案中</span>
            <span aria-hidden className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>台灣・繁體中文 / English</span>
          </div>
        </div>
        {/* 露臉照片占位：替換成真實照片時，建議使用 next/image 與圓形剪裁 */}
        <div
          aria-label="個人照片占位"
          className="aspect-square w-40 self-start overflow-hidden rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 md:w-[220px] md:self-center dark:from-zinc-800 dark:to-zinc-900"
        >
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
            照片占位
          </div>
        </div>
      </section>

      {/* Bento Grid: 主打作品 */}
      <section className="mt-24 md:mt-32">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            主打作品  
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
              {/* 案例縮圖占位 */}
              <div
                className={[
                  "mb-6 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900",
                  c.featured ? "aspect-[16/7]" : "aspect-[16/9]",
                ].join(" ")}
                aria-hidden
              >
                <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                  {c.name} 縮圖占位
                </div>
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
            從美甲店的 LINE 預約系統開始接案，後來也自己做了一款語音行事曆 APP 上架。
            主要做 LINE 生態系、AI 應用、全端網站這三塊；從需求釐清、寫 code 到部署上線。
            <br />
            <br />
            如果你正在找一個能從零做到上線、過程中持續溝通的工程師，歡迎來信或加 LINE 聊聊，
            我會直接告訴你能不能做、怎麼做。
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
                Next.js · Flutter · Firebase · Cloudflare · Zeabur · GAS
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 md:mt-32">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 md:p-12 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2 className="max-w-2xl text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
            想評估你的 LINE 預約系統 / AI 應用 / 全端網站？
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            加 LINE 或寄 Email 都可以。先聊聊你的需求，
            我會直接告訴你「能不能做、預估時間、大概的費用區間」，討論完成後馬上開始你的專屬專案。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium transition hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-50"
            >
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t border-zinc-200 pt-8 text-sm text-zinc-500 md:mt-32 dark:border-zinc-800">
        <p>© 2026 · Built with Next.js + Tailwind</p>
      </footer>
    </div>
  );
}
