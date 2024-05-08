const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');
const conexionDB = require('../database/sequelize.connection');

const registrarUsuario = async (req, res) => {
    try {
        if(conexionDB.comprobarConexion == 0){
            const nuevoUsuario = await Usuarios.create({
                Nombre: req.body.Nombre,
                Email: req.body.Email,
                Contraseña: req.body.Contraseña,
                Foto: req.body.Foto, 
                Nick: req.body.Nick,
                FechaCreacion: new Date(),
                RolID: req.body.RolID,
                Estado: req.body.Estado || 'inactivo'
            });
    
            const contrasenaCifrada = await bcrypt.hash(nuevoUsuario.Contraseña, 10);
            await nuevoUsuario.update({ Contraseña: contrasenaCifrada });
    
            await nuevoUsuario.save();
            res.status(201).json(nuevoUsuario);
        }
        
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    registrarUsuario
};
