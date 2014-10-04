var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
	name: String,
	deviceID: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	status: {type: String, enum: ["run", "offline", "stop"]},
	lastConnect: Date,
	jobSent: Date
})