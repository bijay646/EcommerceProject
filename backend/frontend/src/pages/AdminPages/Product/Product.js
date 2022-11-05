import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import AdminSidebar from '../AdminSidebar'
import { Link } from 'react-router-dom'
import { getProducts } from '../../../api/productAPI'
import { API } from '../../../config'

const Products = () => {
     const [products, setProducts] = useState([])

     useEffect(() => {
          getProducts()
               .then(data => {
                    if (data.error) {
                         console.log(data.error)
                    }
                    else {
                         setProducts(data)
                    }
               })
               .catch(err => console.log(err))
     }, [])
     return (
          <>
               <Navbar />
               <div className='row'>
                    <div className='col-md-3'>
                         <AdminSidebar products />
                    </div>
                    <div className='col-md-9 p-5 text-start'>
                         <div className='d-flex justify-content-between w-75'>
                              <h3>
                                   Products
                              </h3>
                              <Link to='/admin/product/add' className='btn btn-primary'>Add Product</Link>

                         </div>
                         <div className='container'>
                              <table className='table table-hover table-striped text-center p-3 my-5 shadow-lg'>
                                   <thead>
                                        <tr>
                                             <th>S.No.</th>
                                             <th>Product Image</th>
                                             <th>Product Name</th>
                                             <th>In Stock</th>
                                             <th>Unit Price</th>
                                             <th>Action</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {
                                             products.map((product, i) => {
                                                  return <tr key={i}>
                                                       <td>{i + 1}</td>
                                                       <td>
                                                            <img src={`${API}/${product.product_image}`} style={{ height: '130px' }} />
                                                       </td>
                                                       <td><h4>{product.product_name}</h4></td>
                                                       <td><h4>{product.count_in_stock}</h4></td>
                                                       <td><h4>Rs.{product.product_price}</h4></td>
                                                       <td>
                                                            <div className='btn-group'>
                                                                 <Link to={`/admin/product/update/${product.productId}`} className='btn btn-warning'><i className='bi bi-pencil' /></Link>
                                                                 <Link to={`/admin/product/delete/${product.productId}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>
                                                            </div>
                                                       </td>

                                                  </tr>
                                             })
                                        }

                                   </tbody>
                              </table>
                         </div>


                    </div>
               </div>

               <Footer />
          </>
     )
}

export default Products