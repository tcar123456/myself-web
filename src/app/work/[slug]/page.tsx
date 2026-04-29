type Params = {
  slug: string;
};

export default async function WorkDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-24">
      <p className="text-sm text-zinc-500">案例詳情頁範本</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{slug}</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        案例詳情占位。下一步：套用案例頁結構（成果一句話 → 背景痛點 → 我的角色 → 解法 → 成果數據 → 技術棧 → 學到什麼）。
      </p>
    </main>
  );
}
