// ==UserScript==
// @name         google classroom practice set
// @description  LOL
// @icon         https://villainsrule.xyz/favicon-96x96.png
// @version      1

// @author       VillainsRule
// @namespace    https://villainsrule.xyz

// @match        *://classroom.google.com/ps/*
// @grant        none
// ==/UserScript==

const originalFetch = window.fetch;

let url = null;
let json = null;

window.fetch = async function (...args) {
    const [resource, config] = args;
    const requestUrl = typeof resource === 'string' ? resource : resource.url;
    const response = await originalFetch.apply(this, args);

    if (requestUrl.includes('v1alpha1/users/me/notebooks')) {
        const clonedResponse = response.clone();
        try {
            json = await clonedResponse.json();
            url = requestUrl;
            console.log('pulled PS', json);
        } catch (error) {
            console.error('error:', error);
        }
    }

    return response;
};

const b = document.createElement('button');
b.style.position = 'absolute';
b.style.right = '10px';
b.style.bottom = '10px';
b.style.zIndex = '999999999';
b.style.padding = '10px';
b.style.borderRadius = '5px';
b.style.background = '#000000';
b.style.border = 'transparent';
b.style.color = 'white';
b.style.fontFamily = 'monospace';
b.style.cursor = 'pointer';
b.innerText = 'get set answers';

let w, j;

b.onclick = () => {
    try {
        if (!json) return top.alert('practice set has not loaded, give it a second and try again');

        if (!j) {
            j = json.documentComponentStates.map(e => JSON.parse(e.state)).sort((a, b) => a.semantics.learningProblemIndex - b.semantics.learningProblemIndex);
            console.log(j);
        }

        if (w) w.close();
        w = window.open('', '_blank', 'width=250,height=600');

        const policy = trustedTypes.createPolicy('bypass', { createHTML: (s) => s });
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(policy.createHTML(json.dom.domXml), 'text/xml');

        w.document.write(`<body><style>body { background: black; font-family: monospace; color: white; font-size: 16px }</style><div>${j.map((e, i) => {
            const group = e.semantics.groups[0];
            if (group.answerAreas[0].type === 'MCQ') {
                const allCorrect = group.solutions[0].conditions.map(({ expr }, i) => expr.includes('==1') && i).filter(i => typeof i === 'number');
                const correctText = allCorrect.map((correct) => {
                    const domElementId = group.answerAreas[correct].domElementId;
                    const xmlOrderIds = [...xmlDoc.children[0].children[e.semantics.learningProblemIndex].getElementsByTagName('problem:choice')]
                        .map(e => e.children[0].getAttribute('i:duid'));
                    return 'Opt ' + String.fromCharCode(xmlOrderIds.findIndex(e => e === domElementId) + 65);
                });
                return `<span>${i + 1}. ${correctText.join(', ')}</span>`
            } else if (group.answerAreas[0].type.startsWith('FIB')) {
                const cond = group.solutions[0].conditions[0].expr;
                return `<span>${i + 1}. ${cond.replace(/\\+"/g, '"').match(/"([^"]+)"/)?.[1] || cond}</span>`
            } else return `<span>${i + 1}. [ERROR] unknown type "${group.answerAreas[0].type}"</span>`;
        }).join('<br>')}</div></body>`)
    } catch (e) { console.error(e) }
}

document.body.appendChild(b);