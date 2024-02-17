const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esTeacherRole, tieneRolAutorizado } = require('../middlewares/validar-roles');

const { 
    profesoresPost,
    profesoresGet, 
    getProfesorById,
    putProfesor,
    profesoresDelete} = require('../controllers/profesor.controller');

const { roleValido, profesorExisteById, emailExistente, } = require('../helpers/db-validators');

const router = Router();

router.get("/", profesoresGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(profesorExisteById),
        validarCampos
    ], getProfesorById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(profesorExisteById),
        validarCampos
    ], putProfesor);

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
    ], profesoresPost);

router.delete(
    "/:id",
    [   
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(profesorExisteById),
        validarCampos
    ], profesoresDelete);

module.exports = router;