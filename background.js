'use strict';

const url = "https://www.oxfordlearnersdictionaries.com/search/english/direct/?q="
var current_query_popup;
var current_query_tab;

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (!hasNumber(request.word)) {
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

function hasNumber(myString) {
  return /\d/.test(myString);
}

function lookUpInNewTab(word) {
  chrome.tabs.create({ "url": url + word, alwaysOnTop: true });
}

function lookUpInNewWindow(word) {
  if (word) {
    try {
      chrome.windows.update(current_query_popup, { focused: true },
        function (window) {
          if (window == null) {
            create_popup(word);
          }
          else {
            update_popup(word);
          }
        });
    } catch (error) {
      create_popup(word);
    }
  }
}

function update_popup(word) {
  console.log("update");
  chrome.tabs.update(current_query_tab, { url: url + word }, function (tab) { })
}

function create_popup(word) {
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
  }, function (window) {
    current_query_popup = window.id;
    current_query_tab = window.tabs[0].id;
  }
  );
}