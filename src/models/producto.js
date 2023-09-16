'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Producto.belongsTo(models.Categoria, { foreignKey: 'categoriaId' });
    }
  }
  Producto.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'El nombre es obligatorio',
          },
          len: {
            args: [2, 255],
            msg: 'El nombre debe tener entre 2 y 255 caracteres',
          },
        },
      },
      precioUnitario: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'El precio unitario es obligatorio',
          },
          isDecimal: {
            msg: 'El precio unitario debe ser un número decimal',
          },
          min: {
            args: [0],
            msg: 'El precio unitario no puede ser negativo',
          },
        },
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Producto',
    }
  );
  return Producto;
};

