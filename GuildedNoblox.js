// ==UserScript==
// @name         guilded noblox
// @description  remove the roblox link requirement from guilded...why is this an overlay bro...
// @icon         https://i.imgur.com/ORAaPzD.png
// @version      1

// @author       VillainsRule
// @namespace    https://villainsrule.xyz

// @match        *://*.guilded.gg/*
// @grant        none
// ==/UserScript==

document.head.insertAdjacentHTML('beforeend', `<style>
    [class*="verlayStackProvider"]:has([class*="ClaimAccountRobloxLandingStage"]),
    span[class*="ModalWrapper"]:has([class*="ClaimAccountRobloxLandingStage"]) {
        display: none;
    }
</style>`);
