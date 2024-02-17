const {Schema, model} = require('mongoose');

const ProfesorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El  nombre es requerido']
    },
    curso:{
        type: String,
        required:[true,'el Curso es obligatorio'],
        unique: true
    },
    correo:{
        type: String,
        required: [true,'El Correo es requerido'],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    role:{
        type: String,
        required: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
});

ProfesorSchema.methods.toJSON = function(){
    const{__v, password, _id, ...profesor}= this.toObject();
    profesor.uid = _id;
    return profesor;
};

module.exports = model('Profesor', ProfesorSchema);