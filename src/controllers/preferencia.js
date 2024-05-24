const db = require("../database/models");
const PreferenciaModel = db.getModel("preferencias");
const UsuarioModel = db.getModel("usuarios");

const crearPreferencia = async (req, res) => {
  try {
    const existeUsuario = await UsuarioModel.findByPk(req.body.usuarioID);
    if (existeUsuario) {
      const existe = await PreferenciaModel.findOne({
        where: {
          usuarioID: req.body.usuarioID,
          tipo: req.body.tipo,
        },
      });
      if (existe) {
        return res.status(409).json({
          error: "Ya existe una preferencia de este tipo para este usuario",
        });
      } else {
        const nuevaPreferencia = await PreferenciaModel.create({
          valor: req.body.valor,
          usuarioID: req.body.usuarioID,
          tipo: req.body.tipo,
        });
        res.status(201).json(nuevaPreferencia);
      }
    } else {
      return res.status(404).json({ error: "El usuario no existe" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const crearPreferencias = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const existeUsuario = await UsuarioModel.findByPk(usuarioId);
    if (!existeUsuario) {
      return res.status(404).json({ error: "El usuario no existe" });
    } else {
      const preferencias = req.body.map((pref) => ({
        ...pref,
        usuarioID: usuarioId,
      }));
      const nuevasPreferencias = await PreferenciaModel.bulkCreate(
        preferencias
      );
      res.status(201).json(nuevasPreferencias);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const obtenerPreferenciasDeUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const existeUsuario = await UsuarioModel.findByPk(usuarioId);
    if (!existeUsuario) {
      return res.status(404).json({ error: "El usuario no existe" });
    } else {
      const preferencias = await PreferenciaModel.findAll({
        where: {
          usuarioID: usuarioId,
        },
      });
      res.status(200).json(preferencias);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const actualizarPreferenciaDeUsuario = async (req, res) => {
  try {
    existeUsuario = await UsuarioModel.findByPk(req.params.id);
    if (!existeUsuario || existeUsuario == null || existeUsuario == undefined) {
      return res.status(404).json({ error: "El usuario no existe" });
    } else {
      const preferencia = await PreferenciaModel.update(
        {
          valor: req.body.valor,
          tipo: req.body.tipo,
        },
        {
          where: {
            usuarioID: req.params.id,
            id: req.body.id,
          },
        }
      );
      res.status(200).json(preferencia);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const actualizarPreferenciasDeUsuario = async (req, res) => {
  try {
    existeUsuario = await UsuarioModel.findByPk(req.params.id);
    if (!existeUsuario || existeUsuario == null || existeUsuario == undefined) {
      return res.status(404).json({ error: "El usuario no existe" });
    } else {
      const preferencias = req.body;
      preferencias.forEach(async (preferencia) => {
        await PreferenciaModel.update(
          {
            valor: preferencia.valor,
            tipo: preferencia.tipo,
          },
          {
            where: {
              UsuarioID: req.params.id,
              id: preferencia.id,
            },
          }
        );
      });
      res.status(200).json(preferencias);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const eliminarPreferenciaDeUsuario = async (req, res) => {
  try {
    existeUsuario = await UsuarioModel.findByPk(req.params.id);
    if (!existeUsuario || existeUsuario == null || existeUsuario == undefined) {
      return res.status(404).json({ error: "El usuario no existe" });
    } else {
      const preferencia = await PreferenciaModel.destroy({
        where: {
          usuarioID: req.params.id,
          id: req.body.id,
        },
      });
      res.status(200).json(preferencia);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const eliminarPreferenciasDeUsuario = async (req, res) => {
  try {
    existeUsuario = await UsuarioModel.findByPk(req.params.id);
    if (!existeUsuario || existeUsuario == null || existeUsuario == undefined) {
      return res.status(404).json({ error: "El usuario no existe" });
    } else {
      const preferencias = await PreferenciaModel.destroy({
        where: {
          usuarioID: req.params.id,
        },
      });
      res.status(200).json(preferencias);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

module.exports = {
  crearPreferencia,
  crearPreferencias,
  obtenerPreferenciasDeUsuario,
  actualizarPreferenciaDeUsuario,
  actualizarPreferenciasDeUsuario,
  eliminarPreferenciaDeUsuario,
  eliminarPreferenciasDeUsuario,
};
