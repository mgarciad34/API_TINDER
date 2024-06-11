const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const morgan = require("morgan");
require("dotenv").config();
const routerUsuario = require("../router/usuario.router");
const routerEvento = require("../router/evento.router");
const routerPreferencia = require("../router/preferencia.router");
const routerMensajes = require("../router/mensajes.router");
const socketController = require("../controllers/socketController");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.apiPath = process.env.API;

    this.server = http.createServer(this.app);

    this.io = socketIo(this.server);

    this.middlewares();

    this.routes();

    this.sockets();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(this.apiPath, routerUsuario);
    this.app.use(this.apiPath, routerEvento);
    this.app.use(this.apiPath, routerPreferencia);
    this.app.use(this.apiPath, routerMensajes);
  }

  sockets() {
    this.io.on("connection", (socket) => {
      socketController(socket, this.io);
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor escuchando en: ${this.port}`);
    });
  }
}

module.exports = Server;
