import React, { useEffect, useState } from 'react'
import { getFilteredProducts } from '../api/productAPI'
import Card from '../components/Card'
import Checkbox_categories from '../components/Checkbox_categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Radio_prices from '../components/Radio_prices'

const Deals = () => {
 
    const [categoryId, setcategoryId] = useState('')
    const [filteredProduct, setFilteredProduct] = useState([])
    const [limit, setLimit] = useState(8)

    useEffect(() => {
        getFilteredProducts(categoryId,limit)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setFilteredProduct(data)
                    console.log(data)
                }
            })
    }, [categoryId])

    const handleFilter = (filters) => {
        setcategoryId(filters)
        console.log(filters)
    }
    
    return (
        <>
            <Navbar />
            <div className='row'>
                <div className='col-md-3 text-start'>
                    <Checkbox_categories handleFilter={handleFilter} />

                    {/* <Radio_prices handleFilter={handleFilter} /> */}
                    <Radio_prices />
                </div>
                <div className='col-md-9'>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {
                            filteredProduct.map((product, i) => {
                                return <Card key={i} product={product} />
                            })
                        }
                    </div>
                  
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Deals