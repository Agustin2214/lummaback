const { Router } = require('express')

const { categoriasGet, categoriasPost,categoriaDelete }  = require('../controllers/categorias')

const router = Router()


router.get('/', categoriasGet );
router.post('/',categoriasPost)
router.delete('/',categoriaDelete) 
module.exports = router;