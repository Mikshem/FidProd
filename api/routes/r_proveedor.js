'use strict'

const express = require('express');
const ProveedorController = require('../controllers/proveedorController');

const api = express.Router();

var md_auth = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/proveedores' });

api.get('/proveedor/:id', md_auth.ensureAuth, ProveedorController.getProveedor)
api.post('/proveedor', md_auth.ensureAuth, ProveedorController.saveProveedor)
api.get('/proveedores/:page?', md_auth.ensureAuth, ProveedorController.getProveedores)
api.put('/proveedor/:id', md_auth.ensureAuth, ProveedorController.updateProveedor)
api.delete('/proveedor/:id', md_auth.ensureAuth, ProveedorController.deleteProveedor)
api.post('/upload-image-proveedor/:id', [md_auth.ensureAuth, md_upload], ProveedorController.uploadImage);
api.get('/get-image-proveedor/:imageFile', ProveedorController.getImageFile);


module.exports = api;