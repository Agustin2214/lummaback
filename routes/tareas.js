const { Router } = require('express')

const { tareasGet, tareasPost,tareasGetbyId,tareasDelete }  = require('../controllers/tareas')

const router = Router()


router.get('/', tareasGet );
router.post('/',tareasPost)
router.get('/id', tareasGetbyId )
router.delete('/',tareasDelete)
module.exports = router;