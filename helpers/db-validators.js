const Role = require('../models/role');
const Usuario = require('../models/usuarios');

const roleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const usuarioExisteById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const emailExistente = async (correo = '') => {
    const existeCorreo = await Curso.findById({correo});
    if (existeCorreo) {
        throw new Error(`El ${ correo } no existe`);
    }
}


module.exports = {
    roleValido,
    usuarioExisteById,
    emailExistente
}


