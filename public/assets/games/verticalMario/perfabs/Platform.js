var VerticalMario = VerticalMario || {}

VerticalMario.InitPlatforms  =  function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'brick');
  this.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this);
  this.body.immovable = true;
  this.body.velocity.y = 20;
  this.body.bounce = 0.5;
}

VerticalMario.InitPlatforms.prototype = Object.create(Phaser.Sprite.prototype);
VerticalMario.InitPlatforms.prototype.constructor = VerticalMario.InitPlatforms;

VerticalMario.InitPlatforms.prototype.update = function(){
  if(this.body.y >= 600){
    this.kill()
  }
}
