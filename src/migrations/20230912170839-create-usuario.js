/**
 * @module CrearTablaUsuariosMigration
 * @description Define una migración para crear la tabla 'Usuarios' en la base de datos.
 * @param {Object} queryInterface - Objeto proporcionado por Sequelize para interactuar con la base de datos.
 * @param {Object} Sequelize - Objeto Sequelize para definir tipos de datos.
 */

'use strict';

/**
 * @typedef {import('sequelize').QueryInterface} QueryInterface
 * @typedef {import('sequelize/types')} Sequelize
 */

/**
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
  /**
   * @function up
   * @description Ejecuta la migración para crear la tabla 'Usuarios'.
   * @param {QueryInterface} queryInterface - Objeto proporcionado por Sequelize para interactuar con la base de datos.
   * @param {Sequelize} Sequelize - Objeto Sequelize para definir tipos de datos.
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      contrasena: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  /**
   * @function down
   * @description Ejecuta la migración para eliminar la tabla 'Usuarios'.
   * @param {QueryInterface} queryInterface - Objeto proporcionado por Sequelize para interactuar con la base de datos.
   * @param {Sequelize} Sequelize - Objeto Sequelize para definir tipos de datos.
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};
