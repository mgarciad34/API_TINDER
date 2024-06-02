const express = require("express");
const router = express.Router();
const preferencia = require("../controllers/preferencia");
const auth = require("../middlewares/auth");

router.post("/preferencia/:id", auth.authUsuario, preferencia.crearPreferencia);
router.post(
  "/preferencias/:id",
  auth.authUsuario,
  preferencia.crearPreferencias
);
router.get(
  "/preferencias/:id",
  auth.authUsuario,
  preferencia.obtenerPreferenciasDeUsuario
);
router.put(
  "/preferencia/:id",
  auth.authUsuario,
  preferencia.actualizarPreferenciaDeUsuario
);
router.put(
  "/preferencias/:id",
  auth.authUsuario,
  preferencia.actualizarPreferenciasDeUsuario
);
router.delete(
  "/preferencia/:id",
  auth.authUsuario,
  preferencia.eliminarPreferenciaDeUsuario
);
router.delete(
  "/preferencias/:id",
  auth.authUsuario,
  preferencia.eliminarPreferenciasDeUsuario
);

module.exports = router;
