	var HEIGHT = 500, WIDTH = 700, keys = [], canvas, ctx, score = 0, computerScore= 0, intro = true;
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	var pause = false;

	var movingDown = false;
	var movingUp = false;

//the ball object
var ball = {
	x:400,
	y:20,
	width:10,
	height:10,
	velX:5,
	velY:5,
}
var player = {
	x:30,
	y:100,
	width:5,
	height:100,
}
var computer = {
	x:canvas.width - 30,
	y:100,
	width:5,
	height:100,
}

function mainLoop(){

		updateFrame();
		renderFrame();

	window.requestAnimationFrame(mainLoop);
}

function introFrame(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.font="bold 46px Arial";
	ctx.fillText("PONG: 2.0.1  The GAME", canvas.width/2 - 250, canvas.height/2);
	ctx.font="bold 24px Arial";
	ctx.fillText("The First to 11 WINS!!!!", 20, 325);
}

function updateFrame(){
	var paddleMiddle = player.y + player.height/2;
	var computerMiddle = computer.y + computer.height/2;

	//the player's movements
	if(keys[40]){player.y += 10;}//going down
	if(keys[38]){player.y -= 10;}//going up
	player.y = Math.min( Math.max(player.y, 0), 400);//keeping the player in bounds

	if(movingDown == true){player.y += 10;}
	if(movingUp == true){player.y -= 10;}

	//the balls movements
	ball.y += ball.velY;
	ball.x += ball.velX;

	//bouncing the ball off the sides
	if(ball.y + ball.height >= canvas.height || ball.y <= 0){ball.velY *= -1}

	//scoreing a point
	if(ball.x <= 0){computerScore += 1;serve(1);}
	if(ball.x >= 700){ score += 1; serve(2)}

	//hiting the player paddle
	if(ball.y >= player.y && //paddle bottom Y
	 ball.y <= player.y + player.height && //player top Y
	 ball.x <= player.x +player.width && //player right X
	 ball.x >= player.x){ //player left X
	 	ball.velX *= -1;
		var ballYDev = ball.y  - paddleMiddle;
		ball.velY = ballYDev*0.35
	 }
	 //refelct off player paddle
	if(ball.y >= computer.y &&  //computer top Y
		ball.y <= computer.y + computer.height &&  //computer buttom Y
		ball.x >= computer.x && //computer left X
		ball.x <= computer.x + computer.width){ //computer right X
			ball.velX *= -1;
			var ballYDev = ball.y  - computerMiddle;
			ball.velY = ballYDev*0.35
		}//refelct off computer paddle

	if(ball.x >= canvas.width/3){
		var desty = ball.y - (computer.height - ball.height)*0.5;
		//ease the movement toawrds the ideal poosition
		computer.y += (desty - computer.y)*0.15;
	}
	computer.y = Math.min( Math.max(computer.y, 0), 400);
}

function renderFrame(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, canvas.width, canvas.height);

	//drawing the ball
	ctx.fillStyle = "orange";
	ctx.beginPath();
	ctx.arc(ball.x,ball.y, 5, 10, 2,Math.PI, false);
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.stroke();

	//drawing the player
	ctx.fillStyle = "grey";
	ctx.fillRect(player.x, player.y, player.width, player.height);
	ctx.fillRect(computer.x, computer.y, computer.width, computer.height);

	ctx.fillStyle = "red";
	ctx.font="bold 24px Arial";
	ctx.fillText("Player Score: " + score, 10, 475);
	ctx.fillText("Computer Score: " + computerScore, 475, 475);
	drawNet();
}

function drawNet(){
	var brickHeight = canvas.height / 10;
	for(var i = 0; i < 10; i++){
		ctx.fillStyle = "green";
		ctx.fillRect(canvas.width/2, brickHeight*i, 10, 20)
	}
}

function serve(dir){
	if(dir == 1)
	{
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;
		ball.velX = -5;
		ball.velY = -5;
	}
	else if(dir == 2){
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;
		ball.velX = 5;
		ball.velY = 5;
	}
}


function startFunction(){
	console.log("Starting Game");
	console.log(gameStart);
	gameStart = true;
}

function moveDown(){
	player.y += 10;
	console.log("moveDown");
}

document.body.addEventListener("keydown", function(e){
	keys[e.keyCode] = true});

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false});

mainLoop();
