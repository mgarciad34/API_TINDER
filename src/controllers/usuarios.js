const usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');
const conexionDB = require('../database/sequelize.connection');

const registrarUsuario = async (req, res) => {
    try {
        // Verificar la conexión a la base de datos
        await conexionDB.comprobarConexion();

        // Crear una nueva instancia del modelo de usuario
        const nuevoUsuario = await usuarios.create({
            Nombre: req.body.Nombre,
            Email: req.body.Email,
            Contraseña: req.body.Contraseña,
            Foto: req.body.Foto,
            Nick: req.body.Nick,
            FechaCreacion: new Date(),
            RolID: req.body.RolID,
            Estado: 'inactivo'
        });

        const contrasenaCifrada = await bcrypt.hash(nuevoUsuario.Contraseña, 10);
        nuevoUsuario.Contraseña = contrasenaCifrada;

        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado', data: nuevoUsuario });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    registrarUsuario
};
