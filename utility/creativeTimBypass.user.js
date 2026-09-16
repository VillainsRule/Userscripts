// ==UserScript==
// @name         creativetim template bypass
// @version      3

// @author       VillainsRule
// @namespace    http://blob.villainsrule.xyz/Userscripts/utility/creativeTimBypass.user.js

// @match        https://www.creative-tim.com/product/*
// @run-at       document-body
// @grant        unsafeWindow
// @grant        GM_openInTab
// ==/UserScript==

// https://www.creative-tim.com/marketplace

((window) => {
    const originalAttachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (options) {
        return originalAttachShadow.call(this, { ...options, mode: 'open' });
    };

    window.addEventListener('load', () => {
        const homeFrame = document.querySelector('#home > iframe');
        if (homeFrame) {
            const url = new URL(homeFrame.src);
            const href = url.hash.match(/href=(.*?)&/);
            if (href) {
                const currentButton = document.querySelector(`[onclick="pricingMoveSmooth('#pricingCard')"]`);
                currentButton.innerText = 'Download Template (BYPASSED)';
                currentButton.onclick = () => GM_openInTab(decodeURIComponent(href[1]), { active: true, insert: true });
            }
        }
    });
 })(unsafeWindow);
