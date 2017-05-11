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

require('./app/routes/api.js')(app, __dirname);


app.listen(port, function() {
    console.log('Running the server on port ' + port); // Listen on configured port
});
