import React from 'react'
import {BrowserRouter,Route,Routes} from'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const Myroutes = () => {
  return (
    <BrowserRouter>
     <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/cart' element={<Cart/>} />

          
     </Routes>
    </BrowserRouter>
  )
}

export default Myroutes