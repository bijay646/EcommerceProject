const express = require('express')
const router = express.Router()
const { upload } = require('../utils/upload')
const productController = require('../controllers/productController')
const { productRules, validate } = require('../validation/validator')
const {requireSignin}= require("../controllers/userController")



router.post('/addproduct',upload.single('product_image'),productRules,validate,requireSignin,productController.addProduct)
router.get('/productlist', productController.viewProducts)
router.get('/productdetails/:productId', productController.productDetails)
router.put('/updateproduct/:id',requireSignin,productController.updateProduct)
router.get('/deleteproduct/:id',requireSignin,productController.deleteProduct)
router.get('/findbycategory/:id',productController.findProductbyCategory)
// router.post('/getfilteredProduct',filterProduct)
router.get('/relatedproducts/:id', productController.relatedProducts)

module.exports = router