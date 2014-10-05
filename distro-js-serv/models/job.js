var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	name: String,
	dss: {type: mongoose.Schema.Types.ObjectId, ref: "DSS"},
	state: {type: String, enum: ["running", "pending", "failed", "success"], default: "pending"},
	func: String,
	params: [{type: String}],
	client: {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
	added: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Job', JobSchema);
