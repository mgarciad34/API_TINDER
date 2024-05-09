"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuarios.belongsTo(roles, { as: "Rol", foreignKey: "RolID" });
      roles.hasMany(Usuarios, { as: "usuarios", foreignKey: "RolID" });

      Usuarios.hasMany(amistades, { as: "amistades", foreignKey: "UsuarioID" });
      amistades.belongsTo(Usuarios, { as: "usuario", foreignKey: "UsuarioID" });

      Usuarios.hasMany(inscripcioneseventos, {
        as: "inscripcioneseventos",
        foreignKey: "UsuarioID",
      });
      inscripcioneseventos.belongsTo(Usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });

      Usuarios.hasMany(mensajes, { as: "mensajes", foreignKey: "UsuarioID" });
      mensajes.belongsTo(Usuarios, { as: "usuario", foreignKey: "UsuarioID" });

      Usuarios.hasMany(preferencias, {
        as: "preferencia",
        foreignKey: "UsuarioID",
      });
      preferencias.belongsTo(Usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });

      Usuarios.hasMany(rolesasignados, {
        as: "rolesasignados",
        foreignKey: "UsuarioID",
      });
      rolesasignados.belongsTo(Usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });
    }
  }
  Usuarios.init(
    {
      Nombre: DataTypes.STRING,
      Email: DataTypes.STRING,
      Contraseña: DataTypes.STRING,
      Foto: DataTypes.STRING,
      Nick: DataTypes.STRING,
      RolID: DataTypes.INTEGER,
      Estado: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Usuarios",
    }
  );
  return Usuarios;
};
