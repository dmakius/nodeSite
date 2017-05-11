var Asteroids = Asteroids || {};

Asteroids.Alien = function(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'newBadGuy');
  this.anchor.setTo(0.5);
  this.scale.setTo(0.75);
  this.animations.add('fly', [0,1,2,3,4,5,6,7], 15, true);
  this.animations.play('fly');
  this.checkWorldBounds = true;
  this.outOfBoundsKill = false;
  this.health = 100;
  this.yHolder = 0;
  this.hit = false;
  this.invincibilityTime = 0;
  this.alienHitSound = game.add.audio('enemyHit');
}

Asteroids.Alien.prototype = Object.create(Phaser.Sprite.prototype);
Asteroids.Alien.prototype.constructor = Asteroids.Alien;
Asteroids.Alien.prototype.getRandomY = function(){
  return Math.random()*100;
};
Asteroids.Alien.prototype.getRandomY = function(){
  var x =  Math.random();
  if(x >= 0.75){return 1;}
  else if(x >= 0.25 && x <= 0.75){return 2;}
  else{return 3;}
};

Asteroids.Alien.prototype.yHolder = 0;
Asteroids.Alien.prototype.motionHolder = 0;

Asteroids.Alien.prototype.update = function(){
  if(this.hit){
    this.body.velocity.x = 0;
    if(this.game.time.now % 2 == 0){
      this.tint = 0xff0000;
    }else{
      this.tint = 0xffffff;
    }
  }else{
    this.body.velocity.x = -120;
  }
  if(this.game.time.now >= this.invincibilityTime){
    this.hit = false;
    this.tint = 0xffffff;
  }

  this.yHolder =  this.yHolder + 0.05;
//  console.log(this.yHolder);
  if(this.motionHolder == 0){
    this.body.velocity.y = Math.sin(this.yHolder) * 100;
  }else{
    this.body.velocity.y = Math.cos(this.yHolder) * 100;
  }

  //alien goes out of bounds
  if(this.body.x <= -20){
    this.health = 100;
    this.yHolder = 0;
    this.body.x = 600;
    if(this.getRandomY() == 1){
      this.motionHolder = 0;
      this.body.y = 50;
    }else if(this.getRandomY() == 2){
      this.motionHolder = 1;
      this.body.y = 150;
    }else{
      this.motionHolder = 0;
      this.body.y = 250;
    }
    console.log(this.body.y);
  }
}

Asteroids.Alien.prototype.damage = function() {
  if(this.game.time.now >= this.invincibilityTime){
    console.log("Alien Hit!");
    this.hit = true;
    this.health -= 50;
    this.invincibilityTime = this.game.time.now + 500;
    if(this.health <= 0){
      console.log("Alien Killed!");
      var emitter = this.game.add.emitter(this.x, this.y, 50);
      emitter.makeParticles('explosionParticle');
      emitter.minParticleSpeed.setTo(-50, -50);
      emitter.maxParticleSpeed.setTo(50, 50);
      emitter.gravity = 0;
      emitter.start(true, 500, null, 100);
      this.reset(600, 150);
      this.health = 100;
    }
  }
}
