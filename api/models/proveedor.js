'use strict'

let mongoose = require('mogoose');
let Schema = mongoose.Schema;

var ProveedorSchema = Schema({
    name: String,
    codigo: String,
    image: String
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);