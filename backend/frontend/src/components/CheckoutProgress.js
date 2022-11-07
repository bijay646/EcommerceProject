import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutProgress = ({ shipping, order }) => {
  return (
    <div className='d-flex gap-2 mx-5 px-5'>
      
      <Link to='/checkout' className='btn btn-success'>Confirm Order</Link>
      {
        shipping ?
          <Link to='/shipping' className='btn btn-success'>Shipping</Link> :
          <Link to='/shipping' className='btn btn-secondary disabled' >Shipping</Link>

      }
      {
        order ?
          <Link to='/order' className='btn btn-success'>Order</Link> :
          <Link to='/order' className='btn btn-secondary disabled' >Order</Link>
      }

    </div>
  )
}

export default CheckoutProgress