const Tareas = require("../models/tareas")
const Categoria = require("../models/categorias")

const tareasGet = async (req,res)=>{

  const tareas = await Tareas.findAll({
    include: { model: Categoria, attributes: ['name'] }
  });

    res.json(tareas)
}


const tareasGetbyId = async (req,res)=>{

  let {uid} = req.query
   

   const tareas = await Tareas.findAll({ where: { categoriaUid: uid } })

 res.json(tareas)


}      




const tareasPost = async (req,res)=>{
    let  {name,categoriaUid,Estado}  = req.body;

// Validar que la categoría existe en la base de datos
try{
     const categoria = await Categoria.findOne({ where: { uid: categoriaUid } })
     if (!categoria) {
       return res.status(400).json({ error: 'La categoría no es válida' });
     }
    }catch (error) {
        return res.status(400).json({ error: 'La categoría no es válida' });
    }

  try{

  const tareas = new Tareas({name,categoriaUid,Estado})

  const existsTareas = await Tareas.findOne({where:{name: name}})
  
  if(existsTareas){
    return res.status(400).json({msg: 'tarea ya registrada'})
  }


  await tareas.save();
  

  res.json({
            tareas,
            
        });
}catch(error){
    console.log(error)
    res.json({msg: error})
  }
}

const tareasDelete = async (req,res)=>{  
  let {uid} =req.query  

  await Tareas.destroy({
    where: {
      uid: uid
    }})
 res.send("transaction destroy");    
}

module.exports = {tareasPost,tareasGet,tareasGetbyId,tareasDelete}