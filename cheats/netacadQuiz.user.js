// ==UserScript==
// @name         netacad quiz answer highlighter
// @description  :D
// @icon         https://villainsrule.xyz/favicon-96x96.png
// @version      1

// @match        https://www.netacad.com/*
// @grant        none
// ==/UserScript==

let isTheRightFrame = false;

const knownShadowRoots = [];
const queryRoots = (query) => knownShadowRoots.map(e => [...e.querySelectorAll(query)]).flat(1);

const iHateShadowRoots = Element.prototype.attachShadow;
Element.prototype.attachShadow = function(opts) {
    const res = iHateShadowRoots.call(this, opts);
    knownShadowRoots.push(res);
    if (isTheRightFrame) {
        top.roots = knownShadowRoots;
        top.queryRoots = queryRoots;
    }
    return res;
}

const serialize = (string) => string?.trim()?.replaceAll('&apos;', '\'')?.replaceAll(' />', '>').replaceAll('\n', '');

const oFetch = fetch;
fetch = async (url, params) => {
    const res = await oFetch(url, params);

    if (url.includes('components.json')) {
        const body = await res.clone().json();
        isTheRightFrame = true;

        setTimeout(() => setInterval(() => {
            const allMCQOptions = queryRoots('.mcq__widget');
            allMCQOptions.forEach((e) => {
                const componentId = e.getAttribute('aria-labelledby').replace('-comp-title', '');
                const componentItem = body.find(e => e._component === 'mcq' && e._id === componentId);
                const options = e.querySelectorAll('.mcq__item-text-inner');
                options.forEach((e) => {
                    const actualText = e.innerHTML.match(/-->(.*?) <span class="screenReader/s)?.[1];
                    const thing = componentItem._items.find(e => serialize(e.text) === serialize(actualText));
                    if (!thing) console.log('GG it broke', actualText, componentItem._items, serialize(e.txt), serialize(actualText));
                    e.style.color = thing?._shouldBeSelected ? 'green' : 'red';
                });
            });
        }, 500), 2500);
    }

    return res;
}