const Role = require('../models/role');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');

const roleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const alumnoExisteById = async (id = '') => {
    const existeId = await Alumno.findOne({id});
    if(existeId){
        throw new Error(`El alumno con el ${ id } no existe`);
    }
}

const profesorExisteById = async (id = '') => {
    const existeId = await Profesor.findOne({id});
    if(existeId){
        throw new Error(`El profesor con el ${ id } no existe`);
    }
}


const emailExistente = async (correo = '') => {
    const existeCorreo = await Alumno.findById({correo});
    if (existeCorreo) {
        throw new Error(`El ${ correo } no existe`);
    }
}

const profesorEmailExistente = async (correo = '') => {
    const existeCorreo = await Profesor.findById({correo});
    if (existeCorreo) {
        throw new Error(`El ${ correo } no existe`);
    }
}


module.exports = {
    roleValido,
    alumnoExisteById,
    profesorExisteById,
    emailExistente,
    profesorEmailExistente
}


