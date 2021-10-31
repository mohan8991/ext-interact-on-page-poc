if(!config){
    var config = {
        "iframe": null,
        "listener": function (request, sender, sendResponse) {    
            if (request.action === "print") window.print();
            if (request.action === "close") config.interface.hide();
          },
        "interface": {
            "toggle": function () {
                config.iframe = document.querySelector(".mark-on-page");
                config.interface[config.iframe ? "hide" : "show"]();
              },
              "hide": function () {
                config.iframe.remove();
                // chrome.runtime.sendMessage({"action": "icon", "state": "OFF"});
              },
              "show": function () {
                  let iframe = document.createElement("iframe");
                  iframe.setAttribute("class", "mark-on-page")
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

              }
        }
    }
    //TODO: does not do anything right now
    chrome.runtime.onMessage.addListener(config.listener);
}

config.interface.toggle();

