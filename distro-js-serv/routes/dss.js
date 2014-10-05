var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

var Dss = mongoose.model('DSS');



router.get('/:dssID', isLoggedIn, function(req, res) {
	//specify the dssID when choosing one from dashboard
	var dssID = req.params.dssID;
	dss = Dss.findById(dssId);
	res.render('dssEditor', {
		user : req.user, // get the user out of session and pass to template
		name : dss.name,
		fileContents : dss.fileContents
	});
});

router.get('/:dssID', isLoggedIn, function(req, res) {
	//this is the most unfinished of the page
	//(if you edit while I sleep), this one is supposed to handle
	// a new DSS from newDss.jade, the one below is supposed to just be a redirect righ from here
	Dss.insert({name : req.name, }, function(err, inserted) {
		if (err) {console.log(err);}
		else {
			console.log("Added job: ", inserted);
		}
	});
	var dssID = req.name;
});

router.get('/new', isLoggedIn, function(req, res) {
	res.render('newDss', {
		user : req.user
	});
});


function isLoggedIn(req, res, next) {
	if (req.user) {
		return next();
	}
	res.redirect('/');
}

module.exports = router;