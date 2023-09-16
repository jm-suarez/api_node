const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {
    obtenerProductos,
    obtenerProducto,
    obtenerProductosPorCategoria,
    obtenerProductosPorUsuario,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} = require('../controllers/productoController');

// Ruta para obtener todos los productos
router.get('/', authMiddleware, obtenerProductos);

// Ruta para obtener un producto por su ID
router.get('/:id', authMiddleware, obtenerProducto);

// Ruta para obtener productos por categoría
router.get('/categoria/:categoriaId', authMiddleware, obtenerProductosPorCategoria);

// Ruta para obtener productos por usuario
router.get('/usuario/:usuarioId', authMiddleware, obtenerProductosPorUsuario);

// Ruta para crear un nuevo producto
router.post('/', authMiddleware, crearProducto);

// Ruta para actualizar un producto por su ID
router.put('/:id', authMiddleware, actualizarProducto);

// Ruta para eliminar un producto por su ID
router.delete('/:id', authMiddleware, eliminarProducto);

module.exports = router;
