// ==UserScript==
// @name         Google Forms Breakout Cheat!
// @description  For teachers who put students through Google Forms "Breakout Rooms".
// @icon         https://i.imgur.com/ORAaPzD.png
// @version      1

// @author       VillainsRule
// @namespace    https://villainsrule.xyz

// @match        https://docs.google.com/forms/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

window.addEventListener('load', () => {
    const allFormSections = FB_PUBLIC_LOAD_DATA_.find(e => Array.isArray(e)).find(e => Array.isArray(e));
    const domSections = document.querySelectorAll('[data-params]');

    domSections.forEach((element) => {
        const sectId = element.getAttribute('data-params').match(/\[([0-9]+),/)
        const sect = allFormSections.find(i => i[0] === Number(sectId[1]));

        const possibleAnswers = sect[4]?. /* validation */ [0]?. /* first validator */ [4]?. /* i think 4 = valid idek */ [0]?. /* i dislike gf */ [2] /* the possible answers */;
        if (possibleAnswers) {
            const descElement = element.querySelector('div[role="heading"]')?.parentElement?.children[1];
            const prefix = descElement.innerText.length > 0 ? '\n\n' : '';
            if (descElement) descElement.textContent = prefix + `possible answers: ${possibleAnswers.map(e => `"${e}"`).join(',')}`;
        }
    });
});
