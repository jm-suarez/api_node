/**
 * @module logger
 * @description Módulo de registro de la aplicación.
 */

// Importar las bibliotecas y módulos necesarios
const fs = require('fs');
const pino = require('pino');
const pinoPretty = require('pino-pretty');
const path = require('path');

// Directorio de registro
const logDirectory = path.join(__dirname, 'logs');

// Verificar si el directorio de registro existe; si no, crearlo
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Configuración del logger con Pino
const logger = pino({
    level: 'info', // Nivel de registro predeterminado
    dest: path.join(logDirectory, 'app.log'), // Ruta del archivo de registro
});

// Configuración para el registro legible (solo en entornos no de producción)
if (process.env.NODE_ENV !== 'production') {
    logger.pretty = pinoPretty(); // Hace que los registros sean más legibles en consola
}

// Exportar el objeto logger configurado
module.exports = logger;
