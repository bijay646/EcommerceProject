import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import AdminSidebar from '../AdminSidebar'
import { Link, useParams } from 'react-router-dom'
import { approveOrder } from '../../../api/orderAPI'
import { isAuthenticated } from '../../../api/userAPI'
import { useDispatch, useSelector } from 'react-redux'
import { orderDetails } from '../../../redux/actions/orderActions'
import { updateProductStock } from '../../../api/productAPI'



const ApproveOrder = () => {
     const { orderId } = useParams()
     const { token } = isAuthenticated()
     const dispatch = useDispatch()
     const [status, setStatus] = useState('')
     const [error, setError] = useState('')
     const [success, setSuccess] = useState('')

     
     useEffect(() => {
          dispatch(orderDetails(orderId, token))
     }, [])

     const order = useSelector(state => state.orderDetails.order)

     const handleApprove = e => {
          e.preventDefault()

          approveOrder(orderId, status)
               .then(async (data) => {
                    if (data.error) {
                         setError(data.error)
                    }
                    else {
                         await Promise.all(
                              order.orderItems.map(async(item) => {
                                   await updateProductStock(item.product.productId, item.product.count_in_stock-item.quantity, token)
                              })
                         )
                         setSuccess("Order approved successfully.")
                    }
               })
     }

     const showError = () => {
          if (error) {
               return <div className='alert alert-danger'>{error}</div>
          }
     }
     const showSuccess = () => {
          if (success) {
               return <div className='alert alert-success'>{success}</div>
          }
     }
     return (
          <>
               <Navbar />
               <div className='row'>
                    <div className='col-md-3'>
                         <AdminSidebar orders />
                    </div>
                    <div className='col-md-9 p-5 text-start'>
                         <div className='d-flex justify-content-between w-75 mb-5'>
                              <h3>
                                   Approve Order
                              </h3>
                              <Link to='/admin/orders' className='btn btn-primary'>GO BACK</Link>

                         </div>
                         <div className='container d-flex shadow-sm '>
                              <div className='p-5 my-5 text-center'>
                                   {showError()}
                                   {
                                        success ? showSuccess() :
                                             <>
                                                  <p className='my-2'>Are you sure you want to approve this order?</p>
                                                  <div className="checkbox mb-3">
                                                       <label>
                                                            <input type="checkbox" value="approved" onChange={e=>setStatus(e.target.value)}/> approve
                                                       </label>
                                                  </div>
                                                  <button className='btn btn-warning' onClick={handleApprove}>Approve Order</button>
                                             </>
                                   }
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </>
     )
}


export default ApproveOrder