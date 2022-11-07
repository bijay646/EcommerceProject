import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminPages/AdminDashboard'
import AddCategory from './pages/AdminPages/Category/AddCategory'
import Category from './pages/AdminPages/Category/Category'
import DeleteCategory from './pages/AdminPages/Category/DeleteCategory'
import UpdateCategory from './pages/AdminPages/Category/UpdateCategory'
import ApproveOrder from './pages/AdminPages/Order/ApproveOrder'
import DeleteOrder from './pages/AdminPages/Order/DeleteOrder'
import Order from './pages/AdminPages/Order/Order'
import OrderInfo from './pages/AdminPages/Order/OrderInfo'
import AddProduct from './pages/AdminPages/Product/AddProduct'
import DeleteProduct from './pages/AdminPages/Product/DeleteProduct'
import Products from './pages/AdminPages/Product/Product'
import UpdateProduct from './pages/AdminPages/Product/UpdateProduct'
import DeleteUser from './pages/AdminPages/User/DeleteUser'
import User from './pages/AdminPages/User/User'
import UserOrders from './pages/AdminPages/User/UserOrders'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ConfirmOrder from './pages/ConfirmOrder'
import EmailConfirm from './pages/EmailConfirm'
import { AdminRoutes, UserRoutes } from './pages/FilterRoutes'
import ForgetPassword from './pages/ForgetPassword'
import Home from './pages/Home'
import Items from './pages/Items'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Shipping from './pages/Shipping'
import OrderDetails from './pages/User Pages/OrderDetails'
import UserDash from './pages/User Pages/UserDash'

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
          <Route path='/admin/users' element={<User />} />
          <Route path='/admin/user/delete/:userId' element={<DeleteUser />} />
          <Route path='/admin/user/userOrders/:userId' element={<UserOrders />} />

          <Route path='/admin/category' element={<Category />} />
          <Route path='/admin/category/add' element={<AddCategory />} />
          <Route path='/admin/category/update/:categoryId' element={<UpdateCategory />} />
          <Route path='/admin/category/delete/:categoryId' element={<DeleteCategory />} />

          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/product/add' element={<AddProduct />} />
          <Route path='/admin/product/update/:productId' element={<UpdateProduct />} />
          <Route path='/admin/product/delete/:productId' element={<DeleteProduct />} />

          <Route path='/admin/orders' element={<Order />} />
          <Route path='/admin/order/orderInfo/:orderId' element={<OrderInfo />} />
          <Route path='/admin/order/delete/:orderId' element={<DeleteOrder />} />
          <Route path='/admin/order/approveOrder/:orderId' element={<ApproveOrder />} />

        </Route>
        <Route path='/' element={<UserRoutes />} >
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/confirmOrder' element={<ConfirmOrder />} />
          <Route path='/user/profile/' element={<UserDash />} />
          <Route path='/user/orderDetails/:orderId' element={<OrderDetails />} />
        </Route>

        <Route path='/items' element={<Items/>} />
        <Route path='/productDetails/:id' element={<ProductDetail />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Myroutes