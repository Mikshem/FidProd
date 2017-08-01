'use strict'
//Libreria para mostrar files
const fs = require('fs');
const path = require('path');

//Libreri para encriptacion
let bcrypt = require('bcrypt-nodejs');

let User = require('../models/user.js');
const jwt = require('../services/jwt.js');

function pruebas(req, res)
{
    res.status(200).send({
        message: ' Accion del controlador Usuarios'
    });
}

function saveUser(req, res)
{
    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.username = params.username;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if (params.password) {
        //Encriptar contraseña
        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;

            if (user.name != null && user.name != null && user.email != null) {
                //GUARDAR USUARIO
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: ' Error al guardar el usuario' });
                    } else {
                        if (!userStored) {
                            res.status(400).send({ message: 'No se ha registrado el usuario' });
                        } else {
                            res.status(200).send({ user: userStored });
                        }
                    }
                });
            } else {
                res.status(200).send({message: 'Introduce todos los campos'});
            }
        })
    } else {
        res.status(200).send({message: 'Introduce la contraseña'});
    }
}

function loginUser(req, res)
{
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
           res.status(500).send({message: ' Error en la peticion'})
        } else {
            if (!user) {
               res.status(404).send({message: 'El usuario no Existe'})
            } else {
                //Comparar contraseña.
                bcrypt.compare(password, user.password, (err, check)=>{
                    if (check) {
                        //Devueve datos de usuario logueado
                        if (params.gethash) {
                            //Devuelve un token de JWT
                            res.status(200).send({
                                token: jwt.createToken(user)
                             });

                        } else {
                            res.status(200).send({ user });
                        }
                        
                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido logearse' });
                    }
                });
            }
       } 
    });

}

function updateUser(req, res)
{
    var useId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(useId, update, (err, userUpdate) => {
        if (err) {
        res.status(500).send({ message: ' Error al actualizar el usuario' });            
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: ' El usuario no ha podido actualizar' });
            } else {
                res.status(200).send({ user: userUpdate });
            }    
        }
    })
}

function uploadImage(req, res)
{
    var userId = req.params.id;
    var file_name = 'Suba su imagen...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated)=>{
                if (!userUpdated) {
                    res.status(404).send({ message: ' El usuario no ha podido actualizar' });
                } else {
                    res.status(200).send({image: file_name, user: userUpdated });  
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
    var path_file = './uploads/users/'+imageFile;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({message:'No existe la imagen...'})
        }
    })
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};