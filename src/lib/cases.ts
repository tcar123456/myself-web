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

export const cases: Case[] = [
  {
    slug: "nail-art-reservation",
    name: "LINE 一條龍預約系統",
    type: "LINE 生態系一條龍(建置 LINE 官方帳號 + 預約網頁) · 仍在維護中",
    outcome:
      "建置 LINE 官方帳號 + 預約網頁，讓客人在 LINE 裡完成所有預約流程的美甲店預約系統——從加好友、選服務、到收提醒，全程不用切換 App。",
    role: "獨立完成（前端、後端、部署、LINE 平台設定）",
    duration: "上線中",
    demoUrl: "https://lin.ee/vgqYdpW",
    demoLabel: "加 LINE 試玩",
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
      {
        title: "店家自己的後台",
        problem:
          "一種資料放在 Google Sheets，店家想查什麼得自己開試算表捲。第二種把整套重寫成有完整後台的系統，左邊選單從儀表板、行事曆、預約管理、客戶、員工與班表、服務項目到統計報表，開店老闆自己就能操作：預約管理挑日期區間跟狀態，一頁看完誰、幾點、做什麼、收多少；行事曆有月／週／日三種檢視，每位美甲師一個顏色，誰今天滿檔一眼就知道；統計報表自動算出本月營收、完成幾筆、回頭客佔比、平均客單價，再加上近半年營收趨勢、哪些服務最多人做、每位美甲師各做了多少業績——不用再自己開 Excel 加總。",
        description:
          "截圖依序為側邊選單、預約管理、行事曆、統計報表（上半、下半），取自體驗環境；畫面中的營收與預約數字是每日重置的示範資料，不是真實營運數據。",
        images: [
          "/cases/nail-art-reservation/admin-1.jpg",
          "/cases/nail-art-reservation/admin-2.jpg",
          "/cases/nail-art-reservation/admin-3.jpg",
          "/cases/nail-art-reservation/admin-4.jpg",
          "/cases/nail-art-reservation/admin-5.jpg",
        ],
        imagesAspect: "9 / 16",
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
    stackTitle: "已交付客戶（GAS + Google Sheets）",
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
    stackAlt: {
      title: "第二版 （Next.js + PostgreSQL）",
      
      items: [
        { layer: "框架", tech: "Next.js 16（App Router）+ TypeScript" },
        {
          layer: "資料庫",
          tech: "PostgreSQL 18 + Prisma 6（正式走 Zeabur 內網，本機用 embedded PostgreSQL）",
        },
        { layer: "UI", tech: "Tailwind CSS v4 + shadcn/ui" },
        { layer: "行事曆", tech: "FullCalendar" },
        { layer: "圖表", tech: "Recharts" },
        {
          layer: "後台登入",
          tech: "Auth.js v5（LINE Login）+ 一次性邀請碼綁定",
        },
        { layer: "前台驗證", tech: "LIFF access token → LINE API 驗證" },
        {
          layer: "併發防護",
          tech: "PostgreSQL exclusion constraint（booking_no_overlap），同員工的預約時段不可能重疊",
        },
        {
          layer: "排程",
          tech: "node-cron（每小時）+ /api/cron/reminders 外部備援",
        },
        {
          layer: "測試",
          tech: "Vitest 409 項（單元／架構守門／DB 整合／API 整合）",
        },
        {
          layer: "部署",
          tech: "Docker（output: standalone）+ Zeabur，一客一套獨立部署",
        },
      ],
    },
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
    slug: "my-coffee-site",
    name: "暮焙 MUBEI 咖啡豆電商 Demo",
    type: "個人作品 · 全端電商 Demo",
    outcome:
      "完整的咖啡豆網路商店 Demo。顧客：從首頁、單品咖啡、購物車、結帳、4 種付款方式，到會員中心看訂單跟訂閱配送；店家：從接單、改訂單狀態、調庫存、發優惠碼、看每天賺多少，到印出貨單和叫物流。",
    role: "前端、後端、資料庫、金物流串接、部署",
    duration: "3~4週內",
    websiteUrl: "https://my-coffee-site-demo.vercel.app/",
    features: [
      {
        title: "商品頁面",
        problem:
          "商品頁可以依「產地、烘焙深淺、處理法、價格、排序」5 個條件來找豆子。篩好的結果會直接記在網址上，分享篩好的網址就能直接開啟篩好的畫面。整體視覺走暖橘 × 深炭灰、雜誌專欄感。",
        image: "/cases/my-coffee-site/products.jpg",
      },
      {
        title: "購物車：還沒登入也能先加，登入後不會清空",
        problem:
          "登入帳號前就能先把豆子加進購物車，瀏覽器關掉不消失。等想結帳時再登入，登入前後加入購物車的豆子會合併在一起，不會因為登入就被洗掉。下單那一刻，庫存就直接扣掉，避免兩個顧客同時搶到最後一包。每張訂單都有獨立的訂單編號（例：ORD-20260521-0001），日期 + 流水號方便對帳。",
        image: "/cases/my-coffee-site/cart.jpg",
      },
      {
        title: "配送：超商取貨或宅配到府，設定是否寄送離島",
        problem:
          "三種拿貨方式：到 7-11 取貨、到全家取貨、宅配到府。可以設定是否寄送離島。如果不寄送離島，系統會在送出訂單前提醒不能寄，並直接擋下。",
        image: "/cases/my-coffee-site/shipping.jpg",
      },
      {
        title: "付款：信用卡、LINE Pay、ATM 轉帳、貨到付款",
        problem:
          "四種付款方式都接好：信用卡（透過綠界刷卡）、LINE Pay、ATM 轉帳、貨到付款。信用卡與 LINE Pay 都走測試環境，刷下去不會真的扣錢，方便客戶端先看流程。ATM 轉帳和貨到付款由店家在後台手動標記「已收款」，刷卡和 LINE Pay 則一律要等銀行系統回覆才算成功，避免有人偽造「我付過了」的訊息卻沒真的付到錢。",
        image: "/cases/my-coffee-site/checkout.jpg",
      },
      {
        title: "會員中心：看訂單、訂閱配送、累積消費自動升級",
        problem:
          "顧客登入後能看到：歷史訂單、收件地址、收藏的豆款、目前訂閱的配送方案。會員等級會依累計消費自動升等——累計滿 5,000 元升 Tier 02、滿 15,000 元升 Tier 03，後續可對應到不同折扣或贈品。等級在顧客付款完成的當下就重算，不必等隔天結算，顧客馬上能在會員頁看到自己升級了。",
        image: "/cases/my-coffee-site/account.jpg",
      },
    ],
    solution: {
      text:
        'Next.js 16 App Router + 4 個 route group（前台 (shop) / 會員 (member) / 後台 (admin) / 結帳付款 (payment-dispatch)），server component 預設、需要 state 才加 "use client"。Auth.js v5 credentials + JWT session；用 Next 16 的 proxy.ts 取代舊 middleware.ts 集中守關 /account/* / /admin/* / /checkout/*。Prisma 7 採 adapter-pg 初始化、prisma.config.ts 取代 schema datasource url。資料庫 Supabase PostgreSQL；商品圖走 Supabase Storage public bucket。賣家後台另外含訂單狀態機、商品 / 庫存 / 優惠碼 CRUD、Recharts 營收趨勢、CSV 匯出（RFC 4180 + UTF-8 BOM）、物流建單。',
    },
    stack: [
      {
        layer: "框架",
        tech: "Next.js 16.2.6（App Router、Turbopack）+ React 19.2.4 + TypeScript 5",
      },
      {
        layer: "樣式",
        tech: "Tailwind CSS 4（@theme in CSS，不用 tailwind.config.ts）+ Noto Serif TC / Noto Sans TC（Google Fonts CDN）",
      },
      {
        layer: "資料庫 / ORM",
        tech: "PostgreSQL（Supabase）+ Prisma 7.8 + @prisma/adapter-pg",
      },
      {
        layer: "驗證",
        tech: "Auth.js v5（next-auth@beta）+ bcryptjs + JWT session；Role enum 分 CUSTOMER / SELLER，proxy.ts 集中 role gate",
      },
      {
        layer: "金流",
        tech: "ECPay AIO sandbox（CheckMacValue SHA256 + .NET URL encode）+ LINE Pay v3（HMAC-SHA256）+ 銀行轉帳 + 貨到付款",
      },
      {
        layer: "物流",
        tech: "ECPay 物流 sandbox /Express/Create + Mock CVS 10 間 fake 店（5 間 7-11 + 5 間全家）",
      },
      {
        layer: "後台",
        tech: "Recharts 3.8 營收趨勢、Supabase Storage product-images bucket、CSV 匯出（RFC 4180 + UTF-8 BOM）",
      },
      { layer: "部署", tech: "Vercel + Supabase（sandbox 沿用同顆 dev DB）" },
    ],
    decisions: [
      {
        title: "proxy.ts 取代 middleware.ts（Next.js 16 慣例）",
        body: "Next 16 把 middleware 改稱 proxy。role gate（/account 需登入、/admin 需 SELLER、/checkout 需登入）寫在 proxy.ts 集中守關；每個 page 不重複檢查。auth.config.ts 設計成 edge-safe，jwt / session / authorized callbacks 都在這層，給 proxy 與 Auth.js handler 共用。",
      },
      {
        title: "4 處 PAID trigger 共用 applyPaidEffects transaction",
        body: "後台 updateOrderStatus、後台 confirmManualPayment、ECPay return、LINE Pay confirm 共 4 個進入點都會把訂單推進 PAID。為了避免「升等漏算」「lifetimeSpent 不一致」「優惠碼重複計次」，全部呼叫 lib/order-paid-effects.ts 的 applyPaidEffects(tx, ...)，在同一個 transaction 裡寫 PromoCodeUsage + 更新 user.lifetimeSpent + 重算 tier。",
      },
      {
        title: "CVS 選店走 Mock 10 間 fake 店，不接真 StoreMap",
        body: "綠界 StoreMap 是跨網域跳轉 + 回 callback 帶 query 回來，要設定 ReplyURL、dev 還要 tunnel。權衡後決定 sandbox demo 階段先用 Mock 10 間 fake 店，placeOrder 在後端用 findStoreById 驗 storeId + chain 對齊，未來要接真 StoreMap 只換 fetch 來源即可。",
      },
      {
        title: "callback redirect 用 cfg.appUrl base 避開 dev tunnel host header 改寫",
        body: "ECPay / LINE Pay callback 回 redirect 時，若用 request 的 host 組 URL，dev 環境跑 cloudflared / ngrok 會把 host 改成 tunnel domain，使用者被打回 tunnel 而不是本機。改用 env 設定的 cfg.appUrl 當 base，dev tunnel 或 prod Vercel 都能正確跳回。",
      },
    ],
  },
  {
    slug: "condo-management",
    name: "社區物業收費管理系統",
    type: "桌面收費系統（物業管理公司）· 維護中",
    outcome:
      "替一間物業管理公司開發的收費管理系統，一套管多個社區，每個月從算出應收、印三聯單收費單、到記錄誰繳了錢一氣呵成；自動備份、留住多份，讓資料再也不會憑空消失。",
    role: "獨立完成（需求訪談、系統設計、開發、點陣列印、備份還原、交付文件）",
    duration: "約 1 個月開發交付，維護中",
    problem:
      "這間物業公司同時管很多社區。舊系統的資料只放在一台電腦、沒有備份，主機一壞資料全部不見——這是整套重做的起點。日常最麻煩的，則是用點陣印表機印那種預印格線的連續三聯收費單：每台印表機、每批紙都會讓字印歪，一次印幾十張還會越印越偏。",
    features: [
      {
        title: "一套管多個社區，接新社區不必改系統",
        problem:
          "所有社區、住戶、每戶要收的費用都集中在同一套系統。房子的資料固定、住的人換了只要改一筆，該收的費用不會跟著跑掉。接了新社區直接新增就能開始收費。建住戶名單可以一戶一戶加，也可以把整份 Excel 名冊一次匯入。",
        image: "/cases/condo-management/community.jpg",
      },
      {
        title: "每月收費照四步走，算錢、開單、收款一條龍",
        problem:
          "每個月的收費整理成固定四步：算出這個月每戶該收多少 → 選要開單的戶 → 印收繳單 → 標記誰繳了。管理費可固定金額，也可以照坪數算，季繳、半年繳的社區系統會自己乘月數，不用心算。單號在列印當下自動編（民國年月＋流水號），不會重號。開錯印錯的單有清楚的處理方式——還沒印的直接刪、已經印出去的作廢，作廢後那個號碼還能留給下一張用，不浪費。",
        image: "/cases/condo-management/monthly-flow.jpg",
      },
      {
        title: "點陣印表機印三聯單，位置可校準、連印不歪",
        problem:
          "這是物業公司每個月最花時間、也最容易出錯的一件事。系統只印會變動的內容（名稱、地址、門牌、月份、費用、合計），格線和複寫由紙張本身處理。最實用的是「對位功能」：不同印表機、不同批紙、色帶鬆緊都會讓字印歪，系統內建「測試列印」印出對位格線，讓操作人員自己「印一張 → 看哪裡歪 → 微調 → 再印」，調到準為止，數值會記住。而且一次連印幾十張時，位置不會越印越歪——這正是舊做法最讓人頭痛的地方。",
        image: "/cases/condo-management/triplicate.jpg",
      },
      {
        title: "住戶名冊、收費報表、對管委會的請款單都印得出來",
        problem:
          "除了給住戶的三聯單，物業公司平常還要印很多文件：住戶名冊、區分所有權人名冊、開會用的簽到簿、各種管理費收費表、簽領名冊，還有每個月向社區管委會請款用的「服務費用請款單」（含國字大寫金額、簽名欄）。這些都做進系統，按社區各自記住要顯示哪些欄位，印出來的版面對齊公司原本慣用的格式，可以直接送印表機或存成 PDF。",
        image: "/cases/condo-management/reports.png",
      },
    ],
    solution: {
      text: "分層架構（UI／Service／Data／Printing／Backup），所有路徑、位移、印表機名等設定值一律進設定檔、不寫死。兩條列印路線各走各的：①點陣三聯單走 ESC/P RAW——用 P/Invoke 呼叫 winspool.drv（OpenPrinter／StartDocPrinter／WritePrinter）以 RAW 型態送原始位元組，繞過驅動繪圖以降低 LQ-680C 在 Windows 10 的相容性風險，中文以 Big5 由印表機內建字庫印出；②A4 報表／請款單走 GDI PrintDocument＋OpenXML Word 範本填資料，可送一般印表機或 Microsoft Print to PDF。資料以社區為根、FK 一路可追溯，新增社區只是新增資料、不動程式碼。開發過程累積 500+ 自動化測試，依業主實機回報持續迭代。",
      flow: `WinForms UI
  └─ Service（費用計算 / 每期帳單 / 收款銷帳 / 單號配號）
       ├─ Data（SQLite + Dapper，以「社區」為根）
       ├─ Printing（ESC/P 組裝 → winspool RAW → LQ-680C 三聯單）
       ├─ Reporting（GDI + Word 範本 → A4 名冊 / 請款單 / PDF）
       └─ Backup（複製 .db → NAS 帶日期多份 + 還原前快照）`,
    },
    stack: [
      {
        layer: "語言 / 框架",
        tech: "C# / .NET 8 + WinForms（Windows 桌面，單機單人）",
      },
      { layer: "資料庫", tech: "SQLite（單檔）+ Dapper（輕量 CRUD，不用重型 ORM）" },
      {
        layer: "三聯單列印",
        tech: "ESC/P RAW 指令、P/Invoke winspool.drv、Big5 中文由印表機內建字庫印出",
      },
      {
        layer: "A4 報表列印",
        tech: "GDI PrintDocument + OpenXML（Word .docx 範本填資料）+ Microsoft Print to PDF",
      },
      {
        layer: "印表機",
        tech: "EPSON LQ-680C（24 針點陣機、多聯複寫、內建中文字庫）",
      },
      {
        layer: "備份 / 還原",
        tech: "複製 .db 至 NAS、帶日期多份保留、關閉自動備份、還原前快照",
      },
      {
        layer: "帳號 / 安全",
        tech: "帳號登入 + 角色權限（管理員 / 操作員）+ 操作紀錄、密碼雜湊",
      },
    ],
    decisions: [
      {
        title: "選 SQLite 單檔，讓「備份＝複製一個檔」簡單到不會出錯",
        body: "舊系統死在資料只存單機、沒有備份。選 SQLite 不只是為了輕量，而是讓「備份＝複製那一個 .db 到 NAS」這件事簡單到不會出錯；再搭配帶日期的多份保留（不覆蓋同一個檔），把資料安全放在功能華麗之前。",
      },
      {
        title: "列印座標一律不寫死，走可調位移＋測試列印",
        body: "點陣機的對位受機器、紙張、色帶影響，寫死座標必然對不準。所有欄位座標與全域 X／Y 位移都進設定檔，並提供測試列印格線讓操作員自行校正到準，換機器換紙後重印一次即可，不必回頭改程式。",
      },
      {
        title: "連印防「逐份累積漂移」從架構下手",
        body: "一次連印數十份時位置容易越印越歪。解法不是手動數行數補頁，而是每份開頭送 ESC @ 重置歸零、每個欄位以「距本份頂端」的絕對位置定位、用頁長＋FF 換頁精準跳到下一份頂端，讓誤差不跨份累積。",
      },
      {
        title: "單機單人，刻意不過度設計",
        body: "使用情境是單一辦公室、單台電腦、單人操作，就不做多人並行、網路資料庫或雲端架構——那些只會增加故障面與維護成本。SQLite ＋ 單機正是最穩的解，把力氣花在資料安全與列印可靠度上。",
      },
    ],
  },
  {
    slug: "voxplan",
    name: "VoxPlan 語音行事曆",
    type: "個人付費 App · iOS / Android 上架審核中",
    outcome:
      "用講的就能建立行程的語音行事曆——說一句「明天下午兩點在咖啡廳跟 Amy 開會」，標題、時間、地點、人員會自己填好。",
    role: "App、後端、AI 服務、官方網站、訂閱系統皆獨立完成",
    duration: "2 個月",
    websiteUrl: "https://voxplan.app",
    problem:
      "每天用行事曆建一筆行程，要點日期、選時段、打標題、補地點、加人員，動作太多。市面上能用講的工具，又多半只是把語音轉成文字，沒辦法把「明天」「下週三」這類說法換算成正確日期，最後還是要回去手動修。",
    features: [
      {
        title: "多本可共用的行事曆，每本獨立運作",
        problem:
          "個人、工作、家庭、團隊的行程，有時候想分開看、有時候又想攤在一起對。VoxPlan 一個帳號下可以開很多本行事曆，每本有自己的顏色、標籤分類，農曆顯示與不同地區的節日也能單獨開關。每一本都能邀請成員一起共用，並區分擁有者與一般成員。刪掉一本行事曆時，底下的成員與所有行程也會跟著一起清乾淨。",
        image: "/cases/voxplan/shared-calendars.jpg",
      },
      {
        title: "按下麥克風後講出行程，自動拆成標題、時間、地點、人員",
        problem:
          "傳統行事曆建一筆要點 4–5 次：日期 → 時段 → 標題 → 地點 → 人員。在 VoxPlan 只要按下麥克風講一句「明天下午五點跟 Amy 開會，前 15 分鐘提醒」，標題、時間、地點、人員、提醒時間就會自己被填好直接存進行事曆，整段流程 30 秒內完成。「明天」「下週三」「三天後」這種口語都聽得懂，會自動換算成正確的日期，不會把人約到去年或下個月。",
        image: "/cases/voxplan/voice-input.jpg",
      },
      {
        title: "群組行程：把多筆相關行程綁在一起，整組管理",
        problem:
          "出差、追案子、跑客戶進度這類「一件事、好幾個時段」的行程，散著建立後很難追。VoxPlan 可以把多筆相關行程串成一個群組，例如「日本出差」底下放「去機場、跟客戶見面、進公司」三筆。點開任何一筆都能看到同組其他行程，管理頁面也分「未結束 / 已結束」兩個分頁。整組要改、要刪都是一鍵完成，也可以把現有的單筆行程加進既有的群組裡。",
        image: "/cases/voxplan/group-events.jpg",
      },
      {
        title: "跨時區雙欄對照：本地時間與目標時區同步顯示",
        problem:
          "經常出差、跨國工作的人，經常需要對齊兩地的會議時間。VoxPlan 內建 100 多個城市的時區，每個人可以設一個主要時區，再加最多 5 個常用時區，也可以選擇自動跟著手機系統的時區跑。要臨時換顯示時區時，點上方的地球圖示就能切換；切到日視圖會把本地時間與目標時區並排在兩欄，同一個行程在兩邊對應的時間一眼就看得到，不用心算時差。",
        image: "/cases/voxplan/timezones.jpg",
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
      "為《Freedunk》遊戲玩家設計的戰術分析工具，整合「選角模擬 → 樹狀推演 → 戰術繪製 → 陣容配置」四個分頁，內建 29 名遊戲角色與 18 項能力值資料，用同一套介面從選人到擺戰術一氣呵成。",
    role: "獨立完成",
    duration: "7 天",
    problem:
      "方便《Freedunk》玩家在比賽時需要戰術討論的需求，所以做了一個專為這款遊戲打造的工具。",
    features: [
      {
        title: "選角模擬器：左右隊輪流 BAN/PICK 9 步驟",
        problem:
          "MOBA 風格的選角流程（左右隊各 BAN 1 角，再交錯 PICK 各 3 角），讓玩家在比賽前先模擬對手 BAN/PICK。每一步都有獨立的 undo/redo，可任意回退試不同 PICK，整輪結束後可一鍵重置。",
        image: "/cases/freedunk-hub/draft-simulator.jpg",
      },
      {
        title: "選角樹狀圖：多分支推演",
        problem:
          "透過樹狀圖更直觀的了解選角狀況。樹狀圖的每個節點都能新增分支，同時並排檢視多種 PICK 走向。並且可以儲存不同方案，命名、切換、刪除，全部存在 localStorage，下次開啟還在。",
        image: "/cases/freedunk-hub/draft-tree.jpg",
      },
      {
        title: "籃球戰術版：球員拖曳 + Canvas 畫戰術線",
        problem:
          "選完角後要實際擺位、討論跑位。從右側面板拖曳球員 token 到球場任意位置，再用 4 色畫筆（黃 / 紅 / 藍 / 綠）畫出移動路徑與傳球線，畫筆粗細可調。戰術版底圖是真實籃球場圖片，搭配格線方便對位。",
        image: "/cases/freedunk-hub/tactics-board.jpg",
      },
      {
        title: "球員配置板：自由配置 + 畫筆模式 + 能力值彈窗",
        problem:
          "自由使用的白板可以任意討論，輕點任一張卡片會跳出該球員 18 項能力值的彈窗（跑動、彈跳、三分、內防…），不用切到別頁查資料。配置與筆跡也都自動存到 localStorage。",
        image: "/cases/freedunk-hub/roster-board.jpg",
      },
    ],
    solution: {
      text: "單頁互動 Web App，1755 行寫在一個 index.html 內。React 18（CDN）+ Babel Standalone 在瀏覽器內即時編譯 JSX，無 build pipeline。四個分頁共用一份角色資料（CHARACTERS_DATA / STATS_DATA / SEQUENCE），各自獨立的 useState + useRef + localStorage，沒有共享 store。Canvas 2D 自製繪圖 / snapshot / restore，DOM 元素拖曳則手寫 mouse/touch event 統一處理。",
    },
    stack: [
      {
        layer: "UI",
        tech: "React 18（CDN）+ Babel Standalone（瀏覽器內 JSX 即時編譯，無 build）",
      },
      { layer: "樣式", tech: "Tailwind（CDN）" },
      {
        layer: "繪圖",
        tech: "Canvas 2D API（自製 drawing / snapshot / restore，dataURL 還原）",
      },
      {
        layer: "狀態",
        tech: "React useState + useRef，無外部狀態庫；持久化用 localStorage（rosterboard-tokens-v2、drafttree-data）",
      },
    ],
    decisions: [
      {
        title: "Undo / Redo 同時管理「React state」與「Canvas pixel 狀態」",
        body: "一般 undo/redo 只處理 React state，但戰術版的塗鴉直接畫在 canvas 上、不在 React 樹裡。每次操作把 { items, snap: canvas.toDataURL() } 推進歷史堆疊；undo 時還原 state + 把 dataURL 重新 drawImage 回 canvas。戰術版、球員配置板各維護一套，互不干擾。",
      },
      {
        title: "選角樹狀資料用遞迴函式管理，不攤平成 array",
        body: "節點關係天然巢狀，硬攤平成 flat array 加 parentId 反而要每次手動 reconstruct。直接寫 updateNodeInTree / addChildInTree / removeNodeInTree / findPathInTree 四個遞迴函式，每次操作回傳新的根節點 immutable update，省下序列化／反序列化邏輯。",
      },
      {
        title: "拖曳判定區分「點擊」與「拖曳」",
        body: "拖曳時若移動距離 ≤ 3px 視為點擊（改開能力值彈窗，不觸發拖曳邏輯），避免使用者輕觸時誤觸發拖曳。",
      },
      {
        title: "觸控與滑鼠統一處理",
        body: "用 e.clientX ?? e.touches?.[0].clientX 模式統一兩種輸入裝置，不寫兩套邏輯。手機 / 平板上拖曳與繪圖都能用。",
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
