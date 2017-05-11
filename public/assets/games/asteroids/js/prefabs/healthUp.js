var Asteroids = Asteroids || {};

Asteroids.HealthUp = function(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'healthUp');
  this.anchor.setTo(0.5);
  this.scale.setTo(0.35);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.HealthUpSound = game.add.audio('health');
}

Asteroids.HealthUp.prototype = Object.create(Phaser.Sprite.prototype);
Asteroids.HealthUp.prototype.constructor = Asteroids.Bullet;

Asteroids.HealthUp.prototype.update = function(){
  this.body.velocity.y = 30;
}
