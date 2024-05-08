const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "Email"
    },
    'Contraseña': {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Foto: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    Nick: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "Nick"
    },
    FechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    RolID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'ID'
      }
    },
    Estado: {
      type: DataTypes.ENUM('activo','inactivo'),
      allowNull: false,
      defaultValue: "inactivo"
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "Email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      },
      {
        name: "Nick",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Nick" },
        ]
      },
      {
        name: "RolID",
        using: "BTREE",
        fields: [
          { name: "RolID" },
        ]
      },
    ]
  });
};
