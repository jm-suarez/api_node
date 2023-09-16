/**
 * @module AuthMiddleware
 * @description Middleware de autenticación para verificar y decodificar el token JWT proporcionado en la solicitud.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {function} next - Función de middleware para pasar la solicitud al siguiente middleware.
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

/**
 * @function authMiddleware
 * @description Middleware de autenticación que verifica y decodifica el token JWT proporcionado en la cabecera 'x-auth-token' de la solicitud.
 * Si el token es válido, agrega el id del usuario decodificado a la solicitud y pasa al siguiente middleware.
 * Si no se proporciona un token o el token no es válido, se devuelve una respuesta de error 401 (No autorizado).
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {function} next - Función de middleware para pasar la solicitud al siguiente middleware.
 */
module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.id = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token no válido.' });
    }
};
