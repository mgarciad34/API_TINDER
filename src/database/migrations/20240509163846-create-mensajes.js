"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mensajes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      RemitenteID: {
        type: Sequelize.INTEGER,
      },
      ReceptorID: {
        type: Sequelize.INTEGER,
      },
      Contenido: {
        type: Sequelize.TEXT,
      },
      FechaEnvio: {
        type: Sequelize.DATE,
      },
      ArchivoAdjunto: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("mensajes");
  },
};
