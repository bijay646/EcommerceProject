module.exports = (sequelize, DataTypes) => {

     const Category = sequelize.define("category", {
        categoryId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
         category_name: {
             type: DataTypes.STRING,
             allowNull: false
         }
     
     },{timestamp:true})
 
     return Category
 
 }