const mongoose = require('mongoose');

const cursoSchema = new Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    maestro: {
        type: String, 
        ref: 'Usuario',
        require: [true, 'Campo obligatorio']
    },
    alumno: {
        type: String,
        ref: 'Usuario',
        require: [true, 'Campo obligatorio']
    }
});

module.exports = mongoose.model('Curso', cursoSchema);