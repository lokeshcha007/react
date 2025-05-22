chrome.runtime.sendMessage({ action: "getExtensions" });

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "extensionsList") {
    window.postMessage({
      type: "EXTENSIONS_LIST",
      extensions: message.extensions
    }, "*");
  }
});