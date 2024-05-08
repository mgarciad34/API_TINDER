'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inscripcionesEventos', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UsuarioID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'ID'
        },
        allowNull: false
      },
      EventoID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'eventos',
          key: 'ID'
        },
        allowNull: false
      },
      FechaInscripcion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inscripcionesEventos');
  }
};
