var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	name: String,
	dss: {type: mongoose.Schema.Types.ObjectId, ref: "DSS"},
	state: {type: String, enum: ["Running", "Failed", "Success"]},
	func: String,
	params: [{type: String}],
	client: {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
	added: Date
})

module.exports = mongoose.model('Job', JobSchema);
