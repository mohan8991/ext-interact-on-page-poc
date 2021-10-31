console.log("hola");

// chrome.tabs.onActivated.addListener(tab => {
    
// })


var button = {
    "init": function (callback) {
    //   chrome.storage.local.get({"context": "page"}, function (storage) {
    //     interface.url = interface.path + '?' + storage.context;
    //     /*  */
    //     app.button.icon(storage.context === "page" ? "OFF" : "ON", null);
    //     chrome.browserAction.setPopup({"popup": (storage.context === "popup" ? interface.url : '')}, callback);
    //   });
    },
    "click": function () {
        chrome.tabs.executeScript(null, {runAt: 'document_start',file: './foreground.js'}, () => console.log("inject done"))
    }
  };

  var contextmenu = {
    "click": function (e) {
      chrome.storage.local.get({"context": "page"}, function (storage) {
        interface.close(storage.context);
        /*  */
        interface.url = interface.path + '?' + e.menuItemId;
        chrome.storage.local.set({"context": e.menuItemId}, function () {
          var popup = e.menuItemId === "popup" ? interface.url : '';
          app.button.icon(e.menuItemId === "page" ? "OFF" : "ON", null);
          chrome.browserAction.setPopup({"popup": popup}, function () {});
        });
      });
    },
    "create": {
      "button": function () {
        chrome.storage.local.get({"context": "page"}, function (storage) {
          var popup = storage.context === "popup", win = storage.context === "win", tab = storage.context === "tab", page = storage.context === "page";
          /*  */
          chrome.contextMenus.create({"id": "tab", "type": "radio", "title": "Open in tab",  "contexts": ["browser_action"], "checked": tab, "onclick": contextmenu.click});
          chrome.contextMenus.create({"id": "page", "type": "radio", "title": "Open in page",  "contexts": ["browser_action"], "checked": page, "onclick": contextmenu.click});
          chrome.contextMenus.create({"id": "win", "type": "radio", "title": "Open in window",  "contexts": ["browser_action"], "checked": win, "onclick": contextmenu.click});
          chrome.contextMenus.create({"id": "popup", "type": "radio", "title": "Open in popup",  "contexts": ["browser_action"], "checked": popup, "onclick": contextmenu.click});
        });
      }
    }
  };


button.init(contextmenu.create.button);
chrome.browserAction.onClicked.addListener(button.click);