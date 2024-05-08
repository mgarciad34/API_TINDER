'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rolesData = [
      {Nombre:'Administrador',
        Descripcion:'Gestionar a los usuarios: altas, bajas, modificaciones, activaciones… los usuarios estarán desactivados por defecto hasta que los active el administrador. También se podrán crear a otros       administradores (o quitarles los privilegios a los actuales).'
      },
      {Nombre:'Usuario',
        Descripcion:'Rol del Usuario'
      }
    ]

    await queryInterface.bulkInsert('roles', rolesData, {})
  },

  async down (queryInterface, Sequelize) {
  }
};
