"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Eventos extends Model {
    static associate(models) {
      Eventos.hasMany(models.InscripcionesEventos, {
        as: "inscripcioneseventos",
        foreignKey: "EventoID",
      });
    }
  }
  Eventos.init(
    {
      Nombre: DataTypes.STRING,
      FechaRealizacion: DataTypes.DATE,
      Geolocalizacion: DataTypes.STRING,
      Descripcion: DataTypes.TEXT,
      FechaCierreInscripcion: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Eventos",
    }
  );
  return Eventos;
};
