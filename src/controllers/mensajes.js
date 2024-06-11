const db = require("../database/models");
const { Op } = require("sequelize");
const mensajesModel = db.getModel("mensajes");

const obtenerMensajesDeChat = async (req, res) => {
  try {
    const remitenteID = req.params.remiID;
    const receptorID = req.params.receID;
    if (!remitenteID || !receptorID) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const mensajes = await mensajesModel.findAll({
      where: {
        [Op.or]: [
          {
            remitenteID: remitenteID,
            receptorID: receptorID,
          },
          {
            remitenteID: receptorID,
            receptorID: remitenteID,
          },
        ],
      },
      order: [["fechaEnvio", "ASC"]],
    });

    res.status(200).json(mensajes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const crearMensaje = async (req, res) => {
  try {
    const mensaje = {
      remitenteID: req.body.remitenteID,
      receptorID: req.body.receptorID,
      contenido: req.body.contenido,
      fechaEnvio: new Date(),
      ficheroAdjunto: req.body.ficheroAdjunto,
    };
    const nuevoMensaje = await mensajesModel.create(mensaje);
    res.status(201).json(nuevoMensaje); // Devuelve el mensaje creado
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  obtenerMensajesDeChat,
  crearMensaje,
};
