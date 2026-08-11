# 使用字體與圖片來源對照表 — 拾光花室

> ⚠️ **目前為 mock 版本。** 所有圖片皆為本專案自製的 SVG 佔位圖，
> 待甲方提供正式 Figma 設計稿後，逐列替換為實際匯出檔案並更新本表。
> 交件前本表不得留有「佔位」字樣。

---

## 一、字體

| 字體 | 用途 | 來源 | 授權 | 費用 |
|---|---|---|---|---|
| Noto Sans TC | 內文、按鈕、表單 | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+TC) | SIL Open Font License 1.1 | 免費，可商用 |

**退回字體（未載入時）：**
- 襯線：Songti TC / PMingLiU / Georgia
- 無襯線：PingFang TC / Microsoft JhengHei / system-ui

> **待確認：** 甲方 Figma 若指定其他字體（尤其是付費中文字型），
> 需由甲方提供授權證明或另行採購，本專案不代為承擔授權責任。

---

## 二、圖片

所有圖片皆為 SVG 向量檔，由本專案自行繪製，無第三方素材、無授權疑慮。

| 檔案 | 用途 | 尺寸比例 | 來源 | 授權 |
|---|---|---|---|---|
| `assets/brand/logo.svg` | Logo 標誌 | 1:1 | 自製佔位 | 待換為甲方正式 Logo |
| `assets/images/hero.svg` | 首屏主視覺 | 4:5 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/story.svg` | 品牌介紹 | 4:3 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/service-1.svg` | 服務：日常花禮 | 3:2 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/service-2.svg` | 服務：婚禮佈置 | 3:2 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/service-3.svg` | 服務：空間配花 | 3:2 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/product-1.svg` | 商品：春日暖陽花束 | 1:1 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/product-2.svg` | 商品：白綠系手綁花束 | 1:1 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/product-3.svg` | 商品：桌上盆花・小 | 1:1 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/product-4.svg` | 商品：陶盆常綠組合 | 1:1 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/product-5.svg` | 商品：乾燥花束・暖棕 | 1:1 | 自製佔位 | 待換為 Figma 匯出 |
| `assets/images/product-6.svg` | 商品：每週訂閱配花 | 1:1 | 自製佔位 | 待換為 Figma 匯出 |

---

## 三、圖示(Icon)

| 位置 | 用途 | 來源 | 授權 |
|---|---|---|---|
| 快速尋找區塊（4 枚） | 送禮 / 婚禮 / 空間 / 課程 | 自製 inline SVG(24×24,stroke 1.8) | 自製，無限制 |
| 聯絡區塊（3 枚） | Instagram / Facebook / LINE | 自製 inline SVG line icon | 自製，未使用官方商標檔案 |

> **注意：** 社群圖示為自行繪製的線條圖示，非各平台官方 logo 檔案。
> 若甲方要求使用官方品牌標誌，需依各平台品牌使用規範取得檔案並遵守其使用條款。

---

## 四、替換流程（收到正式 Figma 後）

1. 由 Figma 匯出圖片：照片類 2x JPG、圖示與 Logo 用 Copy as SVG
2. 以**相同檔名**放入 `assets/` 對應資料夾（副檔名不同時，同步修改 `index.html` 的 `src`）
3. HTML 中每張圖皆已標註 `width` / `height` 與 `alt`,版面不需調整
4. 逐列更新本表的「來源」與「授權」欄位
5. 確認本檔案中沒有任何「佔位」「待換」字樣後再交件
