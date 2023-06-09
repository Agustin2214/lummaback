const { Sequelize,DataTypes } = require('sequelize');

const db = require("../db/connection")



const categorias = db.define('categorias',{
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

    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : true,
    },
}
)

module.exports = categorias;