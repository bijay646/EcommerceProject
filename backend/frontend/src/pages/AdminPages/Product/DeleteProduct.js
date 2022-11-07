import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import AdminSidebar from '../AdminSidebar'
import { Link, useParams } from 'react-router-dom'
import { isAuthenticated } from '../../../api/userAPI'
import { deleteProduct, viewProductDetails } from '../../../api/productAPI'
import { API } from '../../../config'

const DeleteProduct = () => {
     const [product, setProduct] = useState({
          product_name: '',
          product_price: '',
          product_description: '',
          count_in_stock: '',
          product_image: ''
     })

     const { product_name, product_price, product_description, count_in_stock, product_image } = product
     const { productId } = useParams()
     const { token } = isAuthenticated()
     const [error, setError] = useState('')
     const [success, setSuccess] = useState('')

     useEffect(() => {
          viewProductDetails(productId)
               .then(data => {
                    if (data.error) {
                         console.log(data.error)
                    }
                    else {
                         setProduct(data)
                    }
               })
               .catch(error => console.log(error))
     }, [])

     const handleDeleteChange = e => {
          e.preventDefault()
          deleteProduct(productId, token)
               .then(data => {
                    if (data.error) {
                         setError(data.error)
                    }
                    else {
                         setSuccess(data.message)
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
                         <AdminSidebar products />
                    </div>
                    <div className='col-md-9 p-5 text-start'>
                         <div className='d-flex justify-content-between w-75 mb-5'>
                              <h3>
                                   Product Delete
                              </h3>
                              <Link to='/admin/products' className='btn btn-primary'>GO BACK</Link>

                         </div>
                         <div className='container d-flex shadow-sm'>
                              <div className='p-5 my-5 border-end border-3 text-center'>
                                   <h2 className='text-center text-decoration-underline'>Product Details</h2>
                                   <hr className='my-3'></hr>
                                   <img src={`${API}/${product_image}`} alt={product_name} style={{ height: "320px" }} />
                                   <h3>Product Name: <u>{product_name}</u></h3>
                                   <h3>Price: <u>Rs. {product_price}</u></h3>
                                   <h3>Description: <u>{product_description}</u></h3>
                                   <h3>Count in Stock: <u>{count_in_stock}</u></h3>

                              </div>
                              <div className='p-5 my-5 border-end border-3 text-center'>
                                   {showError()}
                                   {
                                        success ? showSuccess() :
                                             <>
                                                  <p >Are you sure you want to delete this product? </p>
                                                  <button className='btn btn-danger' onClick={handleDeleteChange}>Delete Product</button>
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


export default DeleteProduct