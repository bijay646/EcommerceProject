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

// // filter product
// exports.filterProduct = async (req,res) => {
//     let sortby = req.query.sortby ? req.query.sortby : '_id'
//     let order = req.query.order ? req.query.order : '1'
//     let limit = req.query.limit ? Number(req.query.limit) : 9999999999
//     let skip = req.query.skip ? Number(req.query.skip) : 0
//     let Args = {}

//     for(let key in req.body.filters){
//         if(req.body.filters[key].length>0){
//             if(key==='category'){
//                 Args[key] = req.body.filters[key]
//             }
//             if(key === 'product_price'){
//                 Args[key] = {
//                     $gte : req.body.filters[key][0],
//                     $lte : req.body.filters[key][1]
//                 }
//             }
//         }
//     }
// // filters = { category: [mobile], product_price:[0,999]}
//     let filteredProduct = await Product.find(Args)
//     .sort([[sortby,order]])
//     .limit(limit)
//     .skip(skip)

//     if(!filteredProduct){
//         return res.status(400).json({error:"Something went wrong"})
//     }
//     // else{
//         // res.send(filteredProduct)
//     // }
//     res.status(200).json({
//         filteredProduct,
//         size: filteredProduct.length
//     })

// }


// related products
exports.relatedProducts = async (req, res) => {
     let product = await Product.findOne({
          include: [{
               model: Category,
               as: 'category'
          }], where: { productId: req.params.id }
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