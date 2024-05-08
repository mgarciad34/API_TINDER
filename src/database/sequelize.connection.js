const { Sequelize } = require('sequelize');
require('dotenv').config();

//Configuración del pool de conexiones
const pool = {
    max: 10,
    min: 1,
    acquire: 30000, // Tiempo máximo para esperar una conexión del pool (en milisegundos) 30 segundos
    idle: 10000, // Tiempo después del cual una conexión en el pool se considera inactiva y puede ser eliminada 10 segundos
  };


// Conexion a la BBDD
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.HOST,
  dialect: process.env.DB,
  port: process.env.PORT_DB,
  pool: pool
});


//Comprobamos que estamos conectados a la BBDD

async function comprobarConexion(){
    let result;
    try {
        await sequelize.authenticate();
        console.log('Conexion establecida');
        result = 0
    } catch (error) {
        console.error('No se puede conectar con la BDDD: ', error);
        result = 1
    }
    return result
}

//Imprimimos el resultado en número
// Usar en los CRUD
/*comprobarConexion().then(result => {
    console.log(result);
}).catch(error => {
    console.error('Error al verificar la conexión:', error);
});
*/

module.exports = {comprobarConexion}