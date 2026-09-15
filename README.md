# Alvin · 獨立工程師作品集

個人作品集網站。首頁用大圖排出代表作品，「所有作品」頁可以依類型篩選，每個作品有獨立的 case study 頁。

**線上版本**：https://myself-web-psi.vercel.app

---

## 技術棧

Next.js 16（App Router）· TypeScript · Tailwind v4 · Vercel

刻意保持零額外執行期依賴——`package.json` 的 dependencies 只有 next、react、react-dom。

## 設計重點

**作品資料只有一份。** 全部放在 `src/content/cases.json`，首頁、所有作品頁、case study 頁都從這裡讀。新增一個作品只要多一筆資料，不用改元件，路由 `/work/<slug>` 會自動出現。

**本地後台，線上不存在。** `npm run admin` 開起來後到 `/admin`，用表單新增或修改作品、上傳截圖，存檔直接寫進 `cases.json` 和 `public/cases/<slug>/`，要上線還是自己 commit + push。production build 裡 `/admin` 和它的 API 一律回 404，後台介面的程式碼也不會被打包進去。

**關燈模式。** 右上角可以切換成深色版，選擇會記住。進站一律是開燈，刻意不跟系統的深色模式走——每個人看到的第一眼都一樣。

**所有作品可以依類型篩選。** 篩選狀態放在網址上（`/work?tag=AI`），篩好的連結可以直接傳給別人。

**OG image 由程式產生。** `opengraph-image.tsx` 與 `icon.tsx` 用 Next.js 的 ImageResponse 在建置時產出，不維護靜態圖片。

**頁面全部靜態產生。** 沒有資料庫；API route 只給本機後台用，線上一律回 404。

## 開始開發

```bash
npm install
npm run dev      # http://localhost:3000
npm run admin    # 跟 dev 一樣，到 http://localhost:3000/admin 管理作品
```

新增作品：開 `/admin` 按「新增案例」，或直接在 `src/content/cases.json` 加一筆。首頁最多列 5 個（`HOME_CASE_LIMIT`），其餘只在「所有作品」頁出現。

## 專案結構

```
src/content/cases.json   所有作品的資料（唯一來源）
src/lib/cases.ts         型別與取用函式
src/app/page.tsx         首頁
src/app/work/            所有作品頁（標籤篩選）＋ [slug] case study 動態路由
src/app/admin/           本地後台（production 回 404）
src/app/api/admin/       後台用的讀寫與上傳 API（production 回 404）
src/components/          頂欄、關燈開關、浮動聯絡鈕、ZoomableImage 等共用元件
case-studies/            部分作品的文案草稿，網站不會讀取
```

## 待辦

- 加上英文版
