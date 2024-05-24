const express = require('express');
const router = express.Router();
const preferencia = require('../controllers/preferencia');

router.post("/preferencia/:id", preferencia.crearPreferencia);
router.post("/preferencias/:id", preferencia.crearPreferencias);
router.get("/preferencias/:id", preferencia.obtenerPreferenciasDeUsuario);
router.put("/preferencia/:id", preferencia.actualizarPreferenciaDeUsuario);
router.put("/preferencias/:id", preferencia.actualizarPreferenciasDeUsuario);
router.delete("/preferencia/:id", preferencia.eliminarPreferenciaDeUsuario);
router.delete("/preferencias/:id", preferencia.eliminarPreferenciasDeUsuario);

module.exports = router;
