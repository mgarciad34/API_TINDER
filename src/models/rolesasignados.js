const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rolesasignados', {
    UsuarioID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'ID'
      }
    },
    RolID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'rolesasignados',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "UsuarioID",
        using: "BTREE",
        fields: [
          { name: "UsuarioID" },
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
