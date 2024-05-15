const bcrypt = require("bcrypt");
const db = require("../database/models");

const UsuarioModel = db.getModel("Usuarios");

const crearUsuario = async (req, res) => {
  try {
    const existeUsuarioEmail = await UsuarioModel.findOne({
      where: { Email: req.body.Email },
    });

    if (existeUsuarioEmail) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    const contrasenaCifrada = await bcrypt.hash(req.body.Contraseña, 10);

    console.log(req.body);

    const nuevoUsuario = await UsuarioModel.create({
      Nombre: req.body.Nombre,
      Email: req.body.Email,
      Contraseña: contrasenaCifrada,
      Foto: req.body.Foto,
      Nick: req.body.Nick,
      FechaCreacion: new Date(),
      RolID: req.body.RolID,
      Estado: "inactivo",
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

module.exports = {
  crearUsuario,
};
