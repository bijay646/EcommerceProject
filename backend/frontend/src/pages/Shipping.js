import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isAuthenticated} from '../api/userAPI'
import CheckoutProgress from '../components/CheckoutProgress'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { saveShippingInfo } from '../redux/actions/cartActions'



const Shipping = () => {
    const { user } = isAuthenticated()
    const shipping_info = useSelector(state => state.cart.shipping_info)
    
    const [updatedShippingInfo, setShippingInfo] = useState({
        shipping_address: '',
        alternate_shipping_address: '',
        city: '',
        zipcode: '',
        country: '',
        phone: '',
    })
    const dispatch = useDispatch()

    const { shipping_address, alternate_shipping_address, city, zipcode, country, phone } = updatedShippingInfo
    
    let order_items_number = sessionStorage.getItem('order_items') ? sessionStorage.getItem('order_items') : 0

    let order_total = sessionStorage.getItem('order_total') ? sessionStorage.getItem('order_total') : 0

    const handleShippingInfo = (name) => e => {
        setShippingInfo({ ...updatedShippingInfo, [name]: e.target.value })
    }

    const saveShippingInfoHandle = () => {
        dispatch(saveShippingInfo(updatedShippingInfo))
    }


    return (
        <div>
            <Navbar />
            <CheckoutProgress shipping />

            <div className='container shadow-lg mx-auto p-5 row my-5'>
                <div className='col-md-8'>
                    <h3 className='text-decoration-underline'>Shipping Information</h3>
                    <div className='container my-5 me-5'>
                        <table className='table ms-0'>
                         <tbody>

                            <tr>
                                <th width='30%'>Shipping Address</th>
                                <td width={'70%'}><input type={'text'} className='form-control' onChange={handleShippingInfo('shipping_address')} value={shipping_address} /></td>
                            </tr>
                            <tr>
                                <th width='35%'>Alternate Shipping Address</th>
                                <td width={'65%'}><input type={'text'} className='form-control' onChange={handleShippingInfo('alternate_shipping_address')} value={alternate_shipping_address} /></td>
                            </tr>
                            <tr>
                                <th width='30%'>City</th>
                                <td width={'70%'}><input type={'text'} className='form-control' onChange={handleShippingInfo('city')} value={city} /></td>
                            </tr>
                            <tr>
                                <th width='30%'>Zipcode</th>
                                <td width={'70%'}><input type={'text'} className='form-control' onChange={handleShippingInfo('zipcode')} value={zipcode} /></td>
                            </tr>
                            <tr>
                                <th width='30%'>Country</th>
                                <td width={'70%'}><input type={'text'} className='form-control' onChange={handleShippingInfo('country')} value={country} /></td>
                            </tr>
                            <tr>
                                <th width='30%'>Phone</th>
                                <td width={'70%'}><input type={'text'} className='form-control' onChange={handleShippingInfo('phone')} value={phone} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button className='btn btn-info form-control mt-3' onClick={saveShippingInfoHandle}>Update Shipping Info</button></td>
                            </tr>
                         </tbody>
                        </table>

                    </div>
                </div>
                <div className='col-md-4 border-start border-5 mt-3'>
                    <h3 className='text-decoration-underline'>Order Summary</h3>
                    <div className='container mx-auto my-5 text-start ps-5'>
                        <h5>Items: {order_items_number}</h5>
                        <h5>Order Total: Rs.{order_total}</h5>
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
                        <Link to='/confirmOrder' className='btn btn-info form-control'>Place Order</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Shipping