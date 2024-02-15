const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esTeacherRole, tieneRolAutorizado } = require('../middlewares/validar-roles');

const { 
    registrar,
    editPerfil,
    perfilDelete,
    registroGet,
    getRegistroById} = require('../controllers/user.controller');

const { emailExistente, roleValido, usuarioExisteById } = require('../helpers/db-validators');

const router = Router();

router.get("/", registroGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(usuarioExisteById),
        validarCampos
    ], getRegistroById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(usuarioExisteById),
        check("role").custom(roleValido),
        validarCampos
    ], editPerfil);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(emailExistente),
        check("role").custom(roleValido),
        validarCampos,
    ], registrar);

router.delete(
    "/:id",
    [   
        validarJWT,
        esTeacherRole,
        tieneRolAutorizado('TEACHER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(usuarioExisteById),
        validarCampos
    ], perfilDelete);

module.exports = router;

