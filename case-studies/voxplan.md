# 案例詳情：VoxPlan 語音行事曆

> 此檔案為作品集網站案例頁的**內容草稿**。先把文字打磨到位，再切版。
> ⚠ 標註 `🟡 待補` 的欄位需使用者本人填入；不要由 Claude 捏造。

---

## 一句話定位（Hero 區）

> 用講的就能建立行程的 AI 語音行事曆。「明天下午兩點在咖啡廳跟 Amy 開會」一句話，自動拆成標題、時間、地點、人員。

## 適合誰看

- 求職時看到「能否獨立交付一款上架 App」的審視者
- 想了解 Flutter + Firebase + AI Pipeline 真實架構的技術同行
- 評估個人 SaaS 商業化能力的對象

## 官方網站

[https://voxplan.app](https://voxplan.app)（Cloudflare 部署的一頁式靜態站，自製）

## 上架狀態

審核中 ：iOS、Android

---

## 動機與情境

每天規劃行程時，重複輸入「日期 → 時間 → 標題 → 地點 → 人員」太繁瑣，且每次都要切到鍵盤。市面上的語音行事曆多半只能轉文字，**不會理解時間語意**——用戶仍要手動修正日期、補上地點。

VoxPlan 想解決的是「**從一句自然語句直接產出可儲存的行程結構**」這件事，包含：
- 中英夾雜（中文介面下講「明天 3 點 meeting」也能解析）
- 跨時區（出差/外派族群常用）
- 一次建多筆（「下週每週二都有瑜伽課」）

## 解決方案

### 三層分散架構

```
Flutter App (iOS / Android / Web)
    ↓ Firebase SDK
Firebase（Firestore + Auth + Storage + Functions + FCM）
    ↓ HTTPS
Zeabur API（FastAPI）
    ↓
OpenAI / Groq APIs
```

### 語音解析 Pipeline

```
1. 錄音（跨平台處理：Web=WAV in memory / Mobile=AAC 暫存檔再讀回）
2. 上傳音訊（multipart/form-data，帶 Firebase Auth ID Token）
3. Whisper 轉錄（優先 Groq whisper-large-v3-turbo，失敗 fallback OpenAI whisper-1）
4. GPT-4o-mini 結構化（temperature 0.3，針對中文時間語意做 prompt engineering）
5. spaCy + dateparser 補強（實體提取 + 相對時間驗證）
6. 寫回 Firestore，UI 透過 stream 即時更新
```

## 技術棧

### 前端
- **Flutter**（Dart）：iOS / Android 雙平台，Web 預留
- **Riverpod**：分層 Provider 架構（12 個 providers + StateNotifier controllers）
- **device_calendar**：從原生行事曆匯入

### 後端
- **Firebase Cloud Functions**（TypeScript / Node 22）：通知排程、用戶詞庫、帳號刪除級聯、邀請 token 驗證、RevenueCat Webhook
- **Zeabur + FastAPI**（Python）：語音 / NLP 服務，Docker 部署
- **Firestore**：即時資料庫（events / users / calendars / calendarMembers / userVocabulary / 等 10+ collections）
- **Cloud Scheduler**：在 `startTime - reminderMinutes` 精準觸發推播

### AI / NLP
- **Groq Whisper-large-v3-turbo**（主要轉錄，比 OpenAI 便宜約 5×）
- **OpenAI Whisper-1**（fallback）
- **GPT-4o-mini**（結構化解析）
- **spaCy `zh_core_web_sm`**（中文實體提取）
- **dateparser**（相對時間，例如「下週三」、「三天後」）

### 基礎設施
- **Firebase Auth**：Email / Google / Apple 登入
- **FCM**：跨平台推播
- **Crashlytics**：當機追蹤
- **AdMob**：免費版 Banner
- **RevenueCat**：訂閱（年 $49.99 / 月 $5）
- **Firestore Rules**：欄位級權限（建立時必填、`userId` 不可變）

## 關鍵亮點（給技術背景看的）

### 1. AI Pipeline 不是丟一個 API 就完事

GPT 解析中文時間語意時會犯錯（「下午」可能對應 13:00 或 14:00、「禮拜一」可能指本週或下週）。為此：
- **Prompt engineering 細到時段對應、預設時長、日期格式**（gpt_service.py 中文系統提示）
- **dateparser 做事後驗證**（避免 GPT 幻覺出不合理日期）
- **用戶詞庫**（vocabularyHandler）：自動收集常用人名、地點、最近 5 筆語音範例，回傳給 GPT 當 context，**越用越準**。Cloud Function 用 5 分鐘 debounce 批次更新，不浪費寫入配額。

### 2. 跨時區設計（多數 App 直接放棄這塊）

- 完整 IANA 時區資料庫
- 用戶可設「主要時區」+ 最多 5 個常用時區（`favoriteTimezones`）
- AppBar 地球 icon 可臨時 Override 顯示時區（session-only），日視圖呈現雙欄對比
- 自動跟隨裝置時區開關（出差時自動切換）

### 3. 群組行程（一次建多筆、整組刪除）

`groupId` 串起多筆相關行程：
- 刪除其中一筆時，可選「只刪此筆」或「刪除整組」
- 行程詳情頁可看同組其他子行程
- 設定面板可整組編輯/刪除，分「未結束 / 已結束」分頁
- 支援把現有行程加入既有群組

### 4. 上架等級的細節

很多獨立開發者會省略，但 VoxPlan 都做了：
- **強制更新機制**：`appConfig/version.minVersionCode` 動態擋版本，AlertDialog 不可關閉
- **帳號刪除合規**（App Store / Google Play 強制要求）：Cloud Function 級聯清除所有 collection（events / calendarMembers / userTokens / userVocabulary / vocabularyQueue / memos / eventActivities）
- **隱私政策、服務條款、關於頁**：APP 內 + 官網 voxplan.app 雙端
- **Deep Link 邀請**：HTTPS Universal Link，token 含過期時間，用 Callable Function 驗證
- **離線快取**：Firestore 40MB 持久化
- **強制升級時 functions.config() 早就改 .env**（2026/3 停用前提早遷移）

### 5. 成本意識

每 1000 次語音建立行程的 API 成本：
- Groq Whisper: ~$0.6
- OpenAI Whisper（fallback）: ~$3
- GPT-4o-mini: ~$0.3

設計時就把 fallback 順序排成「便宜的優先」。Groq 觸發 rate limit 時自動降級 OpenAI，使用者無感。

### 6. 商業化基礎設施

- RevenueCat SDK 整合（購買、恢復購買、Webhook 寫回 Firestore）
- 訂閱欄位由 Webhook Cloud Function 寫，客戶端唯讀（避免被改）
- `kSubscriptionGateEnabled` 全域開關：上架初期可全部視為 Premium 免費開放，留意數據後再啟用付費牆
- 免費方案配額（每月 30 次語音、3 次群組行程、15 筆詞庫）已實作，等開關打開即生效

## 成果

🟡 以下數字請使用者填入真實值；上架前的話可換成「上架前準備度」：

- 上架平台：iOS / Android（🟡 確認狀態）
- 開發週期：2 個月
- 累積使用者數：🟡 待補
- 訂閱轉換率：🟡 待補
- App Store / Google Play 評分：🟡 待補

無法量化的維度可寫：
- 「獨立完成 Flutter App、Firebase 後端、Zeabur AI 服務、官方網站、訂閱系統設定的全鏈路。」
- 「自有設計：黑白簡約風格，APP 與官網設計語言一致。」

## 待補素材清單

- [ ] APP Hero 圖（語音輸入畫面）
- [ ] 行事曆主畫面（含群組行程顯示）
- [ ] 語音輸入示範影片（10-20 秒，講一句話 → 行程出現）
- [ ] 跨時區雙欄日視圖截圖（少見功能值得突出）
- [ ] 架構圖（三層分散）
- [ ] App Store / Google Play badge（上架後）
- [ ] 系統相容性說明（iOS / Android 最低版本）

## Demo 提供方式

- **線上 Demo**：voxplan.app 官網（一定要有）
- **TestFlight 連結**（iOS 上架前）/ App Store 連結（上架後）
- **Google Play 內測連結 / 正式連結**
- **APK 下載**：🟡 看是否提供 sideload 版本給作品集審視者
- **GitHub**：🟡 建議**不要開源完整 repo**（含 RevenueCat 金鑰邏輯、Firestore Rules 設計），可考慮開源「語音解析 prompt 設計」這類獨立文件
