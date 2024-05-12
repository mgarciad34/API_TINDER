"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InscripcionesEventos extends Model {
    static associate(models) {
      InscripcionesEventos.belongsTo(models.Eventos, {
        as: "Evento",
        foreignKey: "EventoID",
      });
      InscripcionesEventos.belongsTo(models.Usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });
    }
  }
  InscripcionesEventos.init(
    {
      UsuarioID: DataTypes.INTEGER,
      EventoID: DataTypes.INTEGER,
      FechaInscripcion: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "InscripcionesEventos",
    }
  );
  return InscripcionesEventos;
};
