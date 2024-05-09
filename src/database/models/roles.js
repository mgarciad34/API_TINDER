"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.hasMany(usuarios, { as: "usuarios", foreignKey: "RolID" });

      Roles.hasMany(Rolesasignados, {
        as: "Rolesasignados",
        foreignKey: "RolID",
      });
      Rolesasignados.belongsTo(Roles, { as: "Rol", foreignKey: "RolID" });
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
