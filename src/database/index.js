const db = require("./models");

const comprobarConexionDB = async () => {
    await db.sequelize.authenticate();
    console.log('Conectado a la BBDD')
}

module.exports = {
    comprobarConexionDB
}