const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');
class Server {

    constructor() {
        this.app = express();
        this.usuariosPath = '/api/';

        //Middlewares
        this.middlewares();

        this.routes();
        
    }

    middlewares() {
        //En esta sección cargamos una serie de herramientas necesarias para todas las rutas.
        //Para los middlewares como estamos acostumbrados a usarlos en Laravel ver userRoutes y middlewares.
        //Para cors
        this.app.use(cors());
        //Para poder recibir la información que venga del body y parsearla de JSON, necesitamos importar lo siguiente.
        this.app.use(express.json());
        // this.app.use(body_parser.json());
        // this.app.use(body_parser.urlencoded({ extended: false }));
    }

    routes(){
        this.app.use(this.usuariosPath , require('../routes/userRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;