chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"})
  })
                 });
 
        

     chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {                      
                     if (request.message == "dom"){
                        
                   
$.ajax({
  url: `https://api.privacymonitor.com/score?q=${request.domainS}`,
  type: 'GET',
  dataType: 'JSON',
  success: function(data, status, xhr) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {status: "success"}, function(response) {
        console.log(response.farewell);
      });
    });
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
   
    
            }
          });
          

         

             
