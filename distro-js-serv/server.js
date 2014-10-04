// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var googleStategy = require('passport-google');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var servicemanager = require('./scripts/servicemanager')

var homeRouter = require('./routes/home');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/distro');

// Models
var User = require('./models/user');
var Client = require('./models/client');
var DSS = require('./models/dss');

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 
// instruct express to server up static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// set routes
app.use('/', homeRouter);

// socket IO logic
io.on('connection', function(socket) {
	servicemanager.onConnect(socket);
});

// Set server port
http.listen(4000, function(){
	console.log('server is running on port 4000');
	servicemanager.start();
});
