const express = require('express');
const usuarios = require('../controllers/usuarios');

const router = express.Router();

// Definir la ruta para registrar un nuevo usuario
router.post('/registrar', usuarios.registrarUsuario);

module.exports = router;
