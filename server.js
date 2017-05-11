var express    = require('express');
var app        = express();
var port       = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose = require('mongoose');

//importing the routes
// var router     =  express.Router();
// var appRoutes  = require('./app/routes/api')(router);

//Midle ware -- ORDER IS IMPORTANT
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

//ROUTES
app.get('/', function(req, res){
  res.render(__dirname + '/public/views/index.ejs');
});

app.get('/games', function(req, res){
  var game_id = req.param('game');
  res.render(__dirname + '/public/views/game.ejs',  {game_id});
});

app.get('/verticalmario', function(req, res){
  res.render(__dirname + '/public/views/verticalmario.ejs');
});

app.get('/asteroids', function(req, res){
  var game_id = req.param('game');
  res.render(__dirname + '/public/views/asteroids.ejs');
});

app.get('/about', function(req, res){
  res.render(__dirname + '/public/views/about.ejs');
});
app.get('/contact', function(req, res){
  var game_id = req.param('game');
  res.render(__dirname + '/public/views/contact.ejs',  {game_id});
});


app.listen(port, function() {
    console.log('Running the server on port ' + port); // Listen on configured port
});
