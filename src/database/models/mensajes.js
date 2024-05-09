"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mensajes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // mensajes.js
      Mensajes.belongsTo(usuarios, { as: "Usuario", foreignKey: "UsuarioID" });
      Usuarios.hasMany(mensajes, { as: "mensajes", foreignKey: "UsuarioID" });
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
