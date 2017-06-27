'use strict'

const express= require('express');
const bodyParser = require('body-parser');

var app = express();

//Cargar Rutas
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar Cabeceras HTTP


//RUTAS BASE
app.get('/prueba',(req, res)=>{
     res.status(200).send({message: 'Bienvenidos'});
})

module.exports = app;