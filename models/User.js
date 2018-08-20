/**
 * User model.
 * **/
var mongoose = require('mongoose');
var Schecma = mongoose.Schema;

var userSchema = new Schema({
    emailid: { type: String , required: true},
    phone: { type: String , required: true},
    username: { type: String , required: true}
});

exports.userModel = mongoose.model('User', userSchema);
