// src/router/mensajes.router.js

const express = require("express");
const router = express.Router();
const mensajesController = require("../controllers/mensajes.js");

router.get("mensajes/:remiID/:receID", mensajesController.obtenerMensajesDeChat);

module.exports = router;
