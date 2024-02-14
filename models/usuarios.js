const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    password:{
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    role:{
        type: String,
        require: true,
        enum: ["TEACHER_ROLE", " STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Usuario', UsuarioSchema);