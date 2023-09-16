/**
 * @module UsuarioRoutes
 * @description Define las rutas relacionadas con el modelo de usuario.
 * @param {Object} express - Instancia de Express utilizada para definir las rutas.
 * @param {Object} router - Objeto de enrutamiento de Express que se utiliza para configurar las rutas.
 * @param {Object} usuarioController - Controlador que maneja las operaciones relacionadas con los usuarios.
 * @param {Object} authMiddleware - Middleware de autenticación para proteger las rutas.
 */

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/auth');
const {
    validarInicioSesion,
    validarRegistroUsuario
} = require('../middlewares/validarUsuario');

/**
 * @route POST /usuario/registro
 * @description Ruta para registrar un nuevo usuario.
 * @param {Function} usuarioController.registrarUsuario - Controlador para registrar un nuevo usuario.
 */
router.post('/registro', usuarioController.registrarUsuario);

/**
 * @route POST /usuario/login
 * @description Ruta para iniciar sesión de un usuario.
 * @param {Function} usuarioController.iniciarSesion - Controlador para iniciar sesión de un usuario.
 */
router.post('/login', usuarioController.iniciarSesion);

/**
 * @route GET /usuario/
 * @description Ruta protegida para obtener la lista de usuarios.
 * @param {Function} authMiddleware - Middleware de autenticación para proteger la ruta.
 * @param {Function} usuarioController.obtenerUsuarios - Controlador para obtener la lista de usuarios.
 */
router.get('/', authMiddleware, usuarioController.obtenerUsuarios);

/**
 * @route GET /usuario/:id
 * @description Ruta protegida para obtener un usuario por su ID.
 * @param {Function} authMiddleware - Middleware de autenticación para proteger la ruta.
 * @param {Function} usuarioController.obtenerUsuario - Controlador para obtener un usuario por su ID.
 */
router.get('/:id', authMiddleware, usuarioController.obtenerUsuario);

/**
 * @route PUT /usuario/:id
 * @description Ruta protegida para actualizar un usuario por su ID.
 * @param {Function} authMiddleware - Middleware de autenticación para proteger la ruta.
 * @param {Function} usuarioController.actualizarUsuario - Controlador para actualizar un usuario por su ID.
 */
router.put('/:id', authMiddleware, usuarioController.actualizarUsuario);

/**
 * @route DELETE /usuario/:id
 * @description Ruta protegida para borrar un usuario por su ID.
 * @param {Function} authMiddleware - Middleware de autenticación para proteger la ruta.
 * @param {Function} usuarioController.borrarUsuario - Controlador para borrar un usuario por su ID.
 */
router.delete('/:id', authMiddleware, usuarioController.borrarUsuario);

module.exports = router;
