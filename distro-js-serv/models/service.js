var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
	name: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
	status: {type: String, enum: ["run", "stop"]}
})