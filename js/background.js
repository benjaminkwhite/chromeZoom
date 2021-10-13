var currentRatio = 1;
var ratio = 1;

function zoom(ratio) {
  currentRatio = ratio / 100;
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    zoomtab(tabs[0].id, currentRatio);
  });
}

function zoomtab(a, b) {
  localStorage.setItem("number", Math.round(b * 100));
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
        chrome.tabs.setZoom(tab.id, b, function() {
          if (chrome.runtime.lastError) {
            //console.log('[ZoomDemoExtension] doSetMode() error: ' + chrome.runtime.lastError.message);
          }
        });
    });
  });
}

function handle(delta) {
 var tempcurrentpopupzoom = localStorage.getItem("number");

  if (delta < 0) {
    tempcurrentpopupzoom -= Number(1);
    if (tempcurrentpopupzoom != 0 && tempcurrentpopupzoom >= 1) {
      localStorage.setItem("number", tempcurrentpopupzoom);
      zoom(tempcurrentpopupzoom);
    }
  } else {
    if (tempcurrentpopupzoom != 0 && tempcurrentpopupzoom < 400) {
      tempcurrentpopupzoom = Number(tempcurrentpopupzoom) + Number(1);
      localStorage.setItem("number", tempcurrentpopupzoom);
      zoom(tempcurrentpopupzoom);
    }
  }
  tempcurrentpopupzoom = ""; // reset
}
//listens for the position
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  chrome.tabs.query({ active: true }, function (tabs) {
    var tabId = tabs[0].id;
    chrome.tabs.getZoom(tabId, function (zoomFactor) {
        localStorage.setItem("number", zoomFactor * 100);
      handle(request);
    });
  });
});
