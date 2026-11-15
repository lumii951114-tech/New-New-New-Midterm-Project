# MindScope — 36題校園人格測驗

使用 React + Vite + Recharts 製作的繁體中文互動測驗。36題、12種人格，使用使用者提供的原始權重矩陣（含負數）。

## 本機執行

請先安裝 Node.js 20.19+ 或 22+。

```bash
npm install
npm run dev
```

開啟終端機顯示的本機網址。

## 測試與打包

```bash
npm test
npm run build
```

## GitHub Pages

1. 在 GitHub 建立新的 repository，預設分支為 `main`。
2. 在 VS Code 終端機執行：

```bash
git init
git add .
git commit -m "Initial MindScope website"
git branch -M main
git remote add origin https://github.com/你的帳號/你的repository.git
git push -u origin main
```

3. 到 GitHub repository → Settings → Pages → Build and deployment → Source 選 **GitHub Actions**。
4. 等 Actions 部署成功，網站網址通常是 `https://你的帳號.github.io/你的repository/`。

`vite.config.js` 會在 GitHub Actions 中自動依 repository 名稱設定 base path。

## 計分原理

回答依序轉換為 `-2, -1, 0, +1, +2`，每個人格原始分數為 `sum(answer × weight)`，包含正負權重。理論最大絕對分數 `L = 2 × sum(abs(weight))`，標準化為 `(raw + L)/(2L) × 100`。按標準化分數排序；同分時按原始分數、代碼排序。此0–100分不是人口百分位數，也不代表經過心理計量驗證。

資料位於 `src/data/quiz.json`，每題的 `id` 保留原始圖片標記（例如 B2-1、C3-1），畫面按第1–36題顯示。

## 隱私

回答及結果只儲存於使用者本機瀏覽器 localStorage，不會傳送到伺服器。清除瀏覽器網站資料即可刪除。分享卡為使用者自行複製的文字。

## 說明

人格名稱及題目依原始資料建立。人格解讀是趣味性描述，並非臨床心理測驗或診斷。可在 `src/data/quiz.json` 修改資料。

## 第二版改版（2026-11）
- 米白色極簡視覺、思源宋體（透過 Google Fonts 載入）。
- 封面使用提供的人像去背 PNG；圖片位於 `public/images/hero-cutout.png`，可自行替換更精細去背版本。
- 36 題每次重新開始時使用 Fisher–Yates 隨機排序；題目順序與作答進度保存在瀏覽器 localStorage，重新整理不變。
- 作答頁不顯示 A/B/C/D 區塊、人格名稱、權重或題目前的 emoji。
- 結果頁包含 12 張人格照片、約 150 字的人格敘述、每個人格 3 個標籤，雷達圖頂點改用人物縮圖。
- 照片均放在 `public/images/`。**請確認照片中所有人物同意將照片公開於 GitHub Pages**；公開儲存庫中的照片可被任何人下載。
- 測驗僅供趣味探索，未經心理計量驗證。

### 注意
目前套件下載在執行環境逾時，因此無法在這裡確認 Vite 正式建置成功。請在本機執行 `npm install`、`npm run build`、`npm test`，確認後再部署。


## V3 visual updates
- Home page: original, non-background-removed portrait on the right of the headline on desktop.
- Results: larger main portrait with contain fit to avoid cutting off the head.
- Radar: larger image markers with contain fit, keeping all 12 personality portraits.
