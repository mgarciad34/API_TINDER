const db = require("../database/models");
const EventosModel = db.getModel("eventos");
const InscripcionesEventosModel = db.getModel("inscripcionesEventos");

const crearEvento = async (req, res) => {
  try {
    const nuevoEvento = await EventosModel.create({
      nombre: req.body.nombre,
      fechaRealizacion: req.body.fechaRealizacion,
      geolocalizacion: req.body.geolocalizacion,
      descripcion: req.body.descripcion,
      fechaCierreInscripcion: req.body.fechaCierreInscripcion,
    });

    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const obtenerEventos = async (req, res) => {
  try {
    const eventos = await EventosModel.findAll({
      include: [
        {
          model: InscripcionesEventosModel,
          as: "inscripcioneseventos",
        },
      ],
    });

    eventos.forEach((evento) => {
      if (evento.dataValues.fechaRealizacion < new Date()) {
        eliminarEventoBackend(evento.dataValues.id);
        eventos.splice(eventos.indexOf(evento), 1);
      }
    });

    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const obtenerEventosId = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await EventosModel.findByPk(id, {
      include: [
        {
          model: InscripcionesEventosModel,
          as: "inscripcioneseventos",
        },
      ],
    });
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    return res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const actualizarEvento = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const [filasActualizadas] = await EventosModel.update(datosActualizados, {
      where: { id: id },
    });

    if (filasActualizadas === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se realizaron cambios en el evento." });
    }

    const eventoActualizado = await EventosModel.findByPk(id);

    return res.status(200).json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const eliminarEvento = async (req, res) => {
  try {
    const { id } = req.params;

    const eventoEliminado = await EventosModel.destroy({
      where: { id: id },
    });
    if (eventoEliminado === 0) {
      return res
        .status(404)
        .json({ error: "Evento no encontrado o ya fue eliminado" });
    }

    return res.status(200).json({ mensaje: "Evento eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const inscribirseAEvento = async (req, res) => {
  try {
    const inscripcionExistente = await InscripcionesEventosModel.findOne({
      where: { usuarioID: req.body.idUsuario, eventoID: req.body.idEvento },
    });

    if (inscripcionExistente) {
      return res
        .status(404)
        .json({ error: "Ya se encuentra inscripto en este evento" });
    }

    const nuevaInscripcion = await InscripcionesEventosModel.create({
      usuarioID: req.body.idUsuario,
      eventoID: req.body.idEvento,
      fechaInscripcion: new Date(),
    });

    res.status(201).json(nuevaInscripcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const desinscribirseAEvento = async (req, res) => {
  try {
    const inscripcion = await InscripcionesEventosModel.destroy({
      where: { usuarioID: req.body.idUsuario, eventoID: req.body.idEvento },
    });

    if (inscripcion === 0) {
      return res
        .status(404)
        .json({ error: "Inscripción no encontrada o ya fue eliminada" });
    }

    return res
      .status(200)
      .json({ mensaje: "Inscripción eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

function eliminarEventoBackend(id) {
  EventosModel.destroy({
    where: { id: id },
  });
}
module.exports = {
  crearEvento,
  obtenerEventos,
  obtenerEventosId,
  actualizarEvento,
  eliminarEvento,
  inscribirseAEvento,
  desinscribirseAEvento,
};
