var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('lodash');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.models = require('./models/index');
// Connect to Mongoose
mongoose.connect('mongodb://pulak.mrbp:mrbpapp2016@ds119618.mlab.com:19618/mrbp_app');
var db = mongoose.connection;

//ROUTES
app.get('/', function(req, res) {
	res.send('MRBP Application');
});

// Load the routes.
var routes = require('./routes');
_.each(routes, function(controller, route) {
	app.use(route, controller(app, route));
});

app.listen(3000);
console.log('Running on port 3000...');
