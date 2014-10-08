/**
 * Created by AltonjiC on 10/7/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new Schema({
    address : String
});

module.exports = mongoose.model('Email', EmailSchema);