'use strict'

var mongoose = require('mongoose');
const app = require('./app.js');

//SERVIDOR
const port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/fp_db', (err, res)=>{
    if(err){
        throw err;
    }else{
        console.log('Coneccion exitosa a la base de datos');

        app.listen(port, function(){
        console.log(`Servidor corriendo en el puerto: http://localhost:` +port);
        })
    }
})