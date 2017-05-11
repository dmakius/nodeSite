var Asteroids = Asteroids || {};

Asteroids.GameState = {
  init: function(){
    this.BULLET_SPEED = 150;
  },
  create: function(){
    console.log(this);
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'space');
    this.background.autoScroll(-100, 0);
    this.pause = false;
    this.score = 0;

    //importing music files
    this.shootSound = this.game.add.audio('beam');
    this.playerHurtSound = this.game.add.audio('playerHurt');
    this.playerDeadSound = this.game.add.audio('die');
    this.mainMusic = this.game.add.audio('main');
    this.mainMusic.play();

    //create the player
    this.player = this.add.sprite(50, this.game.world.height - 50, 'newPlayer');
    this.player.animations.add('fly', [0,1,2,3,4], 5, true);
    this.player.animations.play('fly');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(1.75,1.75);
    this.player.health = 100;
    this.player.invincible = false;
    this.player.dead = false;
    this.playerInvinciblityTime = 0;

    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.game.camera.follow(this.player);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // this.background = this.game.add.tileSprite(0, 0, 480, 320, 'background');
    // this.background.autoScroll(-150, -20);
    this.initRocks();
    this.initBullets();
    this.initAliens();
    this.initScoreAndHealth();
    this.initHealth();
  },
  update: function(){
      //Bullet Collisions
      this.game.physics.arcade.overlap(this.Bullets, this.rocks, this.explodeRocks, null, this);
      this.game.physics.arcade.overlap(this.Bullets, this.Aliens, this.damageAlien, null, this);

      //Player Collisions
      if(!this.player.dead){
        this.game.physics.arcade.overlap(this.player, this.rocks, this.damagePlayer, null, this);
        this.game.physics.arcade.overlap(this.player, this.Aliens, this.damagePlayer, null, this);
        this.game.physics.arcade.overlap(this.player, this.health, this.playerRecover, null, this);
      }

      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      //player blinking if hit
      if(this.player.invincible){
        if(this.game.time.now % 2 == 0){
         this.player.tint = 0xff0000;
        }else{
          this.player.tint = 0xffffff;
        }
      }
      //turn of blinking after invincibity time passed
      if(this.game.time.now > this.playerInvinciblityTime){
        this.player.invincible = false;
        this.player.tint = 0xffffff;
      }

      //updating the player
      if(this.cursors.up.isDown || movingUp){
        this.player.body.velocity.y = -100;
      }
      if(this.cursors.down.isDown || movingDown){
        this.player.body.velocity.y = 100;
      }
      if(this.cursors.left.isDown || movingLeft){
        this.player.body.velocity.x = -100;
      }
      if(this.cursors.right.isDown || movingRight){
        this.player.body.velocity.x = 100;
      }
      if((this.fire.isDown || playerFire) && !this.player.dead){
        this.createBullet(this);
      }
  },
  initScoreAndHealth: function(){
    this.game.scoreBoard =  this.game.add.bitmapText(10, 10, "newFont", "SCORE: " + this.score , 24);
    this.game.healthboard = this.game.add.bitmapText(this.game.world.bounds.width - 160, 10, "newFont", "HEALTH: " + this.player.health +"%" , 24);
  },
  initRocks: function(){
    //console.log('initRocks');
    this.rocks = this.add.group();
    this.rocks.enableBody = true;
    for(var i = 0; i < 10; i++){
      //console.log("rock created");
      var randomX = Math.floor((Math.random()* 400)+ 100);
      var randomY = Math.floor(Math.random()* 300);
      //console.log("ROCK: " + randomX + ":" + randomY);
      var rock = new Asteroids.Rock(this.game, randomX, randomY);
      this.rocks.add(rock);

      var randomX = Math.floor((Math.random()* 200) + 460);
      var randomSpeed = Math.floor(Math.random()*100);
      rock.body.velocity.x = -randomSpeed;
    }
  },
  initBullets: function(){
    this.bulletTime = 0;
    this.Bullets = this.add.group();
    this.Bullets.enableBody = true;
  },
  initAliens: function(){
    this.Aliens = this.add.group();
    this.Aliens.enableBody = true;
    var alien = new Asteroids.Alien(this.game ,100, 100);
    this.Aliens.add(alien);
  },
  initHealth: function(){
    this.health = this.add.group();
    this.health.enableBody = true;
  },

  createBullet: function(game){
    if (this.game.time.now > this.bulletTime){

      var bullet = this.Bullets.getFirstExists(false);
      if(!bullet){
        bullet = new Asteroids.Bullet(this.game, this.player.x + 40, this.player.y);
        this.Bullets.add(bullet);
      }else{
        bullet.reset(this.player.x + 40, this.player.y);
      }
      game.shootSound.play();
      bullet.body.velocity.x = this.BULLET_SPEED;
      this.bulletTime = this.game.time.now + 250;
    }
  },

  explodeRocks: function(bullet, rock){
    bullet.kill();
    //create healthup
    var healthChange = Math.random();
    if(healthChange > 0.9){
      var healthUp = new Asteroids.HealthUp(this.game, rock.x, rock.y);
      this.health.add(healthUp);
    }
    //create explosion
    rock.explosionSound.play();

    var emitter = this.game.add.emitter(rock.x, rock.y, 50);
    emitter.makeParticles('rockParticle');
    emitter.minParticleSpeed.setTo(-50, -50);
    emitter.maxParticleSpeed.setTo(50, 50);
    emitter.gravity = 0;
    emitter.start(true, 500, null, 100);

    rock.body.x = 500;
    rock.body.y = Math.floor(Math.random()* 300);
    //update players score
    this.score += 100;
    this.game.scoreBoard.setText("SCORE: " + this.score);
  },
  damagePlayer: function(player, enemy){
    if (this.game.time.now > this.playerInvinciblityTime){
      if(enemy.key === 'newBadGuy'){
        this.player.health -= 30;}
      if(enemy.key === 'rock'){
        this.player.health -= 10;
      }
      this.playerHurtSound.play();
      this.player.health -= 10;
      if(this.player.health <= 0){
        this.playerDead(player);
      }
      this.player.invincible = true;
      this.game.healthboard.setText("Health: " + this.player.health + "%");
      this.playerInvinciblityTime = this.game.time.now + 700;
    }
  },
  playerDead: function(player){
    this.mainMusic.stop();
    this.playerDeadSound.play();
    player.visible = false;
    this.player.dead = true;
    var emitter = this.game.add.emitter(player.x, player.y, 50);
    emitter.makeParticles('explosionParticle');
    emitter.minParticleSpeed.setTo(-50, -50);
    emitter.maxParticleSpeed.setTo(50, 50);
    emitter.gravity = 0;
    emitter.start(true, 500, null, 100);
    this.game.gameOverText =  this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, "newFont", "GAME OVER" , 48);
    this.game.gameOverText.anchor.setTo(0.5);
    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.resetGame, this);
  },
  resetGame: function(){
   gameStart = false;
   this.game.state.start("MenuState");
  },
  playerRecover: function(player, healthUp){
    healthUp.HealthUpSound.play();
    healthUp.kill();
    player.health = 100;
    this.game.healthboard.setText("HEALTH: " + player.health + "%");
  },
  damageAlien: function(bullet, alien){
    bullet.kill();
    alien.alienHitSound.play();
    alien.damage();
    this.score += 300;
    this.game.scoreBoard.setText("SCORE: " + this.score);
  }
}
