import path from "node:path";

/**
 * 後台只在本機開發時存在。
 *
 * 兩道鎖：
 * 1. 這個旗標在 production build 是 false，`/admin` 與 `/api/admin/*` 直接變 404。
 * 2. 就算繞過第一道，Vercel 的檔案系統是唯讀的，寫檔本來就不可能成功。
 */
export const ADMIN_ENABLED = process.env.NODE_ENV !== "production";

export const CASES_JSON = path.join(process.cwd(), "src", "content", "cases.json");
export const PUBLIC_CASES_DIR = path.join(process.cwd(), "public", "cases");

/** slug 會變成資料夾名稱，只允許小寫英數與連字號，擋掉 ../ 這類路徑逃逸 */
export function isSafeSlug(slug: unknown): slug is string {
  return typeof slug === "string" && /^[a-z0-9][a-z0-9-]{0,63}$/.test(slug);
}

/** 上傳檔名同理，另外限制副檔名 */
export function isSafeFilename(name: unknown): name is string {
  return (
    typeof name === "string" &&
    /^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/.test(name) &&
    /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(name)
  );
}
