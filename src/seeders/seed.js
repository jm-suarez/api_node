const { Usuario, Categoria, Producto } = require('../models'); // Asegúrate de importar los modelos correctos
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas si es necesario
const logger = require('../logger');

async function seed() {
    try {
        // Crear datos de prueba para Usuarios
        await Usuario.bulkCreate([
            {
                nombre: 'Usuario1',
                correo: 'usuario1@example.com',
                contrasena: await bcrypt.hash('password1', 10), // Encripta la contraseña
                estado: true,
            },
            {
                nombre: 'Usuario2',
                correo: 'usuario2@example.com',
                contrasena: await bcrypt.hash('password2', 10),
                estado: true,
            },
            // Agrega más usuarios de prueba aquí...
        ]);

        // Crear datos de prueba para Categorías
        await Categoria.bulkCreate([
            {
                nombre: 'Categoría1',
                usuarioId: 1, // Asigna el usuario correspondiente
            },
            {
                nombre: 'Categoría2',
                usuarioId: 2,
            },
            // Agrega más categorías de prueba aquí...
        ]);

        // Crear datos de prueba para Productos
        await Producto.bulkCreate([
            {
                nombre: 'Producto1',
                precioUnitario: 10.99,
                estado: true,
                categoriaId: 1, // Asigna la categoría correspondiente
                usuarioId: 1, // Asigna el usuario correspondiente
            },
            {
                nombre: 'Producto2',
                precioUnitario: 19.99,
                estado: true,
                categoriaId: 2,
                usuarioId: 2,
            },
            // Agrega más productos de prueba aquí...
        ]);

        logger.info('Datos de prueba creados con éxito.');
    } catch (error) {
        logger.error(`Error al crear datos de prueba: ${error}`);
    }
}

// Ejecuta la función de sembrado de datos
seed();
