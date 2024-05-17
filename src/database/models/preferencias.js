"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Preferencias extends Model {
    static associate(models) {
      Preferencias.belongsTo(models.Usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });
    }
  }
  Preferencias.init(
    {
      UsuarioID: DataTypes.INTEGER,
      Tipo: DataTypes.STRING,
      Valor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Preferencias",
    }
  );
  return Preferencias;
};
