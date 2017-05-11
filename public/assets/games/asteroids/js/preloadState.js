var Asteroids = Asteroids || {};
Asteroids.PreloadState = {
  init: function(){
    console.log("init preloadtState");
  },

  preload: function(){
    console.log("preload preloadtState");
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'space');
    this.background.autoScroll(-100, 0);

    this.preloadBar = this.game.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);
    //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    var scoreFont = "24px Arial";

    //load audio files
    this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 50, " LOADING......", {font: scoreFont, fill: "#fff"});
		this.loading.anchor.setTo(0.5, 0.5);
    this.game.load.audio('die',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/die.mp3");
    this.game.load.audio('explosion',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/explosion.mp3");
    this.game.load.audio('beam',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/beam.mp3");
    this.game.load.audio('intro',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/intro.mp3");
    this.game.load.audio('main',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/main.mp3");
    this.game.load.audio('enemyHit',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/enemyHit.mp3");
    this.game.load.audio('health',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/health.mp3");
    this.game.load.audio('playerHurt',"https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/playerHurt.mp3");

    //load image files
    this.game.load.image('player', 'assets/games/asteroids/assets/ship.jpg');
    this.game.load.image('space', 'assets/games/asteroids/assets/space.jpg');
    this.game.load.image('bullet', 'assets/games/asteroids/assets/bullet.jpg');
    this.game.load.image('rock', 'assets/games/asteroids/assets/rock.jpg');
    this.game.load.image('healthUp', 'assets/games/asteroids/assets/healthUp.jpg');
    this.game.load.image('explosion', 'assets/games/asteroids/assets/explosion.jpg');
    this.game.load.image('rockParticle', 'assets/games/asteroids/assets/rockParticle.png');
    this.game.load.image('explosionParticle', 'assets/games/asteroids/assets/explosionParticle.png');
    this.game.load.image('badguy', 'assets/games/asteroids/assets/bad_guy.jpg');
    this.game.load.spritesheet('newBadGuy', 'assets/games/asteroids/assets/brainy_idle.jpg', 100, 42, 8);
    this.game.load.spritesheet('newPlayer', 'assets/games/asteroids/assets/newPlayer5.png', 31, 24.8, 5);

    //font
    this.game.load.bitmapFont('newFont', 'assets/games/asteroids/assets/fonts/font.png', 'assets/games/asteroids/assets/fonts/font.fnt');
  },

  create: function(){
    this.preloadBar.cropEnabled = false;
    console.log("create preloadState");
    this.game.state.start('MenuState');
  }
}
