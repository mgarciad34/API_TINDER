'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eventos', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      FechaRealizacion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Geolocalización: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Descripción: {
        type: Sequelize.TEXT,
        allowNull: false
      },

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('eventos');
  }
};