import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { isAuthenticated } from '../../../api/userAPI'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import OrderCard from '../../../components/OrderCard'
import { orderDetails } from '../../../redux/actions/orderActions'


const OrderInfo = () => {
     const { orderId } = useParams()
     const { token } = isAuthenticated()
     const dispatch = useDispatch()

     useEffect(() => {
          dispatch(orderDetails(orderId, token))
     }, [])

     const order = useSelector(state => state.orderDetails.order)
     console.log(order)
     return (
          <>
               <Navbar />
               {
                    order &&
                    <div className='my-5 container mx-auto p-5 shadow'>
                         <div className='row shadow-sm p-2'>
                              <div className='col-10 text-start'>
                                   <h2 className='mb-1' style={{ color: 'orangered' }}>Order Details:</h2>
                              </div>
                              <div className='col-2 btn-group'>
                                   {order.status === 'approved'?
                                     <Link to={`/admin/order/approveOrder/${orderId}`} className='btn btn-warning disabled' >Approve</Link>:
                                     <Link to={`/admin/order/approveOrder/${orderId}`} className='btn btn-warning'>Approve</Link>
                                   }
                                 
                                   <Link to="/admin/orders" className='btn btn-info'> Go Back</Link>
                              </div>
                         </div>

                         <div className='row my-5'>
                              <div className='col-6 text-start'>
                                   <h4>Order Id:  {order.orderId}</h4>
                                   <h4>Ordered By:  {order.user.username}</h4>
                                   <h4>Total Price:  Rs.{order.totalAmount}</h4>
                                   <h4>Status:  {order.status}</h4>
                              </div>
                              <div className='col-6 text-start'>
                                   <h4>Shipping Address:  {order.shipping_address}</h4>
                                   <h4>Alternate Shipping Address:  {order.alternate_shipping_address}</h4>
                                   <h4>City:  {order.city},{order.zipcode}</h4>
                                   <h4>Country:  {order.country}</h4>
                                   <h4>Phone:  {order.phone}</h4>

                              </div>
                         </div>

                         <h4 className='my-3 text-success' >Ordered Items: </h4>

                         <div className='row row-cols-md-5 g-3'>
                              {
                                   order.orderItems.map((item, i) => {
                                        return <OrderCard product={item.product} quantity={item.quantity} key={i} />
                                   })

                              }
                         </div>

                    </div>
               }

               <Footer />
          </>
     )
}

export default OrderInfo

