const bcrypt = require('bcrypt');
const db = require('../database/models');

const UsuarioModel = db.getModel('Usuarios')

const crearUsuario = async (req, res) => {
    try {
        
        const contrasenaCifrada = await bcrypt.hash(nuevoUsuario.Contraseña, 10);

        const nuevoUsuario = await UsuarioModel.create({
            Nombre: req.body.Nombre,
            Email: req.body.Email,
            Contraseña: contrasenaCifrada,
            Foto: req.body.Foto, 
            Nick: req.body.Nick,
            FechaCreacion: new Date(),
            RolID: req.body.RolID,
            Estado: 'inactivo'
        });
        console.log(nuevoUsuario)

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    crearUsuario
};
