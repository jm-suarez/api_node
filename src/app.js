/**
 * @module app
 * @description Archivo principal de la aplicación.
 */

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Importar las bibliotecas y módulos necesarios
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./logger');

// Importar las rutas de los diferentes recursos
const usuarioRouter = require('./routes/usuario');
const categoriaRouter = require('./routes/categoria');
const productoRouter = require('./routes/producto');

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para registrar las solicitudes entrantes
app.use((req, res, next) => {
    logger.info(`[${req.method}] ${req.url}`);
    next();
});

// Configuración de registro de solicitudes usando Morgan en modo 'dev'
app.use(morgan('dev'));

// Configuración de middleware para el análisis de datos en formato JSON y URL codificada
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar las rutas para los recursos de usuario, categoría y producto
app.use('/usuario', usuarioRouter);
app.use('/categoria', categoriaRouter);
app.use('/producto', productoRouter);

// Obtener el puerto de escucha del entorno o usar el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor Express
app.listen(PORT, () => {
    logger.info(`Servidor en ejecucion en el puerto ${PORT}`);
});
