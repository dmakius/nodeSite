//onscreen controllers
document.getElementById("rightBtn").addEventListener("touchstart", function(){
    movingRight = true;
});
document.getElementById("rightBtn").addEventListener("touchend", function(){
    movingRight = false;
});
document.getElementById("leftBtn").addEventListener("touchstart", function(){
	 movingLeft = true;
});
document.getElementById("leftBtn").addEventListener("touchend", function(){
	 movingLeft = false;
});

document.getElementById("upBtn").addEventListener("touchstart", function(){
	 movingUp = true;
});
document.getElementById("upBtn").addEventListener("touchend", function(){
	 movingUp = false;
});

document.getElementById("downBtn").addEventListener("touchstart", function(){
	 movingDown = true;
});
document.getElementById("downBtn").addEventListener("touchend", function(){
	 movingDown = false;
});

document.getElementById("shootBtn").addEventListener("touchstart", function(){
  playerFire = true;
  setTimeout(function() { playerFire = false}, 250);
});

//pause button
document.getElementById("startBtn").addEventListener("touchstart", function(){
  var btn = document.getElementById("startText");
  gameStart = true;
	 if(pause == false){
	 	pause = true;
	 	btn.innerHTML = "Resume";
	 }else if(pause == true){
	 	pause = false;
	 	btn.innerHTML = "Pause";
	 }
});
document.getElementById("startText").innerHTML = "Start";
