const db = require('../models')

const Category = db.categories

// 1.add new category

const addCategory = async (req, res) => {

     let category = await Category.findOne({ where: { category_name: req.body.category_name } })
     if (!category) {
          let category = await Category.create({ category_name: req.body.category_name })
          if (!category) {
               return res.status(400).json({ error: "something went wrong" })
          }
          // console.log(category)
          res.status(200).send(category)
     }
     else {
          return res.status(400).json({ error: "Category already exists." })
     }

}


// to view categories
const viewCategories = async (req, res) => {
     let categories = await Category.findAll({})
     if (!categories) {
          return res.status(400).json({ error: "something went wrong" })
     }
     res.status(200).send(categories)
}

//to view category details
const categoryDetails = async (req, res) => {
     let category = await Category.findOne({ where: { categoryId: req.params.id } })
     if (!category) {
          return res.status(400).json({ error: "category not found" })
     }
     res.status(200).send(category)
}

//to update category
const updateCategory = async (req, res) => {
     await Category.update({ category_name: req.body.category_name }, { where: { categoryId: req.params.id } })
          .then(category => {
               if (!category) {
                    return res.status(400).json({ error: "Category does not exist." })
               }
          })
          .catch(err => res.status(400).json({ error: err }))
     let category = await Category.findOne({ where: { categoryId: req.params.id } })
     res.send(category)

}

//to delete Category
const deleteCategory = async (req, res) => {
     await Category.destroy({ where: { categoryId: req.params.id } })
          .then(category => {
               if (!category) {
                    return res.status(400).json({ error: "Category does not exist." })
               }
               else {
                    return res.status(200).json({ message: "Category deleted successfully" })
               }
          })
          .catch(err => res.status(400).json({ error: err }))
}


module.exports = {
     addCategory,
     viewCategories,
     categoryDetails,
     updateCategory,
     deleteCategory
}
