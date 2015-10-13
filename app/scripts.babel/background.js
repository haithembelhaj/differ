'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

//chrome.browserAction.setBadgeText({text: '\'Allo'});

chrome.browserAction.onClicked.addListener(sendMessage.bind(this, 'add', function(){}));

// send a message to the page
function sendMessage(msg, fn){

  console.log('message');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    chrome.tabs.sendMessage(tabs[0].id, msg, fn);
  });
}



