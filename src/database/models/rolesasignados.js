"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolesAsignados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rolesasignados.belongsTo(roles, { as: "Rol", foreignKey: "RolID" });
      Roles.hasMany(rolesasignados, {
        as: "rolesasignados",
        foreignKey: "RolID",
      });

      Rolesasignados.belongsTo(usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });
      Usuarios.hasMany(rolesasignados, {
        as: "rolesasignados",
        foreignKey: "UsuarioID",
      });
    }
  }
  RolesAsignados.init(
    {
      UsuarioID: DataTypes.INTEGER,
      RolID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RolesAsignados",
    }
  );
  return RolesAsignados;
};
