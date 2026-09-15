import type { Metadata } from "next";
import { Suspense } from "react";
import { cases, getAllTags } from "@/lib/cases";
import WorkBrowser from "./WorkBrowser";
import WorkFilter from "./WorkFilter";

export const metadata: Metadata = {
  title: "所有作品",
  description: "Alvin 做過的全部案例：LINE 官方帳號、網站、App、桌面軟體與 AI 應用。",
};

/**
 * 首頁是提案（左右交錯的大圖長條），這裡是目錄（標籤分頁 + 密一點的網格）。
 *
 * 靜態產生時讀不到網址參數，所以 Suspense 的 fallback 直接放「全部」版本 ——
 * 產出的 HTML 本身就有完整的作品清單，不是空殼；瀏覽器載入後再依 ?tag= 篩選。
 */
export default function WorkIndex() {
  const tags = getAllTags();

  return (
    <div className="mx-auto w-full max-w-[1000px] px-5 pt-12 pb-16 sm:px-8 md:px-15 md:pt-20 md:pb-24">
      <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
        All Work · {cases.length} Projects
        <span aria-hidden className="h-px flex-1 bg-rule" />
      </p>
      <h1
        className="mt-4 font-serif text-[clamp(2.25rem,6vw,4rem)] leading-[1.18] tracking-[-0.025em] text-balance"
        style={{ fontWeight: "var(--h1-weight)" }}
      >
        所有作品
      </h1>
      <p className="mt-5 max-w-[34em] text-base leading-[1.95] text-soft">
        每一個都是真的做完、而且還在跑的東西。點上面的分類只看你想看的，點進去看是解決什麼問題、怎麼做的。
      </p>

      <Suspense fallback={<WorkBrowser cases={cases} tags={tags} activeTag={null} />}>
        <WorkFilter cases={cases} tags={tags} />
      </Suspense>
    </div>
  );
}
