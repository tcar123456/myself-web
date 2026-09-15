import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases, getCase, getNextCase, type StackItem } from "@/lib/cases";
import ZoomableImage from "@/components/ZoomableImage";

type Params = { slug: string };

/** 兩套技術棧並排時用的單欄；窄欄放不下「層｜技術」表格，改成上下堆疊的定義清單 */
function StackColumn({
  title,
  note,
  items,
}: {
  title: string;
  note?: string;
  items: StackItem[];
}) {
  return (
    <div className="border border-rule p-5">
      <p className="text-sm font-medium text-ink">
        {title}
      </p>
      {note && (
        <p className="mt-2 text-xs leading-relaxed text-soft">{note}</p>
      )}
      <dl className="mt-5 space-y-4">
        {items.map((s, i) => (
          <div key={i}>
            <dt className="text-xs text-soft">{s.layer}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-body">
              {s.tech}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "案例不存在" };
  return {
    title: `${c.name} · 案例詳情`,
    description: c.outcome,
  };
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const next = getNextCase(slug);

  const hasTechDetails =
    c.solution !== undefined ||
    c.stack.length > 0 ||
    c.stackAlt !== undefined ||
    c.decisions.length > 0;

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-20">
      <Link
        href="/work"
        className="inline-flex min-h-11 items-center text-sm text-soft transition hover:text-accent"
      >
        ← 所有作品
      </Link>

      {/* Hero */}
      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-soft">
          {c.type}
        </p>
        <h1
          className="mt-4 font-serif text-[clamp(1.875rem,5vw,2.75rem)] leading-[1.22] tracking-[-0.02em] text-balance"
          style={{ fontWeight: "var(--h1-weight)" }}
        >
          {c.name}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-body">
          {c.outcome}
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-soft">角色</dt>
            <dd className="mt-1 leading-snug text-ink">
              {c.role}
            </dd>
          </div>
          <div>
            <dt className="text-soft">時程</dt>
            <dd className="mt-1 text-ink">
              {c.duration}
            </dd>
          </div>
          {c.demoUrl && (
            <div>
              <dt className="text-soft">試玩</dt>
              <dd className="mt-1">
                <a
                  href={c.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-4"
                >
                  {c.demoLabel ?? new URL(c.demoUrl).hostname} ↗
                </a>
              </dd>
            </div>
          )}
          {c.websiteUrl && (
            <div>
              <dt className="text-soft">官網</dt>
              <dd className="mt-1">
                <a
                  href={c.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-4"
                >
                  {new URL(c.websiteUrl).hostname} ↗
                </a>
              </dd>
            </div>
          )}
        </dl>
      </header>

      {/* 解決了什麼問題 */}
      {c.problem && (
        <section className="mt-16">
          <h2 className="font-serif text-[22px] font-black tracking-[-0.015em] md:text-[26px]">
            解決問題
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-body">
            {c.problem}
          </p>
        </section>
      )}

      {/* 主要功能（核心區） */}
      <section className="mt-16 md:mt-20">
        <h2 className="font-serif text-[22px] font-black tracking-[-0.015em] md:text-[26px]">
          主要功能
        </h2>
        <div className="mt-8 space-y-16 md:space-y-20">
          {c.features.map((f, i) => (
            <div key={i}>
              {/* 截圖 */}
              {f.images && f.images.length > 0 ? (
                (() => {
                  const galleryItems = f.images.map((src, k) => ({
                    src,
                    alt: `${f.title} - ${k + 1}`,
                  }));
                  return (
                    <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:gap-4 sm:px-0">
                      {f.images.map((img, j) => (
                        <div
                          key={j}
                          style={{ aspectRatio: f.imagesAspect ?? "9 / 19" }}
                          className="relative w-[180px] flex-shrink-0 overflow-hidden border border-rule bg-paper sm:w-[200px]"
                        >
                          <ZoomableImage
                            src={img}
                            alt={`${f.title} - ${j + 1}`}
                            fill
                            sizes="200px"
                            className="object-contain"
                            gallery={galleryItems}
                            galleryIndex={j}
                          />
                        </div>
                      ))}
                    </div>
                  );
                })()
              ) : f.image ? (
                <div className="overflow-hidden border border-rule bg-paper">
                  <ZoomableImage
                    src={f.image}
                    alt={f.title}
                    width={1600}
                    height={900}
                    className="h-auto w-full"
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 overflow-hidden border border-rule bg-paper text-xs text-soft">
                  <span className="text-2xl" aria-hidden>
                    ▢
                  </span>
                  <span>截圖待補</span>
                </div>
              )}
              {/* 文字 */}
              <div className="mt-6">
                <h3 className="font-serif text-[22px] font-black tracking-[-0.015em] md:text-[26px]">
                  {f.title}
                </h3>
                <p className="mt-3 leading-relaxed text-body">
                  {f.problem}
                </p>
                {f.description && (
                  <p className="mt-2 text-sm leading-relaxed text-soft">
                    {f.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 技術細節 */}
      {hasTechDetails && (
        <section className="mt-20 md:mt-24">
          <h2 className="font-serif text-[22px] font-black tracking-[-0.015em] md:text-[26px]">
            技術細節
          </h2>
          <div className="mt-8 space-y-10">
              {c.solution && (
                <div>
                  
                  <p className="mt-3 leading-relaxed text-body">
                    {c.solution.text}
                  </p>
                  {c.solution.flow && (
                    <pre className="mt-5 overflow-x-auto bg-paper p-5 text-xs leading-relaxed text-body">
                      {c.solution.flow}
                    </pre>
                  )}
                </div>
              )}

              {c.stackAlt ? (
                <div>
                  <h3 className="font-serif text-[17px] font-bold tracking-[-0.01em]">
                    技術棧
                  </h3>
                  <div className="mt-4 grid gap-6 md:grid-cols-2">
                    <StackColumn
                      title={c.stackTitle ?? "原版"}
                      items={c.stack}
                    />
                    <StackColumn
                      title={c.stackAlt.title}
                      note={c.stackAlt.note}
                      items={c.stackAlt.items}
                    />
                  </div>
                </div>
              ) : (
                c.stack.length > 0 && (
                <div>
                  <h3 className="font-serif text-[17px] font-bold tracking-[-0.01em]">
                    技術棧
                  </h3>
                  <table className="mt-3 w-full text-sm">
                    <thead>
                      <tr className="text-left text-soft">
                        <th className="pb-3 font-normal">層</th>
                        <th className="pb-3 font-normal">技術</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {c.stack.map((s, i) => (
                        <tr key={i}>
                          <td className="py-3 pr-4 align-top font-medium text-ink">
                            {s.layer}
                          </td>
                          <td className="py-3 leading-relaxed text-body">
                            {s.tech}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )
              )}

              {c.decisions.length > 0 && (
                <div>
                  <h3 className="font-serif text-[17px] font-bold tracking-[-0.01em]">
                    架構決策
                  </h3>
                  <ul className="mt-4 space-y-5">
                    {c.decisions.map((d, i) => (
                      <li key={i}>
                        <p className="font-medium text-ink">
                          {d.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">
                          {d.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </section>
      )}

      {/* 下一個案例 + 回首頁 */}
      <nav className="mt-24 grid grid-cols-1 gap-4 border-t border-rule pt-8 sm:grid-cols-2">
        <Link
          href={`/work/${next.slug}`}
          className="group border border-rule p-6 transition hover:border-accent"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-soft">
            下一個案例
          </p>
          <p className="mt-2 font-serif text-lg font-bold tracking-tight">
            {next.name}
            <span
              className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </p>
        </Link>
        <Link
          href="/"
          className="group border border-rule p-6 transition hover:border-accent"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-soft">
            回到
          </p>
          <p className="mt-2 font-serif text-lg font-bold tracking-tight">
            首頁
            <span
              className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </p>
        </Link>
      </nav>
    </article>
  );
}
