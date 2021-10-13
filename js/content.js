function addMouseTracker(){
  document.addEventListener('wheel', function(event){
    if(event.ctrlKey){
      event.preventDefault();
      chrome.extension.sendRequest(event.deltaY);
    }
  }, {
    passive: false
  });


}

//Start tracking
addMouseTracker();
