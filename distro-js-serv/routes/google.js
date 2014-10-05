var express = require('express');
var router = express.Router();
var passport = require('passport')


// facebook routes
// twitter routes

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/', passport.authenticate('google'));

// the callback after google has authenticated the user
router.get('/callback',
        passport.authenticate('google', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
        })
);

// route middleware to make sure a user is logged i

module.exports = router;