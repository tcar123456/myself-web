import Link from "next/link";
import Image from "next/image";
import type { Case, TagCount } from "@/lib/cases";

/**
 * 標籤分頁 + 作品網格。不用 hook，所以同時能當 Suspense 的靜態 fallback
 * （預設「全部」）和 client 端讀完網址參數後的版本。
 *
 * 分頁是連結不是按鈕：`/work?tag=AI` 可以直接丟給客戶，上一頁也照常運作。
 */
export default function WorkBrowser({
  cases,
  tags,
  activeTag,
}: {
  cases: Case[];
  tags: TagCount[];
  activeTag: string | null;
}) {
  const shown = activeTag
    ? cases.filter((c) => c.tags?.includes(activeTag))
    : cases;

  const tabs: { label: string; tag: string | null; count: number }[] = [
    { label: "全部", tag: null, count: cases.length },
    ...tags.map((t) => ({ label: t.tag, tag: t.tag, count: t.count })),
  ];

  return (
    <>
      {tags.length > 0 && (
        <nav
          aria-label="依類型篩選作品"
          className="-mx-5 mt-10 overflow-x-auto border-b border-rule px-5 sm:mx-0 sm:px-0 md:mt-14"
        >
          <ul className="flex min-w-max gap-7">
            {tabs.map((t) => {
              const active = t.tag === activeTag;
              return (
                <li key={t.label}>
                  <Link
                    href={t.tag ? { pathname: "/work", query: { tag: t.tag } } : "/work"}
                    scroll={false}
                    replace
                    aria-current={active ? "page" : undefined}
                    className={`-mb-px inline-flex min-h-12 items-center gap-1.5 border-b-2 text-[14.5px] transition-colors ${
                      active
                        ? "border-accent font-medium text-accent"
                        : "border-transparent text-soft hover:text-ink"
                    }`}
                  >
                    {t.label}
                    <span className="font-sans text-[11px] tabular-nums opacity-70">
                      {t.count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div
        className={`grid gap-x-8 gap-y-10 pt-10 sm:grid-cols-2 md:gap-y-14 ${
          tags.length > 0 ? "" : "mt-10 border-t border-rule md:mt-14"
        }`}
      >
        {shown.map((c) => (
          <article key={c.slug}>
            <Link href={`/work/${c.slug}`} className="group block">
              <div className="relative aspect-video w-full overflow-hidden border border-rule bg-paper">
                {c.thumbnail ? (
                  <Image
                    src={c.thumbnail}
                    alt={c.name}
                    fill
                    sizes="(min-width: 640px) 460px, 100vw"
                    className="shot-dim object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-soft">
                    {c.name} 縮圖待補
                  </span>
                )}
              </div>

              <p className="mt-4 text-[10.5px] font-semibold tracking-[0.18em] text-accent uppercase">
                {c.label}
              </p>
              <h2 className="mt-2 font-serif text-[21px] font-bold leading-[1.42] tracking-[-0.01em] transition-colors group-hover:text-accent">
                {c.name}
                <span
                  aria-hidden
                  className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </h2>
              <p className="mt-2.5 line-clamp-3 text-[14.5px] leading-[1.9] text-soft">
                {c.tagline}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
