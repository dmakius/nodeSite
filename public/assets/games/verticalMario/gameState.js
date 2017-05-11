var VerticalMario = VerticalMario || {};

VerticalMario.GameState = {
  create: function(){
    this.background = this.game.add.sprite(0,0, 'background');

    this.player = this.game.add.group();
    var mario = new VerticalMario.Mario(this.game, 100, 250);
    this.player.add(mario);
    alreadDead = false;

    this.mainTheme = this.game.add.audio('mainTheme');
    this.coinSound = this.game.add.audio('getCoin');
    this.deadSound = this.game.add.audio('dead');
    this.hitHeadSound = this.game.add.audio('hitHead');
    this.squishEnemySound = this.game.add.audio('squishEnemy');
    this.mainTheme.play();

    this.createInitialPlatform();
    this.createGoombas();
    this.createCoins();

    this.spinyTimer = this.game.time.events.loop(10000, this.addSpiny, this);
    this.goombaTimer = this.game.time.events.loop(5000, this.addGoomba, this);
    this.rowTimer = this.game.time.events.loop(6200, this.addRow, this);
    this.game.scoreBoard = this.game.add.bitmapText(10, 10, "marioFont", "SCORE: 0" , 16);
  },

  update: function(){
   if(this.player.alive){
        this.game.physics.arcade.collide(this.player, this.initPlatforms, this.brickCollision, null, this);
        this.game.physics.arcade.collide(this.badGuys, this.player, this.playerCollision, null, this);
        this.game.physics.arcade.overlap(this.coins, this.player, this.collectCoin, null, this);
  }

  this.game.physics.arcade.collide(this.badGuys, this.initPlatforms, this.realignBadGuy, null, this);
  this.game.physics.arcade.collide(this.coins, this.initPlatforms, this.fixCoins, null, this);

  if(!this.player.alive){
    this.restartTimer = this.game.time.events.loop(3000, this.restart, this);
  }

  this.initPlatforms.update();
  this.coins.update();

if(this.player.children[0].body.y >= 500){
   this.mainTheme.stop();
   if(!alreadDead){this.deadSound.play();}
   startGame = false;
   this.game.state.start('MenuState');
   this.game.time.events.add(Phaser.Timer.SECOND * 2000, this.restart, this);
  }
},

addRow: function(){
  var gap = Math.floor(Math.random()*20);
  for(var x = 0; x < 24; x++){
    if(x <= gap || x >= gap + 4){
      var platform = new VerticalMario.InitPlatforms(this, 32*x,-25);
    }
    this.initPlatforms.add(platform);
  }
},

createGoombas:function(){
  this.badGuys = this.game.add.group();
  this.badGuys.enableBody = true;
  var goomba = new VerticalMario.Goomba(this.game, 100, 50);
  var goomba2 = new VerticalMario.Goomba(this.game, 400, 200);
  this.badGuys.add(goomba);
  this.badGuys.add(goomba2);
},

addGoomba: function(){
  var r = Math.random();
  if(r >= 0.5){
    ranX = 100;
  }else{
    ranX = 500;
  }
  var goomba = new VerticalMario.Goomba(this.game, ranX, -50);
  this.badGuys.add(goomba);
},

addSpiny: function(){
  var r = Math.random();
  if(r >= 0.5){
    ranX = 100;
  }else{
    ranX = 500;
  }
  var spiny = new VerticalMario.Spiny(this.game, ranX, 20);
  this.badGuys.add(spiny);
},

createCoins: function(){
  this.coins = this.game.add.group();
  this.coins.enableBody = true;
  for(var x = 0; x<3; x++){
    var ranX = Math.floor(Math.random() * 650);
    var ranY = Math.floor(Math.random()* 350);
    var coin = new VerticalMario.Coin(this.game, ranX, ranY);
    this.coins.add(coin);
  }
},

fixCoins: function(coin, platform){
  coin.y += 20;
},

collectCoin: function(coin, player){
  coin.relocate();
  this.coinSound.play();
  player.score += 200;
  this.game.scoreBoard.setText("SCORE: " + player.score);
},

playerCollision: function(badGuy, player){
  if(badGuy.body.touching.up && badGuy.key != 'spiny'){
    this.squishEnemySound.play();
    badGuy.animations.play('dead');
    badGuy.body.velocity.x = 0;
    this.pointsUp = this.game.add.image(badGuy.body.x, badGuy.body.y - 10, '200pts');
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.killPointSprite, this, this.pointsUp);
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.killSprite, this, badGuy);
    player.body.velocity.y = -50;
    player.score += 200;
    this.game.scoreBoard.setText("SCORE: " + player.score);
  }else if(!badGuy.hit){
    this.mainTheme.stop();
    this.deadSound.play();
    alreadDead = true;
    player.dead = true;
    player.animations.play('dead');
    player.body.velocity.x = 0;
    player.body.velocity.y = -50;
    this.player.alive = false;
  }
},

brickCollision: function(player, brick){
  if(brick.body.touching.down){
    this.hitHeadSound.play();
    var brickBounce = this.game.add.tween(brick.body);
    brickBounce.to({x:brick.body.x, y:brick.body.y - 10}, 100, Phaser.Easing.Linear.None);
    this.game.physics.arcade.collide(this.badGuys, brick, this.flipBadGuy, null,);
    brickBounce.onComplete.addOnce(function(){
      brickBounce.to({x:brick.body.x, y:brick.body.y + 17}, 100, Phaser.Easing.Linear.None);
      brickBounce.start();
    });
    brickBounce.start();
  }
},

flipBadGuy: function(brick, badGuy){
  console.log(badGuy);
  if(badGuy.key == 'spiny'){
    badGuy.hit = true;
    badGuy.body.velocity.x = 0;
    badGuy.body.checkCollision.down = false;
  }
},

killPointSprite: function(pointSprite){
  pointSprite.kill();
},

killSprite: function(badGuy){
  console.log(badGuy);
  badGuy.kill();
},

restart: function(){
  startGame = false;
  this.game.state.start('MenuState');
},

createInitialPlatform: function(){
  this.initPlatforms = this.game.add.group();
  for(var y = 0; y < 5; y ++){
    var gap = Math.floor(Math.random()*20);
    for(var x = 0; x < 24; x++){
      if(x <= gap || x >= gap + 4){
        var platform = new VerticalMario.InitPlatforms(this, 32*x,125*y);
      }
      this.initPlatforms.add(platform);
    }
  }
  }
}
