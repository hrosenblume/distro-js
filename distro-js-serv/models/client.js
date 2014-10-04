var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
	name: String,
	browserId: String,
	job: {type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	status: {type: String, enum: ["unavailable", "ready", "running"]},
	lastConnect: Date,
	jobSent: Date
})