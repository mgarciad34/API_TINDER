"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Preferencias extends Model {
    static associate(models) {
      Preferencias.belongsTo(models.usuarios, {
        as: "usuario",
        foreignKey: "usuarioID",
      });
    }
  }

  Preferencias.init(
    {
      usuarioID: DataTypes.INTEGER,
      tipo: DataTypes.STRING,
      valor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "preferencias",
    }
  );
  return Preferencias;
};
