"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.usuarios, { as: "usuarios", foreignKey: "rolID" });
    }
  }

  Roles.init(
    {
      nombre: DataTypes.STRING,
      descripcion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "roles",
    }
  );

  return Roles;
};
