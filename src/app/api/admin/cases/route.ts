import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import { ADMIN_ENABLED, CASES_JSON, isSafeSlug } from "@/lib/admin-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function blocked() {
  return NextResponse.json({ error: "後台只在本機可用" }, { status: 404 });
}

export async function GET() {
  if (!ADMIN_ENABLED) return blocked();
  const raw = await fs.readFile(CASES_JSON, "utf8");
  return NextResponse.json(JSON.parse(raw));
}

export async function PUT(request: Request) {
  if (!ADMIN_ENABLED) return blocked();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON 解析失敗" }, { status: 400 });
  }

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "最外層必須是陣列" }, { status: 400 });
  }

  // 只擋會讓網站壞掉的東西：缺必填欄位、slug 不合法、slug 重複
  const seen = new Set<string>();
  for (const [i, c] of body.entries()) {
    const at = `第 ${i + 1} 筆`;
    if (typeof c !== "object" || c === null) {
      return NextResponse.json({ error: `${at}不是物件` }, { status: 400 });
    }
    const item = c as Record<string, unknown>;
    if (!isSafeSlug(item.slug)) {
      return NextResponse.json(
        { error: `${at}的 slug 不合法（只允許小寫英數與連字號）` },
        { status: 400 }
      );
    }
    if (seen.has(item.slug)) {
      return NextResponse.json({ error: `slug 重複：${item.slug}` }, { status: 400 });
    }
    seen.add(item.slug);

    for (const field of ["name", "type", "label", "tagline", "outcome", "role", "duration"]) {
      if (typeof item[field] !== "string" || !item[field]) {
        return NextResponse.json({ error: `${at}（${item.slug}）缺少 ${field}` }, { status: 400 });
      }
    }
    for (const field of ["features", "stack", "decisions"]) {
      if (!Array.isArray(item[field])) {
        return NextResponse.json({ error: `${at}（${item.slug}）的 ${field} 必須是陣列` }, { status: 400 });
      }
    }
    if (
      item.tags !== undefined &&
      (!Array.isArray(item.tags) ||
        !item.tags.every((t) => typeof t === "string" && t.trim() !== ""))
    ) {
      return NextResponse.json({ error: `${at}（${item.slug}）的標籤格式不對` }, { status: 400 });
    }
  }

  await fs.writeFile(CASES_JSON, JSON.stringify(body, null, 2) + "\n", "utf8");
  return NextResponse.json({ ok: true, count: body.length });
}
