const router = require("express").Router();
const usuarios = require('../controllers/usuarios');

// Definir la ruta para registrar un nuevo usuario
router.post('/registrar', usuarios.crearUsuario);

//Ruta para recuperar la contraseña
router.post('/recuperar', usuarios.recuperarContrasena);

module.exports = router;
