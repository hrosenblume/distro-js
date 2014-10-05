var express = require('express');
var router = express.Router();


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