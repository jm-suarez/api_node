const { param, body, validationResult } = require('express-validator');

// Middleware de validación para el registro de usuario
const validarRegistroUsuario = [
    body('nombre').notEmpty().withMessage('El campo nombre es requerido'),
    body('correo').isEmail().withMessage('El campo correo debe ser una dirección de correo válida'),
    body('contrasena').isLength({ min: 6 }).withMessage('El campo contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        next();
    }
];

// Middleware de validación para iniciar sesión
const validarInicioSesion = [
    body('correo').isEmail().withMessage('El campo correo debe ser una dirección de correo válida'),
    body('contrasena').notEmpty().withMessage('El campo contraseña es requerido'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        next();
    }
];


module.exports = {
    validarInicioSesion,
    validarRegistroUsuario
};
