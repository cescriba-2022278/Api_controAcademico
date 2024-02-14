const validarCampos  = require('../middlewares/validar-campos');
const validarJWT  = require('../middlewares/validar-jwt');
const  esTeacherRole  = require('../middlewares/validar-roles');
const  tieneRolAutorizado  = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esTeacherRole,
    ...tieneRolAutorizado
}