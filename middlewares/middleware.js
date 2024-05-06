let valores = require('../models/basededatos')

const enLimite = (req, res, next) => {
    let indice = parseInt(req.params.id,10);
    if (indice >= 0 && indice < valores.valores.length){
        next();
    } else {
        res.status(403).json({'msg' : 'No puedes pasar..'});
    }
}

const ejemploParaRutas = (req, res, next) => {
    if (1 == 1){
        next();
    } else {
        res.status(403).json({'msg' : 'No puedes pasar llama de Udhüm..'});
    }
}

module.exports = {
    enLimite,
    ejemploParaRutas
}