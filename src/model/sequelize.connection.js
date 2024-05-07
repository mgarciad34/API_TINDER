const { Sequelize } = require('sequelize');
require('dotenv').config();

// Conexion a la BBDD
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.HOST,
  dialect: process.env.DB,
  port: process.env.PORT_DB
});


//Comprobamos que estamos conectados a la BBDD

async function comprobarConexion(){
    try {
        await sequelize.authenticate();
        console.log('Conexion establecida');
        return 0
    } catch (error) {
        console.error('No se puede conectar con la BDDD: ', error);
        return 1
    }
}

comprobarConexion()