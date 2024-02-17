const Curso = require('../models/cursos');
const { response } = require('express');

const obtenerCursos = async (req, res = response) => {
    try {
        const cursos = await Curso.find({ estado: true });
        res.status(200).json({ cursos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener los cursos' });
    }
};

const obtenerCursoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findById(id);
        if (!curso) {
            return res.status(404).json({ msg: 'Curso no encontrado' });
        }
        res.status(200).json({ curso });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener el curso' });
    }
};

const crearCurso = async (req, res) => {
    try {
        const { nombre, profesor, role, descripcion } = req.body;
        const curso = new Curso({ nombre, profesor, role, descripcion });
        await curso.save();
        res.status(201).json({ curso });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el curso' });
    }
};

const actualizarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const cursoActualizado = await Curso.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ curso: cursoActualizado });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el curso' });
    }
};

const eliminarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const cursoEliminado = await Curso.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.status(200).json({ curso: cursoEliminado });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el curso' });
    }
};

module.exports = {
    obtenerCursos,
    obtenerCursoPorId,
    crearCurso,
    actualizarCurso,
    eliminarCurso
};