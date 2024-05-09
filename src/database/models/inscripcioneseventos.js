"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InscripcionesEventos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inscripcioneseventos.belongsTo(usuarios, {
        as: "Usuario",
        foreignKey: "UsuarioID",
      });
      Usuarios.hasMany(inscripcioneseventos, {
        as: "inscripcioneseventos",
        foreignKey: "UsuarioID",
      });

      Inscripcioneseventos.belongsTo(eventos, {
        as: "Evento",
        foreignKey: "EventoID",
      });
      Eventos.hasMany(inscripcioneseventos, {
        as: "inscripcioneseventos",
        foreignKey: "EventoID",
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
