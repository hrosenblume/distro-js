var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
	name: String,
	browserId: String,
	socketId: String,
	job: {type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	status: {type: String, enum: ["unavailable", "ready", "running"], default: "unavailable"},
	lastJob: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Client', ClientSchema);

