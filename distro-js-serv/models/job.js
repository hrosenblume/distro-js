var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	name: String,
	dss: {type: mongoose.Schema.Types.ObjectId, ref: "DistributedSpawnedService"},
	state: {type: String, enum: ["Running", "Failed", "Success"]},
	func: [type: String],
	params: [type: String],
	client: {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
	added: Date
})