"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.Usuarios, { as: "usuarios", foreignKey: "RolID" });
    }
  }

  Roles.init(
    {
      Nombre: DataTypes.STRING,
      Descripcion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roles",
    }
  );

  return Roles;
};
