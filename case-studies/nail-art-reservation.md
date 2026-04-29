# 案例詳情：美甲預約系統

> 此檔案為作品集網站案例頁的**內容草稿**。先把文字打磨到位，再切版。
> ⚠ 標註 `🟡 待補` 的欄位需使用者本人填入；不要由 Claude 捏造。

---

## 一句話定位（Hero 區）

> 一個讓客人在 LINE 裡完成所有預約流程的美甲店預約系統——從加入好友、選服務、到收到提醒，全程不用切換 App。

## 適合誰看

- 小型實體服務業（美甲、美容、按摩、寵物美容、診所等）想用 LINE 接單但沒有預算上 Salon Manager 等級系統的店家
- 想在 LINE 生態系做整合的工程師同行

---

## 客戶與情境

- **客戶類型**：實體美甲工作室（單人/小團隊）
- **客戶接案管道**：朋友介紹
- **接案時間**：🟡 待補（起訖月份）
- **接案性質**： 維護中 / 客製授權

## 問題背景

店家原本以**人工 LINE 對話 + Excel 手動記錄**的方式管理預約：

- 高峰時段訊息來不及回，客人流失
- 預約時段重複、漏記，需事後打電話致歉
- 客人資料散落在 LINE 對話中，回頭查詢費時
- 想推會員制與行銷推播，但沒有系統化的客戶資料庫

## 解決方案

設計一條**完全留在 LINE 內**的預約動線：客人加好友 → 用 Rich Menu 開啟 LIFF 表單 → 選服務、時段、填資料 → 後端寫入 Google Sheets / Calendar → 自動推送確認訊息給客人，同步通知店家。

對店家而言，所有預約紀錄即時出現在 Google Calendar 中（手機裝 Calendar App 就能看），客戶資料則自動累積在 Google Sheets。**不必學新後台，沿用 Google 工具**。

### 主要流程

```
客人 LINE
  ├─ 加入好友 → 自動發送歡迎 + Rich Menu
  ├─ 點 Rich Menu「立即預約」→ 開啟 LIFF
  │     ↓
  │   LIFF 表單（首次客戶建檔 / 老客戶直接選時段）
  │     ↓
  │   Cloudflare Worker（代理 + 隱藏真實 GAS URL）
  │     ↓
  │   Google Apps Script
  │     ├─ 驗證 LINE Access Token
  │     ├─ 比對既有客戶資料
  │     ├─ 檢查時段衝突
  │     ├─ 寫入 Google Sheets（客戶/預約）
  │     └─ 寫入 Google Calendar（建立行程）
  │     ↓
  │   推送 LINE 確認訊息給客人
  │   寄送 Email 通知店家
  └─ 點 Rich Menu「我的預約」→ LIFF 顯示預約紀錄（可取消）
```

## 我的角色與責任範圍

**獨立完成**前端、後端、部署、LINE 平台設定（含官方帳號上線設定、Rich Menu、LIFF 註冊、Webhook 部署）。

## 技術棧

| 層 | 技術 |
|---|---|
| 前端（LIFF 頁） | 原生 HTML / CSS / JavaScript（無框架），LINE LIFF SDK |
| API 代理 | Cloudflare Worker（隱藏真實 GAS URL；POST text/plain 規避 preflight；GET JSONP fallback） |
| 後端 | Google Apps Script（模組化 10+ 個 .gs 檔），Advanced Calendar API v3 |
| 資料庫 | Google Sheets（依年度分表），Google Calendar |
| LINE 整合 | Python（Flask）+ LINE Bot SDK，部署於 Zeabur |
| 安全 | LINE Access Token 驗證、AES-256-GCM localStorage 加密、敏感資料 console 遮罩 |

## 關鍵亮點（給技術背景看的）

### 1. 不只是「能跑」，有 production-grade 的安全設計

- **代理層隱藏真實後端**：前端只看得到 Cloudflare Worker URL，真實 GAS Web App URL 存在 Worker secret，避免 GAS 端點被直接打。
- **LINE Access Token 後端驗證**：每個 GAS 請求都會反查 `https://api.line.me/v2/profile`，確認呼叫者是真的 LINE 用戶；同時驗證 `lineUserId` 是否匹配 Token，防止越權存取他人預約。
- **localStorage 加密**：客戶資料、預約紀錄等暫存在 localStorage 的內容用 AES-256-GCM 加密，金鑰以 LINE User ID 衍生；舊明文資料讀取時自動遷移。
- **敏感資料遮罩工具**：`SecurityUtils` 在 console.log 過濾電話、Email 等個資，避免除錯時意外外洩。

### 2. 三層 fallback 應對網路與 CORS 問題

`ApiService` 的請求順序：
1. **POST text/plain**（避開 CORS preflight）
2. **POST 失敗 → JSONP `<script>` 注入**（15 秒逾時）
3. **JSONP 也失敗 → localStorage 本地模式**（離線仍可暫存資料）

這在客戶網路不穩或瀏覽器 CORS 行為怪異時關鍵——對「店裡客人手機網路差」的真實情境很實用。

### 3. 多層快取降低 GAS 配額壓力

GAS 有 6 分鐘執行時間 / 每日請求數限制。設計了：
- `customerIndexMap`（lineUserId → 行號，5 分鐘）
- `bookingIndexMap`（lineUserId → 預約陣列，含跨年度，5 分鐘）
- `SPREADSHEET_CACHE`（試算表實例，1 分鐘）

避免每次查詢都全表掃描。

### 4. 為「美甲店規模」量身選型，不過度設計

月預約量 ≤ 300 筆 → Calendar 查詢直接 `maxResults: 2500` 一次拿完，不做分頁；分頁邏輯反而增加複雜度與快取失效機率。**設計決策有寫進文件**，不是偷懶。

## 成果

🟡 以下數字請使用者填入真實值，無法量化的維度可改為描述性敘述：

- 預約處理時間：原本 ___ 分鐘 → ___ 分鐘
- 漏單/重複預約：原本每月 ___ 件 → ___ 件
- 客戶資料累積數：上線 ___ 個月後達 ___ 筆

## 客戶評價

🟡 **僅引用真實客戶授權的話**。沒有就先空著，不要編。

- 引用前請先取得客戶書面/訊息授權，截圖留存
- 範例格式：
  > 「上線之後我終於可以晚上不用一直回 LINE 訊息了，預約全部自動。」
  > — ___ 美甲工作室

## 待補素材清單

- [ ] LIFF 預約頁截圖（首頁 / 服務選擇 / 時段選擇 / 確認）
- [ ] Rich Menu 圖片
- [ ] 後台 Google Sheets / Calendar 截圖（**注意去識別化**——遮蔽真實客戶姓名、電話）
- [ ] 加 LINE 好友 QR Code（如果客戶同意公開測試帳號）
- [ ] 系統架構圖（可以照本檔的流程圖重畫一張乾淨版本）
- [ ] 30 秒操作示範影片（從加好友到完成預約）

## Demo 提供方式

- **公開 QR Code**：🟡 看客戶授權——客戶帳號公開掃可能會接到真客人的訊息，不適合
- **建議改用「另開測試 LINE 官方帳號」**：複製一份程式碼接到測試帳號，提供給訪客掃描體驗，不影響真客戶
- **GitHub**：🟡 待決定是否開源；客戶授權前**建議不要公開**完整 repo（含金流邏輯、客戶結構），可開源去識別化的核心模組
