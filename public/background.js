chrome.tabs.onActivated.addListener(() => {
  chrome.scripting.executeScript({
    target: { allFrames: true },
    files: ['contentScript.js']
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['contentScript.js']
    });
  }
});

chrome.windows.onFocusChanged.addListener(() => {
  chrome.scripting.executeScript({
    target: { allFrames: true },
    files: ['contentScript.js']
  });
});
