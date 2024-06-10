"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {
      Usuarios.belongsTo(models.roles, { as: "rol", foreignKey: "rolID" });
      Usuarios.hasMany(models.amistades, {
        as: "amistades",
        foreignKey: "usuarioID",
      });
      Usuarios.hasMany(models.amistades, {
        as: "amigo_amistades",
        foreignKey: "amigoID",
      });
      Usuarios.hasMany(models.inscripcionesEventos, {
        as: "inscripcioneseventos",
        foreignKey: "usuarioID",
      });
      Usuarios.hasMany(models.mensajes, {
        as: "mensajes",
        foreignKey: "receptorID",
      });
      Usuarios.hasMany(models.preferencias, {
        as: "preferencia",
        foreignKey: "usuarioID",
      });
    }
  }

  Usuarios.init(
    {
      nombre: DataTypes.STRING,
      genero: DataTypes.STRING,
      email: DataTypes.STRING,
      contrasena: DataTypes.STRING,
      foto: DataTypes.TEXT("long"),
      nick: DataTypes.STRING,
      rolID: DataTypes.INTEGER,
      estado: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "usuarios",
    }
  );

  return Usuarios;
};
