const mongoose = require('mongoose');

const cursoSchema = new Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    Profesor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario',
        require: [true, 'Campo obligatorio']
    },
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'Campo obligatorio']
    }
});

module.exports = mongoose.model('Curso', cursoSchema);