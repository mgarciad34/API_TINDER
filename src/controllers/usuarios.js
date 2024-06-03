const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const config = require("../database/config/config");

const { enviarCorreo } = require("../database/config/email");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
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
      { id: usuario.id, email: usuario.email, rolID: usuario.rolID },
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
      usuario.contrasena = await bcrypt.hash(nuevaContrasena, 10);

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
    const { contrasena } = req.body;
    const usuario = await UsuarioModel.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const contrasenaCifrada = await bcrypt.hash(contrasena, 10);
    usuario.contrasena = contrasenaCifrada;
    await usuario.save();
    return res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const obtenerRecomendaciones = async (req, res) => {
  try {
    const omitir = req.body.omitir || [];
    const idsAexcluir = [req.params.id, ...omitir];
    console.log("idsAexcluir", idsAexcluir);

    // Consulta para obtener los usuarios
    const usuarios = await UsuarioModel.findAll({
      where: {
        id: {
          [Op.notIn]: idsAexcluir,
        },
      },
      include: [
        {
          model: PreferenciasModel,
          as: "preferencia",
        },
      ],
    });

    if (!usuarios.length) {
      console.log(
        "No se encontraron usuarios que coincidan con los criterios de exclusión."
      );
      return res.status(200).json([]);
    } else {
      console.log(`Se encontraron ${usuarios.length} usuarios.`);
    }

    const recomendacionesFiltradas = usuarios.filter((usuario) => {
      const preferenciasUsuario = usuario.preferencia;

      // Logs para verificar los valores
      console.log(`Verificando usuario ${usuario.id}`);
      console.log("Preferencias del usuario:");
      console.log("Preferencias requeridas:");
      const coincide0 =
        preferenciasUsuario[0]?.valor === req.body.preferencia[0]?.valor;
      const coincide1 = compararRango(
        preferenciasUsuario[1]?.valor,
        req.body.preferencia[1]?.valor
      );
      const coincide2 = compararRango(
        preferenciasUsuario[2]?.valor,
        req.body.preferencia[2]?.valor
      );
      const coincide3 = compararRango(
        preferenciasUsuario[3]?.valor,
        req.body.preferencia[3]?.valor
      );
      const coincide4 =
        preferenciasUsuario[4]?.valor ===
        (req.body.preferencia[4]?.valor === "Tengo hijos"
          ? "Quiero hijos"
          : req.body.preferencia[4]?.valor === "No quiero hijos"
          ? "No quiero hijos"
          : "No tengo hijos");
      const coincide5 = compararGenero(
        usuario.genero,
        req.body.preferencia[5]?.valor
      );

      console.log(`Coincidencia 0: ${coincide0}`);
      console.log(`Coincidencia 1: ${coincide1}`);
      console.log(`Coincidencia 2: ${coincide2}`);
      console.log(`Coincidencia 3: ${coincide3}`);
      console.log(`Coincidencia 4: ${coincide4}`);
      console.log(`Coincidencia 5: ${coincide5}`);

      const rangosPreferenciales = [
        req.body.preferencia[1]?.valor,
        req.body.preferencia[2]?.valor,
        req.body.preferencia[3]?.valor,
      ];

      const coincideRango = rangosPreferenciales.some(
        (rango) =>
          compararRango(preferenciasUsuario[1]?.valor, rango) ||
          compararRango(preferenciasUsuario[2]?.valor, rango) ||
          compararRango(preferenciasUsuario[3]?.valor, rango)
      );
      console.log(
        "aaaaaaaaaaaaaaaaaaaaaaaaa",
        coincide0 && coincideRango && coincide4 && coincide5
      );
      return coincide0 && coincideRango && coincide4 && coincide5;
    });

    if (!recomendacionesFiltradas.length) {
      console.log(
        "No se encontraron recomendaciones que coincidan con las preferencias."
      );
    } else {
      console.log(
        `Se encontraron ${recomendacionesFiltradas.length} recomendaciones que coinciden.`
      );
    }

    const cantidadSolicitada = req.body.cantidad || 5;
    const recomendacionesLimitadas = recomendacionesFiltradas.slice(
      0,
      cantidadSolicitada
    );

    return res.status(200).json(recomendacionesLimitadas);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const like = async (req, res) => {
  try {
    const { usuarioID, amigoID } = req.body;
    const existeUsarioID = await UsuarioModel.findByPk(usuarioID);
    if (!existeUsarioID) {
      return res
        .status(404)
        .json({ error: "Usuario " + usuarioID + " no encontrado" });
    }
    const existeAmigoID = await UsuarioModel.findByPk(amigoID);
    if (!existeAmigoID) {
      return res
        .status(404)
        .json({ error: "Usuario " + amigoID + " no encontrado" });
    }
    const existeAmistad = await AmistadesModel.findOne({
      where: {
        [Op.or]: [
          { usuarioID: amigoID, amigoID: usuarioID },
          { usuarioID: usuarioID, amigoID: amigoID },
        ],
      },
    });
    if (existeAmistad) {
      if (
        existeAmistad.estado === "enviada" &&
        existeAmistad.usuarioID === amigoID
      ) {
        existeAmistad.estado = "match";
        await existeAmistad.save();
        return res.status(200).json({
          mensaje: "Solicitud de amistad aceptada",
          body: existeAmistad,
        });
      }
      if (
        existeAmistad.estado === "rechazado" &&
        existeAmistad.usuarioID === usuarioID
      ) {
        existeAmistad.estado = "enviada";
        await existeAmistad.save();
        return res.status(200).json({
          mensaje: "Solicitud de amistad enviada",
          body: existeAmistad,
        });
      }
    }
    const amistad = await AmistadesModel.create({
      usuarioID: usuarioID,
      amigoID: amigoID,
      fechaAmistad: new Date(),
      estado: "enviada",
    });
    return res
      .status(201)
      .json({ mensaje: "Solicitud de amistad enviada", body: amistad });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const dislike = async (req, res) => {
  try {
    const { usuarioID, amigoID } = req.body;
    const existeUsarioID = await UsuarioModel.findByPk(usuarioID);
    if (!existeUsarioID) {
      return res
        .status(404)
        .json({ error: "Usuario " + usuarioID + " no encontrado" });
    }
    const existeAmigoID = await UsuarioModel.findByPk(amigoID);
    if (!existeAmigoID) {
      return res
        .status(404)
        .json({ error: "Usuario " + amigoID + " no encontrado" });
    }

    console.log(usuarioID, amigoID);
    const existeAmistad = await AmistadesModel.findOne({
      where: {
        [Op.or]: [
          { usuarioID: amigoID, amigoID: usuarioID },
          { usuarioID: usuarioID, amigoID: amigoID },
        ],
      },
    });
    if (existeAmistad) {
      if (
        existeAmistad.estado === "enviada" &&
        existeAmistad.usuarioID === usuarioID
      ) {
        await existeAmistad.destroy();
        return res
          .status(200)
          .json({ mensaje: "Solicitud de amistad cancelada" });
      }
      if (
        existeAmistad.estado === "enviada" &&
        existeAmistad.usuarioID === amigoID
      ) {
        await existeAmistad.destroy();
        return res.status(200).json({
          mensaje: "Solicitud de amistad rechazada",
          body: existeAmistad,
        });
      }
      if (
        existeAmistad.estado === "rechazado" &&
        existeAmistad.usuarioID === usuarioID
      ) {
        await existeAmistad.destroy();
        return res
          .status(200)
          .json({ mensaje: "Dislike eliminado", body: existeAmistad });
      }
    }
    const amistad = await AmistadesModel.create({
      usuarioID: usuarioID,
      amigoID: amigoID,
      fechaAmistad: new Date(),
      estado: "rechazado",
    });
    return res.status(201).json({ mensaje: "Usuario omitido", body: amistad });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const verificarAmistad = async (req, res) => {
  try {
    const { usuarioID, amigoID } = req.body;

    // Verificar si usuarioID existe
    const existeUsuarioID = await UsuarioModel.findByPk(usuarioID);
    if (!existeUsuarioID) {
      return res
        .status(404)
        .json({ error: "Usuario " + usuarioID + " no encontrado" });
    }

    // Verificar si amigoID existe
    const existeAmigoID = await UsuarioModel.findByPk(amigoID);
    if (!existeAmigoID) {
      return res
        .status(404)
        .json({ error: "Usuario " + amigoID + " no encontrado" });
    }

    // Verificar si existe la amistad
    const existeAmistad = await AmistadesModel.findOne({
      where: {
        [Op.or]: [
          { usuarioID: amigoID, amigoID: usuarioID },
          { usuarioID: usuarioID, amigoID: amigoID },
        ],
      },
    });
    if (existeAmistad) {
      return res.status(200).json({
        mensaje: "Si hay solicitud",
        body: existeAmistad,
      });
    }

    return res
      .status(404)
      .json({ mensaje: "No hay una solicitud de amistad activa" });
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

function compararRango(valorUsuario, valorRequerido) {
  let rangoUsuario = obtenerRango(parseInt(valorUsuario));
  let rangoRequerido = obtenerRango(parseInt(valorRequerido));
  return rangoUsuario === rangoRequerido;
}
function obtenerRango(valor) {
  if (valor < 25) {
    return "0-25";
  } else if (valor < 50) {
    return "25-50";
  } else if (valor < 75) {
    return "50-75";
  } else {
    return "75-100";
  }
}
function compararGenero(generoUsuario, preferenciaGenero) {
  console.log(generoUsuario, preferenciaGenero);
  if (preferenciaGenero === "Ambos") {
    return generoUsuario === "Hombre" || generoUsuario === "Mujer";
  }
  if (preferenciaGenero === "Hombres") {
    return generoUsuario === "Hombre";
  }
  if (preferenciaGenero === "Mujeres") {
    return generoUsuario === "Mujer";
  }
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
  obtenerRecomendaciones,
  like,
  dislike,
  verificarAmistad,
};
