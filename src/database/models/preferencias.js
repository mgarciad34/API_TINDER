"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Preferencias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Preferencias.belongsTo(usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });
      usuarios.hasMany(preferencias, {
        as: "preferencia",
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
