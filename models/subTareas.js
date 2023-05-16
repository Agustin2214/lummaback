const { Sequelize,DataTypes } = require('sequelize');
const db = require("../db/connection")



const subTareas = db.define('subTareas',{
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
    estado:{
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

module.exports = subTareas;