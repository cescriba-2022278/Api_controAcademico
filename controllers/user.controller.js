const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
const { response } = require('express');

const registrar = async (req, res = response) => {
    try {
        const { nombre, password, role} = req.body;
        const existeUsuario = await Usuario.findOne({nombre});
        if(existeUsuario){
            return res.status(400).json({message: 'El usuario ya existe'});
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            password: hashedPassword,
            role
        });

        await nuevoUsuario.save();

        res.status(201).json({message: 'Usuario registrado exitosamente'});
    } catch (e) {
        console.error('Error al registrar usuario:', e);
        res.status(500).json({message: 'Error interno del servidor'});
    };
};

const login = async (req, res) => {
    try {
        const { nombre, password } = req.body
        const usuario = await Usuario.findOne({nombre});
        if(!usuario){
            return res.status(401).json({message: 'Credenciales invalidas'});
        };

        const verificarPassword = await bcrypt.compare(password, usuario.password);
        if(!verificarPassword){
            return res.status(401).json({message: 'Credenciales invalidas'});
        };

        const autenticarToken = jwt.sign({usuarioId: usuario._id, role: usuario.role}, 'secreto', {expiresIn: '1h'});
        res.status(200).json({ token });
    } catch (e) {
        console.error('Error al iniciar sesion', e);
        res.status(500).json({message: 'Error interno del servidor'});
    };
};

const editPerfil = async (req, res = response) => {
    try {
        const usuarioId = req.usuarioId;
        const { newPassword } = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await Usuario.findByIdAndUpdate(usuarioId, { password: hashedPassword });
        res.status(200).json({message: 'Perfil actualizado correctamente'});
    } catch (e) {
        console.error('Error al editar perfil', e);
        res.status(500).json({message: 'Error interno del servidor'});
    };
};

const perfilDelete = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        await Usuario.findByIdAndDelete(usuarioId);
        res.status(200).json({ message: "Perfil eliminado correctamente"});
    } catch (e) {
        console.error('Error al eliminar perfil:', e);
        res.status(500).json({ message: 'Algo salio mal...'});
    };
};

module.exports = {
    registrar,
    login,
    editPerfil,
    perfilDelete
}; 

