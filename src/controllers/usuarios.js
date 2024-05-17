const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const config = require('../database/config/config')
const { enviarCorreo } = require('../database/config/email');
const jwt = require("jsonwebtoken");
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

    const contrasenaCifrada = await bcrypt.hash(req.body.Contraseña, 10);

    console.log(req.body)

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

    // Enviar la respuesta con el nuevo usuario creado
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

const login = async (req, res) => {
     try {
       // Buscar si ya existe un usuario con el correo electrónico proporcionado
       const usuario = await UsuarioModel.findOne({
         where: { Email: req.body.Email },
       });
   
       // Si no existe un usuario con ese correo electrónico, devolver un error
       if (!usuario) {
         return res.status(404).json({ error: "Usuario no encontrado" });
       }
   
       // Verificar si la contraseña proporcionada es correcta
       const contrasenaCorrecta = await bcrypt.compare(
         req.body.Contraseña,
         usuario.Contraseña
       );
   
       // Si la contraseña no es correcta, devolvera un error
       if (!contrasenaCorrecta) {
         return res.status(401).json({ error: "Contraseña incorrecta" });
       }
   
       // Si el usuario y la contraseña son correctos, generar un token
       const token = jwt.sign({ id: usuario.id, email: usuario.Email }, config.development.token_secret, {
         expiresIn: '1h' // Opcional: configurar la expiración del token
       });
   
       // Enviar la respuesta con el usuario encontrado y el token JWT
       return res.status(200).json({ usuario, token });
     } catch (error) {
       // Manejar cualquier error que ocurra durante el proceso
       res.status(500).json({ error: error.message });
       console.error(error);
     }
   };

   const obtenerUsuarios = async (req, res) => {
    try {
      const usuarios = await UsuarioModel.findAll();
      return res.status(200).json(usuarios); 
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error(error);
    }
  };
   
  const obtenerUsuarioId = async (req, res) => {
     console.log(req.params.id)
  try {
    const usuario = await UsuarioModel.findByPk(req.params.id);
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
  const { id } = req.params; // Obtener el ID del usuario de los parámetros de la URL
  const datosActualizados = req.body; // Obtener los datos a actualizar del cuerpo de la solicitud

  try {
    // Actualizar el usuario con los nuevos datos
    const [filasActualizadas] = await UsuarioModel.update(datosActualizados, {
      where: { id: id }
    });

    // Verificar si se actualizaron filas
    if (filasActualizadas === 0) {
      // Si no se actualizó ninguna fila, podría ser que los datos son iguales
      return res.status(200).json({ mensaje: "No se realizaron cambios en el usuario." });
    }

    // Obtener los datos actualizados del usuario
    const usuarioActualizado = await UsuarioModel.findByPk(id);

    // Devolver una respuesta con el usuario actualizado
    return res.status(200).json(usuarioActualizado);
  } catch (error) {
    // Si hay un error en la operación, devolver un error 500
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
       const { comprobarEmail } = req.body.Email;
       const usuario = await models.usuario.findOne({ where: { email: comprobarEmail } });
       
       if (!usuario) {
         return res.status(404).send({
           message: "Usuario no encontrado",
         });
       } else {
         // Generar una contraseña aleatoria
         const nuevaContrasena = generarContrasenaAleatoria();
         // Actualizar la contraseña del usuario
         usuario.Contraseña =  await bcrypt.hash(nuevaContrasena, 10);
        
         await usuario.save();
  
         const body = {
           from: config.development.email_user,
           to: `${comprobarEmail}`,
           subject: "Recuperacion de Contraseña",
           html: `<h2>Hola ${comprobarEmail}</h2>
                  <p>Se acaba de realizar una solicitud para recuperar la contraseña en su cuenta de <strong>SwipeSpark!</strong></p>
                  <p style="margin-bottom:20px;">Tu nueva contraseña es: <strong>${nuevaContrasena}</strong></p>

                  <p style="margin-bottom:0px;">Un saludo</p>
                  <strong>SwipeSpark</strong>`,
         };
                 
         const message = "Revisa tu correo para restablecer tu contraseña";
         enviarCorreo(body, res, message);
       }
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   };
   
   // Función para generar una contraseña aleatoria
   function generarContrasenaAleatoria() {
     const length = 10;
     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
  recuperarContrasena
};
