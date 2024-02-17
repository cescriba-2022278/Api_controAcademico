const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esTeacherRole, tieneRolAutorizado } = require('../middlewares/validar-roles');

const { 
    obtenerCursos,
    obtenerCursoPorId,
    crearCurso,
    actualizarCurso,
    eliminarCurso } = require('../controllers/curso.controller');

const { roleValido } = require('../helpers/db-validators');

const router = Router();

router.get("/", obtenerCursos);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        validarCampos
    ], obtenerCursoPorId);

router.post(
    "/",
    [
        esTeacherRole,
        check("nombre", "El nombre del curso es obligatorio").not().isEmpty(),
        check("profesor", "El nombre del instructor es obligatorio").not().isEmpty(),
        check("role").custom(roleValido),
        check("descripcion", "La descripción del curso es obligatoria").not().isEmpty(),
        validarCampos,
    ], crearCurso);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        validarCampos
    ], actualizarCurso);

router.delete(
    "/:id",
    [   
        validarJWT,
        esTeacherRole,
        tieneRolAutorizado('TEACHER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        validarCampos
    ], eliminarCurso);

module.exports = router;
