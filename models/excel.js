const { Sequelize,DataTypes } = require('sequelize');
const moment = require('moment');
const db = require("../db/connection")



const excel = db.define('excel',{
    uid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    horas:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CantidadProducida:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userR:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    tareaR:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtareaR:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoriaR:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
          const rawValue = this.getDataValue('createdAt');
          return moment(rawValue).format('DD/MM/YYYY');
        }
      }
   
}
)

module.exports = excel;