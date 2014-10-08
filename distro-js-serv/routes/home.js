var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Email = mongoose.model('Email');

router.post('/', function(req, res) {

    var email = new Email(); 	   	// create a new instance of the Email model
    email.address = req.body.address;  // set the address
    // save the email and check for errors
    email.save(function(err) {
        if (err)
            console.log("error in adding to database:\n" , err);

        console.log("email: " + email.address + " added to list.");
    });

    res.render('index', {title: "Oahu: Distribute and Compute", fromEmail: true});
})

router.get('/', function(req, res) {
	res.render('index', {title: "Oahu: Distribute and Compute"});
});

router.get('/login', function(req, res) {
	res.render('login', {title: "Oahu Login"});
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;