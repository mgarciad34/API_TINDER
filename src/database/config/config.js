require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 1,
      acquire: 30000, // Tiempo máximo para esperar una conexión del pool (en milisegundos) 30 segundos
      idle: 10000, // Tiempo después del cual una conexión en el pool se considera inactiva y puede ser eliminada 10 segundos
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 1,
      acquire: 30000, // Tiempo máximo para esperar una conexión del pool (en milisegundos) 30 segundos
      idle: 10000, // Tiempo después del cual una conexión en el pool se considera inactiva y puede ser eliminada 10 segundos
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 1,
      acquire: 30000, // Tiempo máximo para esperar una conexión del pool (en milisegundos) 30 segundos
      idle: 10000, // Tiempo después del cual una conexión en el pool se considera inactiva y puede ser eliminada 10 segundos
    },
  },
};
