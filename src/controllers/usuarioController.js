const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 
const { Usuario } = require('../models');
const logger = require('../logger');

/**
 * @function registrarUsuario
 * @description Registra un nuevo usuario en la base de datos.
 * @async
 * @param {Object} req - Objeto de solicitud Express que debe contener los datos del nuevo usuario en el cuerpo de la solicitud (nombre, correo y contraseña).
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Response} - Devuelve una respuesta con un token JWT si el registro es exitoso o un código de estado correspondiente si ya existe un usuario con el mismo correo o si ocurre un error.
 * @throws {Error} - Si hay un error en el proceso de registro.
 */
exports.registrarUsuario = async (req, res) => {
    try {
        // Obtener los datos del nuevo usuario del cuerpo de la solicitud
        const { nombre, correo, contrasena } = req.body;

        // Verificar si el correo ya está registrado en la base de datos
        const usuarioExistente = await Usuario.findOne({ where: { correo } });

        // Si el correo ya está registrado, devolver un error de código de estado 400 (Solicitud incorrecta)
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña del nuevo usuario
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear un nuevo registro de usuario en la base de datos
        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            contrasena: hashedPassword, // Almacena la contraseña encriptada
            estado: true, // Establece el estado del usuario 
        });

        // Crear un token JWT para el nuevo usuario
        const token = jwt.sign({ id: nuevoUsuario.id }, JWT_SECRET);

        // Devolver una respuesta con código de estado 201 (Creado) y el token JWT
        return res.status(201).json({ token });
    } catch (error) {
        // En caso de error, registrar el error y devolver una respuesta de error 500 (Error interno del servidor)
        logger.error(`Error al registrar usuario: ${error}`);
        return res.status(500).json({ mensaje: `Error al registrar usuario: ${error}` });
    }
};

/**
 * @function iniciarSesion
 * @description Inicia sesión de un usuario con credenciales proporcionadas.
 * @async
 * @param {Object} req - Objeto de solicitud Express que debe contener las credenciales del usuario (correo y contraseña) en el cuerpo de la solicitud.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Response} - Devuelve una respuesta con un token JWT si las credenciales son válidas o un código de estado correspondiente si las credenciales son inválidas o si ocurre un error.
 * @throws {Error} - Si hay un error en el proceso de inicio de sesión.
 */
exports.iniciarSesion = async (req, res) => {
    try {
        // Obtener el correo y la contraseña del cuerpo de la solicitud
        const { correo, contrasena } = req.body;

        // Buscar al usuario en la base de datos por su correo
        const usuario = await Usuario.findOne({ where: { correo } });

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos (si está encriptada)
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        // Verificar la validez de la contraseña
        if (!contrasenaValida) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        // Crear un token JWT para el usuario
        const token = jwt.sign({ id: usuario.id }, JWT_SECRET);

        // Devolver una respuesta con código de estado 200 y el token JWT
        return res.status(200).json({ token });
    } catch (error) {
        // En caso de error, registrar el error y devolver una respuesta de error 500 (Error interno del servidor)
        logger.error(`Error al iniciar sesión: ${error}`);
        return res.status(500).json({ mensaje: `Error al iniciar sesión: ${error}` });
    }
};

/**
 * @function obtenerUsuarios
 * @description Obtiene todos los usuarios registrados en la base de datos.
 * @async
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Response} - Devuelve una respuesta con la lista de usuarios o un código de estado correspondiente.
 * @throws {Error} - Si hay un error en el proceso de obtención de usuarios.
 */
exports.obtenerUsuarios = async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['contrasena'] } // Excluir el campo 'contrasena' de la respuesta
        });

        // Devolver una respuesta con código de estado 200 y la lista de usuarios
        return res.status(200).json(usuarios);
    } catch (error) {
        // En caso de error, registrar el error y devolver una respuesta de error 500 (Error interno del servidor)
        logger.error(`Error al obtener los usuarios: ${error}`);
        return res.status(500).json({ mensaje: `Error al obtener los usuarios: ${error}` });
    }
};

/**
 * @function obtenerUsuario
 * @description Busca y obtiene un usuario por su id en la base de datos.
 * @async
 * @param {Object} req - Objeto de solicitud Express que debe contener el parámetro de ruta 'id'.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Response} - Devuelve una respuesta con el usuario encontrado o un código de estado correspondiente.
 * @throws {Error} - Si hay un error en el proceso de búsqueda del usuario.
 */
exports.obtenerUsuario = async (req, res) => {
    try {
        // Obtener el id del usuario desde los parámetros de la ruta
        const { id } = req.params;

        // Buscar el usuario en la base de datos por su id
        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ['contrasena'] } // Excluir el campo 'contrasena' de la respuesta
        });

        // Verificar si el usuario fue encontrado
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Devolver una respuesta con código de estado 200 y el usuario encontrado
        return res.status(200).json(usuario);
    } catch (error) {
        // En caso de error, registrar el error y devolver una respuesta de error 500 (Error interno del servidor)
        logger.error(`Error al obtener un usuario: ${error}`);
        return res.status(500).json({ mensaje: `Error al obtener un usuario: ${error}` });
    }
};

/**
 * @function actualizarUsuario
 * @description Actualiza los datos de un usuario por su id.
 * @async
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Response} - Devuelve una respuesta con los datos actualizados del usuario o un código de estado correspondiente.
 * @throws {Error} - Si hay un error en el proceso de actualización o no se encuentra el usuario.
 */
exports.actualizarUsuario = async (req, res) => {
    try {
        // Obtener el id del usuario desde los parámetros de la solicitud
        const { id } = req.params;

        // Obtener los datos actualizados del usuario desde el cuerpo de la solicitud
        const { nombre, correo, contrasena } = req.body;

        // Buscar el usuario por su id en la base de datos
        const usuario = await Usuario.findByPk(id);

        // Si no se encuentra el usuario, devolver un error 404
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Actualizar los datos del usuario
        usuario.nombre = nombre;
        usuario.correo = correo;

        // Si se proporciona una nueva contraseña, encriptarla y actualizarla
        if (contrasena) {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            usuario.contrasena = hashedPassword;
        }

        // Guardar los cambios en la base de datos
        await usuario.save();

        // Devolver una respuesta con código de estado 200 y los datos actualizados del usuario
        return res.status(200).json(usuario);
    } catch (error) {
        // En caso de error, registrar el error y devolver una respuesta de error 500 (Error interno del servidor)
        logger.error(`Error al actualizar el usuario: ${error}`);
        return res.status(500).json({ mensaje: `Error al actualizar el usuario: ${error}` });
    }
};

/**
 * @function borrarUsuario
 * @description Borra un usuario por su id.
 * @async
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Response} - Devuelve una respuesta con el código de estado correspondiente.
 * @throws {Error} - Si hay un error en el proceso de borrado o no se encuentra el usuario.
 */
exports.borrarUsuario = async (req, res) => {
    try {
        // Obtener el id del usuario desde los parámetros de la solicitud
        const { id } = req.params;

        // Buscar el usuario por su id en la base de datos
        const usuario = await Usuario.findByPk(id);

        // Si no se encuentra el usuario, devolver un error 404
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Borrar el usuario de la base de datos
        await usuario.destroy();

        // Devolver una respuesta con código de estado 204 (Sin contenido)
        return res.status(204).send();
    } catch (error) {
        // En caso de error, registrar el error y devolver una respuesta de error 500 (Error interno del servidor)
        logger.error(`Error al borrar el usuario: ${error}`);
        return res.status(500).json({ mensaje: `Error al borrar el usuario: ${error}` });
    }
};
