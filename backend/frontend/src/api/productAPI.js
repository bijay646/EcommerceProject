import { API } from "../config"

export const getProducts = () => {
    return fetch(`${API}/productlist`,{
        method: "GET"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}


export const addProduct = (product, token) => {
     return fetch(`${API}/addproduct`,{
         method:"POST",
         headers:{
             Accept: 'application/json',
             Authorization:`Bearer ${token}`
         },
         body: product
     })
     .then(res=>res.json())
     .catch(err=>console.log(err))
 
 }


 
// to get product details
export const viewProductDetails = (productId) => {
    return fetch(`${API}/productdetails/${productId}`,{
        method:"GET"
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

// to update product
export const updateProduct = (id, product, token) => {
    return fetch(`${API}/updateproduct/${id}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}
 
//to delete a product
export const deleteProduct = (id,token)=>{
    return fetch(`${API}/deleteproduct/${id}`,{
        method:"DELETE",
        headers:{
            Authorization : `Bearer ${token}`
        }

    }).then(res=>res.json())
    .catch(err=>console.log(err))
}


// to get filtered product
export const getFilteredProducts = (categoryId,limit) => {
    return fetch(`${API}/getfilteredProduct`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify({categoryId,limit})
    })
    .then(res=> res.json())
    .catch(error=>console.log(error))
}



// to get related products
export const getRelatedProducts = (id) => {
    return fetch(`${API}/relatedproducts/${id}`,{
        method: "GET"
    })
    .then(res=> res.json())
    .catch(error=> console.log(error))
}



