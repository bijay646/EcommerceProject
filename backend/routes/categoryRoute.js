const express = require('express')
const categoryController= require("../controllers/categoryController")
const router = express.Router()
const {categoryRules,validate}=require('../validation/validator')
const {requireSignin}= require('../controllers/userController')



router.post('/postCategory',categoryRules,validate,requireSignin,categoryController.addCategory)
router.get('/viewcategories', categoryController.viewCategories)
router.get('/categorydetails/:id', categoryController.categoryDetails)
router.put('/updatecategory/:id',requireSignin, categoryController.updateCategory)
router.delete('/deletecategory/:id',requireSignin, categoryController.deleteCategory)



module.exports = router