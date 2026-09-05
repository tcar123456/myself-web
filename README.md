# Alvin · 獨立工程師作品集

個人作品集網站。首頁列出服務內容與專案卡片，每個專案有獨立的 case study 頁。

**線上版本**：https://myself-web-psi.vercel.app

---

## 技術棧

Next.js 16（App Router）· TypeScript · Tailwind v4 · Vercel

刻意保持零額外執行期依賴——`package.json` 的 dependencies 只有 next、react、react-dom。

## 設計重點

**Case study 用 Markdown 管理。** 每個專案是 `case-studies/` 下的一個 `.md`，由 `src/lib/cases.ts` 讀取，`src/app/work/[slug]/page.tsx` 動態產生頁面。新增一個作品只需要多一個檔案，不用改元件。

**OG image 由程式產生。** `opengraph-image.tsx` 與 `icon.tsx` 用 Next.js 的 ImageResponse 在建置時產出，不維護靜態圖片。

**全站靜態產生。** 沒有資料庫也沒有 API route，部署後就是純靜態資源。

## 開始開發

```bash
npm install
npm run dev      # http://localhost:3000
```

新增作品：在 `case-studies/` 建立 `<slug>.md`，路由 `/work/<slug>` 會自動出現。

## 專案結構

```
case-studies/            各專案的 Markdown 內容
src/app/page.tsx         首頁
src/app/work/[slug]/     Case study 動態路由
src/lib/cases.ts         Markdown 讀取與解析
src/components/          ZoomableImage 等共用元件
```

## 待辦

- 換上自有網域（目前是 Vercel 預設子網域）
- 加上英文版
