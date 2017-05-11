var Asteroids = Asteroids || {};
Asteroids.MenuState = {
  init: function(){

  },

  preload: function(){

  },

  create: function(){
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'space');
    this.background.autoScroll(-100, 0);

    this.game.title = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, "newFont", "ASTEROIDS" , 64);
    this.game.title.anchor.setTo(0.5);
    this.game.enter = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 50, "newFont", "Press SPACE BAR To start" , 24);
    this.game.enter.anchor.setTo(0.5);

    this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.intoMusic = this.game.add.audio('intro');
    this.intoMusic.play();
  },

  update: function(){
    if(this.start.isDown || gameStart == true){
      this.intoMusic.stop();
      this.game.state.start("GameState");
    }
  }
}
