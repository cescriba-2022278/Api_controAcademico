const jwt = require('jsonwebtoken');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const { request, response } = require('express');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try {
        const { uid, rol } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        let usuarioModel;
        if (rol === 'alumno') {
            usuarioModel = Alumno;
        } else if (rol === 'profesor') {
            usuarioModel = Profesor;
        } else {
            return res.status(401).json({
                msg: "Rol no válido en el token"
            });
        }

        const usuario = await usuarioModel.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "Usuario no existe en la base de datos"
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Token no válido, usuario con estado false"
            });
        }

        req.usuario = usuario;
        next();

    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};

module.exports = {
    validarJWT
};
