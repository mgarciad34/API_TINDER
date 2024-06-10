"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const preferenciasData = [];
    for (let usuarioID = 3; usuarioID <= 30; usuarioID++) {
      preferenciasData.push(
        {
          usuarioID,
          tipo: "relacion",
          valor: faker.helpers.arrayElement(["Seria", "Esporadica"]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarioID,
          tipo: "deportivos",
          valor: faker.datatype.number({ min: 1, max: 100 }).toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarioID,
          tipo: "artisticos",
          valor: faker.datatype.number({ min: 1, max: 100 }).toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarioID,
          tipo: "politicos",
          valor: faker.datatype.number({ min: 1, max: 100 }).toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarioID,
          tipo: "hijos",
          valor: faker.helpers.arrayElement([
            "No quiero hijos",
            "Tengo hijos",
            "Quiero hijos",
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          usuarioID,
          tipo: "interes",
          valor: faker.helpers.arrayElement(["Hombre", "Mujer", "Ambos"]),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      );
    }

    await queryInterface.bulkInsert("preferencias", preferenciasData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People',  null,  {});
     */
  },
};
