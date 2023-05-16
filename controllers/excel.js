const XlsxPopulate = require('xlsx-populate');

const SubTareas = require("../models/subTareas")
const Tareas = require("../models/tareas")
const Categoria = require("../models/categorias")
const User = require("../models/user")
const Excel = require("../models/excel")





const ExcelPost = async (req,res)=>{

    let  {userUid,subTareaUid,tareaUid,categoriaUid,horas,descripcion,CantidadProducida}  = req.body;

    const users = await User.findOne(( {where: { uid: userUid }}))
    const subTareas= await SubTareas.findOne( {where: { uid: subTareaUid }})
    const tareas= await Tareas.findOne(( {where: { uid: tareaUid }}))
    const categorias= await Categoria.findOne(( {where: { uid: categoriaUid }}))

let userR = users.dataValues.name
let subtareaR = subTareas.dataValues.name
let tareaR = tareas.dataValues.name
let categoriaR= categorias.dataValues.name



try{
    const ExcelC = new Excel({userUid,subTareaUid,tareaUid,categoriaUid,horas,userR,subtareaR,tareaR,categoriaR,descripcion,CantidadProducida})
   
let array = []
console.log(ExcelC.dataValues.createdAt)
console.log(array)
array.push({descripcion:ExcelC.dataValues.descripcion,fecha:ExcelC.dataValues.createdAt,usuario: users.dataValues.name,categoria: categorias.dataValues.name,tarea: tareas.dataValues.name,subtarea: subTareas.dataValues.name,horas,CantidadProducida})
console.log(array)
await ExcelC.save();

////////////////////
console.log(ExcelC)

async function agregarDatosExcel(datos) {
    // Cargar archivo de Excel existente
    const workbook = await XlsxPopulate.fromFileAsync('C:\hola.xlsx');
  
    // Obtener la hoja de trabajo deseada (en este ejemplo, la hoja de trabajo 1)
    const sheet = workbook.sheet('Hoja1');
  
    // Obtener la última fila existente en la hoja de trabajo
  //  const lastRow = sheet.usedRange().bottomRowIndex();
  const lastRow = sheet.usedRange().endCell().rowNumber();
    // Agregar cada fila de datos a la hoja de trabajo
    datos.forEach((fila, index) => {
      const rowIndex = lastRow + index + 1;
      sheet.cell(`A${rowIndex}`).value(fila.fecha);
      sheet.cell(`B${rowIndex}`).value(fila.usuario);
      sheet.cell(`C${rowIndex}`).value(fila.categoria);
      sheet.cell(`D${rowIndex}`).value(fila.tarea);
      sheet.cell(`E${rowIndex}`).value(fila.subtarea);
      sheet.cell(`F${rowIndex}`).value(fila.horas);
      sheet.cell(`G${rowIndex}`).value(fila.CantidadProducida);
      sheet.cell(`H${rowIndex}`).value(fila.descripcion);
    });
  
    // Guardar los cambios en el archivo de Excel
    await workbook.toFileAsync('C:\hola.xlsx');
  }
///
agregarDatosExcel(array)


  res.json({
     ExcelC,
            
        });


}catch(error){
    console.log(error)
    res.json({msg: error})
  }
}

const excelGet = async (req,res)=>{

    const excel= await Excel.findAll()

    res.json(excel)
}


module.exports = {ExcelPost,excelGet}