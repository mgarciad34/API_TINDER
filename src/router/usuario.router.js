const express = require('express');
const router = express.Router();
const usuarios = require('../controllers/usuarios');

// Definir la ruta para obtener un usuario por ID
router.get("/usuario/:id", usuarios.obtenerUsuarioId);

module.exports = router;
