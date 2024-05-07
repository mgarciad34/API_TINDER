var DataTypes = require("sequelize").DataTypes;
var _amistades = require("./amistades");
var _eventos = require("./eventos");
var _inscripcioneseventos = require("./inscripcioneseventos");
var _mensajes = require("./mensajes");
var _preferencias = require("./preferencias");
var _roles = require("./roles");
var _rolesasignados = require("./rolesasignados");
var _sequelizemeta = require("./sequelizemeta");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var amistades = _amistades(sequelize, DataTypes);
  var eventos = _eventos(sequelize, DataTypes);
  var inscripcioneseventos = _inscripcioneseventos(sequelize, DataTypes);
  var mensajes = _mensajes(sequelize, DataTypes);
  var preferencias = _preferencias(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var rolesasignados = _rolesasignados(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  inscripcioneseventos.belongsTo(eventos, { as: "Evento", foreignKey: "EventoID"});
  eventos.hasMany(inscripcioneseventos, { as: "inscripcioneseventos", foreignKey: "EventoID"});
  rolesasignados.belongsTo(roles, { as: "Rol", foreignKey: "RolID"});
  roles.hasMany(rolesasignados, { as: "rolesasignados", foreignKey: "RolID"});
  usuarios.belongsTo(roles, { as: "Rol", foreignKey: "RolID"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "RolID"});
  amistades.belongsTo(usuarios, { as: "Usuario", foreignKey: "UsuarioID"});
  usuarios.hasMany(amistades, { as: "amistades", foreignKey: "UsuarioID"});
  amistades.belongsTo(usuarios, { as: "Amigo", foreignKey: "AmigoID"});
  usuarios.hasMany(amistades, { as: "Amigo_amistades", foreignKey: "AmigoID"});
  inscripcioneseventos.belongsTo(usuarios, { as: "Usuario", foreignKey: "UsuarioID"});
  usuarios.hasMany(inscripcioneseventos, { as: "inscripcioneseventos", foreignKey: "UsuarioID"});
  mensajes.belongsTo(usuarios, { as: "Usuario", foreignKey: "UsuarioID"});
  usuarios.hasMany(mensajes, { as: "mensajes", foreignKey: "UsuarioID"});
  preferencias.belongsTo(usuarios, { as: "Usuario", foreignKey: "UsuarioID"});
  usuarios.hasMany(preferencias, { as: "preferencia", foreignKey: "UsuarioID"});
  rolesasignados.belongsTo(usuarios, { as: "Usuario", foreignKey: "UsuarioID"});
  usuarios.hasMany(rolesasignados, { as: "rolesasignados", foreignKey: "UsuarioID"});

  return {
    amistades,
    eventos,
    inscripcioneseventos,
    mensajes,
    preferencias,
    roles,
    rolesasignados,
    sequelizemeta,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
