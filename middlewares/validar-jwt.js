const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        });
    }

    try {
       const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
       const usuario = await Usuario.findById(uid);
       if(!usuario){
        return res.status(401).json({
            msg: 'Token no valido, usuario con estado false'
        });
       }
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}