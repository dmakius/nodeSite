module.exports = function(app , dir){

  //ROUTES
  app.get('/', function(req, res){
    console.log(dir);
    res.render(dir + '/public/views/index.ejs');
  });

  app.get('/games', function(req, res){
    var game_id = req.param('game');
    res.render(dir + '/public/views/game.ejs',  {game_id});
  });

  app.get('/verticalmario', function(req, res){
    res.render(dir + '/public/views/verticalmario.ejs');
  });

  app.get('/asteroids', function(req, res){
    var game_id = req.param('game');
    res.render(dir +'/public/views/asteroids.ejs');
  });

  app.get('/about', function(req, res){
    res.render(dir +'/public/views/about.ejs');
  });
  app.get('/contact', function(req, res){
    var game_id = req.param('game');
    res.render(dir + '/public/views/contact.ejs',  {game_id});
  });

}
