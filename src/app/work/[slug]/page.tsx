import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cases, getCase, getNextCase } from "@/lib/cases";

type Params = { slug: string };

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
    c.decisions.length > 0;

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-12 md:py-20">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        ← 回首頁
      </Link>

      {/* Hero */}
      <header className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          {c.type}
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {c.name}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
          {c.outcome}
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-zinc-200 pt-6 text-sm sm:grid-cols-3 dark:border-zinc-800">
          <div>
            <dt className="text-zinc-500">角色</dt>
            <dd className="mt-1 leading-snug text-zinc-900 dark:text-zinc-50">
              {c.role}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">時程</dt>
            <dd className="mt-1 text-zinc-900 dark:text-zinc-50">
              {c.duration}
            </dd>
          </div>
          {c.websiteUrl && (
            <div>
              <dt className="text-zinc-500">官網</dt>
              <dd className="mt-1">
                <a
                  href={c.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                >
                  {new URL(c.websiteUrl).hostname} ↗
                </a>
              </dd>
            </div>
          )}
        </dl>
      </header>

      {/* 解決了什麼問題 */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          解決問題
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {c.problem}
        </p>
      </section>

      {/* 主要功能（核心區） */}
      <section className="mt-16 md:mt-20">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          主要功能
        </h2>
        <div className="mt-8 space-y-16 md:space-y-20">
          {c.features.map((f, i) => (
            <div key={i}>
              {/* 截圖 */}
              {f.images && f.images.length > 0 ? (
                <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:gap-4 sm:px-0">
                  {f.images.map((img, j) => (
                    <div
                      key={j}
                      className="relative aspect-[9/19] w-[180px] flex-shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 sm:w-[200px]"
                    >
                      <Image
                        src={img}
                        alt={`${f.title} - 步驟 ${j + 1}`}
                        fill
                        sizes="200px"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              ) : f.image ? (
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <Image
                    src={f.image}
                    alt={f.title}
                    width={1600}
                    height={900}
                    className="h-auto w-full"
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 text-xs text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="text-2xl" aria-hidden>
                    ▢
                  </span>
                  <span>截圖待補</span>
                </div>
              )}
              {/* 文字 */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {f.title}
                </h3>
                <p className="mt-3 leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {f.problem}
                </p>
                {f.description && (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
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
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            技術細節
          </h2>
          <div className="mt-8 space-y-10">
              {c.solution && (
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    解法概述
                  </h3>
                  <p className="mt-3 leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {c.solution.text}
                  </p>
                  {c.solution.flow && (
                    <pre className="mt-5 overflow-x-auto rounded-lg bg-zinc-50 p-5 text-xs leading-relaxed text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                      {c.solution.flow}
                    </pre>
                  )}
                </div>
              )}

              {c.stack.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    技術棧
                  </h3>
                  <table className="mt-3 w-full text-sm">
                    <thead>
                      <tr className="text-left text-zinc-500">
                        <th className="pb-3 font-normal">層</th>
                        <th className="pb-3 font-normal">技術</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {c.stack.map((s, i) => (
                        <tr key={i}>
                          <td className="py-3 pr-4 align-top font-medium text-zinc-900 dark:text-zinc-50">
                            {s.layer}
                          </td>
                          <td className="py-3 leading-relaxed text-zinc-700 dark:text-zinc-300">
                            {s.tech}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {c.decisions.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    架構決策亮點
                  </h3>
                  <ul className="mt-4 space-y-5">
                    {c.decisions.map((d, i) => (
                      <li key={i}>
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">
                          {d.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
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
      <nav className="mt-24 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800">
        <Link
          href={`/work/${next.slug}`}
          className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-50"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            下一個案例
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight">
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
          className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-50"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            回到
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight">
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
