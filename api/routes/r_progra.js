'use strict'

const express = require('express');
const prograController = require('../controllers/prograController');

const api = express.Router();


//Middlewares
var md_auth = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/proveedores' });

api.get('/programacion/:id', md_auth.ensureAuth, prograController.getProgra);
api.post('/programacion', md_auth.ensureAuth, prograController.saveProgra);
api.get('/programaciones/:proveedor?', md_auth.ensureAuth, prograController.getProgramaciones);
api.put('/programacion/:id', md_auth.ensureAuth, prograController.updateProgra);
api.delete('/programacion/:id', md_auth.ensureAuth, prograController.deleteProgra);

module.exports = api;