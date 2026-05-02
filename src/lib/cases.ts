export type StackItem = {
  layer: string;
  tech: string;
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
};

export type Case = {
  slug: string;
  name: string;
  type: string;
  outcome: string;
  role: string;
  duration: string;
  websiteUrl?: string;
  problem: string;
  features: Feature[];
  solution?: {
    text: string;
    flow?: string;
  };
  stack: StackItem[];
  decisions: ArchitectureDecision[];
};

export const cases: Case[] = [
  {
    slug: "nail-art-reservation",
    name: "LINE 一條龍預約系統",
    type: "LINE 生態系一條龍(建置 LINE 官方帳號 + 預約網頁) · 仍在維護中",
    outcome:
      "建置 LINE 官方帳號 + 預約網頁，讓客人在 LINE 裡完成所有預約流程的美甲店預約系統——從加好友、選服務、到收提醒，全程不用切換 App。",
    role: "獨立完成（前端、後端、部署、LINE 平台設定）",
    duration: "持續維護中",
    problem:
      "店家原本以「人工 LINE 對話 + Excel 手動記錄」管理預約：高峰時段訊息來不及回，客人流失；預約時段重複、漏記；客戶資料散落在 LINE 對話裡，回頭查詢費時。",
    features: [
      {
        title: "LIFF 預約頁，5 步在 LINE 內完成",
        problem:
          "傳統預約系統會把客人拉到外部網站填表，跳出 LINE 體驗中斷。LIFF 直接在 LINE 內開啟原生表單，從進入預約 → 選服務 → 選時段 → 填客戶資料 → 送出確認，整段流程都不離開 LINE。",
        images: [
          "/cases/nail-art-reservation/liff-1.png",
          "/cases/nail-art-reservation/liff-2.png",
          "/cases/nail-art-reservation/liff-3.png",
          "/cases/nail-art-reservation/liff-4.png",
          "/cases/nail-art-reservation/liff-5.png",
        ],
      },
      {
        title: "美甲師在 Google Calendar 開可預約時段",
        problem:
          "店家不想學新後台。設計成讓美甲師直接在自己慣用的 Google Calendar 開行程，行程「標題」上寫可預約時段——預約頁會讀這份行事曆，自動把每筆行程標題裡的時間轉成可選時段。改時段就改 Calendar，沒有額外管理介面要學。",
        image: "/cases/nail-art-reservation/master-calendar.jpg",
      },
      {
        title: "客人確認後，系統自動寫入「預約行事曆」",
        problem:
          "客人按下確認的瞬間，系統會在另一份「預約專用行事曆」自動建立行程，店家手機上的 Google Calendar App 即時看到所有已確認預約，不必手動抄。",
        image: "/cases/nail-art-reservation/booking-event.jpg",
      },
      {
        title: "預約 + 客戶資料同步進 Google Sheets，時段自動防衝突",
        problem:
          "如果您是個人或者小型工作室，每月客流量不超過150人，我會建議使用 google 試算表做為後端，原因是 google 試算表是任何人也能輕易查看的後端選擇。但如果您的每月客流量超過150人，我就會建議使用 Firebase 或者 Supabase 做為後端，原因是這兩個都有更強大和更穩定的性能。",
        image: "/cases/nail-art-reservation/sheets.png",
      },
    ],
    solution: {
      text: "完全留在 LINE 內的預約動線：客人加好友 → Rich Menu → LIFF 表單 → Cloudflare Worker 代理 → Google Apps Script 寫入 Sheets / Calendar → 推送確認訊息。代理層隱藏真實 GAS URL，後端用 LINE Access Token 反查驗證身份。",
      flow: `客人 LINE
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
  │     ├─ 寫入 Google Sheets（客戶 / 預約）
  │     └─ 寫入 Google Calendar（建立行程）
  │     ↓
  │   推送 LINE 確認訊息給客人
  │   寄送 Email 通知店家
  └─ 點 Rich Menu「我的預約」→ LIFF 顯示預約紀錄（可取消）`,
    },
    stack: [
      { layer: "前端（LIFF 頁）", tech: "原生 HTML / CSS / JS、LINE LIFF SDK" },
      {
        layer: "API 代理",
        tech: "Cloudflare Worker（隱藏真實 GAS URL；POST text/plain 規避 preflight；GET JSONP fallback）",
      },
      {
        layer: "後端",
        tech: "Google Apps Script（10+ 個 .gs 模組）、Advanced Calendar API v3",
      },
      { layer: "資料庫", tech: "Google Sheets（依年度分表）、Google Calendar" },
      { layer: "LINE 整合", tech: "Python（Flask）+ LINE Bot SDK，部署於 Zeabur" },
      {
        layer: "安全",
        tech: "LINE Access Token 驗證、AES-256-GCM localStorage 加密、敏感資料 console 遮罩",
      },
    ],
    decisions: [
      {
        title: "代理層隱藏真實後端",
        body: "前端只看得到 Cloudflare Worker URL，真實 GAS Web App URL 存在 Worker secret，避免端點被直接打。",
      },
      {
        title: "LINE Access Token 後端驗證",
        body: "每個 GAS 請求反查 LINE profile API，確認呼叫者是真的 LINE 用戶；同時驗證 lineUserId 是否匹配 Token，防止越權存取他人預約。",
      },
      {
        title: "三層 fallback 應對網路與 CORS",
        body: "請求順序：POST text/plain → JSONP <script> 注入 → localStorage 本地模式。對「店裡客人手機網路差」的真實情境很實用。",
      },
      
    ],
  },
  {
    slug: "voxplan",
    name: "VoxPlan 語音行事曆",
    type: "個人 SaaS · iOS / Android 上架審核中",
    outcome:
      "用講的就能建立行程的 AI 語音行事曆——「明天下午兩點在咖啡廳跟 Amy 開會」一句話，自動拆成標題、時間、地點、人員。",
    role: "獨立完成 Flutter App、Firebase 後端、Zeabur AI 服務、官方網站、訂閱系統設定",
    duration: "2 個月",
    websiteUrl: "https://voxplan.app",
    problem:
      "每天規劃行程時，重複輸入「日期 → 時間 → 標題 → 地點 → 人員」太繁瑣；市面上的語音行事曆多半只能轉文字、不會理解時間語意——用戶仍要手動修正日期、補上地點。",
    features: [
      {
        title: "一句話建立行程",
        problem:
          "傳統行事曆要點選日期、選時段、輸入標題、加地點與人員——一次行程要點 4-5 次。VoxPlan 按住麥克風講一句話，自動拆解出所有欄位。",
        image: "",
      },
      {
        title: "中文時間語意理解",
        problem:
          "「明天下午」「下週三」「三天後」這種相對時間，市面語音行事曆都只能轉成文字、不會算出實際日期。VoxPlan 用 GPT + dateparser 雙層補強，避免 GPT 幻覺出不合理日期。",
        image: "",
      },
      {
        title: "群組行程（一句話建多筆）",
        problem:
          "「下週每週二都有瑜伽課」要分別建很麻煩。VoxPlan 用 groupId 串起多筆行程，刪除時可選「只刪此筆」或「刪除整組」，整組編輯也支援。",
        image: "",
      },
      {
        title: "跨時區雙欄日視圖",
        problem:
          "出差或外派族群常用，但多數行事曆 App 直接放棄這塊。VoxPlan 完整 IANA 時區資料庫、最多 5 個常用時區、AppBar 地球 icon 可臨時 Override 顯示時區，日視圖呈現雙欄對比。",
        image: "",
      },
      {
        title: "用戶詞庫越用越準",
        problem:
          "GPT 不認識你的常用人名地點，可能轉錯字。VoxPlan 自動收集常用人名、地點、最近 5 筆語音範例，回傳給 GPT 當 context，使用越多次解析越準。Cloud Function 用 5 分鐘 debounce 批次更新，不浪費寫入配額。",
        image: "",
      },
    ],
    solution: {
      text: "三層分散架構。語音解析 Pipeline：錄音 → 上傳 → Whisper 轉錄（Groq 主、OpenAI fallback）→ GPT-4o-mini 結構化（中文時間語意 prompt engineering）→ spaCy + dateparser 補強 → 寫回 Firestore，UI 透過 stream 即時更新。",
      flow: `Flutter App (iOS / Android / Web)
    ↓ Firebase SDK
Firebase（Firestore / Auth / Storage / Functions / FCM）
    ↓ HTTPS
Zeabur API（FastAPI）
    ↓
OpenAI / Groq APIs`,
    },
    stack: [
      {
        layer: "前端",
        tech: "Flutter（Dart），Riverpod 12 個 providers + StateNotifier",
      },
      {
        layer: "後端",
        tech: "Firebase Cloud Functions（TS / Node 22）、Zeabur + FastAPI + Docker",
      },
      {
        layer: "資料庫",
        tech: "Firestore（events / users / calendars / vocabulary 等 10+ collections）",
      },
      {
        layer: "AI / NLP",
        tech: "Groq Whisper-large-v3-turbo、OpenAI Whisper-1 fallback、GPT-4o-mini、spaCy zh_core_web_sm、dateparser",
      },
      {
        layer: "基礎設施",
        tech: "Firebase Auth / FCM / Crashlytics、AdMob、RevenueCat、Cloud Scheduler",
      },
    ],
    decisions: [
      {
        title: "AI Pipeline 不是丟一個 API 就完事",
        body: "GPT 解析中文時間語意會犯錯（「下午」可能對應 13:00 或 14:00）。為此細到時段對應 / 預設時長 / 日期格式的 prompt engineering、dateparser 事後驗證、用戶詞庫自動收集常用人名地點當 context（越用越準）。",
      },
      {
        title: "便宜 fallback 排序，使用者無感",
        body: "Groq Whisper 主用（每千次約 $0.6），OpenAI Whisper 備用（約 $3）。Groq 觸發 rate limit 時自動降級 OpenAI，用戶感受不到。",
      },
      {
        title: "上架等級的合規細節",
        body: "App Store / Google Play 強制要求的「帳號刪除」級聯清除所有 collection（events / calendarMembers / userTokens / userVocabulary 等），用 Cloud Function 一條完成。",
      },
    ],
  },
  {
    slug: "freedunk-hub",
    name: "Freedunk Hub",
    type: "個人作品 · 純前端互動工具",
    outcome:
      "為《Freedunk》遊戲玩家設計的戰術分析工具——可拖曳球員、用 Canvas 畫戰術線、一步步推演進攻流程。",
    role: "獨立完成",
    duration: "2 天",
    problem:
      "個人 / 朋友群打《Freedunk》時想跟隊友溝通戰術，發現市面上的籃球戰術板都是泛用版，沒有遊戲內角色資料、能力值、位置配色等細節，討論起來很抽象。於是自己做一個。",
    features: [
      {
        title: "29 名遊戲角色 + 18 項能力值",
        problem:
          "泛用戰術板用代號（PG1 / SG2）讓人對不上是誰。Freedunk Hub 直接內建 29 名遊戲角色，分五個位置選擇，附上 18 項能力值資料（跑動、彈跳、三分、內防…），討論時直接用角色名。",
        image: "",
      },
      {
        title: "Canvas 戰術繪圖",
        problem:
          "純文字 / 口頭很難說明跑位路線。直接在戰術版上用畫筆畫線、可選顏色與粗細，把每個角色的移動路徑畫出來。",
        image: "",
      },
      {
        title: "球員拖曳調整位置",
        problem:
          "靜態圖無法動態擺位。直接拖曳球員 token 到場上任意位置，即時更新座標，模擬真實跑位。",
        image: "",
      },
      {
        title: "戰術步驟分解",
        problem:
          "複雜戰術需要分階段呈現。一個戰術可分多個步驟，每步有獨立的球員位置 + Canvas 畫面快照，逐步推演進攻流程。",
        image: "",
      },
      {
        title: "Undo / Redo（含 Canvas 狀態）",
        problem:
          "操作錯了不能還原會打斷思路。完整歷史快照同時管理 React state（球員位置）+ Canvas pixel 狀態（畫線），支援 Ctrl+Z / Ctrl+Y。",
        image: "",
      },
      {
        title: "觸控支援",
        problem:
          "球場邊就要快速畫戰術，桌機不在場。手機 / 平板的拖曳與繪圖都能用，touch event 與 mouse event 統一處理。",
        image: "",
      },
    ],
    solution: {
      text: "單頁互動 Web App。React 18（CDN）+ Babel Standalone 在瀏覽器內 JSX 編譯，零部署成本。Canvas 2D API 自製 drawing / snapshot / restore 邏輯。狀態管理只用 React useState + useRef，無外部狀態庫。",
    },
    stack: [
      {
        layer: "UI",
        tech: "React 18（CDN），Babel Standalone（瀏覽器內 JSX 編譯）",
      },
      { layer: "樣式", tech: "Tailwind（CDN）、Google Fonts（Inter）" },
      {
        layer: "繪圖",
        tech: "Canvas 2D API（自製 drawing / snapshot / restore 邏輯）",
      },
      { layer: "狀態", tech: "React useState + useRef（無外部狀態庫）" },
    ],
    decisions: [
      {
        title: "Undo / Redo 同時管理「DOM 狀態」與「Canvas pixel 狀態」",
        body: "一般 undo/redo 只處理 React state，但戰術版的塗鴉直接畫在 canvas 上、不在 React 樹裡。每次操作把 { items, snap: canvas.toDataURL() } 推進歷史堆疊；undo 時還原 items state + 把 dataURL 重新畫回 canvas。",
      },
      {
        title: "拖曳判定區分「點擊」與「拖曳」",
        body: "拖曳時若移動距離 ≤ 3px 視為點擊（不觸發拖曳邏輯，改開 popup），避免使用者輕觸時誤觸發拖曳。",
      },
      {
        title: "觸控與滑鼠統一處理",
        body: "用 e.clientX || (e.touches && e.touches[0].clientX) 模式統一兩種輸入裝置，不寫兩套邏輯。",
      },
      {
        title: "1755 行單檔的取捨（誠實版）",
        body: "選 CDN React + 單檔的取捨是「快速迭代、零部署成本、檔案體積換來建置簡單」。優點：開新分頁就能改、不用 npm install。缺點：沒 tree-shaking、Babel Standalone 在客戶端執行、無 TypeScript、難拆元件。重做的話會用 Vite + React 拆檔。",
      },
    ],
  },
];

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
