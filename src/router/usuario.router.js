const express = require('express');
const router = express.Router();
const usuarios = require('../controllers/usuarios');

router.get("/usuarios", usuarios.obtenerUsuarios);
// Definir la ruta para obtener un usuario por ID
router.get("/usuario/:id", usuarios.obtenerUsuarioId);

router.put("/usuario/:id", usuarios.actualizarUsuario);
router.delete("/usuario/:id", usuarios.eliminarUsuario);
router.put("/usuario/pass/:id", usuarios.cambiarContraseña);
router.post("/usuarios/:cantidad/:id")

module.exports = router;
