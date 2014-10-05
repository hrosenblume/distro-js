var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeveloperSpawnedServiceSchema = new Schema({
	name: String,
	filename: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
	status: {type: String, enum: ["run", "stop"]}
})

module.exports = mongoose.model('DSS', DeveloperSpawnedServiceSchema);