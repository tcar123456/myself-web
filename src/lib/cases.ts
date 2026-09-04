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
    slug: "gamecoins",
    name: "GameCoins 自動盯盤與成本分析系統",
    type: "自有事業營運工具 · 已上線運作中",
    outcome:
      "我自己在做遊戲幣的買賣，這套系統每 5 秒替我看一次價格，便宜的貨一出現就通知我，並且直接算出這一單到底賺不賺。再用累積的實際紀錄回頭比對，找出真正該進貨的時段。",
    role: "獨立完成（資料抓取、數據分析、後端、部署、LINE 官方帳號）",
    duration: "持續維護中",
    problem:
      "監控平台價格，出現任何值得關注的變化都會使用 Telegram 通知我。",
    features: [
      {
        title: "一整天的行情，攤開在同一頁",
        problem:
          "以前要知道行情，只能開著對方平台的網頁憑印象記，看過就忘。現在系統把價格一路記下來畫成走勢：上面四格是各個伺服器的現價、還有跟前一期比是漲是跌；下面滑到任何一個時間點，就看得到那個當下最便宜的價格和整體平均價各是多少。一整天怎麼走，一眼看完。",
        image: "/cases/gamecoins/price-trend.png",
      },
      {
        title: "幾點進貨划算，直接排成一張表",
        problem:
          "系統把累積下來的紀錄整理成「哪一天的哪個時段，比同期行情便宜或貴」，便宜和貴各排前十名。同一天之內的價差有 7.7%，而整段期間每天只漲 0.3%——意思是當天買、當天報就好，貨壓過夜多賺的還不夠補跌價。它也會自己把看起來像假的掛單剔掉，這段期間 1,292 筆裡排掉了 20 筆。目前累積 8 天，天數還在往上疊，樣本越多結論越站得住。",
        image: "/cases/gamecoins/hourly-ranking.png",
      },
      {
        title: "哪一天、幾點鐘，圖上直接分得出來",
        problem:
          "上面那張比的是星期，每一根都是「比同期行情便宜或貴多少」，往下是便宜、往上是貴。下面那張把平日和週末分開畫成一整天：清晨六點前後是全天最貴的時候，上午十點附近最便宜，而且週末的起伏明顯比平日大。這種一天之內的節奏，光盯著價格數字是看不出來的。",
        image: "/cases/gamecoins/weekday-pattern.png",
      },
      {
        title: "便宜的貨一出現，手機就響",
        problem:
          "越便宜的貨消失得越快，人守不住，所以讓系統每 5 秒去對方平台看一次現在的價格，一發現比行情便宜就馬上用 Telegram 把單價、數量、總價推到我手機上，還會標成黃色或紅色告訴我這則有多急。反過來也會提醒：便宜的檔位剛被人掃光、同期確認成交四筆——有人在收貨，行情可能要往上了。從對方掛出來到我收到通知，通常不用十秒。系統從八月中一路跑到現在沒有停過，將近3萬次查詢，沒有任何 MISS 。",
        image: "/cases/gamecoins/alerts.jpg",
      },
    ],
    solution: {
      text: "Python 標準庫寫的單一服務跑在雲端，零第三方依賴。背景執行緒每 5 秒一輪、上限併發取四個伺服器的盤面寫進 SQLite；訊號判斷是純函式（不碰 DB／網路，可單獨測）、Telegram 推播走背景佇列（對方慢或掛掉不會擋住取樣）、告警全程包護欄（告警的 bug 不會殺掉監控）。報表頁與帳本頁都是後端直出 HTML，圖表是手刻的內嵌 SVG。11,151 行程式配 10,435 行測試、914 個測項。",
      flow: `平台官方 JSON API（4 個伺服器 · 5 秒一輪 · 上限併發 4）
  └─ 取樣 + 五道失敗判定（任一不過 → 整批丟棄，絕不標記掛單消失）
       ├─ SQLite on volume
       │    取樣 / 掛單 / 掛單事件流（只增不改）/ 盤面快照 / 告警
       │      ├─ 訊號判斷（純函式）→ 背景佇列 → Telegram（四種訊號分級靜音）
       │      ├─ 走勢報表 + 時段分析（去趨勢殘差 · 內嵌 SVG 熱力圖）
       │      └─ 收入帳本（庫存池 / 成本結轉 / 分潤 / 匯出 xlsx）
       │           └─ 進貨回報表圖片 → Gemini → 四重驗算 → 填表單（不直接入帳）
       └─ LINE 官方帳號（Messaging API + LIFF 即時試算）`,
    },
    stack: [
      { layer: "語言", tech: "Python 3，零第三方依賴（只用標準庫）" },
      {
        layer: "資料抓取",
        tech: "urllib + 平台官方 JSON API，每 5 秒一輪、上限併發 4（不隨標的數線性成長，設 1 可完全退回循序）",
      },
      {
        layer: "儲存",
        tech: "SQLite（WAL）on volume：取樣 / 掛單 / 掛單事件流（只增不改）/ 盤面快照 / 告警",
      },
      {
        layer: "統計分析",
        tech: "手寫 statistics + math：去趨勢殘差、滾動中位、掛單存活分析。無 pandas / numpy",
      },
      {
        layer: "圖表",
        tech: "自製內嵌 SVG：折線 / 長條 / 星期×時段熱力圖。無 matplotlib",
      },
      {
        layer: "報表匯出",
        tech: "自製 .xlsx 產生器（zipfile + 手寫 XML），無 openpyxl",
      },
      {
        layer: "推播",
        tech: "Telegram Bot API，背景佇列 + 專屬執行緒，訊號分級靜音",
      },
      {
        layer: "圖片辨識",
        tech: "Gemini 2.5 Flash 讀進貨回報表 + 四重驗算，永遠不直接入帳",
      },
      { layer: "對外前台", tech: "LINE Messaging API + LIFF（金額即時試算）" },
      { layer: "部署", tech: "Zeabur，GitHub push 自動上線，SQLite 掛 volume" },
      { layer: "測試", tech: "標準庫 unittest，18 支測試檔、914 個測項" },
    ],
    decisions: [
      {
        title: "本來在寫爬蟲，寫到一半發現平台有官方 API",
        body: "最初的方案是解析網頁。寫到一半才發現平台自己有免授權的 JSON 介面，而且它的防爬頁上就寫著「若您有高频次访问请求，请使用接口访问」——高頻存取是官方鼓勵的。實測對比之下沒有懸念：網頁端 48 次/分鐘就被防護擋下、robots.txt 是 Disallow: /；官方介面 214 次/分鐘零失敗、回應 1 KB（網頁 137 KB，差 135 倍）。爬蟲那半套直接丟掉。雲端連續跑 16 小時、6,604 次取樣，失敗率 0.0%。",
      },
      {
        title: "對方被擋時回的是 HTTP 200，不是錯誤碼",
        body: "這是整個系統最關鍵的一段。防護頁回 200 帶一個假頁面，不主動檢查的話程式會讀成「盤面一筆掛單都沒有」，然後加權均價變 0、推播一批不存在的超便宜貨。所以每次取樣都要過五道判定（連線、狀態碼、內容為空、單位不符…），任何一道不過就整批丟棄——不寫快照、不更新時間、絕不標記掛單消失。這個系統的失效模式是安靜地算錯，不是崩潰。",
      },
      {
        title: "「這一小時多少錢」不能用五分鐘一張的快照算",
        body: "原本用每 5 分鐘一張的盤面快照做統計。實測 2,004 筆告警掛單後發現，便宜的那批有 52~61% 活不到一個快照間隔，比行情便宜 10~15% 的更是 82% 撐不過去——快照結構上就看不到要買的那批單。於是另外寫一份只增不改的掛單事件流（出現／改價／消失／回來各記一列），時段分析改吃這份資料，價格重新定義成「那一小時盤面上最便宜的 10 筆平均」。",
      },
      {
        title: "比時段要先把趨勢扣掉，不然會指向錯的答案",
        body: "原本的算法是「除以當天中位數」，只拿掉每天的水位、拿不掉一天之內的斜率。2026 年八月下旬那段行情每天跌 4.8%，於是 23:00 算出來 −0.2%、跨過午夜的 00:00 跳到 +5.7%——那是日期換了，不是價格漲了。改成扣掉前後各 12 小時的滾動中位之後，「最貴的時段」從 00:00 移到 05:00、日內價差從 8.8% 縮到 6.5%。舊算法會叫人在錯的時間賣。（那是當時那段行情的數字；報表上的日內價差與期間趨勢會隨行情自己重算。）",
      },
      {
        title: "一個欄位的誤解讓系統錯了 17 天",
        body: "平台回傳的「數量」是單件數量、不是庫存，庫存要再乘上發佈件數。系統照著錯的口徑跑了 17 天，盤面深度低估 2.6~14.8%，告警上印的數量其實是起售量——一筆實際有 4,900 萬的貨被印成 100 萬，看起來只有一點點就被跳過。更正時刻意保留舊欄位不動、新增一組正確口徑並存，因為就地改掉會讓走勢圖在部署當天無聲跳升 12%，舊資料的空值就是那條斷點。",
      },
      {
        title: "盤面告警與訂單通知走兩隻不同的 bot",
        body: "一開始共用一隻。低價告警一天上百則，客人送出的訂單訊息夾在中間根本看不到——而訂單是會跑掉的，告警漏一則只是少賺一單。所以拆成兩隻 bot、兩個對話，告警照樣洗版，訂單那邊一天只有幾則、一響就知道是生意上門。",
      },
      {
        title: "測試對準「錯了會賠錢」的行為，不是覆蓋率",
        body: "10,435 行測試、914 個測項，守的是幾條不變式：取樣失敗時絕不標記掛單消失（否則會推播不存在的貨）、掛單編號當北京時間解析（錯了所有時間差 8 小時）、單位不符必須判定失敗（平台改東西時不能安靜地算錯）。任何程式碼的新增或修改都必須附測試，沒有例外。",
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
