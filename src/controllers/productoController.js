/**
 * @module ProductoController
 * @description Controlador para gestionar productos.
 */
const { Producto, Categoria, Usuario } = require('../models');
const logger = require('../logger');

/**
 * @function obtenerProductos
 * @description Obtiene todos los productos.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Lista de productos o mensaje de error.
 */
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();

        return res.status(200).json(productos);
    } catch (error) {
        logger.error(`Error al obtener productos: ${error}`);
        return res.status(500).json({ mensaje: `Error al obtener productos: ${error}` });
    }
};

/**
 * @function obtenerProducto
 * @description Obtiene un producto por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Producto encontrado o mensaje de error.
 */
exports.obtenerProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        return res.status(200).json(producto);
    } catch (error) {
        logger.error(`Error al obtener producto por ID: ${error}`);
        return res.status(500).json({ mensaje: `Error al obtener producto por ID: ${error}` });
    }
};

/**
 * @function obtenerProductosPorCategoria
 * @description Obtiene productos por categoría.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Lista de productos por categoría o mensaje de error.
 */
exports.obtenerProductosPorCategoria = async (req, res) => {
    const { categoriaId } = req.params;
    try {
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        const productos = await Producto.findAll({
            where: {
                categoriaId: categoriaId,
            },
        });
        return res.status(200).json(productos);
    } catch (error) {
        logger.error(`Error al obtener productos por categoría: ${error}`);
        return res.status(500).json({ mensaje: `Error al obtener productos por categoría: ${error}` });
    }
};

/**
 * @function obtenerProductosPorUsuario
 * @description Obtiene productos por usuario.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Lista de productos por usuario o mensaje de error.
 */
exports.obtenerProductosPorUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    try {
        const productos = await Producto.findAll({
            where: {
                usuarioId: usuarioId,
            },
        });
        return res.status(200).json(productos);
    } catch (error) {
        logger.error(`Error al obtener productos por usuario: ${error}`);
        return res.status(500).json({ mensaje: `Error al obtener productos por usuario: ${error}` });
    }
};

/**
 * @function crearProducto
 * @description Crea un nuevo producto.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Producto creado o mensaje de error.
 */
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, precioUnitario, estado, categoriaId, usuarioId } = req.body;
        const categoriaExistente = await Categoria.findByPk(categoriaId);
        const usuarioExistente = await Usuario.findByPk(usuarioId);
        if (!categoriaExistente || !usuarioExistente) {
            return res.status(400).json({ mensaje: 'Categoría o usuario no encontrados' });
        }
        const nuevoProducto = await Producto.create({
            nombre,
            precioUnitario,
            estado,
            categoriaId,
            usuarioId,
        });
        return res.status(201).json(nuevoProducto);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ mensaje: 'Errores de validación', errores });
        }
        logger.error(`Error al crear producto: ${error}`);
        return res.status(500).json({ mensaje: `Error al crear producto: ${error}` });
    }
};

/**
 * @function actualizarProducto
 * @description Actualiza un producto por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Producto actualizado o mensaje de error de validación.
 */
exports.actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precioUnitario, estado } = req.body;
    try {
        const productoExistente = await Producto.findByPk(id);
        if (!productoExistente) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        productoExistente.nombre = nombre;
        productoExistente.precioUnitario = precioUnitario;
        productoExistente.estado = estado;

        await productoExistente.save();
        return res.status(200).json(productoExistente);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ mensaje: 'Errores de validación', errores });
        }
        logger.error(`Error al actualizar producto: ${error}`);
        return res.status(500).json({ mensaje: `Error al actualizar producto: ${error}` });
    }
};

/**
 * @function eliminarProducto
 * @description Elimina un producto por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {JSON} - Mensaje de éxito o mensaje de error.
 */
exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoExistente = await Producto.findByPk(id);
        if (!productoExistente) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        await productoExistente.destroy();
        return res.status(204).send();
    } catch (error) {
        logger.error(`Error al eliminar producto: ${error}`);
        return res.status(500).json({ mensaje: `Error al eliminar producto: ${error}` });
    }
};
