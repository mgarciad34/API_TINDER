const router = require("express").Router();


router.post('/registro', (req, res) =>{
    res.send('Formulario de registro')
})


module.exports = router;