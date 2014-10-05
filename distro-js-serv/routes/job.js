var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Job = mongoose.model('Job');

router.get('/:id/script.js', function(req, res) {
	console.log("Requesting job script: ", req.params.id);
	Job.findOne({_id: req.params["id"]}, function(err, job) {
		if (err) {
			console.log(err);
		} else {
			res.write(job.func);
			res.end();
		}
	});
});

module.exports = router;
