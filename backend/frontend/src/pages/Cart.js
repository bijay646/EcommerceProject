import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { API } from '../config'
import { Link } from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from '../redux/actions/cartActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const cart_items = useSelector(state => state.cart.cart_items)
  const dispatch = useDispatch()

  console.log(cart_items)

  const decreaseInCart = (product, quantity) => e => {
    e.preventDefault()
    quantity--
    if (quantity <= 0) {
      dispatch(removeItemFromCart(product))
      toast.error("Item removed from cart")
      return
    }
    dispatch(addItemToCart(product, quantity))
    toast.success("item quantity decreased")
  }

  const increaseInCart = (product, quantity, stock) => e => {
    e.preventDefault()
    quantity++
    if (quantity > stock) {
      toast.error("Out of stock")
      return
    }
    dispatch(addItemToCart(product, quantity))
    toast.success("Item quantity increased")
  }

  const removeFromCart = (product) => e => {
    e.preventDefault()
    dispatch(removeItemFromCart(product))
    toast.error("Item removed from cart.")

  }

  return (
    <>
      <Navbar />
      <ToastContainer position='top-right' autoClose={1000}/>
      <div className='container mx-auto my-5 p-5'>
        {
          cart_items.length > 0 ?
            <table className='table text-center table-hover table-bordered table-striped'>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  cart_items.map((item, i) => {
                    return <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={`${API}/${item.image}`} style={{ height: "80px" }} alt=""/>
                      </td>
                      <td>{item.name}</td>
                      <td>Rs.{item.price}</td>
                      <td>
                        <div className='btn-group'>
                          <button className='btn btn-warning rounded' onClick={decreaseInCart(item.product, item.quantity)}><i className="bi bi-dash-square"></i></button>
                          <div className='px-3'>{item.quantity}</div>
                          <button className='btn btn-success rounded' onClick={increaseInCart(item.product, item.quantity, item.stock)}><i className="bi bi-plus-circle"></i></button>
                        </div>
                      </td>
                      <td><button className='btn btn-danger rounded' onClick={removeFromCart(item.product)}><i className='bi bi-trash'></i></button></td>
                    </tr>

                  })
                }
                <tr>
                  <td colSpan={6}><Link to='/checkout' className='btn btn-info'>Checkout</Link></td>
                </tr>

              </tbody>
            </table>
            :
            <div className='alert alert-danger'><span style={{fontSize:'25px'}}>Cart is empty   </span><p>Go shopping,<Link to='/items'>click here</Link></p></div>

        }
      </div>
      <Footer />
    </>
  )
}

export default Cart