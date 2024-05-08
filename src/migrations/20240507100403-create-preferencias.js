'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('preferencias', {
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
      Tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Valor: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('preferencias');
  }
};
