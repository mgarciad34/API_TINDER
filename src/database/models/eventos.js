"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Eventos extends Model {
    static associate(models) {
      Eventos.hasMany(models.inscripcionesEventos, {
        as: "inscripcioneseventos",
        foreignKey: "eventoID",
      });
    }
  }
  Eventos.init(
    {
      nombre: DataTypes.STRING,
      fechaRealizacion: DataTypes.DATE,
      geolocalizacion: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      fechaCierreInscripcion: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "eventos",
    }
  );
  return Eventos;
};
