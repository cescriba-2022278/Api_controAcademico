const { response } = require("express");

const esAlumnoRole = (req, res, next) => {
    if (!req.alumno) {
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar token primero"
        });
    }

    const { role, nombre } = req.alumno;

    if (role !== "STUDENT_ROLE") {
        return res.status(401).json({
            msg: `${nombre} no es un alumno, no puede usar este endpoint`
        });
    };
    next();
};

const esTeacherRole = (req, res, next) => {
    if (!req.profesor) {
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar token primero"
        });
    }

    const { role, nombre } = req.profesor;

    if (role !== "TEACHER_ROLE") {
        return res.status(401).json({
            msg: `${nombre} no es un profesor, no puede usar este endpoint`
        });
    };
    next();
};

const tieneRolAutorizado = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.alumno, !req.profesor) {
            return res.status(500).json({
                msg: "Se desea validar un usuario sin validar token primero"
            });
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles autorizados ${roles}`
            });
        }
        next();
    };
};

module.exports = {
    esTeacherRole,
    esAlumnoRole,
    tieneRolAutorizado
};
