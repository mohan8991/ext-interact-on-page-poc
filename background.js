console.log("hola");

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.executeScript(null, {runAt: 'document_start',file: './foreground.js'}, () => console.log("inject done"))
})