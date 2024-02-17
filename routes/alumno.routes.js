const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esTeacherRole, tieneRolAutorizado } = require('../middlewares/validar-roles');

const { 
    alumnosPost,
    alumnosGet, 
    getAlumnoById,
    putAlumno,
    alumnosDelete
} = require('../controllers/alumno.controller');

const { roleValido, alumnoExisteById, emailExistente, } = require('../helpers/db-validators');

const router = Router();

router.get("/", alumnosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(alumnoExisteById),
        validarCampos
    ], getAlumnoById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(alumnoExisteById),
        validarCampos
    ], putAlumno);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("curso", "El curso es obligatorio").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(emailExistente),
        check("role").custom(roleValido),
        validarCampos,
    ], alumnosPost);

router.delete(
    "/:id",
    [   
        validarJWT,
        tieneRolAutorizado('STUDENT_ROLE', "TEACHER_ROLE"),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(alumnoExisteById),
        validarCampos
    ], alumnosDelete);

module.exports = router;