const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');
const { response } = require('express');

const profesoresGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, profesores] = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        profesores
    });
}

const getProfesorById = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findById(id);
    if (!profesor) {
        return res.status(404).json({ 
            msg: 'Profesor no encontrado' 
        });
    }

    res.status(200).json({
        profesor
    });
}

const putProfesor = async (req, res = response) => {
    const { id } = req.params;
    const { password, ...resto } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const profesor = await Profesor.findByIdAndUpdate(id, resto);

    if (!profesor) {
        return res.status(404).json({ 
            msg: 'Profesor no encontrado' 
        });
    }

    res.status(200).json({
        msg: 'Profesor actualizado exitosamente',
        profesor
    });
}

const profesoresDelete = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findByIdAndUpdate(id, { estado: false });
    if (!profesor) {
        return res.status(404).json({ 
            msg: 'Profesor no encontrado' 
        });
    }

    res.status(200).json({
        msg: 'Profesor eliminado exitosamente',
        profesor
    });
}

const profesoresPost = async (req, res) => {
    const { nombre, curso, correo, password, role } = req.body;
    const profesor = new Profesor({ nombre, curso, correo, password, role });

    const salt = bcryptjs.genSaltSync();
    profesor.password = bcryptjs.hashSync(password, salt);

    await profesor.save();

    res.status(201).json({ 
        profesor 
    });
}

module.exports = {
    profesoresPost,
    profesoresGet,
    getProfesorById,
    putProfesor,
    profesoresDelete
};