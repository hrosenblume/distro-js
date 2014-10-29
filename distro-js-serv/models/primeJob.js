/**
 * Created by AltonjiC on 10/28/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrimeJobSchema = new Schema({
    results : Array,
    time : Number
});

module.exports = mongoose.model('primeJob', PrimeJobSchema);