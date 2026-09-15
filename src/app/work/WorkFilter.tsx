"use client";

import { useSearchParams } from "next/navigation";
import type { Case, TagCount } from "@/lib/cases";
import WorkBrowser from "./WorkBrowser";

/**
 * 從網址讀目前的標籤。狀態完全放在網址上，不用 useState / useEffect，
 * 所以沒有「effect 裡 setState」那種多一輪 render 的問題。
 * 網址帶了不存在的標籤就當作「全部」。
 */
export default function WorkFilter({
  cases,
  tags,
}: {
  cases: Case[];
  tags: TagCount[];
}) {
  const raw = useSearchParams().get("tag");
  const activeTag = raw && tags.some((t) => t.tag === raw) ? raw : null;

  return <WorkBrowser cases={cases} tags={tags} activeTag={activeTag} />;
}
