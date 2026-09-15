import Link from "next/link";
import Image from "next/image";
import { getHomeCases, cases } from "@/lib/cases";

const LINE_URL = "https://line.me/R/ti/p/%40989evvhq";
const EMAIL_URL = "mailto:enghuang100@gmail.com";

const skills = [
  {
    title: "AI 應用整合",
    detail:
      "LLM API · RAG 檢索增強 · Agent 自主任務 · MCP 工具協議 · 部署與成本控管",
  },
  {
    title: "LINE 生態系一條龍",
    detail: "官方帳號設定 · Bot / Webhook · LIFF · Rich Menu · 後端整合",
  },
  {
    title: "全端網站與 SaaS",
    detail: "Next.js · Flutter · Firebase · Supabase · Cloudflare · Zeabur",
  },
];

export default function Home() {
  const homeCases = getHomeCases();
  const hasMore = cases.length > homeCases.length;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="mx-auto w-full max-w-[1000px] px-5 pt-12 pb-10 sm:px-8 md:px-15 md:pt-24 md:pb-18">
        <div className="grid gap-7 md:grid-cols-[1fr_210px] md:items-end md:gap-12">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
              Independent Engineer · Taiwan
              <span aria-hidden className="h-px flex-1 bg-rule" />
            </p>

            <h1
              className="mt-6 font-serif text-[clamp(2.5rem,6.2vw,5.375rem)] leading-[1.12] tracking-[-0.025em] text-balance"
              style={{ fontWeight: "var(--h1-weight)" }}
            >
              {/* 兩行各 7 個字：原本「丟給會自己跑的系統」9 個字塞不進欄寬，手機上會掉一個「統」到第三行 */}
              把重複的事丟給
              <br />
              <span className="text-accent">會自己跑的系統</span>
            </h1>

            <p className="mt-6 max-w-[34em] text-base leading-[1.95] text-soft md:text-lg">
              我是 Alvin，一個人接案。做 LINE
              官方帳號、網站，也把 AI 接進去幫店家省掉每天都要重做一次的事。需求、開發、上線，從頭到尾同一個人。
            </p>

            <p className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-rule pt-4 text-[13.5px] text-soft">
              <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-accent" />
              目前接案中　·　台灣　·　繁體中文 / English
            </p>
          </div>

          <figure className="shot-dim m-0 w-40 grayscale-[0.12] md:w-full md:self-center">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/me-v3.jpg"
                alt="Alvin"
                fill
                sizes="(min-width: 768px) 210px, 160px"
                className="object-cover object-[center_22%]"
                priority
              />
            </div>
            <figcaption className="mt-2 text-[10.5px] tracking-[0.14em] text-soft uppercase">
              Alvin
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── 案例 ── */}
      <section className="mx-auto w-full max-w-[1000px] px-5 pt-10 sm:px-8 md:px-15 md:pt-18">
        <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
          Selected Work
          <span aria-hidden className="h-px flex-1 bg-rule" />
        </p>
        <h2 className="mt-4 font-serif text-[clamp(1.75rem,4.2vw,2.875rem)] font-black leading-[1.3] tracking-[-0.02em]">
          做過的東西
        </h2>

        <div className="mt-7 md:mt-11">
          {homeCases.map((c, i) => (
            <article
              key={c.slug}
              className="grid gap-5 border-t border-rule py-9 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-11 md:py-14"
            >
              <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                <div className="relative aspect-video w-full border border-rule bg-paper">
                  {c.thumbnail ? (
                    <Image
                      src={c.thumbnail}
                      alt={c.name}
                      fill
                      sizes="(min-width: 768px) 560px, 100vw"
                      className="shot-dim object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-soft">
                      {c.name} 縮圖待補
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[10.5px] font-semibold tracking-[0.18em] text-accent uppercase">
                  {c.label}
                </p>
                <h3
                  className="mt-3 font-serif text-[clamp(1.375rem,2.8vw,2rem)] font-bold leading-[1.38] tracking-[-0.01em]"
                >
                  {c.name}
                </h3>
                <p className="mt-3.5 text-[15.5px] leading-[1.95] text-soft">
                  {c.tagline}
                </p>
                <Link
                  href={`/work/${c.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-accent pb-0.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  看這個案子 <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="border-t border-rule pt-8">
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 border-b border-accent pb-0.5 text-[15px] font-medium text-ink transition-colors hover:text-accent"
            >
              看全部 {cases.length} 個作品 <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </section>

      {/* ── 關於 ── */}
      <section
        id="about"
        className="mt-11 bg-paper py-11 transition-colors duration-400 md:mt-19 md:py-19"
      >
        <div className="mx-auto w-full max-w-[1000px] px-5 sm:px-8 md:px-15">
          <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:gap-14">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
                About
                <span aria-hidden className="h-px flex-1 bg-rule" />
              </p>
              <h2 className="mt-4 font-serif text-[clamp(1.75rem,4.2vw,2.875rem)] font-black leading-[1.3] tracking-[-0.02em]">
                關於我
              </h2>
              <p className="mt-5 max-w-[36em] text-base leading-[2.05]">
                這一年重心放在把 AI
                接進真的在跑的系統裡：讓它讀得懂你自己的資料、跑完多步驟的流程、接上你現有的資料庫。底下需要的
                API、後端、資料庫、部署，本來就是我在做的事，AI 是疊上去，不是砍掉重來。
              </p>
              <p className="mt-5 max-w-[36em] text-base leading-[2.05]">
                如果你手上有一件「這個能不能讓電腦自己做」的事，寫信或加 LINE 跟我說。
              </p>
            </div>

            <ul className="grid gap-5">
              {skills.map((s) => (
                <li key={s.title} className="border-l-2 border-accent pl-4.5">
                  <b className="block text-base font-bold">{s.title}</b>
                  <span className="mt-1 block text-[13.5px] leading-[1.8] text-soft">
                    {s.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cta py-12 text-cta-ink transition-colors duration-400 md:py-21">
        <div className="mx-auto w-full max-w-[1000px] px-5 sm:px-8 md:px-15">
          <h2 className="max-w-[20em] font-serif text-[clamp(1.75rem,4.2vw,2.875rem)] font-black leading-[1.3] tracking-[-0.02em]">
            有想法就來聊，先問能不能做
          </h2>
          <p className="mt-4.5 max-w-[32em] text-base leading-[1.95] text-cta-soft">
            LINE 或 Email 都可以。先講你想解決什麼，我回你能不能做、大概要多久、多少錢。談得攏就開始。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center bg-btn px-7 text-[15px] font-bold text-btn-ink transition-transform hover:-translate-y-0.5"
            >
              加 LINE 聊聊
            </a>
            <a
              href={EMAIL_URL}
              className="inline-flex min-h-12 items-center px-7 text-[15px] font-bold text-[var(--btn-ghost-ink)] shadow-[inset_0_0_0_1px_var(--btn-ghost-line)] transition-transform hover:-translate-y-0.5"
            >
              寄 Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
