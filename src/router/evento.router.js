const express = require("express");
const router = express.Router();
const eventos = require("../controllers/eventos");
const auth = require("../middlewares/auth");

router.post("/crear/evento", auth.authAdministrador, eventos.crearEvento);
router.get("/eventos", eventos.obtenerEventos);
router.get("/evento/:id", eventos.obtenerEventos);
router.put("/evento/:id", auth.authAdministrador, eventos.actualizarEvento);
router.delete("/evento/:id", auth.authAdministrador, eventos.eliminarEvento);

router.post("/evento/inscribir",  eventos.inscribirseAEvento);
router.post("/evento/desinscribir",  eventos.desinscribirseAEvento);

module.exports = router;
     