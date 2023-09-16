'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Categoria, { foreignKey: 'usuarioId' });
      Usuario.hasMany(models.Producto, { foreignKey: 'usuarioId' });
    }
  }
  Usuario.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'El nombre es obligatorio',
          },
          len: {
            args: [3, 50],
            msg: 'El nombre debe tener entre 3 y 50 caracteres',
          },
        },
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'El correo es obligatorio',
          },
          isEmail: {
            msg: 'El correo debe ser una dirección de correo electrónico válida',
          },
        },
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'La contraseña es obligatoria',
          },
          len: {
            args: [6, 100],
            msg: 'La contraseña debe tener al menos 6 caracteres',
          },
        },
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
    }
  );
  return Usuario;
};

