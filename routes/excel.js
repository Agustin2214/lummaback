const { Router } = require('express')

const { ExcelPost, excelGet }  = require('../controllers/excel')

const router = Router()


router.post('/',ExcelPost)
router.get('/',excelGet)

module.exports = router;