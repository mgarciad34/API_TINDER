"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usuariosData = [
      {
        nombre: "Administrador",
        genero: "Hombre",
        email: "administrador@swipespark.es",
        contrasena:
          "$2b$10$a4u6z5lQCjtjf6pfHG.6g.pfAK5BDkf873Unut6W5z5FrBqUBI06O",
        foto:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlQMBIgACEQEDEQH/…", // puedes mantener tu base64 si lo deseas
        nick: "admin",
        rolID: 1,
        estado: "activo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Administrador",
        genero: "Mujer",
        email: "administrador2@swipespark.es",
        contrasena:
          "$2b$10$a4u6z5lQCjtjf6pfHG.6g.pfAK5BDkf873Unut6W5z5FrBqUBI06O",
        foto:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlQMBIgACEQEDEQH/…", // igual
        nick: "admin2",
        rolID: 1,
        estado: "activo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Función auxiliar para generar usuarios falsos
    function generarUsuariosFalsos(cantidad) {
      const lista = [];
      for (let i = 0; i < cantidad; i++) {
        lista.push({
          nombre: faker.person.firstName(),
          genero: faker.helpers.arrayElement(["Hombre", "Mujer", "Otro"]),
          email: faker.internet.email(),
          contrasena:
            "$2b$10$a4u6z5lQCjtjf6pfHG.6g.pfAK5BDkf873Unut6W5z5FrBqUBI06O",
          foto: faker.image.avatar(),
          nick: faker.internet.username(),
          rolID: 2, // o algún otro rol que desees dar a los usuarios simulados
          estado: "activo",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return lista;
    }

    // Generar, por ejemplo, 28 usuarios adicionales
    const usuariosFalsos = generarUsuariosFalsos(28);
    usuariosData.push(...usuariosFalsos);

    await queryInterface.bulkInsert("usuarios", usuariosData, {});
  },

  async down(queryInterface, Sequelize) {
    // En el `down`, borramos todos los registros de la tabla “usuarios”
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
