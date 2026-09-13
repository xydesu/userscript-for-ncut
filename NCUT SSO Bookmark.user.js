// ==UserScript==
// @name         NCUT SSO Bookmark
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在學生專區選單中加入星號收藏按鈕，於儀表板新增快捷存取卡片並支援拖曳排序
// @author       xy
// @match        *://sso.ncut.edu.tw/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        unsafeWindow
// @updateURL    https://raw.githubusercontent.com/xydesu/userscript-for-ncut/main/NCUT SSO Bookmark.user.js
// @downloadURL  https://raw.githubusercontent.com/xydesu/userscript-for-ncut/main/NCUT SSO Bookmark.user.js
// ==/UserScript==

(function() {
    'use strict';

    const STORAGE_KEY = 'ncut_bookmarked_items';

    GM_addStyle(`
        /* 選單項目排版修正 */
        .dropdown-item.megaMenuItemA {
            display: flex !important;
            align-items: center !important;
            padding: 8px 14px !important;
            white-space: normal !important;
        }

        .dropdown-item.megaMenuItemA .item-text {
            flex-grow: 1;
            line-height: 1.4;
        }

        /* 收藏星號按鈕 */
        .fav-star-btn {
            cursor: pointer;
            font-size: 1.15rem;
            line-height: 1;
            user-select: none;
            flex-shrink: 0;
            margin-right: 8px;
            transition: transform 0.15s ease, color 0.15s ease;
        }

        .fav-star-btn:hover {
            transform: scale(1.3);
        }

        .fav-star-btn.active {
            color: #ffc107 !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        }

        .fav-star-btn.inactive {
            color: #ced4da !important;
        }

        .fav-star-btn.inactive:hover {
            color: #ffc107 !important;
        }

        /* 儀表板快捷卡片樣式 */
        #quickAccess_Block {
            border-radius: 12px;
            overflow: hidden;
            border: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            margin-bottom: 24px;
        }

        #quickAccess_Block .card-header {
            background-color: #198754 !important;
            color: #fff;
            font-size: 1.15rem;
            font-weight: 700;
            padding: 12px 16px;
            position: relative;
            text-align: center;
            border-bottom: none;
        }

        #quickAccess_Block .card-header .header-tip {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.8rem;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.85);
        }

        #quickAccess_Container {
            min-height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
        }

        .quick-access-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 16px;
            list-style: none;
            margin: 0;
            width: 100%;
        }

        .quick-access-item {
            display: inline-flex;
            align-items: center;
            background: #f8f9fa;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 8px 14px;
            font-size: 0.95rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            transition: all 0.2s ease;
            cursor: grab;
            user-select: none;
        }

        .quick-access-item:hover {
            background: #fff;
            border-color: #198754;
            box-shadow: 0 3px 8px rgba(25, 135, 84, 0.15);
            transform: translateY(-1px);
        }

        .quick-access-item.dragging {
            opacity: 0.45;
            cursor: grabbing;
            border: 1px dashed #198754;
            box-shadow: none;
        }

        .quick-access-item.drag-over {
            border-color: #198754;
            background-color: #e8f5e9;
            transform: scale(1.03);
        }

        .quick-access-item a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            cursor: pointer;
            pointer-events: none; /* 避免拖曳時觸發 a 標籤預設行為 */
        }

        .quick-access-item .remove-btn {
            cursor: pointer;
            margin-left: 10px;
            color: #adb5bd;
            font-size: 1.1rem;
            line-height: 1;
            transition: color 0.15s;
        }

        .quick-access-item .remove-btn:hover {
            color: #dc3545;
        }
    `);

    function getBookmarks() {
        return GM_getValue(STORAGE_KEY, []);
    }

    function saveBookmarks(list) {
        GM_setValue(STORAGE_KEY, list);
        renderQuickAccessCard();
        updateStarIcons();
    }

    function createQuickAccessCard() {
        const container = document.getElementById('columnRightDragBox');
        if (!container || document.getElementById('quickAccess_Block')) return;

        const section = document.createElement('section');
        section.id = 'quickAccess_Block';
        section.className = 'card card-item dashboardModules';
        section.innerHTML = `
            <div class="card-header">
                <span><i class="bi bi-star-fill me-2"></i>常用快捷功能</span>
                <span class="header-tip d-none d-sm-inline">可拖曳排序 ‧ 點擊選單 ★ 新增</span>
            </div>
            <div class="card-body p-0" id="quickAccess_Container"></div>
        `;

        container.prepend(section);
        renderQuickAccessCard();
    }

    function triggerMenuItem(item) {
        const originalLink = document.querySelector(`a.megaMenuItemA[data-item-uuid="${item.uuid}"]`);
        if (originalLink) {
            const href = originalLink.getAttribute('href') || '';
            if (href.startsWith('javascript:')) {
                const code = href.replace(/^javascript:/, '');
                try {
                    const win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
                    new Function('window', `with(window) { ${code} }`)(win);
                    return;
                } catch (err) {
                    console.error('執行跳轉失敗，改用原生點擊:', err);
                }
            }
            originalLink.click();
            return;
        }

        if (item.href && item.href.startsWith('javascript:')) {
            const code = item.href.replace(/^javascript:/, '');
            const win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
            new Function('window', `with(window) { ${code} }`)(win);
        } else if (item.href) {
            window.location.href = item.href;
        }
    }

    let draggedElement = null;
    let isDragging = false;

    function renderQuickAccessCard() {
        const container = document.getElementById('quickAccess_Container');
        if (!container) return;

        const bookmarks = getBookmarks();
        if (bookmarks.length === 0) {
            container.innerHTML = `<p class="text-muted text-center my-3 mb-0" style="font-size: 0.9rem;">尚未加入常用功能，可至上方「學生專區」點擊 ★ 收藏。</p>`;
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'quick-access-list';

        bookmarks.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'quick-access-item';
            li.draggable = true;
            li.dataset.uuid = item.uuid;
            li.dataset.index = index;

            const a = document.createElement('a');
            a.href = 'javascript:void(0);';
            a.textContent = item.title;

            // 點擊觸發（區分拖曳行為與正常點選）
            li.addEventListener('click', (e) => {
                if (isDragging) return;
                e.preventDefault();
                triggerMenuItem(item);
            });

            // 拖曳事件處理
            li.addEventListener('dragstart', (e) => {
                draggedElement = li;
                isDragging = true;
                li.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', index);
            });

            li.addEventListener('dragend', () => {
                li.classList.remove('dragging');
                document.querySelectorAll('.quick-access-item').forEach(el => el.classList.remove('drag-over'));
                draggedElement = null;
                setTimeout(() => { isDragging = false; }, 50);
            });

            li.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (draggedElement && draggedElement !== li) {
                    li.classList.add('drag-over');
                }
            });

            li.addEventListener('dragleave', () => {
                li.classList.remove('drag-over');
            });

            li.addEventListener('drop', (e) => {
                e.preventDefault();
                li.classList.remove('drag-over');
                if (!draggedElement || draggedElement === li) return;

                const fromIndex = parseInt(draggedElement.dataset.index, 10);
                const toIndex = parseInt(li.dataset.index, 10);

                const currentList = getBookmarks();
                const [movedItem] = currentList.splice(fromIndex, 1);
                currentList.splice(toIndex, 0, movedItem);

                saveBookmarks(currentList);
            });

            const removeBtn = document.createElement('span');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '&times;';
            removeBtn.title = '移除';
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                toggleBookmark(item);
            };

            li.appendChild(a);
            li.appendChild(removeBtn);
            ul.appendChild(li);
        });

        container.innerHTML = '';
        container.appendChild(ul);
    }

    function toggleBookmark(item) {
        let bookmarks = getBookmarks();
        const index = bookmarks.findIndex(b => b.uuid === item.uuid);

        if (index > -1) {
            bookmarks.splice(index, 1);
        } else {
            bookmarks.push(item);
        }
        saveBookmarks(bookmarks);
    }

    function setupMenuBookmarkButtons() {
        const menuItems = document.querySelectorAll('a.megaMenuItemA[data-item-uuid]');
        const bookmarks = getBookmarks();

        menuItems.forEach(link => {
            if (link.querySelector('.fav-star-btn')) {
                return;
            }

            const uuid = link.getAttribute('data-item-uuid');
            const title = link.textContent.trim();
            const href = link.getAttribute('href');
            const isBookmarked = bookmarks.some(b => b.uuid === uuid);

            link.textContent = '';

            const star = document.createElement('span');
            star.className = `fav-star-btn ${isBookmarked ? 'active' : 'inactive'}`;
            star.dataset.uuid = uuid;
            star.textContent = isBookmarked ? '★' : '☆';
            star.title = isBookmarked ? '取消收藏' : '加入常用捷徑';

            star.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleBookmark({ uuid, title, href });
            });

            const textSpan = document.createElement('span');
            textSpan.className = 'item-text';
            textSpan.textContent = title;

            link.appendChild(star);
            link.appendChild(textSpan);
        });
    }

    function updateStarIcons() {
        const bookmarks = getBookmarks();
        const stars = document.querySelectorAll('.fav-star-btn');

        stars.forEach(star => {
            const uuid = star.dataset.uuid;
            const isBookmarked = bookmarks.some(b => b.uuid === uuid);
            star.className = `fav-star-btn ${isBookmarked ? 'active' : 'inactive'}`;
            star.textContent = isBookmarked ? '★' : '☆';
            star.title = isBookmarked ? '取消收藏' : '加入常用捷徑';
        });
    }

    function init() {
        createQuickAccessCard();
        setupMenuBookmarkButtons();

        const observer = new MutationObserver(() => {
            setupMenuBookmarkButtons();
        });

        const nav = document.querySelector('nav.menu');
        if (nav) {
            observer.observe(nav, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();