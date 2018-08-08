'use strict';

const url = "https://www.oxfordlearnersdictionaries.com/search/english/direct/?q="

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": url + request.word});
    }
  }
);
