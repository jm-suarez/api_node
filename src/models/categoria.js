'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Categoria.hasMany(models.Producto, { foreignKey: 'categoriaId' });
    }
  }
  Categoria.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre es obligatorio',
        },
        len: {
          args: [2, 255], // Longitud permitida para el nombre
          msg: 'El nombre debe tener entre 2 y 255 caracteres',
        },
      },
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El usuarioId es obligatorio',
        },
        isInt: {
          msg: 'El usuarioId debe ser un número entero',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};
