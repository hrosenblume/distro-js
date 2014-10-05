var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: String,
	googleId: String,
	clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Client'}],
	services: [{type: mongoose.Schema.Types.ObjectId, ref: 'DSS'}]
})

module.exports = mongoose.model('User', UserSchema);