function requestIcons(){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0];
    let url = new URL(tab.url)
    let domain = url.hostname
     
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
       if (request.message === "getDom"){  
        chrome.storage.local.set({dmn:domain});
        
       }})
                     
  chrome.tabs.sendMessage(tabs[0].id, {getDomain: "domains", dm:domain});
    
 console.log(domain)
 
if(domain.indexOf('www.') === 0){
  domain = domain.replace('www.','');
}
if(domain.indexOf('web.') === 0){
  domain = domain.replace('web.','');
}
if(domain.indexOf('docs.') === 0){
  domain = domain.replace('docs.','');
}  
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", dm:domain})
  })
});                               
$.ajax({
  url: `https://api.privacymonitor.com/score?q=${domain}`,
  type: 'GET',
  dataType: 'JSON',
  success: function(data, status, xhr) {
    console.log(data)
    chrome.storage.local.set({st:status});
    chrome.storage.local.set({key:data.score});
    chrome.storage.local.set({prev:data.previousScore});
    chrome.storage.local.get(['key','prev','st'], function(result) {
      if(result.key && result.st === 'success'){
    chrome.browserAction.setIcon({
      path: {
        38: "./images/blue.png"
         }
        });
      }else{
        chrome.browserAction.setIcon({
          path: {
            38: "./images/grey.png"
             }
              })
      }
    })
    console.log(status)
    console.log(data.score)
    console.log(data.previousScore)
        },
   error: function(error, status) {
    
    chrome.browserAction.setIcon({
      path: {
        38: "./images/grey.png"
         }
          })
           
    console.log(status);
    chrome.storage.local.set({st:status});
      }
    });
  })
}





chrome.tabs.onActivated.addListener(function() {
 requestIcons();
})

 chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   requestIcons();
                }); 

                
 