'use strict';

const url = "https://www.oxfordlearnersdictionaries.com/search/english/direct/?q="

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // console.log(request.word);
    if (isNaN(request.word)) {
      chrome.storage.local.get(['open'], function (result) {
        if (result.open == "tab") {
          lookUpInNewTab(request.word);
        } else {
          lookUpInNewWindow(request.word);
        };
      });
    }
  }
);

chrome.commands.onCommand.addListener(function (command) {
  if (command == "toggle-feature") {
    lookUpInNewTab("word");
  }
});

function lookUpInNewTab(word) {
  chrome.tabs.create({ "url": url + word });
}

function lookUpInNewWindow(word) {
  if (word) {
    var w = 550;
    var h = 450;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    chrome.windows.create({
      'url': url + word,
      'type': 'popup',
      'width': w,
      'height': h,
      'left': left,
      'top': top
    }, function (window) { }
    );
  }
}