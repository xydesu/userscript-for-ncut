// ==UserScript==
// @name         NCUT e-learn Block New Page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Block new page opening in NCUT e-learn
// @author       xy
// @match        https://elearn.ncut.edu.tw/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/XingYanTW/userscript-for-ncut/main/NCUT e-learn Block New Page.user.js
// @downloadURL  https://raw.githubusercontent.com/XingYanTW/userscript-for-ncut/main/NCUT e-learn Block New Page.user.js
// ==/UserScript==

(function() {
    'use strict';

    // when page using function launchActivity to open new page, block it by overriding the function
    function blockNewPage() {
        const originalLaunchActivity = window.launchActivity;
        if (typeof originalLaunchActivity === 'function') {
            window.launchActivity = function(el, id, target) {
                // force target to null to block new page opening
                return originalLaunchActivity.call(this, el, id, null);
            };
        }
    }

    window.addEventListener('load', blockNewPage);


})();