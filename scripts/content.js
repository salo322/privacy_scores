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
chrome.runtime.sendMessage({message: "dom",domainS:address});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   if (request.greeting == "hello"){   
    chrome.storage.local.get(['key','prev','st','domSc'], function(result) {
       if(result.key && result.st === 'success'){
        function succWindow(){
          let scoresWindow = `
        <div class="scWindow">
          <div class="flexSc">
          <div class="privacyMonitor">
            <p class="textSc">Privacy</p>
            <p class="monitorSc">monitor</p>
          </div>
          <div class="x">X</div>
          </div>
          <div class="line"></div>
         <div class="flexFor">
          <div class="canvasSc">
            <canvas id="cvs"></canvas>
         </div>
         <div class="scoresContainer">
           <div class="sc">
          <div class="scText">SCORE:</div>
          <div class="scores">${result.key}</div>
           </div>
         <div class="colorPrevSc" ></div>
           <div class="trendFlex">
             <p class="trendSc">Trend:</p>
             <p class="prevSc">previous scores</p>
            </div>
          </div>
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
ctx.arc(widthC/2,heightC/2, 25, 0, Math.PI * 2);
ctx.strokeStyle = "#f7fbe1";
ctx.lineWidth = 8;
ctx.stroke();
ctx.closePath();

var angle = percent/100*360;
ctx.beginPath();
ctx.arc(widthC/2, heightC/2, 25, -90 * Math.PI/180, (angle - 90) * Math.PI/180);
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
            let window = ` 
            <div class="window">

            <div class="mainFlexErr">
            <div class="flexErr">
            <div class="privacyErr">Privacy</div>
            <div class="monitorErr">monitor</div>
            </div>
            <div class="winX">X</div>
            </div>
            <div class="line"></div>

            <div class="gridContainer">
            <div class="textScore">Sorry, we haven't reviewed ${address} yet.</br>If you would like us to add it to the queue for our legal experts to review, hit the "Request" button now.</div>
            <div class="buttonContainer">
            <input class="buttonSc" type="button" value="request" />
            </div>
            </div>
            </div>`
  document.body.innerHTML += window;
  if(result.domSc === this.window.location.hostname){
    console.log(result.domSc)
    $('.textScore').html('request sent');
    $('.buttonSc').css('display','none');
    setTimeout(()=>{
      $('.window').remove();
    },2000)      
  }  
  $('.window').nextAll('div').remove();
  $('.winX').click(function(){
  $('.window').remove();
  })
}
    errWindow();
      $('.buttonSc').click(function(){
       $(this).css('display','none');
      chrome.storage.local.set({domSc:address});
             
              $.ajax(`https://api.privacymonitor.com/score?q=${address}`, {
                success: function(data,status) {
                if(status==="success"){
                scoreHtml();
                }else{
                
                $('.textScore').html('request sent');
                setTimeout(function(){
                $('.window').css('display','none')
                },1000)
                  }
                   },
                error: function() {
                $('.textScore').html('request sent');
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

 