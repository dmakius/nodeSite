var canvas, ctx, WIDTH = 700, HEIGHT = 500;
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
canvas.width = WIDTH, canvas.height = HEIGHT;
var score = 0;
var counter = 1;
var snakeLength = 10;
var snake_array = [];
var keys = [];
var block = 10;
var d = "left";
var pause = false;

//var movingDown = false, movingUp = false, movingLeft = false, movingRight = false;

var intro = true, pause = false, gameOver = false, gameOverCounter = 200;

var fruit = {
	x:0,
	y:0,
	width:0,
	height:0,
}

function _init_snake(){
	createSnake();
	createFruit();
	setInterval(mainLoop, 60);
}

function mainLoop(){
	if(!pause){renderFrame();}
	drawFrame();
}

function createSnake(){
	for(var i = 0; i < snakeLength; i++){
		var snakeBlock = new Object();
		snakeBlock.x = (i + 50);
		snakeBlock.y = 5;
		snakeBlock.width = block;
		snakeBlock.heigh = block;
		snake_array.push(snakeBlock);
	}
}

function createFruit(){
	fruit.x = Math.round(Math.random()*canvas.width/block);
	fruit.y = Math.round(Math.random()*canvas.height/block);
}



function renderFrame(){
	var headX = snake_array[0].x;//the x coordinate of the snake array's first element
	var headY = snake_array[0].y;//the y coordinate of the snake array's first element

	//controling the snake with the keyboard
	d = directSnake();

	if(d == "right"){
		headX++;
		d = "right";
	}else if(d == "left"){
		headX--;
		d = "left";
	}else if(d == "up"){
		headY--;
		d = "up";
	}else if(d == "down"){
		headY++;
		d = "down";
	}

	var tail = snake_array.pop(); //take off the last element of the array. in this case the "head"
	tail.x = headX;//assigns the head to be at the back
	tail.y = headY;
	snake_array.unshift(tail);//adds it to the back of the array

	//check snake touching
	for(var k = 1; k < snake_array.length - 1; k++){
		if(snake_array[k].x == tail.x && snake_array[k].y == tail.y){
			reset();
		}
	}
	//"eating" fruit
	 if(snake_array[0].x == fruit.x && snake_array[0].y == fruit.y){
		growSnake();
		createFruit();
		score += 100;
	}
	//out of bounds
	if(headX <= 0 || headX >= canvas.width/block || headY <= 0 || headY >= canvas.height/block){
		reset();
	}
}

function reset(){
	d = "left";//default direction
	score = 0;
	snake_array = [];
	createFruit();
	createSnake();
}

function growSnake(){
	var snakeBlock = new Object();
	snakeBlock.x = fruit.x;
	snakeBlock.y = fruit.y;
	snakeBlock.width = block;
	snakeBlock.heigh = block;
	snake_array.push(snakeBlock);
}

function directSnake(){
	if(keys[39]  && d != "left"){
		return d = "right";
	}else if(keys[37] && d!=  "right"){
		return d = "left";
	}else if(keys[38] && d !=  "down"){
		return d = "up";
	}else if(keys[40]  && d !=  "up"){
		return d = "down";
	}else{
		return d;
	}
}

function drawFrame(){
	//draw background
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, canvas.width, canvas.height);

	//draw snake blocks
	for(var i = 0; i < snake_array.length-1; i ++){
		ctx.fillStyle = "green";
		ctx.fillRect(snake_array[i].x*block, snake_array[i].y*block, block, block);

		ctx.strokeStyle = "black";
		ctx.strokeRect(snake_array[i].x*block, snake_array[i].y*block,  block, block);
	}

	ctx.fillStyle = "blue";
	ctx.fillRect(fruit.x* block, fruit.y *block, block, block);

	ctx.fillStyle = "gray";
	ctx.font="bold 24px Arial";
	ctx.fillText("Score: " + score,15, 25);
}

function pauseGame(){
	console.log("Pause");
}

//keyboard controllers
document.body.addEventListener("keydown", function(e){
	keys[e.keyCode] = true});

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false});


_init_snake();
