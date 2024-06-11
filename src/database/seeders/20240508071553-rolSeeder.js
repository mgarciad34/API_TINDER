"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rolesData = [
      {
        nombre: "Administrador",
        descripcion:
          "Gestionar a los usuarios: altas, bajas, modificaciones, activaciones… " +
          "los usuarios estarán desactivados por defecto hasta que los active el " +
          "administrador. También se podrán crear a otros administradores (o " +
          "quitarles los privilegios a los actuales).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Usuario",
        descripcion: "Rol del Usuario",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("roles", rolesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rolesData = [
      {
        nombre: "Administrador",
        descripcion:
          "Gestionar a los usuarios: altas, bajas, modificaciones, activaciones… " +
          "los usuarios estarán desactivados por defecto hasta que los active el " +
          "administrador. También se podrán crear a otros administradores (o " +
          "quitarles los privilegios a los actuales).",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Usuario",
        descripcion: "Rol del Usuario",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("roles", rolesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
