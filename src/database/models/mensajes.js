"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Mensajes extends Model {
    static associate(models) {
      Mensajes.belongsTo(models.usuarios, {
        as: "remitente",
        foreignKey: "remitenteID",
      });
      Mensajes.belongsTo(models.usuarios, {
        as: "receptor",
        foreignKey: "receptorID",
      });
    }
  }

  Mensajes.init(
    {
      remitenteID: DataTypes.INTEGER,
      receptorID: DataTypes.INTEGER,
      contenido: DataTypes.TEXT,
      fechaEnvio: DataTypes.DATE,
      ficheroAdjunto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "mensajes",
    }
  );
  return Mensajes;
};
