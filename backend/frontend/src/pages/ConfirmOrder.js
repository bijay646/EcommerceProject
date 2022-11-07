import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../api/userAPI'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CheckoutProgress from '../components/CheckoutProgress'
import { API } from '../config'
import { placeOrder } from '../redux/actions/orderActions'


const ConfirmOrder = () => {
     const cart_items = useSelector(state => state.cart.cart_items)
     const shipping_info = useSelector(state => state.cart.shipping_info)
     
     let order_total = sessionStorage.getItem('order_total') ? sessionStorage.getItem('order_total') : 0
     const { user, token } = isAuthenticated()
     let navigate = useNavigate()
     let dispatch = useDispatch()

     let order = {
          orderItems: cart_items,
          userId: user.userId,
          shipping_address: shipping_info.shipping_address,
          alternate_shipping_address: shipping_info.alternate_shipping_address,
          city: shipping_info.city,
          country: shipping_info.country,
          phone: shipping_info.phone,
          zipcode: shipping_info.zipcode
     }

     const makeOrder = async (e) => {
          e.preventDefault()

          dispatch(placeOrder(order, token))
          toast.success("Successfully Ordered.")
          
          localStorage.removeItem('cart_items')
          setTimeout(() => {
               navigate('/items') 
          }, 1000);

     }

return (
     <div>
          <ToastContainer  position='top-right' />
          <Navbar />
          <CheckoutProgress shipping order/>

          <div className='container shadow-lg mx-auto p-5 row my-5'>
               <div className='col-md-8'>
                    <h3 className='text-decoration-underline'>Order Summary</h3>
                    <div className='container mx-auto my-5 text-start ps-5'>
                         <table className='table text-center align-middle'>
                              <thead>
                                   <tr>
                                        <th>S.No.</th>
                                        <th>Products</th>
                                        <th>Products Name</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                   </tr>
                                   {
                                        cart_items &&
                                        cart_items.map((item, i) => {
                                             return <tr key={i}>
                                                  <td>{i + 1}</td>
                                                  <td>
                                                       <img src={`${API}/${item.image}`} style={{ height: '100px' }} alt=''/>
                                                  </td>
                                                  <td>{item.name}</td>
                                                  <td>Rs.{item.price}</td>
                                                  <td>{item.quantity}</td>
                                                  <td>Rs.{item.quantity * item.price}</td>
                                             </tr>
                                        })
                                   }
                                   <tr>
                                        <td colSpan={6}><h3>Total Amount: Rs.{order_total}</h3></td>
                                   </tr>
                              </thead>
                              <tbody></tbody>
                         </table>


                         <hr className='my-3' />
                         <h3 className='text-decoration-underline'>Shipping Address</h3>
                         <h5>{user.username}</h5>
                         <h5>{shipping_info.shipping_address}</h5>
                         {shipping_info &&
                              <h5>{shipping_info.alternate_shipping_address}</h5>}
                         <h5>{shipping_info.city}, {shipping_info.zipcode}</h5>
                         <h5>{shipping_info.country}</h5>
                         <h5>{shipping_info.phone}</h5>
                         <hr className='my-3' />

                    </div>
               </div>

               <div className='col-md-4 border-start border-5 mt-3 text-start ps-5'>
                    <div className='p-3 shadow-sm bg-light font-weight-bold text-center'>
                         <p style={{color:'black'}}>Click below to confirm your order!</p>
                         <button className='btn btn-warning mt-3 form-control text-white' onClick={makeOrder}>Order Now</button>

                    </div>

               </div>
          </div>


          <Footer />
     </div>
)

                         }


export default ConfirmOrder