// ==UserScript==
// @name         mywordle cheat
// @version      1

// @author       VillainsRule
// @namespace    http://blob.villainsrule.xyz/Userscripts/cheats/myWordle.user.js

// @match        *://mywordle.strivemath.com/?word=*
// @grant        none
// ==/UserScript==

document.body.insertAdjacentHTML('beforeend', `
    <style>
        .mwc {
            position: absolute;
            top: 10px;
            left: 15px;
            font-size: 16px;
        }

        .mwc-get {
            cursor: pointer;
            text-decoration: underline;

        }
    </style>

    <span class="mwc mwc-get">get answer</span>
`);

document.querySelector('.mwc-get').onclick = () => {
    let root = document.querySelector('#root > div');
    let reactName = Object.keys(root).find(key => key.startsWith('__reactFiber$'));
    let reactData = root[reactName];
    let word = reactData.return.updateQueue.lastEffect.next.next.deps[0].word;

    if (!word) alert('it\'s likely the cheat was "patched", open an issue on github');

    let text = document.querySelector('.mwc');

    text.innerHTML = `answer: <u>${word}</u>`;
    text.classList.remove('mwc-get');
}
