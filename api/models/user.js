'use strict'

let mongoose = require('mogoose');
let Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    username: String,
    email: String,
    role: String,
    image: String
});

module.exports = mongoose.model('User', UserSchema);