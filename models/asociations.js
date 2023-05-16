const User = require("../models/user")
const Categorias = require("../models/categorias")
const SubTareas = require("../models/subTareas")
const Tareas = require("../models/tareas")
const Excel = require("../models/excel")

Categorias.hasMany(Tareas, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Tareas.belongsTo(Categorias, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Tareas.hasMany(SubTareas, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
SubTareas.belongsTo(Tareas, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})


Excel.belongsTo(Categorias)
Excel.belongsTo(SubTareas)
Excel.belongsTo(Tareas)


