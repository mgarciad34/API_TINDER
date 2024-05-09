'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Eventos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Eventos.init({
    Nombre: DataTypes.STRING,
    FechaRealizacion: DataTypes.DATE,
    Geolocalizacion: DataTypes.STRING,
    Descripcion: DataTypes.TEXT,
    FechaCierreInscripcion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Eventos',
  });
  return Eventos;
};