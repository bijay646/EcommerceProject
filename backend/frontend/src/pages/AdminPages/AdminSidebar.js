import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../../api/userAPI'

const AdminSidebar = ({ category, products, users, orders }) => {
     const { user } = isAuthenticated()
     const [error, setError] = useState('')
     const navigate = useNavigate()

     const handleSignout = e => {
          e.preventDefault()
          signout()
               .then(data => {
                    if (data.error) {
                         setError(data.error)
                    }
                    else {
                         localStorage.removeItem('jwt')
                         console.log("signed out successfully.")
                         navigate('/')
                    }
               })
     }
     const showError = () => {
          if (error) {
               return <div className='alert alert-danger'>{error}</div>
          }
     }
     return (
          <>
               {showError()}
               <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "280px" }}>

                    <Link to="/admin/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                         <i className='bi bi-speedometer2 me-2'></i>
                         <span className="fs-4">Dashboard</span>
                    </Link>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto text-start">
                         <li>
                              {
                                   category ?
                                        <Link to="/admin/category" className="nav-link link-dark active text-white">
                                             <i className="bi bi-tags me-2"></i>
                                             Category
                                        </Link>
                                        :
                                        <Link to="/admin/category" className="nav-link link-dark">
                                             <i className="bi bi-tags me-2"></i>
                                             Category
                                        </Link>
                              }

                         </li>
                         <li>
                              {
                                   products ?
                                        <Link to="/admin/products" className="nav-link link-dark active text-white">
                                             <i className='bi bi-grid me-2'></i>
                                             Products
                                        </Link> :
                                        <Link to="/admin/products" className="nav-link link-dark">
                                             <i className='bi bi-grid me-2'></i>
                                             Products
                                        </Link>
                              }
                         </li>
                         <li>
                              {
                                   users ?
                                        <Link to="/admin/users" className="nav-link link-dark  active text-white">
                                             <i className='bi bi-person-circle me-2'></i>
                                             Users
                                        </Link>
                                        :
                                        <Link to="/admin/users" className="nav-link link-dark">
                                             <i className='bi bi-person-circle me-2'></i>
                                             Users
                                        </Link>
                              }
                         </li>

                         <li>
                              {
                                   orders ?
                                        <Link to="/admin/orders" className="nav-link link-dark active text-white">
                                             <i className='bi bi-table me-2'></i>
                                             Orders
                                        </Link>
                                        :
                                        <Link to="/admin/orders" className="nav-link link-dark">
                                             <i className='bi bi-table me-2'></i>
                                             Orders
                                        </Link>
                              }
                         </li>
                    </ul>
                    <hr />
                    <div className="dropdown">
                         <Link to="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2 mt-2" />
                              <strong>{user.username}</strong>
                         </Link>
                         <ul className="dropdown-menu text-small shadow">
                              <li><span className="dropdown-item">{user.email}</span></li>
                              <li><hr className="dropdown-divider" /></li>
                              <li><Link className="dropdown-item" to="#" onClick={handleSignout}>Sign out</Link></li>
                         </ul>
                    </div>
               </div>
          </>
     )
}

export default AdminSidebar