const { Router } = require('express')

const { subTareasPost, subTareasGet,subtareasGetbyId,deleteSubtareas }  = require('../controllers/subTareas')

const router = Router()


router.get('/', subTareasGet );
router.post('/',subTareasPost)
router.get('/id', subtareasGetbyId );
router.delete('/',deleteSubtareas)
module.exports = router;