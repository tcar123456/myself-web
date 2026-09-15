import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import {
  ADMIN_ENABLED,
  PUBLIC_CASES_DIR,
  isSafeFilename,
  isSafeSlug,
} from "@/lib/admin-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!ADMIN_ENABLED) {
    return NextResponse.json({ error: "後台只在本機可用" }, { status: 404 });
  }

  const form = await request.formData();
  const slug = form.get("slug");
  const file = form.get("file");

  if (!isSafeSlug(slug)) {
    return NextResponse.json({ error: "slug 不合法" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "沒有收到檔案" }, { status: 400 });
  }
  if (!isSafeFilename(file.name)) {
    return NextResponse.json(
      { error: "檔名不合法，只收 jpg / png / webp / gif / svg" },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "檔案超過 8MB" }, { status: 400 });
  }

  const dir = path.join(PUBLIC_CASES_DIR, slug);
  await fs.mkdir(dir, { recursive: true });

  const target = path.join(dir, file.name);
  // 再確認一次算出來的路徑真的在 public/cases 底下
  if (!target.startsWith(PUBLIC_CASES_DIR + path.sep)) {
    return NextResponse.json({ error: "路徑不合法" }, { status: 400 });
  }

  let overwritten = true;
  try {
    await fs.access(target);
  } catch {
    overwritten = false;
  }

  await fs.writeFile(target, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({
    ok: true,
    path: `/cases/${slug}/${file.name}`,
    overwritten,
  });
}
