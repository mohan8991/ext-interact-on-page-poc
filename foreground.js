console.log("Hola from the front");

let iframe = document.createElement("iframe");
iframe.src = chrome.runtime.getURL("index.html");

iframe.style.top = "0";
iframe.style.left = "0";
iframe.style.margin = "0";
iframe.style.border = "0";
iframe.style.padding = "0";
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.outline = "none";
iframe.style.position = "fixed";
iframe.style.zIndex = "2147483647";
iframe.style.background = "transparent";

document.documentElement.appendChild(iframe);