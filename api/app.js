'use strict'

const express= require('express');
const bodyParser = require('body-parser');

var app = express();

//Cargar Rutas
var user_routes = require('./routes/user');
var proveedor_routes = require('./routes/r_proveedor');
var progra_routes = require('./routes/r_progra');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar Cabeceras HTTP
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested, Content-Type, Accept, Access-Control-Allow-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//RUTAS BASE
app.use('/api', user_routes);
app.use('/api', proveedor_routes);
app.use('/api', progra_routes);

module.exports = app;