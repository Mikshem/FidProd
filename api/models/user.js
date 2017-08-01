'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    role: String,
    image: String
});

module.exports = mongoose.model('User', UserSchema);