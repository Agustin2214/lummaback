const Categorias = require("../models/categorias")
const Tareas = require("../models/tareas")
const SubTareas = require("../models/subTareas")
const { where } = require("sequelize")


const categoriasGet = async (req,res)=>{

    const categorias= await Categorias.findAll()

    res.json(categorias)
}

const categoriasPost = async (req,res)=>{
    let  {name}  = req.body;
    console.log(name)
 
  try{

  const categorias = new Categorias({name})

  const existsCategorias = await Categorias.findOne({where:{name: name}})
  
  if(existsCategorias){
    return res.status(400).json({msg: 'categoria ya registrada'})
  }


  await categorias.save();
  

  res.json({
            categorias,
            
        });
}catch(error){
    console.log(error)
    res.json({msg: error})
  }
}


const categoriaDelete = async (req,res)=>{  
  let {uid} =req.query  

 const tareas = Tareas.findAll({where: { categoriaUid: uid }} )
 
 


  await Categorias.destroy({
    where: {
      uid: uid
    }})
 res.send("transaction destroy");    
}


module.exports = {categoriasGet, categoriasPost,categoriaDelete}