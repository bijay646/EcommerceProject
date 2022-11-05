import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminPages/AdminDashboard'
import AddCategory from './pages/AdminPages/Category/AddCategory'
import Category from './pages/AdminPages/Category/Category'
import DeleteCategory from './pages/AdminPages/Category/DeleteCategory'
import UpdateCategory from './pages/AdminPages/Category/UpdateCategory'
import AddProduct from './pages/AdminPages/Product/AddProduct'
import DeleteProduct from './pages/AdminPages/Product/DeleteProduct'
import Products from './pages/AdminPages/Product/Product'
import UpdateProduct from './pages/AdminPages/Product/UpdateProduct'
import Cart from './pages/Cart'
import Deals from './pages/Deals'
import EmailConfirm from './pages/EmailConfirm'
import { AdminRoutes, UserRoutes } from './pages/FilterRoutes'
import ForgetPassword from './pages/ForgetPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'

const Myroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />


        <Route path='/emailConfirm/:token' element={<EmailConfirm />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />

        <Route path='/' element={<AdminRoutes />}>

          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/category' element={<Category />} />
          <Route path='/admin/category/add' element={<AddCategory />} />
          <Route path='/admin/category/update/:categoryId' element={<UpdateCategory />} />
          <Route path='/admin/category/delete/:categoryId' element={<DeleteCategory />} />

          <Route path='/admin/products' element={<Products/>} />
          <Route path='/admin/product/add' element={<AddProduct/>} />
          <Route path='/admin/product/update/:productId' element={<UpdateProduct />} />
          <Route path='/admin/product/delete/:productId' element={<DeleteProduct />} />

        </Route>

        <Route path='/deals' element={<Deals/>}/>
        <Route path='/productDetails/:id' element={<ProductDetail />} />
  
        <Route path='/' element={<UserRoutes />} >
          <Route path='/cart' element={<Cart />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default Myroutes