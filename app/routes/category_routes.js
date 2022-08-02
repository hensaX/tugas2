const express = require('express')
const router = express.Router()
const category = require('./../controllers/category_controller')

router.post('/addCategory', category.addCategory)
router.put('/editCategory', category.editCategory)
router.delete('/deleteCategory/:id', category.deleteCategory)
router.get('/getCategoryById/:id', category.getCategoryById)
router.get('/getCategoryAll', category.getCategoryAll)

module.exports = router