'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var ProPagoSchema = Schema({
    fecha: Date,
    ctasCts: Number,
    nroRcp: Number,
    nroFac: Number,
    monto: Number,
    observacion: String,
    proveedor: { type: Schema.ObjectId, ref:'Proveedor'}
});

module.exports = mongoose.model('ProPago', ProPagoSchema);