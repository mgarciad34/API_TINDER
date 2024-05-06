const express = require('express')

const app = express()

app.get('/', (req, res) =>{
    res.send('Abierto el servicio de Tinder')
})

module.exports = app;