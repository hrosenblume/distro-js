var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: String,
	googleId: String,
	openId: String,
	clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Client'}],
	services: [{type: mongoose.Schema.Types.ObjectId, ref: 'DSS'}]
})

UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', UserSchema);