const db = require('../models')
const { sendEmail } = require('../utils/sendEmail')
const Order = db.orders
const OrderItem = db.orderItems
const Product = db.products
const User = db.users
const Category = db.categories


//relation for orderItem and a Product
db.orderItems.belongsTo(db.products, {
     foreignKey: 'productId',
     as: 'product'
})

db.orders.hasMany(db.orderItems, {
     foreignKey: 'orderId',
     as: 'orderItems'
})

//relation for order and user
db.orders.belongsTo(db.users, {
     foreignKey: 'userId',
     as: 'user'
})




exports.placeOrder = async (req, res) => {

     let orderinfo = {
          userId: req.body.userId,
          shipping_address: req.body.shipping_address,
          alternate_shipping_address: req.body.alternate_shipping_address,
          city: req.body.city,
          country: req.body.country,
          phone: req.body.phone,
          zipcode: req.body.zipcode,
     }
     const order = await Order.create(orderinfo)

     const orderItemsIds = await Promise.all(
          req.body.orderItems.map(async orderItem => {
               let orderIteminfo = {
                    productId: orderItem.product,
                    quantity: orderItem.quantity,
                    orderId: order.orderId
               }
               
               const orderItem1 = await OrderItem.create(orderIteminfo)
               if (!orderItem1) {
                    return res.status(400).json({ error: "failed to place order" })
               }
               return orderItem1.orderItemId
          })
     )

     // calculating totalPrice
     let individualTotal = await Promise.all(
          orderItemsIds.map(async orderItem => {
               const itemOrder = await OrderItem.findOne({
                    include: [{
                         model: Product,
                         as: 'product'
                    }], where: { orderItemId: orderItem }
               })
               const total = itemOrder.quantity * itemOrder.product.product_price
               return total
          })
     )

     let totalPrice = individualTotal.reduce((acc, cur) => acc + cur)
     order.totalAmount = totalPrice
     order.orderItemsIds = orderItemsIds.toString()
     await order.save()
     const url = `http://localhost:3000/admin/order/approveOrder/${order.orderId}`
          sendEmail({
               from: "noreply@something.com",
               to: 'admin@gmail.com',
               subject: "Order Placement",
               text: " click on the button below to confirm the order." + url,
               html: `<a href='${url}'><button>CONFIRM ORDER</button></a>`
          })

     if (!order) {
          return res.status(400).json({ error: "failed to place order." })
     }
     res.send(order)
}


//to view all placed orders
exports.viewOrders = async (req, res) => {
     let orders = await Order.findAll({
          include: [{
               model: User,
               as: 'user'
          }]
     })
     if (!orders) {
          return res.status(400).json({ error: "something went wrong" })
     }
     res.status(200).send(orders)
}


// order details
exports.orderDetails = async (req, res) => {
     let order = await Order.findOne({
          include: [{
               model: User,
               as: 'user'
          },
          {
               model: OrderItem,
               as: 'orderItems',
               include: [{
                    model: Product,
                    as: 'product',

                    include: [{
                         model: Category,
                         as: 'category'
                    }]
               }]
          }],

          where: { orderId: req.params.id }
     })

     if (!order) {
          return res.status(400).json({ error: "Something went wrong" })
     }
     res.status(200).send(order)
}



// to find orders of a user
exports.userOrders = async (req, res) => {
     let order = await Order.findAll({
          include: [{
               model: OrderItem,
               as: 'orderItems',
               include: [{
                    model: Product,
                    as: 'product',

                    include: [{
                         model: Category,
                         as: 'category'
                    }]
               }]
          }],
          where: { userId: req.params.userId }
     })
     if (!order) {
          return res.status(400).json({ error: "Something went wrong" })
     }
     res.status(200).send(order)
}

// to update order
exports.updateOrder = async (req, res) => {
     let orderinfo = {
          status: req.body.status
     }
     await Order.update(orderinfo, { where: { orderId: req.params.orderId } })
          .then(order => {
               if (!order) {
                    return res.status(400).json({ error: "order does not exist." })
               }
          })
          .catch(err => res.status(400).json({ error: err }))

     let order = await Order.findOne({ where: { orderId: req.params.orderId } })
     res.status(200).send(order)
}


// to delete order
exports.deleteOrder = async (req, res) => {
     await Order.destroy({ where: { OrderId: req.params.orderId } })
          .then(async order => {
               if (!order) {
                    return res.status(400).json({ error: "Order does not exist." })
               }
               else {
                    await OrderItem.destroy({ where: { orderId: req.params.orderId } })
                         .then(() => {                       
                                   return res.status(200).json({ message: "Order and associated OrderItems deleted successfully." })
                         })
                         .catch(err => res.status(400).json({ error: err }))

               }
          })
          .catch(err => res.status(400).json({ error: err }))
}

