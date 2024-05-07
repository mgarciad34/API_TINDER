'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('amistades', {
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
        allowNull: true
      },
      AmigoID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'ID'
        },
        allowNull: true
      },
      FechaAmistad: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('amistades');
  }
};
