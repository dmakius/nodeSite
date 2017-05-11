var Asteroids = Asteroids || {};

Asteroids.Bullet = function(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'bullet');
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
}

Asteroids.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Asteroids.Bullet.prototype.constructor = Asteroids.Bullet;
