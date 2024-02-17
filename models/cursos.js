const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del curso es obligatorio']
    },
    profesor:{
        type: String,
        required: [true, 'El nombre del instructor es obligatorio']
    },
    role:{
        type: String,
        require: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    descripcion:{
        type: String,
        required: [true, 'La descripción del curso es obligatoria']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

CursoSchema.methods.toJSON = function() {
    const { __v, profesor, _id, ...curso } = this.toObject();
    curso.uid = _id;
    return curso;
};

module.exports = model('Curso', CursoSchema);