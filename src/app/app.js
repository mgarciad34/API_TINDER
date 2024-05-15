const express = require("express");
const routerRegistro = require("../router/registro.router");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const api = process.env.api;
const app = express();
const PORT = process.env.PORT;

// Mostramos rutas con el tipo de peticion por consola
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Abierto el servicio de SwipeSpark");
});

// Aqui llamamos a los archivos router
app.use(api, routerRegistro);

app.listen(PORT, () => {
  console.log(`SwipeSpark Server abierto en el puerto ${PORT}`);
});

module.exports = app;
