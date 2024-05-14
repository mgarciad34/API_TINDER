const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const UsuarioModel = db.getModel("Usuarios");

const crearUsuario = async (req, res) => {
  try {
    // Buscar si ya existe un usuario con el correo electrónico proporcionado
    const existeUsuarioEmail = await UsuarioModel.findOne({
      where: { Email: req.body.Email },
    });

    // Si existe un usuario con ese correo electrónico, devolver un error
    if (existeUsuarioEmail) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    // Si no existe un usuario con ese correo electrónico, proceder a crear el nuevo usuario
    const contrasenaCifrada = await bcrypt.hash(req.body.Contraseña, 10);

    const imgPath = req.body.Foto;

    // Verificar si la imagen existe
    if (!fs.existsSync(imgPath)) {
      return res.status(400).json({ error: "Imagen no encontrada" });
    }

    // Leer la imagen y convertirla a base64
    const imgBase64 = `data:image/jpeg;base64,${fs
      .readFileSync(imgPath)
      .toString("base64")}`;

    // Crear el nuevo usuario en la base de datos
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

    // Enviar la respuesta con el nuevo usuario creado
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

module.exports = {
  crearUsuario,
};
