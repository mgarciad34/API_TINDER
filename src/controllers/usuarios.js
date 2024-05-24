const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const config = require("../database/config/config");

const { enviarCorreo } = require("../database/config/email");
const jwt = require("jsonwebtoken");
const UsuarioModel = db.getModel("usuarios");
const PreferenciasModel = db.getModel("preferencias");
const AmistadesModel = db.getModel("amistades");
const MensajesModel = db.getModel("mensajes");
const InscripcionesEventosModel = db.getModel("inscripcionesEventos");
const RolesModel = db.getModel("roles");

const crearUsuario = async (req, res) => {
  try {
    const existeUsuarioEmail = await UsuarioModel.findOne({
      where: { email: req.body.email.toLowerCase() },
    });

    if (existeUsuarioEmail) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    const contrasenaCifrada = await bcrypt.hash(req.body.contrasena, 10);
    const nuevoUsuario = await UsuarioModel.create({
      nombre: req.body.nombre,
      email: req.body.email.toLowerCase(),
      contrasena: contrasenaCifrada,
      foto: req.body.foto,
      nick: req.body.nick,
      rolID: req.body.rolID,
      estado: "inactivo",
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
    console.error(error);
  }
};
const login = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findOne({
      where: { email: req.body.email },
    });
    console.log(usuario);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const contrasenaCorrecta = await bcrypt.compare(
      req.body.contrasena,
      usuario.contrasena
    );

    if (!contrasenaCorrecta) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      config.development.token_secret,
      {
        expiresIn: "1h", // Opcional: configurar la expiración del token
      }
    );
    return res.status(200).json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.findAll({
      include: [
        {
          model: PreferenciasModel,
          as: "preferencia",
        },
        {
          model: AmistadesModel,
          as: "amistades",
        },
        {
          model: AmistadesModel,
          as: "amigo_amistades",
        },
        {
          model: MensajesModel,
          as: "mensajes",
        },
        {
          model: InscripcionesEventosModel,
          as: "inscripcioneseventos",
        },

        {
          model: RolesModel,
          as: "rol",
        },
      ],
    });
    return res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const obtenerUsuarioId = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findByPk(req.params.id, {
      include: [
        {
          model: PreferenciasModel,
          as: "preferencia",
        },
        {
          model: AmistadesModel,
          as: "amistades",
        },
        {
          model: AmistadesModel,
          as: "amigo_amistades",
        },
        {
          model: MensajesModel,
          as: "mensajes",
        },
        {
          model: InscripcionesEventosModel,
          as: "inscripcioneseventos",
        },
        {
          model: RolesModel,
          as: "rol",
        },
      ],
    });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const [filasActualizadas] = await UsuarioModel.update(datosActualizados, {
      where: { id: id },
    });

    if (filasActualizadas === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se realizaron cambios en el usuario." });
    }
    const usuarioActualizado = await UsuarioModel.findByPk(id);
    return res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await UsuarioModel.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await usuario.destroy();
    return res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const recuperarContrasena = async (req, res) => {
  try {
    const comprobarEmail = req.body.email;
    const usuario = await UsuarioModel.findOne({
      where: { email: comprobarEmail },
    });
    if (!usuario) {
      return res.status(404).send({
        message: "Usuario no encontrado",
      });
    } else {
      // Generar una contraseña aleatoria
      const nuevaContrasena = generarContrasenaAleatoria();
      // Actualizar la contraseña del usuario
      usuario.Contraseña = await bcrypt.hash(nuevaContrasena, 10);

      await usuario.save();
      const body = {
        from: config.development.email_user,
        to: `${comprobarEmail}`,
        subject: "Recuperacion de Contraseña",
        html: `<h2>Hola ${comprobarEmail}</h2>
                  <p>Acabamos de realizar una solicitud para recuperar la contraseña en su cuenta de <strong>SwipeSpark!</strong></p>
                  <p style="margin-bottom:20px;">Tu nueva contraseña es: <strong>${nuevaContrasena}</strong></p>

                  <p style="margin-bottom:0px;">Un saludo</p>
                  <strong>SwipeSpark</strong>`,
      };

      const message = "Revisa tu correo para restablecer tu contraseña";
      enviarCorreo(body, res, message);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const cambiarContraseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { Contraseña } = req.body;
    console.log(Contraseña);
    console.log(id);
    const usuario = await UsuarioModel.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const contrasenaCifrada = await bcrypt.hash(Contraseña, 10);
    usuario.Contraseña = contrasenaCifrada;
    await usuario.save();
    return res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const obtenerUsuariosClasificados = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.findAll({});
    return res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

// Función para generar una contraseña aleatoria
function generarContrasenaAleatoria() {
  const length = 10;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

module.exports = {
  crearUsuario,
  login,
  obtenerUsuarios,
  obtenerUsuarioId,
  actualizarUsuario,
  eliminarUsuario,
  recuperarContrasena,
  cambiarContraseña,
};
