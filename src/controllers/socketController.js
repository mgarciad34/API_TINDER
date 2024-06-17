const db = require("../database/models");
const { Op } = require("sequelize");

const chatsEscribiendo = new Map();
let usuariosActivos = new Map();

module.exports = (socket, io) => {

  socket.on("sendMessage", async (data) => {
    try {
      const mensaje = {
        remitenteID: data.remitenteID,
        receptorID: data.receptorID,
        contenido: data.contenido,
        fechaEnvio: new Date(),
        ficheroAdjunto: data.ficheroAdjunto,
      };
      const nuevoMensaje = await db.getModel("mensajes").create(mensaje);

      io.emit("recibirMensaje", nuevoMensaje);
      chatsEscribiendo.delete(data.idChat);
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }
  });

  socket.on("obtenerHistorialMensajes", async ({ remitenteID, receptorID }) => {
    try {
      const historial = await db.getModel("mensajes").findAll({
        where: {
          [Op.or]: [
            { remitenteID: remitenteID, receptorID: receptorID },
            { remitenteID: receptorID, receptorID: remitenteID },
          ],
        },
        order: [["fechaEnvio", "ASC"]],
      });

      socket.emit("historialMensajes", historial);
    } catch (error) {
      console.error("Error al obtener el historial de mensajes:", error);
    }
  });

  socket.on("escribiendo", (nick, idChat, reverseidChat) => {
    socket.broadcast.emit("usuarioEscribiendo", nick, idChat, reverseidChat);
  });

  socket.on("entrarChat", (idChat) => {
    socket.join(idChat);
  });

  socket.on("usuarioActivo", (nick) => {
    usuariosActivos.set(nick, Date.now());
  });

  socket.on("verificarUsuariosActivos", (userNicks, callback) => {
    const result = {};
    userNicks.forEach((userNick) => {
      result[userNick] = usuariosActivos.has(userNick);
    });
    callback(result);
  });

  socket.on("obtenerTotalDeUsuariosActivos", (callback) => {
    callback(usuariosActivos.size);
  });

  setInterval(() => {
    const now = Date.now();
    usuariosActivos.forEach((lastActive, nick) => {
      if (now - lastActive > 60000) {
        usuariosActivos.delete(nick);
      }
    });
  }, 10000);

  socket.on("disconnect", () => {
    for (const [idChat, usuariosEscribiendo] of chatsEscribiendo.entries()) {
      const index = usuariosEscribiendo.indexOf(socket.nick);
      if (index !== -1) {
        usuariosEscribiendo.splice(index, 1);
        chatsEscribiendo.set(idChat, usuariosEscribiendo);
      }
    }
  });
};
