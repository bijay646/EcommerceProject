module.exports = (sequelize, DataTypes) => {

     const Product = sequelize.define("product", {
        productId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        count_in_stock:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoryId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
        ,
        rating:{
            type: DataTypes.INTEGER,
            defaultValue: 1
        }, 
        product_image:{
            type: DataTypes.STRING,
            allowNull: false
        }
     },{timestamps: true})
 
     return Product
 
 }