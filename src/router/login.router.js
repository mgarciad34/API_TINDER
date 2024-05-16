const router = require("express").Router();
const usuarios = require('../controllers/usuarios');

// Definir la ruta para loguear un usuario
router.post("/login", usuarios.login)


module.exports = router;