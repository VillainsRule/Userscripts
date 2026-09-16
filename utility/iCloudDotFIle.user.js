// ==UserScript==
// @name         iCloud dotfile shower
// @version      1

// @author       VillainsRule
// @namespace    http://blob.villainsrule.xyz/Userscripts/utility/iCloudDotFile.user.js

// @match        https://www.icloud.com/*
// @grant        none
// ==/UserScript==

let oStartsWith = String.prototype.startsWith;
String.prototype.startsWith = function(a, b) {
    if (a === '.') return false;
    return oStartsWith.call(this, a, b);
}
