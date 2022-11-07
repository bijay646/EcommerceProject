const db = require('../models')
const { Op } = require("sequelize");

const Product = db.products
const Category = db.categories

// add product
exports.addProduct = async (req, res) => {
     let info = {
          product_name: req.body.product_name,
          product_price: req.body.product_price,
          product_description: req.body.product_description,
          count_in_stock: req.body.count_in_stock,
          categoryId: req.body.categoryId,
          product_image: req.file.path
     }
     const product = await Product.create(info)
     if (!product) {
          return res.status(400).json({ error: "Something went wrong" })
     }
     res.status(200).send(product)
}



// view products
exports.viewProducts = async (req, res) => {
     let products = await Product.findAll({
          include: [{
               model: Category,
               as: 'category'
          }]
     })
     if (!products) {
          return res.status(400).json({ error: "Something went wrong" })
     }
     res.status(200).send(products)
}

// view product details
exports.productDetails = async (req, res) => {
     let product = await Product.findOne({
          include: [{
               model: Category,
               as: 'category'
          }], where: { productId: req.params.productId }
     })
     if (!product) {
          return res.status(400).json({ error: "Something went wrong" })
     }
     res.send(product)
}

// update product
exports.updateProduct = async (req, res) => {
     let info = {
          product_name: req.body.product_name,
          product_price: req.body.product_price,
          product_description: req.body.product_description,
          count_in_stock: req.body.count_in_stock,
          category: req.body.category,
          rating: req.body.rating
     }
     await Product.update(info, { where: { productId: req.params.id } })
          .then(product => {
               if (!product) {
                    return res.status(400).json({ error: "product does not exist." })
               }
          })
          .catch(err => res.status(400).json({ error: err }))

     let product = await Product.findOne({ where: { productId: req.params.id } })
     res.status(200).send(product)
}

// delete product
exports.deleteProduct = async (req, res) => {
     await Product.destroy({ where: { productId: req.params.id } })
          .then(product => {
               if (!product) {
                    return res.status(400).json({ error: "Product does not exist." })
               }
               else {
                    return res.status(200).json({ message: "Product deleted successfully" })
               }
          })
          .catch(err => res.status(400).json({ error: err }))
}

// find by category
exports.findProductbyCategory = async (req, res) => {
     let products = await Product.findAll({ where: { categoryId: req.params.id } })
     if (!products) {
          return res.status(400).json({ error: "some error has occured" })
     }
     res.send(products)
}


//get filtered products
exports.filterProduct = async (req, res) => {
     if(!req.body.categoryId){
          let products = await Product.findAll({
               include: [{
                    model: Category,
                    as: 'category'
               }],
               order: [["product_name", "ASC"]],
               limit: req.body.limit
          })
          if (!products) {
               return res.status(400).json({ error: "Something went wrong" })
          }
          return res.status(200).send(products)

     }
     else{
          
          let filteredProducts = await Product.findAll({
               where: {
                    categoryId: req.body.categoryId,
               },
               order: [["product_name", "ASC"]],
               limit: req.body.limit
          }
          )
          if (!filteredProducts) {
               return res.status(400).json({ error:"Something went wrong" })
          }
          else {
               return res.status(200).send(filteredProducts)
          }

     }

}


//find related products
exports.relatedProducts = async (req, res) => {
     let product = await Product.findOne({
          where: { productId: req.params.id },
          include: [{
               model: Category,
               as: 'category'
          }]
     })
     if (!product) {
          return res.status(400).json({ error: "Something went wrong" })
     }
     let relatedProducts = await Product.findAll({
          where: {
               categoryId: product.categoryId,
               productId: {
                    [Op.ne]: product.productId
               }
          },
          order: [["createdAt", "ASC"]]
     })

     if (!relatedProducts) {
          return res.status(400).json({ error: "Something went wrong" })
     }
     else {
          res.status(200).send(relatedProducts)
     }
}