# 部署說明 — 拾光花室官網

本網站為純靜態前端(HTML / CSS / JavaScript),不需要資料庫，也不需要任何後端環境。

---

## 一、最快的方式：直接開啟

1. 將壓縮檔解壓縮
2. 用瀏覽器開啟資料夾中的 `index.html`

即可看到完整網站。所有樣式、腳本與圖片皆為相對路徑，不需要架站軟體。

> 註：網站字體採用 Google Fonts,離線開啟時會自動退回系統中文字體，
> 版面不受影響。

---

## 二、上傳至一般虛擬主機(FTP / cPanel)

將以下**全部內容**上傳至網站根目錄（通常是 `public_html` 或 `www`）：

```
index.html
styles/
scripts/
assets/
```

上傳後即可透過網域瀏覽，不需要額外設定。

---

## 三、部署至免費靜態主機

以下三種擇一即可，皆免費且自動提供 HTTPS。

**Netlify（最簡單，拖曳即可）**
1. 前往 https://app.netlify.com/drop
2. 將整個網站資料夾拖進頁面
3. 立即取得網址，可於後台綁定自訂網域

**Vercel**
1. 安裝 CLI:`npm i -g vercel`
2. 在網站資料夾中執行：`vercel`
3. 依提示選擇專案名稱即可

**GitHub Pages**
1. 建立 repository,將網站檔案推送至 `main` 分支根目錄
2. Settings → Pages → Source 選擇 `main` / `root`
3. 等待約一分鐘後即可透過 `https://<帳號>.github.io/<repo>/` 瀏覽

---

## 四、本機預覽（選用）

若需在本機以伺服器方式預覽（例如測試相對路徑），可執行：

```bash
# Python 3
python -m http.server 8080

# 或 Node.js
npx serve .
```

接著開啟 `http://localhost:8080`。

---

## 五、後續維護常見項目

| 需求 | 修改位置 |
|---|---|
| 調整顏色、字級、間距 | `styles/tokens.css`（所有樣式皆引用此檔變數） |
| 修改文案 | `index.html` |
| 新增/移除商品 | `index.html` 中 `#productGrid` 內的 `<article class="product">` 區塊，`data-category` 需對應篩選按鈕 |
| 更換圖片 | 覆蓋 `assets/images/` 中的同名檔案，或修改 `index.html` 的 `src` |
| 調整互動效果 | `scripts/main.js`（各功能已拆成獨立函式） |

---

## 六、瀏覽器支援

已於下列環境確認版面與功能正常：

- Chrome / Edge（最新版）
- Firefox（最新版）
- Safari（最新版，含 iOS）
- 斷點：375（手機）、768（平板）、1440（桌機）

網站使用 `IntersectionObserver` 與 CSS `aspect-ratio`,不支援 Internet Explorer。
如需支援 IE,請另行告知評估。
