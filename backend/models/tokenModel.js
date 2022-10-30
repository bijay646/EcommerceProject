module.exports = (sequelize, DataTypes) => {

     const Token = sequelize.define("token", {
          tokenId: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true
          },
          token: {
               type: DataTypes.STRING,
               allowNull: false
          },
          userId: {
               type: DataTypes.INTEGER,
               allowNull: false
          },
          createdAt:{
               type: DataTypes.DATE,
               allowNull: false,
               defaultValue: DataTypes.NOW,
               expires:86400
          }
     })

     return Token

}