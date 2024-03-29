const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.authProfPath = '/api/authProf';
        this.alumnoPath = '/api/alumnos';
        this.profesorPath = '/api/profesores';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.authProfPath, require('../routes/authProf.routes'));
        this.app.use(this.alumnoPath, require('../routes/alumno.routes'));
        this.app.use(this.profesorPath, require('../routes/profesor.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose', this.port)
        });
    }
}

module.exports = Server;