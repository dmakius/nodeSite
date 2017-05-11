var VerticalMario = VerticalMario || {}

VerticalMario.Spiny = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'spiny');
  this.anchor.setTo(0.5);
  this.scale.setTo(1.25);
  this.game.physics.arcade.enable(this);
  this.outOfBoundsKill = true;
  this.body.gravity.y = 100;
  this.body.y = 50;
  this.body.velocity.x = 150;

  this.hit = false;

  this.animations.add('walkingRight', [0, 1], 10, true);
  this.animations.add('walkingLeft', [3, 4], 10, true);
  this.animations.add('falling', [6, 7], 10, true);
  this.animations.add('upsidedownLeft', [2], 10, true);
  this.animations.add('upsidedownRight', [5], 10, true);
  this.animations.play('falling');
}

VerticalMario.Spiny.prototype = Object.create(Phaser.Sprite.prototype);
VerticalMario.Spiny.prototype.constructor = VerticalMario.Spiny;

VerticalMario.Spiny.prototype.update = function(){
  if(this.body.touching.down){
    if(this.body.velocity.x >= 0){
      this.animations.play('walkingRight');
    }else{
      this.animations.play("walkingLeft");
    }
  }else{
    this.animations.play('falling');
  }

  if(!this.hit && this.body.velocity.x == 0){
    this.body.velocity.x = 100;
  }

  if(this.body.x >= this.game.world.width || this.body.x <= 0){
    this.body.velocity.x *= -1;
  }

  if(this.hit){
    this.body.velocity.x = 0;
  }

  if(this.body.y >= 500){
    this.kill();
  }
}
