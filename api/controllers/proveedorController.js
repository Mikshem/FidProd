'use strict'
var path = require('path');
var fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');

const Proveedor = require('../models/proveedor');
const ProPago = require('../models/ProPago');

function getProveedor(req, res)
{
    var proveedorId = req.params.id;
    Proveedor.findById(proveedorId, (err, proveedor) => {
        if (err) {
           res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!proveedor) {
                res.status(404).send({ message: 'No se encuentra el  proveedor' });
            } else {
               res.status(200).send({proveedor}) 
           }
       }
    });
}

function getProveedores(req, res)
{
    if (req.params.page){
        var page = req.params.page;
    } else {
        var page = 1;
    }
    
    var itemPorPage = 3;

    Proveedor.find().sort('name').paginate(page, itemPorPage, (err, proveedores, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!proveedores) {
                res.status(404).send({ message: 'No hay artistas' });
           }else{
                res.status(200).send({
                    Total_Proveedores: total,
                    Proveedores: proveedores
                });  
            }
       }
    });
}

function saveProveedor(req, res)
{
    let proveedor = new Proveedor();

    var params = req.body;
    proveedor.name = params.name;
    proveedor.codigo = params.codigo;
    proveedor.image = 'null';

    proveedor.save((err, proveedorStored) => {
        if (err) {
            res.status(500).send({ message: ' error al guardar el proveedor' });
        } else {
            if (!proveedorStored) {
                res.status(404).send({ message: 'el articulo no ha sido guardado' });
            } else {
                res.status(200).send({ proveedor: proveedorStored });
            }
        }
    });
}

function updateProveedor(req, res)
{
    let proveedorId = req.params.id;
    let update = req.body;

    Proveedor.findByIdAndUpdate(proveedorId, update, (err, proveedorUpdated) => {
        if (err) {
           res.status(500).send({ message: ' errOr al guardar el proveedor' });
        } else {
            if (!proveedorUpdated) {
               res.status(404).send({ message: 'el Proveedor no ha sido actualizado ' });
            } else {
                res.status(200).send({ proveedor: proveedorUpdated });
           }
       }
    });
}

function deleteProveedor(req, res) {
    let proveedorId = req.params.id;

    Proveedor.findByIdAndRemove(proveedorId, (err, proveedorRemoved) => { 
        if (err) {
           res.status(500).send({ message: ' error al eliminar el proveedor' });
        } else {
            if (!proveedorRemoved) {
               res.status(404).send({ message: 'el Proveedor no ha sido Eliminado ' });
            } else {
                
                
                ProPago.find({ proveedor: proveedorRemoved._id }).remove((err, propagoRemoved) => {
                    if (err) {
                        res.status(500).send({ message: ' error al eliminar la Programacion de Pagos' });
                    } else {
                        if (!propagoRemoved) {
                            res.status(404).send({ message: 'el Proveedor no ha sido Eliminado ' });
                        } else {
                            res.status(200).send({ Proveedor: proveedorRemoved });
                        }
                    }    
                });
           }
       }
    });
}

function uploadImage(req, res)
{
    var proveedorId = req.params.id;
    var file_name = 'Suba su imagen...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Proveedor.findByIdAndUpdate(proveedorId, { image: file_name }, (err, proveedorUpdated)=>{
                if (!proveedorUpdated) {
                    res.status(404).send({ message: 'El usuario no ha podido actualizar' });
                } else {
                    res.status(200).send({ user: proveedorUpdated });
                }

            });
        } else {
            res.status(200).send({ message: 'Extension del archivo no valido' });
        }
    } else {
        res.status(200).send({ message: 'No has subido ninguna imagen'});
    }
}

function getImageFile(req, res) 
{
    var imageFile = req.params.imageFile;
    var path_file = './uploads/proveedores/'+imageFile;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({message:'No existe la imagen...'})
        }
    })
}


module.exports = {
    getProveedor,
    saveProveedor,
    getProveedores,
    updateProveedor,
    deleteProveedor,
    uploadImage,
    getImageFile
}; 