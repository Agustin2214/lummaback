const SubTareas = require("../models/subTareas")
const Tarea = require("../models/tareas")
const Categorias = require("../models/categorias")



const subTareasGet = async (req,res)=>{

  const subTareas = await SubTareas.findAll({
    include: {
      model: Tarea,
      attributes: ['name'],
      include: {
        model: Categorias,
        attributes: ['name']
      }
    }
  });


    res.json(subTareas)
}





const subtareasGetbyId = async (req,res)=>{

  let {uid} = req.query
   

   const subtareas = await SubTareas.findAll({ where: { tareaUid: uid } })

 res.json(subtareas)


}      



const subTareasPost = async (req,res)=>{
    let  {name,tareaUid,estado}  = req.body;

// Validar que la categoría existe en la base de datos
try{
     const tarea = await Tarea.findOne({ where: { uid: tareaUid } })
     if (!tarea) {
       return res.status(400).json({ error: 'La categoría no es válida' });
     }
    }catch (error) {
        return res.status(400).json({ error: 'La categoría no es válida' });
    }

  try{

  const subTareas = new SubTareas({name,tareaUid,estado})

  const existsTareas = await SubTareas.findOne({where:{name: name}})
  
  if(existsTareas){
    return res.status(400).json({msg: 'tarea ya registrada'})
  }


  await subTareas.save();
  

  res.json({
            subTareas,
            
        });
}catch(error){
    console.log(error)
    res.json({msg: error})
  }
}


const deleteSubtareas = async (req,res)=>{  
  let {uid} =req.query  

  await SubTareas.destroy({
    where: {
      uid: uid
    }})
 res.send("transaction destroy");    
}

module.exports = {subTareasPost,subTareasGet,subtareasGetbyId,deleteSubtareas}