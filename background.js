'use strict';

const URL = "https://www.oxfordlearnersdictionaries.com/search/english/direct/?q="
var current_query_popup;
var current_query_tab;

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (!hasNumber(request.word)) {
      chrome.storage.local.get(['open'], function (result) {
        if (result.open == "tab") {
          lookUpInNewTab(URL + request.word);
        } else {
          lookUpInNewWindow(URL + request.word);
        };
      });
    }
  }
);

chrome.commands.onCommand.addListener(function (command) {
  if (command == "toggle-feature") {
    lookUpInNewWindow("https://www.oxfordlearnersdictionaries.com/");
  }
});

function hasNumber(myString) {
  return /\d/.test(myString);
}

function lookUpInNewTab(url) {
  chrome.tabs.create({ "url": url, alwaysOnTop: true });
}

function lookUpInNewWindow(url) {
  if (current_query_popup != null) {
    chrome.windows.update(current_query_popup, { focused: true },
      function (window) {
        if (chrome.runtime.lastError) {
          create_popup(url);
        } else {
          update_popup(url);
        }
      });
  } else {
    create_popup(url);
  }
}

function update_popup(url) {
  chrome.tabs.update(current_query_tab, { url: url }, function (tab) { })
}

function create_popup(url) {
  var w = 550;
  var h = 450;
  var left = (screen.width / 2) - (w / 2);
  var top = (screen.height / 2) - (h / 2);
  chrome.windows.create({
    'url': url,
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