import React, { useEffect, useRef, useState } from 'react'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import AdminSidebar from '../AdminSidebar'
import { Link } from 'react-router-dom'
import { getCategories } from '../../../api/categoryAPI'
import { addProduct } from '../../../api/productAPI'
import { isAuthenticated } from '../../../api/userAPI'

const AddProduct = () => {
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        product_name: '',
        product_price: '',
        product_description: '',
        count_in_stock: '',
        product_image: '',
        categoryId: '',
        formData: '' //for passing the form data
    })
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const { product_name, product_price, product_description, count_in_stock, formData} = product

    let my_ref = useRef()
    let sel_ref = useRef()

    const { token } = isAuthenticated()
    useEffect(() => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                    setProduct({ ...product, formData: new FormData() })
                }
            })
    }, [])

    const handleChange = name => e => {
        e.preventDefault()
        let value = name === 'product_image' ? e.target.files[0] : e.target.value
        setProduct({ ...product, [name]: value })
        formData.set(name, value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData.get('product_name'))
        console.log(formData.get('product_price'))
        console.log(formData.get('product_description'))
        console.log(formData.get('product_image'))
        console.log(formData.get('count_in_stock'))
        console.log(formData.get('categoryId'))
      
        addProduct(formData, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess(false)
                }
                else {
                    setProduct({ ...product,product_name: '', product_price: '', product_description: '', count_in_stock: ''})
                    setError('')
                    setSuccess(true)
                    my_ref.current.value = ''
                    sel_ref.current.value = ''

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
            return <div className='alert alert-success'>Product added successfully.</div>
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
                    <div className='d-flex justify-content-between w-75'>
                        <h3>
                            Add Product
                        </h3>
                        <Link to='/admin/products' className='btn btn-primary'>Go Back</Link>

                    </div>
                    <div className='container'>
                        <form className='p-5 shadow-lg mt-5 w-75'>
                            {showError()}
                            {showSuccess()}
                            <label htmlFor='product_name'>Product Name</label>
                            <input type={'text'} className='form-control mb-2' id='product_name' onChange={handleChange('product_name')} value={product_name} />
                            <label htmlFor='product_price'>Product Price</label>
                            <input type={'number'} className='form-control mb-2' id='product_price' onChange={handleChange('product_price')} value={product_price} />
                            <label htmlFor='desc'>Description</label>
                            <textarea className='form-control mb-2' id='desc' onChange={handleChange('product_description')} value={product_description} />
                            <label htmlFor='stock'>Count in Stock</label>
                            <input type={'number'} className='form-control mb-2' id='stock' onChange={handleChange('count_in_stock')} value={count_in_stock} />
                            <label htmlFor='category'>Category</label>
                            <select className='form-control mb-2' id='category' onChange={handleChange('categoryId')} ref={sel_ref}>
                                <option></option>
                                {
                                    categories.map((category, i) => {
                                        return <option key={i} value={category.categoryId}>{category.category_name}</option>
                                    })
                                }
                            </select>
                            <label htmlFor='product_image'>Image</label>
                            <input type={'file'} id='product_image' className='form-control mb-2s' onChange={handleChange('product_image')} ref={my_ref} />

                            <button className='btn btn-warning form-control mt-3' onClick={handleSubmit}>Add Product</button>
                        </form>

                    </div>


                </div>
            </div>

            <Footer />
        </>
    )
}

export default AddProduct