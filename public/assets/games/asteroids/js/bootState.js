var gameStart = false, pause = false;
var playerFire = false;
var movingRight = false, movingLeft = false, movingUp = false, movingDown = false;

var Asteroids = Asteroids || {};
Asteroids.BootState = {
  init: function(){
    console.log("init bootState");
  },

  preload: function(){
    console.log("preload bootState");
    this.game.load.image('background', 'assets/games/asteroids/assets/background.png');
		this.game.load.image('preloader', 'assets/games/asteroids/assets/preloader.png');
    this.game.load.image('space', 'assets/games/asteroids/assets/space.jpg');
  },

  create: function(){
    console.log("create bootState");
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.game.scale.minWidth = 480;
    // this.game.scale.minHeight = 320;
    // this.game.scale.maxWidth = 960;
    // this.game.scale.maxHeight = 640;

    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    // if(!this.game.device.desktop){
    //      this.scale.forceOrientation(true, false);
    //      this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
    //      this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    //    }

    console.log(this);
    // Start Preloader
    // this.game.scale.setScreenSize(true);


    this.game.state.start('PreloadState');
  }
}
