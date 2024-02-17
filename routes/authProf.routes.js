const { Router } = require('express');
const { check } =  require('express-validator');

const { loginP } = require('../controllers/authProf.controller');
const { validarCampos } =  require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/loginP',
    [
        check('correo', "Este no es un correo válido").isEmail(),
        check('password'," el password es obligatorio").not().isEmpty(),
        validarCampos
    ], loginP);

module.exports = router;