<div align="center">

# 🎓 Userscripts for NCUT

<p align="center">
  <b>專為國立勤益科技大學 (NCUT) 校園資訊系統量身打造的使用者腳本集合，全方位提升學習與校務操作效率。</b>
</p>

[![Tampermonkey Supported](https://img.shields.io/badge/Tampermonkey-Supported-black?logo=tampermonkey&logoColor=white)](https://www.tampermonkey.net/)
[![Violentmonkey Supported](https://img.shields.io/badge/Violentmonkey-Supported-orange?logo=violentmonkey&logoColor=white)](https://violentmonkey.github.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-NCUT%20SSO%20%7C%20E--learning%20%7C%20NMSD-brightgreen)](#-包含腳本列表)

<br>

<p align="center">
  <a href="#-包含腳本列表">📦 腳本清單</a> •
  <a href="#-腳本特色詳解">✨ 功能特色</a> •
  <a href="#-安裝與瀏覽器支援">🚀 安裝教學</a> •
  <a href="#-使用指引">📖 使用說明</a> •
  <a href="#-免責聲明-disclaimer">⚠️ 免責聲明</a>
</p>

</div>

---

<a id="-包含腳本列表"></a>
## 📦 包含腳本列表

本專案將校園系統常見的操作痛點分門別類模組化，提供輕量、無負擔且隨裝即用的增強體驗：

| 腳本名稱 | 適用系統 | 核心亮點 | 版本 | 快速安裝 |
| :--- | :--- | :--- | :---: | :---: |
| **NCUT SSO Bookmark** | 勤益單一入口<br>`(SSO)` | 選單 ★ 收藏常用功能、儀表板卡片拖曳排序 | `v1.0` | [📥 安裝腳本](https://raw.githubusercontent.com/xydesu/userscript-for-ncut/main/NCUT%20SSO%20Bookmark.user.js) |
| **NCUT e-learn 萬用工具箱** | 數位學習平台<br>`(E-learning)` | 解決頁面凍結、直讀/下載原生 PDF、解除右鍵複製與 F12 限制、教材匯出、內建設定面板 | `v1.3` | [📥 安裝腳本](https://raw.githubusercontent.com/xydesu/userscript-for-ncut/main/NCUT%20e-learn%20Tool%20Box.user.js) |
| **NCUT NMSD Auto Redirect** | 入口網<br>`(NMSD)` | 存取首頁秒速自動導向 wbcmss，告別多餘點擊 | `v1.0` | [📥 安裝腳本](https://raw.githubusercontent.com/xydesu/userscript-for-ncut/main/NCUT%20NMSD%20Auto%20Redirect.user.js) |

---

<a id="-腳本特色詳解"></a>
## ✨ 腳本特色詳解

### ⭐ 卡片 1：NCUT SSO Bookmark (單一入口快捷書籤)

> **打造個人化校務首頁，常用功能一鍵直達**

* 🌐 **匹配網址**：`https://sso.ncut.edu.tw/*`
* 🔑 **授予權限**：`GM_setValue`、`GM_getValue`、`GM_addStyle`、`unsafeWindow`
* 💡 **核心亮點**：
  * **學生專區一鍵加星號**：於選單展開項目右側直接點擊星號 (★) 快速標記或取消收藏。
  * **儀表板自訂卡片**：登入首頁自動注入「⭐ 常用快捷功能」專屬卡片區塊。
  * **HTML5 拖曳排序**：滑鼠拖曳隨心自訂捷徑卡片順序，狀態即時透過本機端持久化保存。
  * **便捷卡片管理**：提供獨立移除按鈕，彈性維持儀表板清爽。

<details>
<summary><b>🔍 查看操作與功能細節</b></summary>

1. **選單星號標記**：
   * 進入單一入口首頁後，開啟學生專區選單。
   * 滑鼠移動至任何系統項目，即可看到右側星號按鈕。點擊後星號高亮變黃，代表加入常用清單。
2. **首頁儀表板卡片**：
   * 腳本會自動在儀表板主畫面最上方建立「⭐ 常用快捷功能」區塊。
   * 卡片採用勤益系統一致之陰影與圓角風格，完美融合原生介面。
3. **直覺拖曳排序**：
   * 支援原生 HTML5 Drag & Drop API，卡片可任意拖曳換位。
   * 放開滑鼠時即刻調用 `GM_setValue` 保存陣列索引，下次重新整理依舊保持自訂順序。
</details>

<br>

### 🧰 卡片 2：NCUT e-learn 萬用工具箱 (NCUT e-learn Tool Box)

> **全方位解決學習平台各類操作痛點，6 大模組隨心調配**

* 🌐 **匹配網址**：`https://elearn.ncut.edu.tw/*`
* 🔑 **授予權限**：`GM_setValue`、`GM_getValue`、`unsafeWindow`
* 💡 **核心亮點**：
  * **6 大模組隨心控制**：整合獨立設定介面，可隨時自訂啟用或關閉各項功能。
  * **SCORM 目錄非同步載入**：修正原系統異常圖片請求，解決瀏覽教材時頁面無預警凍結或轉圈。
  * **原生 PDF 閱讀器跳轉**：告別卡頓的內嵌 PDF.js，直接跳轉瀏覽器內建高效閱讀器。
  * **全域限制完全解除**：解鎖滑鼠右鍵選單、文字反白選取、剪貼簿複製及 F12 開發者工具。
  * **阻擋跳出新分頁**：強制活動內容於主畫面 (`s_main`) 渲染，外部網站自動保持另開新分頁。
  * **完整教材目錄樹展開與複製**：一鍵掃描並匯出課程所有單元直連連結，方便離線備份。

<details>
<summary><b>🔍 查看 6 大模組功能說明與「⚙️ 腳本設定」面板</b></summary>

| 模組代號 | 模組名稱 | 深度運作邏輯與功能介紹 |
| :--- | :--- | :--- |
| `scormFix` | **SCORM 載入優化** | 攔截惡意/失效之 `wmcookie/set/` 圖片請求，非同步補足 `SCORM_loadCA.php` 資料載入，徹底解決課程目錄讀取造成的瀏覽器卡死與無限旋轉。 |
| `nativePdfViewer` | **原生 PDF 跳轉** | 在 `viewPDF.php` 初始化階段先行動態隱藏舊版介面避免白屏閃爍，抓取 `DEFAULT_URL` 真實路徑後瞬間導向，直接啟用 Chrome/Edge 原生 PDF 引擎。 |
| `pdfDownload` | **PDF 備用下載** | 當未啟用原生跳轉或官方介面因視窗縮小隱藏下載鍵時，自動在右下角注入浮動下載按鈕，直連目標檔案一鍵存檔。 |
| `funcUnlock` | **全域解鎖防護** | 清除頁面上 `oncontextmenu`、`onselectstart`、`oncopy` 等限制事件，全域注入 `user-select: text !important`，並解鎖 F12 與 Ctrl+Shift+I 鍵盤監聽。 |
| `blockNewPage` | **視窗導流內嵌** | 攔截 `launchActivity` 呼叫，將原本強制彈跳新視窗的活動統一導流至右側 `s_main` 框架，外部非本校網址則保持新分頁開啟。 |
| `courseExport` | **教材清單匯出** | 於課程主頁注入懸浮匯出按鈕，調用 API 遞迴展開全課程結構樹，彈出式視窗支援批次複製完整標題與直接存取 URL。 |

#### ⚙️ 腳本設定面板操作：
進入學習平台「全校課程」頁面時，頂部功能導覽列將自動出現 **「⚙️ 腳本設定」** 按鈕。點擊即可開啟設定彈窗，即時勾選想要啟用的模組，設定將即時寫入本機儲存空間並生效。
</details>

<br>

### ⚡ 卡片 3：NCUT NMSD Auto Redirect (入口網自動重定向)

> **毫秒級即時跳轉，告別繁瑣首頁點擊**

* 🌐 **匹配網址**：`https://nmsd.ncut.edu.tw/*`
* 🔑 **授予權限**：`none` (純原生輕量執行)
* 💡 **核心亮點**：
  * **極致輕量**：程式碼僅 20 餘行，不依賴任何外部庫與進階權限。
  * **毫秒級攔截**：於 `document-start` 階段即刻介入，比頁面渲染更快一步。
  * **無縫導向**：僅針對首頁根目錄 (`/` 或空字串) 進行定向，不干擾子頁面正常瀏覽。

<details>
<summary><b>🔍 查看運作原理</b></summary>

* **精準路徑過濾**：
  腳本透過嚴格檢查 `window.location.pathname === '/' || window.location.pathname === ''`，確保只有造訪入口網首頁時才會發動。
* **無留存跳轉**：
  使用 `window.location.replace("https://nmsd.ncut.edu.tw/wbcmss/")` 取代傳統的網址跳轉，不會在瀏覽器的上一頁歷史紀錄中留下中介空頁，確保使用者按「上一頁」時體驗流暢不卡死。
</details>

---

<a id="-安裝與瀏覽器支援"></a>
## 🚀 安裝與瀏覽器支援

### 🌐 瀏覽器相容性支援矩陣

本專案腳本均遵循現代 ECMAScript 標準開發，相容各大主流瀏覽器及其腳本管理器：

| 瀏覽器 | 相容狀態 | 推薦管理器外掛 | 支援說明 |
| :--- | :---: | :--- | :--- |
| **Google Chrome** | ![Supported](https://img.shields.io/badge/-完美支援-brightgreen) | [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) / [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagpfpbnid) | 官方推薦，功能完整穩定 |
| **Microsoft Edge** | ![Supported](https://img.shields.io/badge/-完美支援-brightgreen) | [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) / [Violentmonkey](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjfgddmgnhnjbfghaiaiakefdl) | Chromium 核心，效能表現絕佳 |
| **Mozilla Firefox** | ![Supported](https://img.shields.io/badge/-完美支援-brightgreen) | [Tampermonkey](https://addons.mozilla.org/zh-TW/firefox/addon/tampermonkey/) / [Violentmonkey](https://addons.mozilla.org/zh-TW/firefox/addon/violentmonkey/) | 完整支援各項 GM API |
| **Brave** | ![Supported](https://img.shields.io/badge/-完美支援-brightgreen) | [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | 需注意 Brave Shields 設定避免阻擋腳本儲存 |
| **Safari** (macOS) | ![Partial](https://img.shields.io/badge/-部分支援-yellow) | Userscripts / Stay / Tampermonkey | 需確認授予擴充套件網域讀寫權限 |

<br>

### 🛠️ 逐步安裝教學

```mermaid
flowchart LR
    Step1["步驟 1<br>安裝腳本管理器外掛"] --> Step2["步驟 2<br>點擊上方表格安裝連結"] --> Step3["步驟 3<br>確認並完成安裝"] --> Done["🎉 即刻享受極速體驗"]
```

1. **步驟 1：安裝瀏覽器腳本管理器擴充外掛**
   * 推薦安裝 [Tampermonkey (篡改猴)](https://www.tampermonkey.net/) 或 [Violentmonkey (暴力猴)](https://violentmonkey.github.io/)。
2. **步驟 2：點擊安裝連結**
   * 進入上方 [📦 包含腳本列表](#-包含腳本列表) 表格，點選對應腳本右側的 **「📥 安裝腳本」** 連結。
3. **步驟 3：確認並安裝**
   * 瀏覽器管理器將自動跳出腳本確認畫面，確認無誤後點擊 **「安裝 (Install)」** 或 **「重新安裝 (Reinstall)」** 即可立即生效。

---

<a id="-使用指引"></a>
## 📖 使用指引

各腳本安裝完成後，即可依照下列指引於各校園系統中操作：

* 🏫 **勤益單一入口 (SSO)**：
  * 造訪 `sso.ncut.edu.tw` 並登入。
  * 展開「學生專區」選單，點選任何項目右方的星號 ★ 加入常用快捷清單。
  * 回到首頁儀表板，於最上方「⭐ 常用快捷功能」卡片可自由拖曳排版或點擊垃圾桶圖示刪除。
* 📚 **數位學習平台 (E-learning)**：
  * 造訪 `elearn.ncut.edu.tw` 並進入課程。
  * 點擊頁面頂部的 **「⚙️ 腳本設定」** 按鈕可自訂啟用或關閉 6 大功能模組。
  * 在教材頁面右下角可使用「匯出教材清單」一鍵複製全單元下載連結，點選 PDF 課程自動無縫以原生閱覽器開啟。
* 🌐 **勤益入口網 (NMSD)**：
  * 在瀏覽器網址列直接輸入 `nmsd.ncut.edu.tw`。
  * 腳本將自動在毫秒間無縫重導向至 `wbcmss` 主系統，不再需要多餘的手動點擊。
* 🔄 **更新與管理腳本**：
  * 隨時點擊瀏覽器右上角管理器圖示，即可手動開啟/關閉個別腳本，或透過管理器檢查最新版本更新。

---

<a id="-免責聲明-disclaimer"></a>
## ⚠️ 免責聲明 (Disclaimer)

> [!IMPORTANT]
> **重要聲明**
> 1. 本專案所收錄之使用者腳本僅供國立勤益科技大學 (NCUT) 全校師生學術交流、研究與個人日常學習效率輔助使用。
> 2. 開發者不對因使用本腳本所產生的任何校務系統存取問題、資料變更或延伸責任負責。
> 3. 請各位使用者合理善用各項功能，並共同尊重與維護智慧財產權及校園資訊系統之使用服務規範。
