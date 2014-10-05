var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeveloperSpawnedServiceSchema = new Schema({
	name: String,
	filename: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	status: {type: String, enum: ["run", "stop"]}
}, {collection: "dss"});

module.exports = mongoose.model('DSS', DeveloperSpawnedServiceSchema);