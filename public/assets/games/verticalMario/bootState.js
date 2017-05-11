var VerticalMario = VerticalMario || {};

VerticalMario.BootState = {
  init: function(){
    console.log("Boostate init");
  },

  preload: function(){
    this.game.load.image('background','assets/games/verticalMario/assets/bg.png');
    this.game.load.image('preloader', 'assets/games/verticalMario/assets/preloader.png');
    this.game.load.bitmapFont('gameFont', 'assets/games/verticalMario/assets/fonts/font.png', 'assets/games/verticalMario/assets/fonts/font.fnt');
    this.game.load.bitmapFont('marioFont', 'assets/games/verticalMario/assets/fonts/mario20_0.png', 'assets/games/verticalMario/assets/fonts/mario20.fnt');
  },

  create: function(){
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('PreloadState');
  }
}
