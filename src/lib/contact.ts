/** 聯絡資訊只在這裡寫一次，浮動按鈕、首頁 CTA、footer 都從這裡取 */
export const EMAIL = "enghuang100@gmail.com";
export const LINE_ID = "@989evvhq";
export const LINE_URL = "https://line.me/R/ti/p/%40989evvhq";

/*
  預設信件：寫給不熟技術的店家老闆，讓他照著填就能把需求講清楚，
  回信時也不用再來回問「你是哪位、想做什麼」。
  主旨開頭的「作品集來信」方便在信箱裡一眼認出、設篩選規則。
*/
const EMAIL_SUBJECT = "作品集來信｜想聊一個案子";

const EMAIL_BODY = [
  "Alvin 你好，",
  "",
  "我是：（怎麼稱呼、店名或公司名稱）",
  "",
  "想做的事：",
  "（例如：讓客人直接在 LINE 上預約；把每天手動整理的報表變成自動產生）",
  "",
  "現在是怎麼處理的：",
  "（例如：用 Excel 手動記錄，每天花一小時對帳）",
  "",
  "希望什麼時候能用：",
  "預算大概多少：（還不確定可以先空著）",
  "方便聯絡的方式：（LINE ID 或電話）",
].join("\r\n");

/**
 * 帶預設主旨與內文的寄信連結。
 * 換行用 CRLF、空白編成 %20（RFC 6068），用 `+` 的話有些信件軟體會照字面顯示成加號。
 */
export const EMAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  EMAIL_SUBJECT
)}&body=${encodeURIComponent(EMAIL_BODY)}`;
