const express = require('express');
const router = express.Router();
const {
    obtenerCategorias,
    obtenerCategoria,
    obtenerCategoriasPorUsuario,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
} = require('../controllers/categoriaController');

// Ruta para obtener todas las categorías
router.get('/', obtenerCategorias);

// Ruta para obtener una categoría por su ID
router.get('/:id', obtenerCategoria);

// Ruta para obtener todas las categorías de un usuario por su ID
router.get('/usuario/:usuarioId', obtenerCategoriasPorUsuario);

// Ruta para crear una nueva categoría
router.post('/', crearCategoria);

// Ruta para actualizar una categoría por su ID
router.put('/:id', actualizarCategoria);

// Ruta para eliminar una categoría por su ID
router.delete('/:id', eliminarCategoria);

module.exports = router;
