'use strict'

let mongoose = require('mogoose');
let Schema = mongoose.Schema;

var ProPagoSchema = Schema({
    fecha: new Date(),
    ctasCts: Number,
    nroRcp: Number,
    nroFac: Number,
    monto: Number,
    Observacion: String,
    proveedor: { type: Schema.ObjectId, ref:'Proveedor'}
});

module.exports = mongoose.model('ProPago', ProPagoSchema);