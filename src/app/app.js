const express = require('express')
const routerRegistro = require('../router/registro.router')
const morgan = require("morgan")
require('dotenv').config();

const api = process.env.api
const app = express()

// Mostramos rutas con el tipo de peticion por consola
app.use(morgan("dev"))
app.use(express.json())

app.get('/', (req, res) =>{
    res.send('Abierto el servicio de Tinder')
})

// Aqui llamamos a los archivos router
app.use(api, routerRegistro)


module.exports = app;