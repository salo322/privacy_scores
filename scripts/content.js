
  
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
chrome.runtime.sendMessage({message: "dom",domainS:address}, function(response) {
  console.log(response.farewell);
});
chrome.runtime.sendMessage({message: "dom",domainS:address}, function(response) {
  console.log(response.farewell);
});


chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  if (request.greeting == "hello"){

 
              
    
      chrome.storage.local.get(['key','prev','st'], function(result) {
        if(result.st==='success'){
          function succWindow(){
          let scoresWindow = `
          <div class="scWindow">
          <div class="flexSc">
          <p class="textSc">Privacy scores</p>
          <div class="x">X</div>
          </div>
          <div class="line"></div>
          <div class="flex">
          <canvas id="cvs"></canvas>
         <div class="sc">
          <div class="scText">SCORE:</div>
          <div class="scores">${result.key}</div>
          
          </div>
          </div>
          <div class="flexCol">
          <p class="colorPrevSc" ></p>
          <p class="prevSc">previous scores</p>
          </div>
            </div>`
 
      $(scoresWindow).appendTo(document.body);
      $('.scWindow').nextAll('div').remove();

   $('.x').click(function(){
   $('.scWindow').remove();
    })

    if(result.key===result.prev){
      console.log('same')
      $('.prevSc').text('No change');
      $('.prevSc').css('color','#336d88')
    }
    
    if(result.key > result.prev){
     console.log('increase')
     $('.prevSc').text('Increase');
     $('.prevSc').css('color','#ade498')
   }
   if(result.key < result.prev){
     console.log('Decrease')
     $('.prevSc').text('Decrease');
     $('.prevSc').css('color','#e84a5f')
   }
var canvas = document.getElementById("cvs");
let widthC = "120";
let heightC="120";
     canvas.width = widthC;
     canvas.height = heightC;
var ctx = canvas.getContext("2d");
var percent = result.key/10;

ctx.beginPath();
ctx.arc(widthC/2,heightC/2, 35, 0, Math.PI * 2);
ctx.strokeStyle = "#f7fbe1";
ctx.lineWidth = 8;
ctx.stroke();
ctx.closePath();

var angle = percent/100*360;
ctx.beginPath();
ctx.arc(widthC/2, heightC/2, 35, -90 * Math.PI/180, (angle - 90) * Math.PI/180);
if(percent > 30 && percent < 50){
ctx.strokeStyle = "#fe91ca";
$('.colorPrevSc').text('Very Poor')
$('.colorPrevSc').css('color', '#fe91ca')
}
if(percent > 51 && percent < 70){
ctx.strokeStyle = "#df5e88";
$('.colorPrevSc').text('Fair')
$('.colorPrevSc').css('color', '#df5e88')
}
if(percent > 71 && percent < 80){
ctx.strokeStyle = "#6a2c70";
$('.colorPrevSc').text('Good')
$('.colorPrevSc').css('color', '#6a2c70')
}
if(percent > 81 && percent < 90){
ctx.strokeStyle = "#336d88";
$('.colorPrevSc').text('Very Good')
$('.colorPrevSc').css('color', '#336d88')
}
if(percent > 91 && percent < 99){
ctx.strokeStyle = "#092532";
$('.colorPrevSc').text('Exceptional')
$('.colorPrevSc').css('color', '#092532')
}
ctx.lineWidth = 8;
ctx.stroke();
ctx.closePath();
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.font = "40px arial bold";
ctx.fillStyle = "#fff"
          }
          succWindow();
       
        }else if(result.st==='error'){
          function errWindow(){
            let window = ` <div class="window">
            <div class="winX">X</div>
            <p class="text">Dear user, you can request to the website and analyse</p>
            <button class="button"><p class="request">Request</p></button>
            </div>`
  document.body.innerHTML += window;
  $('.window').nextAll('div').remove();
  
  
  $('.winX').click(function(){
  $('.window').remove();
  })
          }
          errWindow();
          $('.button').click(function(){
            $(this).css('display','none');
              $.ajax(`https://api.privacymonitor.com/score?q=${address}`, {
                success: function(data,status) {
                if(status==="success"){
                scoreHtml();
                }else{
                let pT= document.createElement('p');
                let pInner = $(pT).text('request sent');
                $('.text').html(pInner);
                setTimeout(function(){
                $('.window').css('display','none')
                },1000)
                  }
                   },
                error: function() {
                let pT= document.createElement('p');
                let pInner = $(pT).text('request sent');
                $('.text').html(pInner);
                setTimeout(function(){
                $('.window').css('display','none')
                },1000)
              }
            })
          })

        }else{
          errWindow();
        }
  



      })
    }
  })     
 