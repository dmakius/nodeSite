var VerticalMario = VerticalMario || {};

VerticalMario.Coin = function(game, x ,y){
  Phaser.Sprite.call(this, game, x, y, 'coin');
  this.game.physics.arcade.enable(this);
  this.body.velocity.y = 20;
  this.anchor.setTo(0.5);
}

VerticalMario.Coin.prototype = Object.create(Phaser.Sprite.prototype);
VerticalMario.Coin.prototype.constructor = VerticalMario.Coin;

VerticalMario.Coin.prototype.update = function(){
  if(this.y >= 500){
    var ranX = Math.floor(Math.random() * 650);
    this.x = ranX;
    this.y = -50;
  }
}
VerticalMario.Coin.prototype.relocate = function(){
    var ranX = Math.floor(Math.random() * 650);
    this.x = ranX;
    this.y = -50;
}