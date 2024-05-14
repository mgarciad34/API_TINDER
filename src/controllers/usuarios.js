const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const UsuarioModel = db.getModel("Usuarios");

const crearUsuario = async (req, res) => {
  try {
    const existeUsuarioEmail = await UsuarioModel.findOne({
      Email: req.body.Email,
    });
    if (existeUsuarioEmail) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    const contrasenaCifrada = await bcrypt.hash(req.body.Contraseña, 10);

    const imgPath = req.body.Foto;

    if (!fs.existsSync(imgPath)) {
      return res.status(400).json({ error: "Imagen no encontrada" });
    }

    const imgBase64 = `data:image/jpeg;base64,${fs
      .readFileSync(imgPath)
      .toString("base64")}`;

    const nuevoUsuario = await UsuarioModel.create({
      Nombre: req.body.Nombre,
      Email: req.body.Email,
      Contraseña: contrasenaCifrada,
      Foto: imgBase64,
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
