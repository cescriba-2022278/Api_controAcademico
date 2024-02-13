const Role = require('../models/role');
const Usuario = require('../models/usuarios');
const Curso = require('../models/cursos')

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

const cursoExistente = async (curso = '') => {
    const existeCurso = await Curso.findById({curso});
    if (!existeCurso) {
        throw new Error(`El ${ curso } no existe`);
    }
}

const esProfesor = async (id = '') => {
    const existeProfesor = await Usuario.esProfesor({id});
    if(!existeProfesor){
        throw new Error(`${ id } no eres un profesor`);
    }
}

const esAlumno = async (id = '') => {
    const existeAlumno = await Usuario.esProfesor({id});
    if(!existeAlumno){
        throw new Error(`${ id } no eres un profesor`);
    }
}

module.exports = {
    roleValido,
    usuarioExisteById,
    cursoExistente,
    esProfesor,
    esAlumno
}


