// ==UserScript==
// @name         creativetim template bypass
// @description  allows you to actually download the free templates from creativetim
// @version      3
// @icon         https://villainsrule.xyz/favicon-96x96.png

// @author       VillainsRule
// @namespace    https://villainsrule.xyz

// @match        https://www.creative-tim.com/product/*
// @grant        unsafeWindow
// @grant        GM_openInTab
// @run-at       document-body
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
