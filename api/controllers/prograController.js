'use strict'
var path = require('path');
var fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');

const Proveedor = require('../models/proveedor');
const ProPago = require('../models/ProPago');

function getProgra(req, res)
{
    let prograId = req.params.id;

    ProPago.findById(prograId).populate({ path: 'proveedor' }).exec((err, progra) => {
        if (err){
            res.status(500).send({ message: 'Erro en la peticion' });
        } else {
            if(!progra){
                res.status(404).send({message:'No se encuentra la programacion'})
            }else{
                res.status(200).send({ progra });
            }
       }
    });
}

function getProgramaciones(req, res)
{
    let proveedorId = req.proveedor;

    if (!proveedorId) {
        //Sacar todos las programaciones de la DDBB
        var find = ProPago.find({}).sort('fecha');
    } else {
        var find = ProPago.find({ proveedor: proveedorId }).sort('fecha');
    }

    find.populate({ path: 'proveedor' }).exec((err, progras) => {
        if (err){
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if(!progras){
                res.status(404).send({message:'No hay Programaciones'})
            }else{
                res.status(200).send({ progras });
            }
       }
    });
}

function saveProgra(req, res)
{
    let progra = new ProPago();
    var params = req.body;

    progra.fecha = params.fecha;
    progra.ctasCts = params.ctasCts;
    progra.nroRcp = params.nroRcp;
    progra.nroFac = params.nroFac;
    progra.monto = params.monto;
    progra.observacion = params.observacion;
    progra.proveedor = params.proveedor;

    progra.save((err, prograStored) => {
        if (err) {
            res.status(500).send({ message: 'Erros al guardar la programacion' });
        } else {
            if (!prograStored) {
                res.status(404).send({ message: 'No se guardo la programacion' });
            } else {
                res.status(200).send({ programacion: prograStored });
            }
        }
    });
}

function updateProgra(req, res)
{
    let prograId = req.params.id;
    var update = req.body;

    ProPago.findByIdAndUpdate(prograId, update, (err, prograUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servido' });
        } else {
            if (!prograUpdated) {
                res.status(404).send({ message: 'No se ha actualizado la Programacion' });
            } else {
                res.status(200).send({ Programacion: prograUpdated }); 
           }
       }
    });
}

function deleteProgra(req, res)
{
    let prograId = req.params.id;

    ProPago.findByIdAndRemove(prograId, (err, prograRemoved) => { 
        if (err) {
           res.status(500).send({ message: ' error al eliminar la Programacion' });
        } else {
            if (!prograRemoved) {
               res.status(404).send({ message: 'La Programacion no ha sido Eliminada ' });
            } else {  
                res.status(200).send({ ProgramacionDelete: prograRemoved });
            }
        }    
    });
}
module.exports = {
    getProgra,
    saveProgra,
    getProgramaciones,
    updateProgra,
    deleteProgra
}