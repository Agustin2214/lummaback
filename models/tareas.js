const { Sequelize,DataTypes } = require('sequelize');
const db = require("../db/connection")



const tareas = db.define('tareas',{
    uid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Estado:{
        type: DataTypes.STRING,
        allowNull: true,
    },

    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : true,
    },
}
)
module.exports = tareas;