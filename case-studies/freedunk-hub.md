# 案例詳情：Freedunk Hub

> 此檔案為作品集網站案例頁的**內容草稿**。先把文字打磨到位，再切版。
> ⚠ 標註 `🟡 待補` 的欄位需使用者本人填入；不要由 Claude 捏造。

---

## 一句話定位（Hero 區）

> 為《Freedunk》遊戲玩家設計的戰術分析工具——可拖曳球員、用 Canvas 畫戰術線、一步步推演進攻流程。

## 適合誰看

- 想看「不靠 build pipeline、純前端 1700+ 行 React 撐起來的互動 App」的人
- 想看 Canvas API、複雜 undo/redo、拖拉互動實作的同行
- 想了解「為個人興趣做工具」這種非商業向的能力的人

## 定位（誠實版）

這是**個人興趣作品**，不是接案、不是 SaaS，沒有營收計劃。
但它展示的能力跟前兩個案例**互補**：

- **前兩案展示的是**：架構設計、後端整合、商業化基礎設施
- **這案展示的是**：純前端互動深度——Canvas 繪圖、拖拉狀態、undo/redo 歷史快照、複雜 UI 狀態同步

## 動機與情境

個人/朋友群打 Freedunk 時的需求

預設稿：自己玩《Freedunk》時想跟隊友溝通戰術，發現沒有合適的線上工具——市面上的籃球戰術板都是泛用版，沒有遊戲內角色資料、能力值、位置配色等細節。於是自己做一個。

## 解決方案

單頁互動 Web App，主要功能：

1. **球員選擇**：依五個位置（PG / SG / SF / PF / C）顯示 29 名遊戲角色，含能力值資料（18 項數值，例如跑動、彈跳、三分、內防...）
2. **戰術版繪圖**：Canvas 畫筆、可選顏色與粗細
3. **球員拖曳**：拖拉球員 token 到場上任意位置，即時更新座標
4. **戰術步驟**：一個戰術可以分多步驟，每步有獨立的球員位置 + canvas 快照
5. **Undo / Redo**：完整歷史快照（含 items + canvas dataURL），支援 Ctrl+Z / Ctrl+Y
6. **節點備註**：每個球員 token 可加備註，hover 顯示
7. **觸控支援**：手機/平板拖曳與繪圖都能用（touch event handling）

## 技術棧

| 層 | 技術 |
|---|---|
| UI | React 18（CDN），Babel Standalone（瀏覽器內 JSX 編譯） |
| 樣式 | Tailwind（CDN），Google Fonts（Inter） |
| 繪圖 | Canvas 2D API（自製 drawing/snapshot/restore 邏輯） |
| 狀態 | React useState + useRef（無外部狀態庫） |
| 部署 | 未部屬|

## 關鍵亮點

### 1. Undo/Redo 同時管理「DOM 狀態」與「Canvas pixel 狀態」

一般 undo/redo 只處理 React state，但戰術版的塗鴉是直接畫在 canvas 上、不在 React 樹裡。
做法：每次操作把 `{ items: [...], snap: canvas.toDataURL() }` 推進歷史堆疊；undo 時還原 items state + 把 dataURL 重新畫回 canvas。

```js
const rbPush = () => {
  setRbHistory(h => [...h, { items: itemsRef.current, snap: rbGetSnapshot() }]);
  setRbFuture([]);
};
```

技術細節：
- 用 `useRef` 同步追蹤最新 items（避免閉包抓到過期的 state）
- `toDataURL()` 在 canvas 為空時可能回傳空字串，要 guard
- 還原時用 `Image()` 非同步載入 dataURL 後再 drawImage，不能直接同步

### 2. 拖曳判定區分「點擊」與「拖曳」

拖曳時若移動距離 ≤ 3px，視為點擊（不觸發拖曳邏輯，改開 popup）：

```js
if (Math.abs(cx - startX) > 3 || Math.abs(cy - startY) > 3) {
  draggedRef.current = true;
  setPopup(null);
}
```

避免使用者輕觸時誤觸發拖曳。

### 3. 觸控與滑鼠統一處理

`e.clientX || (e.touches && e.touches[0].clientX)` 模式統一兩種輸入裝置，不寫兩套邏輯。

### 4. 1755 行單檔的取捨

**誠實評估**：選擇 CDN React + 單檔的取捨是「快速迭代、零部署成本、檔案體積換來建置簡單」。
- 優點：開新分頁就能改、不用 npm install、適合個人玩具專案
- 缺點：沒有 tree-shaking、Babel Standalone 在客戶端執行（首次載入慢）、無 TypeScript、難拆元件
- **如果重做**：可能會用 Vite + React 拆成多檔。但作為個人工具的「最小可行架構」這個選擇成立。

## 成果

- 是否公開部署？ 否
- 用戶數？「個人/朋友圈使用」
- 開發時間？ 2天

## 客戶評價

無——這是個人作品，沒有客戶。**不要編**。
可以放隊友/朋友的真實使用回饋（如有授權）。

## 待補素材清單

- [ ] 主畫面截圖（球員選擇 + 場地）
- [ ] 戰術繪圖中的截圖（畫了線 + 球員位置）
- [ ] 操作示範 GIF（拖曳球員 → 畫線 → undo → 切步驟）
- [ ] Demo 連結（如已部署）
- [ ] 角色資料表的小截圖（展示資料規模）

## Demo 提供方式

- **直接放 Demo 連結**：這個案例最適合直接讓人玩，因為純前端、無後端、沒有客戶資料風險
- **GitHub**：建議**直接公開 repo**——沒有金鑰、沒有客戶資料，公開反而能展示前端互動實作能力
