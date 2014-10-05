// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var googleStategy = require('passport-google');
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Connect to DB
mongoose.connect('mongodb://localhost:27017/distro');

// Models
var Job = require('./models/job');
var Client = require('./models/client');
var Dss = require('./models/dss');
var User = require('./models/user');

// Passport config
require('./config/passport');

// Routes
var homeRouter = require('./routes/home');
var googleRouter = require('./routes/google');
var dashboardRouter = require('./routes/dashboard');
var dssRouter = require('./routes/dss');

// Initialize servicemanager
var servicemanager = require('./scripts/servicemanager')

// Passport

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 
// instruct express to server up static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({secret: 'wedemboyz'}))
app.use(passport.initialize());
app.use(passport.session());

// set routes
app.use('/', homeRouter);
app.use('/auth/google', googleRouter);
app.use('/dashboard', dashboardRouter);
app.use('/dss', dssRouter);

// Start service manager
servicemanager.start(io);

// Listen for client connections
io.on('connection', function(socket) {
	servicemanager.onConnect(socket);
});

// Set server port
http.listen(3000, function(){
	console.log('server is running on port 3000');
});
