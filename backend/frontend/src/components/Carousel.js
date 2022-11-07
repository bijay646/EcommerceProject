import React, { useState, useEffect } from 'react'
import { getProducts } from '../api/productAPI'
import { API } from '../config'


const Carousel = () => {
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
    }, [])
    return (
        <>
            <div className='container-fluid mx-auto'>
                <div id="carouselExampleIndicators" className="custom-carousel carousel slide" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner my-5" style={{height:"500px"}}>
                        {products &&
                            products.map((item, i) => {
                                return (
                                    <div className="carousel-item active" style={{height:"500px"}}  key={i}>
                                        <img src={`${API}/${item.product_image}`} alt="..." style={{height:"100%", width:'auto'}}/>
                                    </div>

                                )
                            })
                        }
                       
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>

        </>
    )
}

export default Carousel