import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { API } from '../config'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../redux/actions/cartActions'
import { getRelatedProducts, viewProductDetails } from '../api/productAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from '../api/userAPI'


const ProductDetail = () => {
    const { id } = useParams()
    const { user } = isAuthenticated()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        viewProductDetails(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProduct(data)
                }
            })
            .catch(error => console.log(error))


        getRelatedProducts(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setRelatedProducts(data)
                    console.log(relatedProducts)
                }
            })
            .catch(error => console.log(error))

    }, [id])

    const addOnCart = () => {
        dispatch(addItemToCart(id, 1))
        toast.success("Item added to cart")
    }

    return (
        <>
            <Navbar />
            <ToastContainer position='top-right' autoClose={1000} />
            <div className='container mx-auto mt-5 shadow-lg p-5 rounded d-flex'>
                <div className='img-div w-50'>
                    <img src={`${API}/${product.product_image}`} alt={product.product_name} style={{ height: "300px" }} />
                </div>
                <div className='w-50 text-start border-start ps-5 border-3 pt-5' >
                    <h3 style={{ color: '#7CB9E8' }}><u>{product.product_name}</u></h3>
                    <h5>Price: Rs. {product.product_price}</h5>
                    <h5>Description: {product.product_description}</h5>
                    <h5>Count in Stock: {product.count_in_stock}</h5>
                    {(user && product.count_in_stock)?
                        <button className='btn btn-warning mt-2' onClick={addOnCart}>Add to Cart</button>:
                        <button className='btn btn-warning mt-2' disabled onClick={addOnCart}>Add to Cart</button>
                    }
                </div>

            </div>
            <h4 className='mt-5 text-decoration-underline text-start px-5'>Related Products</h4>
            <div className="row row-cols-1 row-cols-md-6 g-4 mt-5">
                {
                    relatedProducts.map((product, i) => {
                        return <Card key={i} product={product} />
                    })
                }
            </div>

            <Footer />
        </>
    )
}

export default ProductDetail