const connection = require('../database/connection');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    connection.DB,
    connection.USER,
    connection.PASSWORD, {
    host: connection.HOST,
    dialect: connection.dialect,
    operatorsAliases: false,
    logging:false,

    pool: {
        max: connection.pool.max,
        min: connection.pool.min,
        acquire: connection.pool.acquire,
        idle: connection.pool.idle
    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log('database connected successfully')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.categories = require('./categoryModel.js')(sequelize, DataTypes)
db.products = require('./productModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)
db.tokens = require('./tokenModel.js')(sequelize, DataTypes)
db.orderItems = require('./orderItemsModel.js')(sequelize, DataTypes)
db.orders = require('./orderModel')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('database is re-synced')
    })


//relations for category and products
db.categories.hasMany(db.products, {
    foreignKey: 'categoryId',
    as: 'products'
})

db.products.belongsTo(db.categories, {
    foreignKey: 'categoryId',
    as: 'category'
})



module.exports = db
