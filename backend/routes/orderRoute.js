const express = require('express')
const router = express.Router()
const orderController= require('../controllers/orderController')
const { requireSignin} = require('../controllers/userController')

router.post('/placeorder',orderController.placeOrder)
router.get('/vieworders', orderController.viewOrders)
router.get('/orderdetails/:id', requireSignin, orderController.orderDetails)
router.get('/userorder/:userId', orderController.userOrders)
router.put('/updateorder/:orderId', orderController.updateOrder)
router.delete('/deleteorder/:orderId', orderController.deleteOrder)

module.exports = router