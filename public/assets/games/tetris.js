var canvas = document.getElementById("myCanvas");
canvas.width=240;
canvas.height=400;
canvas.style="display:block; margin:auto;"
var ctx = canvas.getContext("2d");
ctx.scale(20,20);

var pause = false;

var pMLeft = false, pMRight = false, pMDown = false, pMUp = false;

//player object
var player = {
	pos:{x:0, y:0},
	matrix: null,
	score:0,
}

var pieces = "ILJOTSZ";//array of possible pieces

//array of all possible colors
var colors = [
	null,
	'red',
	'blue',
	'violet',
	'green',
	'purple',
	'orange',
	'pink',
];
var arena = createMatrix(12,20);//creates a 12x20 matrix

//Time variables
var dropCounter = 0;
var dropInterval = 1000;
var lastTime = 0;
var level = 1;

var rowsCleared = 0;

//the main loop, repeats every
function update(time = 0){
	if(pause == false){
		const deltaTime = time - lastTime;
		lastTime = time;
		dropCounter += deltaTime;
		if(dropCounter >= dropInterval){
			playerDrop();
		}
	}
	draw();
	requestAnimationFrame(update);
}

function draw(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, canvas.width, canvas.height);

	drawMatrix(arena,{x:0, y:0});//draws the arena
	drawMatrix(player.matrix, player.pos);//draws the player
}

function drawMatrix(matrix, offshot){
	for (var y = 0 ; y < matrix.length; y++){//iterates through arean row
		for(var x = 0; x < matrix[y].length; x++){//iterates arena collunm
			if(matrix[y][x] !== 0){
				ctx.fillStyle = colors[matrix[y][x]]; //use the correct color
				ctx.fillRect(x + offshot.x,//offshoot is the correct coordinate of the player
							y + offshot.y,
							  0.9, 0.9);
			}
		}
	}
}

//all ofthe piece matrixes
function createPiece(type){
	if (type === 'T'){
		return [
			[0,0,0],
			[1,1,1],
			[0,1,0],
		];
	}else if(type === "O"){
		return [
			[2,2],
			[2,2],
		];
	}else if(type === "L"){
		return [
			[0,3,0],
			[0,3,0],
			[0,3,3],
		];
	}else if(type === "J"){
		return [
			[0,4,0],
			[0,4,0],
			[4,4,0],
		];
	}else if(type === "I"){
		return [
			[0,5,0,0],
			[0,5,0,0],
			[0,5,0,0],
			[0,5,0,0],
		];
	}else if (type === 'S'){
		return [
			[0,6,6],
			[6,6,0],
			[0,0,0],
		];
	}else if (type === 'Z'){
		return [
			[7,7,0],
			[0,7,7],
			[0,0,0],
		];
	}

}
//creating the matrix
function createMatrix(w,h){
	var matrix = [];
	while(h--){
		matrix.push(new Array(w).fill(0));//creates a 'row' array with w elements, and fills them with 0
	}
	return matrix;
}

function merge(arena, player){
	var feild = player.matrix;
	for(var y = 0; y < feild.length; y ++){//iterates through then players row
		for(var x = 0; x < feild[y].length; x++){//iterates through the players collunm
			if(feild[y][x] !== 0){
				arena[y + player.pos.y][x + player.pos.x] = feild[y][x];
			}
		}
	}

};

//the collide function
function collide(arena, player){
	var m  = player.matrix;
	var o = player.pos;
	for(var y = 0; y < m.length; y++){					//iterates through everey row or arena
		for(var x = 0; x <m[y].length; x ++){			//iterates through every collunm of arena
			if(m[y][x] !== 0 &&							//matrix cordinates ARENT zero, ie there is a real peice
				(arena[y + o.y]&&						//the arena row where the player is
				arena[y + o.y][x +o.x]) !== 0){			//collides with bricks in area
				return true;
			}
		}
	}
	return false;
}

function playerRotate(dir){
	var pos = player.pos.x;
	var offset = 1;
	rotate(player.matrix, dir);//rotates the matrix

	//NOTE: a player can collide two blocks in
	while(collide(arena, player)){
		player.pos.x += offset;
		offset = -(offset + (offset > 0 ? 1 : -1));
		if(offset > player.matrix[0].length){
		 	rotate(player.matrix, -dir);
		 	player.pos.x = pos; //returns player to original x-coordinates
		 	return;
		 }
	}
}

//Flips the matrix
function rotate(matrix, dir){
	for(var y = 0; y < matrix.length; y++){
		for(var x = 0; x < y; x++){
			[
			matrix[x][y],
			matrix[y][x],
		] = [
			matrix[y][x],
			matrix[x][y],
		];
		}
	}
	if(dir > 0){
		for(var i = 0; i < matrix.length; i++){
			matrix[i].reverse();
		}
	}else{
		matrix.reverse();
	}
}
function playerReset(){
	player.matrix = nextMatrix;
	nextMatrix = createPiece(pieces[pieces.length *Math.random() | 0]);//randomly selects piece
	player.pos.y = 0;
	player.pos.x = (arena[0].length/2 |0) - (player.matrix[0].length/2 |0);

	//player dies when hiting arena on reset
	if(collide(arena,player)){
		for(var y = 0; y< arena.length; y++){
			arena[y].fill(0);
		}
		player.score = 0;
		level = 0;
		dropInterval = 1000;
	}
}

function arenaSweep(){
	var rowCount =1;
	outer: for(var y = arena.length -1; y > 0; y--){		//loops through arena rows
			for(var x = 0; x < arena[y].length; x++){		//loops through arena colounms
				if(arena[y][x] === 0){						//skips the rows itteration if one zero is present in row
					continue outer;
				}
			}
			var row = arena.splice(y, 1)[0].fill(0);		//cut out the cleared row and fill it with zeros
			arena.unshift(row);								//move the cleared row to the top
			y++;

		player.score += rowCount * 10;
		rowCount *= 2;
		rowsCleared ++;
		console.log(rowsCleared);
		console.log(dropInterval);
		if(rowsCleared >= 10){								//next level
			level ++;
			rowsCleared = 0;
			dropInterval -= 100;
			updateLevel();

		}
	}
}

function playerDrop(){
	player.pos.y ++;
	if(collide(arena, player)){
		player.pos.y--;						//puts player back in 'bounds'
		merge(arena, player);				//merge the peices to the arena
		playerReset();						//send player to top
		arenaSweep();						//check for complete rows to clear
		updateScore();
	}
	dropCounter = 0;
}

function playerMove(dir){
	player.pos.x += dir;
	if(collide(arena, player)){
		player.pos.x -=  dir;
	}
}
function updateLevel(){
	//document.getElementById("level").innerText = level;
}

function updateScore(){
	//document.getElementById("score").innerText = player.score;
}

document.addEventListener("keydown", function(e){
	if (e.keyCode == 37){ playerMove(-1)}
	else if (e.keyCode == 40){ playerDrop(); dropCounter =0;}
	else if (e.keyCode == 39){ playerMove(1);}
	else if (e.keyCode == 38){ playerRotate(1);}
	else if (e.keyCode == 81){ playerRotate(-1);}
});



nextMatrix = createPiece(pieces[pieces.length *Math.random() | 0]);
updateLevel();
updateScore();
playerReset();
update();
