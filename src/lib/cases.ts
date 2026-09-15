import casesData from "@/content/cases.json";

export type StackItem = {
  layer: string;
  tech: string;
};

/** 同一個案例有第二套實作時，用來與 `stack` 左右並排對照 */
export type StackAlt = {
  title: string;
  note?: string;
  items: StackItem[];
};

export type ArchitectureDecision = {
  title: string;
  body: string;
};

export type Feature = {
  title: string;
  problem: string;
  description?: string;
  image?: string;
  images?: string[];
  /** 截圖條卡片的 CSS aspect-ratio，預設 "9 / 19"（手機全螢幕截圖） */
  imagesAspect?: string;
};

export type Case = {
  slug: string;
  name: string;
  type: string;
  /** 首頁與「所有作品」卡片上的短標籤，比 `type` 短 */
  label: string;
  /** 首頁與「所有作品」卡片上的介紹，寫給非工程背景的客戶看 */
  tagline: string;
  /** 卡片縮圖，慣例是 `/cases/<slug>/cover.jpg` */
  thumbnail?: string;
  /** 「所有作品」頁的分類標籤，客戶看得到，不能用技術名詞 */
  tags?: string[];
  outcome: string;
  role: string;
  duration: string;
  websiteUrl?: string;
  /** 可公開試玩的體驗連結（LINE 官方帳號、Demo 站等） */
  demoUrl?: string;
  /** 試玩連結顯示的文字，省略時顯示網域 */
  demoLabel?: string;
  problem?: string;
  features: Feature[];
  solution?: {
    text: string;
    flow?: string;
  };
  stack: StackItem[];
  /** 有 stackAlt 時，這是左欄的標題；沒有就沿用預設的「技術棧」 */
  stackTitle?: string;
  stackAlt?: StackAlt;
  decisions: ArchitectureDecision[];
};

/**
 * 案例資料的唯一來源是 `src/content/cases.json`，由本地後台（`npm run admin`）讀寫。
 * 首頁、「所有作品」、詳情頁全部從這裡衍生，不要在別處再開一份陣列。
 */
export const cases: Case[] = casesData as Case[];

/** 首頁最多列幾個案例，其餘只在 `/work` 出現 */
export const HOME_CASE_LIMIT = 5;

export function getHomeCases(): Case[] {
  return cases.slice(0, HOME_CASE_LIMIT);
}

export type TagCount = { tag: string; count: number };

/** 所有出現過的標籤，案例多的排前面；同數量時照案例順序出現的先後 */
export function getAllTags(): TagCount[] {
  const seen = new Map<string, number>();
  for (const c of cases) {
    for (const t of c.tags ?? []) seen.set(t, (seen.get(t) ?? 0) + 1);
  }
  // Map 保留插入順序，sort 是穩定排序，所以同數量時自然照首次出現的順序
  return [...seen.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

export function getCase(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return cases.map((c) => c.slug);
}

export function getNextCase(slug: string): Case {
  const index = cases.findIndex((c) => c.slug === slug);
  return cases[(index + 1) % cases.length];
}
