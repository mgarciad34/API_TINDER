const app = require("./app/app");
const { comprobarConexionDB } = require("./database");

require("dotenv").config();

const PORT = process.env.PORT;

async function main(server) {
  try {
    console.log("Iniciando servidor SwipeSpark");
    await comprobarConexionDB();
  } catch (error) {
    console.log("Error al iniciar el servidor SwipeSpark ", error);
  }
}

main(app);
