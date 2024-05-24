const express = require('express');
const router = express.Router();
const eventos = require('../controllers/eventos');

router.post('/crear/evento', eventos.crearEvento);
router.get("/eventos", eventos.obtenerEventos);
router.get("/evento/:id", eventos.obtenerEventos);
router.put("/evento/:id", eventos.actualizarEvento);
router.delete("/evento/:id", eventos.eliminarEvento);

module.exports = router