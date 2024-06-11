const express = require("express");
const router = express.Router();
const usuarios = require("../controllers/usuarios");
const auth = require("../middlewares/auth");

router.post("/login", usuarios.login);

router.post("/registrar", usuarios.crearUsuario);

router.post("/recuperar", usuarios.recuperarContrasena);

router.get("/usuarios", auth.authAdministrador, usuarios.obtenerUsuarios);
router.get("/usuario/:id", usuarios.obtenerUsuarioId);

router.put("/usuario/:id", usuarios.actualizarUsuario);
router.delete("/usuario/:id", auth.authAdministrador, usuarios.eliminarUsuario);
router.put("/usuario/pass/:id", usuarios.cambiarContraseña);

router.post(
  "/usuarios/recomendaciones/:cantidad/:id",
  usuarios.obtenerRecomendaciones
);

router.post("/usuario/like", usuarios.like);

router.post("/usuario/dislike", usuarios.dislike);

router.post("/usuario/verificarAmistad", usuarios.verificarAmistad);

module.exports = router;
