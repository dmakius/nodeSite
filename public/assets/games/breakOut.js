var canvas, ctx, WIDTH  = 700, HEIGHT = 500, collision  = null, score = 0, lives = 3, over = false;

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var paddle = false;

var movingRight = false, movingLeft = false;
var pause = false;

var keys = [];

var bricksPerRow = 70;
var BRICKS = [];

var brickHeight = 25;
var brickWidth = 70;

var level1 = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[2,1,2,1,2,1,2,1,2,1],
	[1,2,1,2,1,2,1,2,1,2],
	[2,1,2,1,2,1,2,1,2,1],
	[1,2,1,2,1,2,1,2,1,2],
	[2,1,2,1,2,1,2,1,2,1],
	[1,2,1,2,1,2,1,2,1,2],
]

var player = {
	x:canvas.width/2 - 50,
	y:canvas.height - 50,
	width:100,
	height:5,
	fill: "hard"
}

var ball = {
	x:200,
	y:300,
	velX:5,
	velY:5,
	height:5,
	width:5
}

function populateBricks(){
	for(var i = 0; i < level1.length; i++)
	{
		for (var j = 0; j < level1[i].length; j++)
		{
			var brick = new Object();
			brick.x =j*brickWidth,
			brick.y = i*brickHeight,
			brick.height = brickHeight;
			brick.width = brickWidth;
			brick.type = level1[i][j];
			BRICKS.push(brick);
		}
	}
}


function checkCollisions(object1, object2){
	var vectorX = (object1.x + object1.width/2) - (object2.x + object2.width/2);
	var vectorY = (object1.y + object1.height/2) - (object2.y + object2.height/2);
	var hHeight = (object1.height/2) + (object2.height/2);
	var hWidth = (object1.width/2) + (object2.width/2);

	//check for a collision
	if((Math.abs(vectorX) <= hWidth) && (Math.abs(vectorY) <= hHeight) &&
	 (object2.type >= 1 || object2.fill == "hard")){
		var oX = hWidth - Math.abs(vectorX);//left over on x coordinate
		var oY = hHeight - Math.abs(vectorY);//left over on y coodinate

		object2.type = object2.type - 1;

		if(!object2.fill){score += 10;}
		if(object2.type <= 0){object2.type = 0;}

		collision  = null;

		if(oX >= oY) //up or down collision
		{
			if(vectorY > 0){collision = "t";}
			else{collision = "b";}
		}
		else //left or right collision
		{
			if(vectorX > 0){collision = "l";}
			else{collision = "r";}
		}
	return collision
	}
}

function translateCollision(collision){
	if(collision == "t"){ball.velY *= -1;}
	if(collision == "b"){ball.velY *= -1;}
	if(collision == "l"){ball.velX *= -1;}
	if(collision == "r"){ball.velX *= -1;}
}
function drawLevel(){
	for (var i = 0; i < BRICKS.length; i++){
		if(BRICKS[i].type == 2){ctx.fillStyle = "green";}
		if(BRICKS[i].type == 1){ctx.fillStyle = "purple";}
		if(BRICKS[i].type == 0){ctx.fillStyle = "black";}
		ctx.fillRect(BRICKS[i].x, BRICKS[i].y, brickWidth, brickHeight);
		ctx.strokeRect(BRICKS[i].x+ 1, BRICKS[i].y + 1, brickWidth - 2, brickHeight - 2);
	}
}

function _init_breakout(){
	populateBricks();
	mainLoop();
}

function mainLoop(){
	if(!over){
		if(!pause){updateFrame()};}
	renderFrame();
	window.requestAnimationFrame(mainLoop);
}
function updateFrame(){
	//keyboard controls
	if(keys[39]){player.x += 10;}
	if(keys[37]){player.x -= 10;}

	//touchscreen controls
	if(movingLeft == true){player.x -= 10;}
	if(movingRight == true){player.x += 10;}

	if(player.x <= 0){player.x = Math.max(player.x, 0);}
	if((player.x + player.width) > 600){player.x = Math.min(player.x, 600)}

	ball.x += ball.velX;
	ball.y += ball.velY;

	for(var i = 0; i < BRICKS.length; i++)//check brick collisions
	{
		collision = checkCollisions(ball, BRICKS[i], paddle);
		translateCollision(collision);
	}

	//check player and ball collisions
	collision = checkCollisions(ball, player);
	translateCollision(collision);
	if(collision == 'b'){
		var ballFrompPaddleCenter = ball.x - (player.x +player.width/2);
		ball.velX = ballFrompPaddleCenter * 0.3;
	}

	//keep the ball inside
	if(ball.x >= canvas.width || ball.x <= 0){ball.velX *= -1;}
	if(ball.y <= 0){ball.velY *= -1;}

	//dying
	if(ball.y >= canvas.height +100){
		lives -= 1;
		if(lives == 0){over =  true;}
		else{serve();}
	}
}

function serve(){
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;
	ball.velX = 5;
	ball.velY = 5;
}

function renderFrame(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, canvas.width, canvas.height);

	drawLevel();

	ctx.fillStyle = "blue";
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.width, 0,Math.PI*2, true );
	ctx.fill();

	ctx.fillStyle = "pink";
	ctx.fillRect(player.x, player.y, player.width, player.height);

	//score board
	ctx.fillStyle = "red";
	ctx.font="bold 24px Arial";
	ctx.fillText("Score: " + score, 10, 475);
	ctx.fillText("Lives: " + lives, 600, 475);

	//game over sign
	if(over)
	{	score = 0;
		lives = 3;
		BRICKS = [];
		populateBricks();
		serve();
		over = false;
	}
}
//keyboard buttons
document.body.addEventListener("keydown", function(e){
	keys[e.keyCode] = true});

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false});

_init_breakout();
