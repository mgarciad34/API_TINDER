"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Amistades extends Model {
    static associate(models) {
      Amistades.belongsTo(models.usuarios, {
        as: "usuario",
        foreignKey: "usuarioID",
      });
      Amistades.belongsTo(models.usuarios, {
        as: "amigo",
        foreignKey: "amigoID",
      });
    }
  }

  Amistades.init(
    {
      usuarioID: DataTypes.INTEGER,
      amigoID: DataTypes.INTEGER,
      fechaAmistad: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "amistades",
    }
  );
  return Amistades;
};
