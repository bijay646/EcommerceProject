module.exports = (sequelize, DataTypes) => {

    const OrderItem = sequelize.define("orderItem", {
        orderItemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, { timestamp: true })

    return OrderItem

}