const express = require("express")
const cors = require('cors')
const db = require("../db/connection");


// create model
const User = require("../models/user")
const Categorias = require("../models/categorias")
const SubTareas = require("../models/subTareas")
const Tareas = require("../models/tareas")
const Asociations = require("../models/asociations")
const Excel = require("../models/excel")

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

//Rutas

//Data Base connection
        this.dbConnection()

//Lectura y parseo a JSON
        this.app.use(express.json())

//Middlewates
        this.middlewares()
//Rutas de mi aplicacion
        this.routes()

}

   async dbConnection(){
        try{
                await db.sync({force: false})
                console.log('DB ONLINE')
        }catch(error) {
                throw new Error(error)
        }
   
    }     

    middlewares(){

//Directorio publico
        this.app.use(express.static('public'));
//Cors
        this.app.use(cors())
}

    routes(){
        this.app.use('/api/users', require('../routes/user'))
        this.app.use('/api/auth', require('../routes/auth'))
        this.app.use('/api/cat', require('../routes/categorias'))
        this.app.use('/api/tareas', require('../routes/tareas'))
        this.app.use('/api/sub', require('../routes/subTareas'))
        this.app.use('/api/excel', require('../routes/excel'))
}

    listen(){

        this.app.listen(this.port,()=>{
        console.log(`Server running on port`,this.port)
    });
}

}


module.exports = Server;