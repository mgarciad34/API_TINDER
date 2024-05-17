"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mensajes extends Model {
    static associate(models) {
      Mensajes.belongsTo(models.Usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });
    }
  }

  Mensajes.init(
    {
      RemitenteID: DataTypes.INTEGER,
      ReceptorID: DataTypes.INTEGER,
      Contenido: DataTypes.TEXT,
      FechaEnvio: DataTypes.DATE,
      ArchivoAdjunto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Mensajes",
    }
  );
  return Mensajes;
};
