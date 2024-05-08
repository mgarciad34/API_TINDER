'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
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
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Contraseña: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Foto: {
        type: Sequelize.BLOB
      },
      Nick: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      FechaCreacion: {
        allowNull: false,
        type: Sequelize.DATE
      },
      RolID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', 
          key: 'ID'
        },
        allowNull: true
      },
      Estado: {
        type: Sequelize.ENUM('activo', 'inactivo'),
        allowNull: false,
        defaultValue: 'inactivo'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};
