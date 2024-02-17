const {Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es requerido']
    },
    curso:{
        type: String,
        required:[true,'el Curso es obligatorio'],
        unique: true
    },
    correo:{
        type: String,
        required: [true,'El correo es requerido'],
        uniqued: true
    },
    password:{
        type: String,
        required: [true, 'La contrase;a es obligatoria']
    },
    carne:{
        type: String,
        required: [true, 'El carne es requerido'],
        uniqued: true
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
});

AlumnoSchema.pre('save', async function(next) {
    try {
        const alumno = this;
        const cantidadCursos = await this.constructor.countDocuments({ curso: alumno.curso });

        if (cantidadCursos >= 3) {
            throw new Error('El alumno ya está asociado al máximo de cursos permitidos');
        }

        next();
    } catch (e) {
        next(e);
    }
});

AlumnoSchema.methods.toJSON = function(){
    const{__v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
};

module.exports = model('Alumno', AlumnoSchema);