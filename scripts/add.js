let address = window.location.hostname;
if(location.host.indexOf('www.') === 0){
  address = location.host.replace('www.','');
}
if(location.host.indexOf('web.') === 0){
  address = location.host.replace('web.','');
}
if(location.host.indexOf('docs.') === 0){
  address = location.host.replace('docs.','');
}
console.log(address)
chrome.runtime.sendMessage({message: "dom",domainS:address});