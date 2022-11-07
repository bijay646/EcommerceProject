import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutProgress from '../components/CheckoutProgress'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { API } from '../config'

const Checkout = () => {
  const cart_items = useSelector(state => state.cart.cart_items)

  let order_items_number_arr = cart_items ? cart_items.map(items => items.quantity) : []
  let order_items_number = order_items_number_arr.reduce((acc, cur) => acc + cur)
  sessionStorage.setItem('order_items', order_items_number)

  let order_total_arr = cart_items ? cart_items.map(item => item.quantity * item.price) : []
  let order_total = order_total_arr.reduce((acc, cur) => acc + cur)
  sessionStorage.setItem('order_total', order_total)

  return (
    <div>
      <Navbar />
      <div className='text-end me-5 my-4'>
        <Link to='/cart' className='btn btn-warning'><i className="bi bi-backspace-fill"></i>Go to Cart</Link>
      </div>
      <CheckoutProgress />

      <div className='container shadow-lg mx-auto p-5 row my-5'>
        <div className='col-md-8'>
          <h3 className='text-decoration-underline'>Order Details</h3>
          <div className='container mx-auto my-5'>

            {
              cart_items.length > 0 &&
              <table className='table text-center table-hover table-bordered table-striped'>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cart_items.map((item, i) => {
                      return <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <img src={`${API}/${item.image}`} style={{ height: "150px" }} alt=""/>
                        </td>
                        <td>{item.name}</td>
                        <td>Rs.{item.price}</td>
                        <td>
                          <div className='px-3'>{item.quantity}</div>
                        </td>
                        <td>
                          Rs.{item.quantity * item.price}
                        </td>
                      </tr>

                    })
                  }
                </tbody>
              </table>
            }
          </div>
        </div>
        <div className='col-md-4 border-start border-5 mt-3'>
          <h3 className='text-decoration-underline'>Order Summary</h3>
          <div className='container mx-auto my-5 text-start ps-5'>
            <h4>Items: {order_items_number}</h4>
            <h4>Order Total: Rs.{order_total}</h4>
            <hr className='my-3' />
            <Link to='/shipping' className='btn btn-info form-control'>Shipping</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Checkout