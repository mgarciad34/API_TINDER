'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mensajes', {
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
      Contenido: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      FechaEnvio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mensajes');
  }
};
