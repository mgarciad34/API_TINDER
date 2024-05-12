"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {
      Usuarios.belongsTo(models.Roles, { as: "Rol", foreignKey: "RolID" });
      Usuarios.hasMany(models.Amistades, {
        as: "amistades",
        foreignKey: "UsuarioID",
      });
      Usuarios.hasMany(models.Amistades, {
        as: "Amigo_amistades",
        foreignKey: "AmigoID",
      });
      Usuarios.hasMany(models.InscripcionesEventos, {
        as: "inscripcioneseventos",
        foreignKey: "UsuarioID",
      });
      Usuarios.hasMany(models.Mensajes, {
        as: "mensajes",
        foreignKey: "UsuarioID",
      });
      Usuarios.hasMany(models.Preferencias, {
        as: "preferencia",
        foreignKey: "UsuarioID",
      });
    }
  }

  Usuarios.init(
    {
      Nombre: DataTypes.STRING,
      Email: DataTypes.STRING,
      Contraseña: DataTypes.STRING,
      Foto: DataTypes.STRING,
      Nick: DataTypes.STRING,
      RolID: DataTypes.INTEGER,
      Estado: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Usuarios",
    }
  );

  return Usuarios;
};
