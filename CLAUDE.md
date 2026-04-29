# 個人作品集網站 - 專案說明

## ⚠️ 每次新對話的第一步

開啟新對話時請先讀取此 CLAUDE.md，了解專案目的、目標與開發原則後再開始。

## 專案目的

打造作品主理人個人的線上作品集網站，作為對外展示作品、技術能力與聯絡管道的單一入口。

### 主要受眾

**優先順序：以非技術客戶為主。** 兩種受眾共存於同一站，但內容主軸、視覺與文案調性向客戶傾斜；技術細節以「同頁分區（可摺疊）」呈現給工程審視者。

1. **潛在接案客戶**（非工程背景，**主要受眾**）：需要快速看懂能解決什麼問題、看到實際成品。
2. **技術背景審視者**（HR / 技術主管 / 同行）：需要看到技術深度、架構決策、程式碼。

### 商業/職涯目的
- 接案線索引流（LINE Bot / LIFF / 全端網站類型客戶為主）
- 求職時的作品展示
- 個人品牌（特別是 LINE 生態系與 AI 應用兩個主軸）

## 主打作品（將以「案例詳情頁」呈現）

詳細文案見 `case-studies/` 目錄。

| 編號 | 名稱 | 定位 | 文案檔 |
|------|------|------|--------|
| 1 | 美甲預約系統 | 真實接案：LINE 生態系一條龍 | `case-studies/nail-art-reservation.md` |
| 2 | VoxPlan 語音行事曆 | 個人 SaaS：AI / 跨平台 / 商業化 | `case-studies/voxplan.md` |
| 3 | Freedunk Hub | 純前端互動工具：Canvas / 複雜狀態 | `case-studies/freedunk-hub.md` |

## 我會的技術棧（規劃網站時可選用的範圍）

### 前端
- **HTML / CSS / Tailwind / 原生 JS**（已用於 voxplan.app 官網與 Freedunk Hub）
- **React**（CDN 模式，已用於 Freedunk Hub；尚未用過 build pipeline 版本）
- **Flutter Web**（已用於 VoxPlan，可輸出 Web 版）

### 後端
- **Python**（FastAPI、LINE Bot SDK）— 已部署於 Zeabur
- **Node.js**（Cloud Functions / Cloudflare Worker / 一般 API）
- **Google Apps Script**（GAS 模組化後端）

### 資料 / 服務
- **Firebase**（Firestore、Auth、Storage、Functions、FCM、Crashlytics）
- **Google Sheets / Calendar API**
- **OpenAI / Groq**（Whisper、GPT-4o-mini）
- **spaCy + dateparser**（NLP）
- **MySQL**（基本）

### LINE 生態系
- LINE Messaging API（Bot、Webhook、Rich Menu）
- LINE LIFF
- LINE Login / Access Token 驗證
- LINE 官方帳號設定

### 部署
- Cloudflare Pages / Worker（已實際部署過）
- Zeabur（已實際部署過）
- Firebase Hosting（已實際部署過）

### 網站選型（已決定）
- **框架：Next.js**（決定於 2026-04-29 對話）
- **樣式：Tailwind CSS**
- **部署**：Cloudflare 沿用最熟悉（Cloudflare Pages 為預設方向）

## 網站設計方向

### 風格參考
- **Kyson Dana**（https://www.kysondana.com/）：取其結構與視覺節奏（bento grid、大留白、黑白灰為底）
- **Aleksi Tappura**（https://aleksitappura.com/）：取其文案調性（直接、講商業成果、自信不浮誇）
- **主軸：結構抓 Kyson、文案調性抓 Aleksi**

### 視覺基調
- **配色**：白底 + 黑灰為基底 + 一個輔助色（候選：深綠 / 藏青；不直接用 LINE 綠避免品牌依賴感）
- **字體**：中文 Noto Sans TC 或思源黑體；英文 Inter
- **動效**：克制（hover / scroll reveal），不上 3D / WebGL / 過度動畫
- **中文版面節奏**：行高拉高、段落間距加大、字級略放大（中文方塊字密度高，照搬英文站留白會擠）
- **行動裝置優先**：HR 與客戶常在手機上看，case study 必須在手機上可讀

### 首頁結構（規劃中）
1. **Hero**：一句話定位（不是技能列表，是「能解決的商業問題」）+ 簡單露臉照片
2. **主打三案例 Bento grid**（不要 carousel）：縮圖 + 案例名 + 一句商業價值 + 一個關鍵數字
3. **服務範圍**（純文字段）
4. **簡短 About**
5. **雙 CTA**：LINE 官方帳號 + Email（熱情明確，不要冰冷的 Contact 表單）

### 案例詳情頁結構
1. 一句話商業成果（給客戶看，含關鍵數字）
2. 背景 / 客戶是誰 / 痛點
3. 我的角色與時程
4. 解法（圖文交錯，不是純文字）
5. 成果數據（**核心**，無數據則無說服力）
6. 技術棧 + 架構決策（給工程審視者看，可摺疊）
7. 學到什麼 / 後續迭代
8. 下一個案例 / 回到首頁

每篇 800–1500 字，5 分鐘內讀完為目標。

### 不要做的事
- 不上 3D / WebGL / 全螢幕動畫（炫技反而讓中小店家覺得「太貴接不起」）
- 不模仿 Aleksi 的「Fully booked until late XXXX」（資歷與籌碼不對等，照抄反效果）；改用務實訊息（「目前接案中」/「X 月起開放新案」）
- 不做兩套版本（給客戶 / 給工程師同站分區即可，不分流）
- 不用通用 AI 美學配色（紫漸層、玻璃擬態 overuse、Vercel template 預設色）
- 不直接搬 Kyson 的「premium 距離感」（他客戶是融資 startup founder；你客戶是中小店家，CTA 要熱情）

## 開發原則（必讀）

### 1. 誠實，不奉承
- 不奉承使用者
- 推測必須標註（例如：「以下為推測：...」）
- 不憑空捏造內容
- 不偽造客戶評價、不模擬客戶話語（這是底線）

### 2. 修改前先說明理由
- 修改任何檔案前，先說明：要解決什麼問題？為什麼現有寫法不滿足？影響範圍？

### 3. 多檔案修改要事前計畫
- 涉及 2 個以上檔案、架構調整、新增功能：先提計畫 → 等使用者確認 → 才動手

### 4. 漸進式上線
- 先求一個能跑、看得見的 MVP（單頁 + 案例列表），再逐步加深
- 不要一次規劃 8 週的計畫然後 0 週上線

### 5. 真實作品優先於樣板
- 作品集只放使用者**真實做過**的東西
- 不為了「填版面」去硬做新案例
- 寧可三個做深，不要五個做淺

### 6. 繁體中文溝通
- 所有對話、註解、文案以繁體中文為主
- 變數 / 函式名稱用英文（業界慣例）

### 7. 保持架構穩定
- 不隨意換技術棧
- 重構要有明確理由

## 目前狀態

- **框架已決定且骨架已建立**：Next 16.2.4 + React 19 + Tailwind v4 + App Router + `src/`（2026-04-29）
- **設計方向已決定**：見「網站設計方向」段落
- **下一步**：
  1. ✅ **建立 Next.js 專案骨架**（已完成）：字體 Inter + Noto Sans TC、路由 `/` 與 `/work/[slug]` 占位頁、`turbopack.root` 已設、build 通過無 warning
  2. **切首頁 MVP**（Hero + 三案例 Bento + 簡短 About + 雙 CTA），先用 placeholder 填案例內容
  3. 補三份 `case-studies/` 真實成果數據（使用者本人補完）
  4. 切案例詳情頁範本，套入真實內容

## 待使用者補充的資訊

（下列資訊我無法替使用者決定或捏造，請手動補入對應的 `case-studies/*.md`）

- 各案例的**真實成果數據**（接案費、預約量、用戶數、營收等）— **最優先，沒這個網站再美都像樣板**
- **真實客戶評價**（如客戶授權引用）
- **公開 Demo 連結 / GitHub 連結**（哪些可公開、哪些要授權）
- **目標客單價 / 接案範圍**（影響網站定位語氣）
- **本人露臉照片**（已確認要簡單露臉，待提供照片）

## 注意事項

- 預期會引用其他專案目錄的素材（截圖、影片）。引用時用相對路徑或複製到本專案 `public/` 下
- VoxPlan 主站已存在於 `../../APP/AI calendar/Official web/Official-web/`，**不是**本作品集網站，不要混淆或修改
- 美甲預約系統內含真實客戶資訊（API Key、Calendar ID、LINE 金鑰），引用素材時要小心避免外洩
