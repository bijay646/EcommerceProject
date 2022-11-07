import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getFilteredProducts } from '../api/productAPI'
import Card from '../components/Card'
import Checkbox_categories from '../components/Checkbox_categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


const Items = () => {
    const [categoryId, setcategoryId] = useState('')
    const [filteredProduct, setFilteredProduct] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [limit, setLimit] = useState(8)
    const itemName = useSelector(state => state.item.items)
    console.log(itemName)

    useEffect(() => {
        getFilteredProducts(categoryId, limit)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setFilteredProduct(data)
                }
            })
    }, [categoryId])

    useEffect(() => {
        setSearchItems(filteredProduct.filter(item => item.product_name.toUpperCase().match(itemName.toUpperCase())))
    }, [itemName])

    const handleFilter = (filters) => {
        setcategoryId(filters)
    }

    return (
        <>
            <Navbar />
            <div className='row my-4'>
                <div className='col-md-3 text-start shadow' style={{ backgroundColor: "#E5E5E5" }}>
                    <Checkbox_categories handleFilter={handleFilter} />
                </div>
                <div className='col-md-9 my-4'>
                    <div className="row row-cols-1 row-cols-md-4 g-4 mx-5">
                         
                        {itemName?
                        searchItems.map((product, i) => {
                            return <Card key={i} product={product} />
                        }):
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

export default Items