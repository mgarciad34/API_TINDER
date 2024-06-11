const db = require("../database/models");
const { Op } = require("sequelize");

const chatsEscribiendo = new Map();
let usuariosActivos = new Map();

module.exports = (socket, io) => {
  console.log("Nuevo cliente conectado");

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
      // Limpiar lista de usuarios escribiendo en este chat
      chatsEscribiendo.delete(data.idChat);
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }
  });

  socket.on("obtenerHistorialMensajes", async ({ remitenteID, receptorID }) => {
    try {
      // Obtener historial de mensajes para ambos casos de remitente y receptor
      const historial = await db.getModel("mensajes").findAll({
        where: {
          [Op.or]: [
            { remitenteID: remitenteID, receptorID: receptorID },
            { remitenteID: receptorID, receptorID: remitenteID },
          ],
        },
        order: [["fechaEnvio", "ASC"]],
      });

      socket.emit("historialMensajes", historial); // Enviar historial de mensajes al cliente
    } catch (error) {
      console.error("Error al obtener el historial de mensajes:", error);
    }
  });

  socket.on("escribiendo", (nick, idChat, reverseidChat) => {
    console.log("Usuario escribiendo:", nick, idChat, reverseidChat);
    // Emitir evento a todos los clientes excepto al que está escribiendo
    socket.broadcast.emit("usuarioEscribiendo", nick, idChat, reverseidChat);
  });

  socket.on("entrarChat", (idChat) => {
    console.log("Usuario entrando al chat:", idChat);
    // Unir al usuario al chat específico
    socket.join(idChat);
  });

  socket.on("usuarioActivo", (nick) => {
    usuariosActivos.set(nick, Date.now());
    console.log(`Usuario ${nick} está activo`);
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

  // Verificar inactividad
  setInterval(() => {
    const now = Date.now();
    usuariosActivos.forEach((lastActive, nick) => {
      if (now - lastActive > 60000) {
        // 60 segundos de inactividad
        console.log(`Usuario ${nick} está inactivo`);
        usuariosActivos.delete(nick);
      }
    });
  }, 10000); // Verificar cada 10 segundos

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");

    // Manejar la desconexión del usuario eliminándolo de la lista de usuarios escribiendo en cada chat
    for (const [idChat, usuariosEscribiendo] of chatsEscribiendo.entries()) {
      const index = usuariosEscribiendo.indexOf(socket.nick);
      if (index !== -1) {
        usuariosEscribiendo.splice(index, 1);
        chatsEscribiendo.set(idChat, usuariosEscribiendo);
      }
    }
  });
};
