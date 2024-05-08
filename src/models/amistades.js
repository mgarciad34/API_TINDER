const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('amistades', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UsuarioID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'ID'
      }
    },
    AmigoID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'ID'
      }
    },
    FechaAmistad: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'amistades',
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
        name: "UsuarioID",
        using: "BTREE",
        fields: [
          { name: "UsuarioID" },
        ]
      },
      {
        name: "AmigoID",
        using: "BTREE",
        fields: [
          { name: "AmigoID" },
        ]
      },
    ]
  });
};
