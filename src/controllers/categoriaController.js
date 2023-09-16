/**
 * @module CategoriaController
 * @description Controlador para gestionar categorías.
 */
const { Categoria } = require('../models');
const logger = require('../logger');

/**
 * @function obtenerCategorias
 * @description Obtiene todas las categorías.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Lista de categorías o mensaje de error.
 */
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        return res.status(200).json(categorias);
    } catch (error) {
        logger.error(`Error al obtener todas las categorías: ${error}`);
        return res.status(500).json({ mensaje: `Error al obtener todas las categorías: ${error}` });
    }
};

/**
 * @function obtenerCategoria
 * @description Obtiene una categoría por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Categoría encontrada o mensaje de error.
 */
exports.obtenerCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        return res.status(200).json(categoria);
    } catch (error) {
        logger.error(`Error al obtener categoría por ID: ${error}`);
        return res.status(500).json({ mensaje: `Error al obtener categoría por ID: ${error}` });
    }
};

/**
 * @function obtenerCategoriasPorUsuario
 * @description Obtiene todas las categorías de un usuario por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Lista de categorías del usuario o mensaje de error.
 */
exports.obtenerCategoriasPorUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    try {
        const categorias = await Categoria.findAll({
            where: {
                usuarioId: usuarioId,
            },
        });
        return res.status(200).json(categorias);
    } catch (error) {
        logger.error(`Error al obtener categorías de usuario: ${error}`);
        return res.status(500).json({ mensaje: `Error al obtener categorías de usuario: ${error}` });
    }
};

/**
 * @function crearCategoria
 * @description Crea una nueva categoría.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Categoría creada o mensaje de error de validación.
 */
exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, usuarioId } = req.body;
        const nuevaCategoria = await Categoria.create({
            nombre,
            usuarioId,
        });
        return res.status(201).json(nuevaCategoria);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ mensaje: 'Errores de validación', errores });
        }
        logger.error(`Error al crear categoría: ${error}`);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

/**
 * @function actualizarCategoria
 * @description Actualiza una categoría por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Categoría actualizada o mensaje de error de validación.
 */
exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre, usuarioId } = req.body;
    try {
        const categoriaExistente = await Categoria.findByPk(id);
        if (!categoriaExistente) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        categoriaExistente.nombre = nombre;
        categoriaExistente.usuarioId = usuarioId;
        await categoriaExistente.save();
        return res.status(200).json(categoriaExistente);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ mensaje: 'Errores de validación', errores });
        }
        logger.error(`Error al actualizar categoría: ${error}`);
        return res.status(500).json({ mensaje: `Error al actualizar categoría: ${error}` });
    }
};

/**
 * @function eliminarCategoria
 * @description Elimina una categoría por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Mensaje de éxito o mensaje de error.
 */
exports.eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaExistente = await Categoria.findByPk(id);
        if (!categoriaExistente) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        await categoriaExistente.destroy();
        return res.status(204).send();
    } catch (error) {
        logger.error(`Error al eliminar categoría: ${error}`);
        return res.status(500).json({ mensaje: `Error al eliminar categoría: ${error}` });
    }
};

