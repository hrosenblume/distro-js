// config/passport.js

// load all the things we need
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

var mongoose = require('mongoose');
// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({

    // clientID        : configAuth.googleAuth.clientID,
    // clientSecret    : configAuth.googleAuth.clientSecret,
    // callbackURL     : configAuth.googleAuth.callbackURL,
    returnURL: 'http://localhost:3000/auth/google/callback'
},
function(identifier, profile, done) {
	User.findOrCreate({
		openId: identifier,
		googleId: profile.id,
		email: profile.emails[0].value,
		name: profile.displayname
	}, function(err, user) {
		console.log(user);
		done(err, user);
	})
//  	process.nextTick(function() {
// 	User.findOne({ 'googleId' : profile.id }, function(err, user) {
//         if (err) 
//             return done(err);
//         if (user) {
//             // if a user is found, log them in
//             return done(null, user);
//         } else {
//             // if the user isnt in our database, create a new user
//             var newUser = {};
//             // // set all of the relevant information
//             newUser.googleId 	 = profile.id;
//             // newUser.googleToken  = token;
//             newUser.name  = profile.displayName;
//             newUser.email = profile.emails[0].value; // pull the first email

//             User.insert(newUser, function(error, user) {
//             	if (error) {
//             		console.log(error);
//             	} else {
//             		console.log(user);
//             	}
//             });
//         }
//     });
// });
	// make the code asynchronous
	// User.findOne won't fire until we have all our data back from Google
	
}));
