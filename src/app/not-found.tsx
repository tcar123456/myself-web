import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "找不到頁面",
  robots: { index: false },
};

/*
  Next 內建的 404 會跟著系統深色模式把整頁變黑，破壞「一律開燈進站」，
  所以換成走站台 token 的版本。刪掉的案例網址、線上的 /admin 都會落到這裡。
*/
export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-5 pt-16 pb-24 sm:px-8 md:px-15 md:pt-28 md:pb-36">
      <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
        404
        <span aria-hidden className="h-px flex-1 bg-rule" />
      </p>
      <h1
        className="mt-6 font-serif text-[clamp(2.25rem,6vw,4rem)] leading-[1.18] tracking-[-0.025em] text-balance"
        style={{ fontWeight: "var(--h1-weight)" }}
      >
        找不到這個頁面
      </h1>
      <p className="mt-5 max-w-[32em] text-base leading-[1.95] text-soft">
        可能是網址打錯，或這個作品已經下架了。
      </p>
      <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center gap-2 border-b border-accent pb-0.5 text-[15px] font-medium text-ink transition-colors hover:text-accent"
        >
          看所有作品 <span aria-hidden>→</span>
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 border-b border-rule pb-0.5 text-[15px] text-soft transition-colors hover:border-accent hover:text-ink"
        >
          回首頁
        </Link>
      </div>
    </div>
  );
}
