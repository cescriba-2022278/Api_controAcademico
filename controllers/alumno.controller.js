const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const { response } = require('express');

const alumnosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, alumnos] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumnos
    });
}

const getAlumnoById = async (req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findById(id);
    if (!alumno) {
        return res.status(404).json({ 
            msg: 'Alumno no encontrado' 
        });
    }

    res.status(200).json({
        alumno
    });
}

const putAlumno = async (req, res = response) => {
    const { id } = req.params;
    const { password, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const alumno = await Alumno.findByIdAndUpdate(id, resto);

    if (!alumno) {
        return res.status(404).json({ 
            msg: 'Alumno no encontrado' 
        });
    }

    res.status(200).json({
        msg: 'Alumno actualizado exitosamente',
        alumno
    });

}

const alumnosDelete = async (req, res) => {
    const { id } = req.params;

    const alumno = await Alumno.findByIdAndUpdate(id, { estado: false });

    if (!alumno) {
        return res.status(404).json({ 
            msg: 'Alumno no encontrado' 
        });
    }

    res.status(200).json({
        msg: 'Alumno eliminado exitosamente',
        alumno
    });
}

const alumnosPost = async (req, res) => {
    const { nombre, curso, correo, password, carne, role } = req.body;
    const alumno = new Alumno({ nombre, curso, correo, password, carne, role });

    const cantidadCursos = await Alumno.countDocuments({ curso: alumno.curso });
    if (cantidadCursos >= 3) {
        return res.status(400).json({ 
            msg: 'El alumno ya está asociado al máximo de cursos permitidos' 
        });
    }

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();

    res.status(201).json({ 
        alumno 
    });
}

module.exports = {
    alumnosPost,
    alumnosGet,
    getAlumnoById,
    putAlumno,
    alumnosDelete
};
