"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Amistades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      amistades.belongsTo(usuarios, { as: "Usuario", foreignKey: "UsuarioID" });
      usuarios.hasMany(amistades, { as: "amistades", foreignKey: "UsuarioID" });

      amistades.belongsTo(usuarios, { as: "Amigo", foreignKey: "AmigoID" });
      usuarios.hasMany(amistades, {
        as: "Amigo_amistades",
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
