var Asteroids = Asteroids || {};

Asteroids.Rock = function(game, x, y, key){
  Phaser.Sprite.call(this, game, x, y, 'rock');
  this.anchor.setTo(0.5);
  this.scale.setTo(0.5,0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = false;
  this.explosionSound = game.add.audio('explosion');
}

Asteroids.Rock.prototype = Object.create(Phaser.Sprite.prototype);
Asteroids.Rock.prototype.constructor = Asteroids.Rock;

Asteroids.Rock.prototype.update = function(){
  if(this.body.x <= -20){
    var randomY = Math.floor(Math.random()* 200 + 50);
    this.body.x = 500;
    this.body.y = randomY;
  }
}
