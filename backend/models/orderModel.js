module.exports = (sequelize, DataTypes) => {

     const Order = sequelize.define("order", {
          orderId: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true
          },
          
          orderItemsIds: {     
               type: DataTypes.STRING,
               allowNull: true
          },
          userId: {
               type: DataTypes.INTEGER,
               allowNull: false
          },
          totalAmount: {
               type: DataTypes.INTEGER,
               allowNull: true
          },
          shipping_address: {
               type: DataTypes.STRING,
               allowNull: false
          },
          alternate_shipping_address: {
               type: DataTypes.STRING,
          },
          city: {
               type: DataTypes.STRING,
               allowNull: false
          },
          zipcode: {
               type: DataTypes.INTEGER,
               allowNull: false
          },
          country: {
               type: DataTypes.STRING,
               allowNull: false
          },
          phone: {
               type: DataTypes.STRING,
               allowNull: false
          },
          status: {
               type: DataTypes.STRING,
               allowNull: false,
               defaultValue: 'Pending'
          }

     }, { timestamp: true })

     return Order

}