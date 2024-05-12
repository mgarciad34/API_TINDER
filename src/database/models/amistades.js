"use strict";
const { Model } = require("sequelize");
const usuarios = require("./usuarios");
module.exports = (sequelize, DataTypes) => {
  class Amistades extends Model {
    static associate(models) {
      Amistades.belongsTo(models.Usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });
      Amistades.belongsTo(models.Usuarios, {
        as: "Amigo",
        foreignKey: "AmigoID",
      });
    }
  }
  Amistades.init(
    {
      UsuarioID: DataTypes.INTEGER,
      AmigoID: DataTypes.INTEGER,
      FechaAmistad: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Amistades",
    }
  );
  return Amistades;
};
