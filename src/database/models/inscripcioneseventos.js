"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InscripcionesEventos extends Model {
    static associate(models) {
      InscripcionesEventos.belongsTo(models.eventos, {
        as: "evento",
        foreignKey: "eventoID",
      });
      InscripcionesEventos.belongsTo(models.usuarios, {
        as: "usuario",
        foreignKey: "usuarioID",
      });
    }
  }
  InscripcionesEventos.init(
    {
      usuarioID: DataTypes.INTEGER,
      eventoID: DataTypes.INTEGER,
      fechaInscripcion: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "inscripcionesEventos",
    }
  );
  return InscripcionesEventos;
};
