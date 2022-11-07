import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../api/userAPI'

const Navbar = () => {
     const navigate = useNavigate()
     const { user } = isAuthenticated()
     const [error, setError] = useState('')
     const dispatch = useDispatch()

     const handleSignout = e => {
          e.preventDefault()
          signout()
               .then(data => {
                    if (data.error) {
                         setError(data.error)
                    }
                    else {
                         localStorage.removeItem('jwt')
                         console.log("Signed out successfully.")
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
               <div className='row bg-dark text-white py-3 '>
                    <div className='col-10 text-start px-4'>
                         <Link className="navbar-brand fs-2 fw-bold" to="/"><i className="bi bi-shop fs-1 me-2"></i>Trend Partner</Link>
                    </div>
                    <div className='col-2 d-flex justify-content-evenly'>
                         {
                              !user &&
                              <>
                                   <Link to='/register'><i className="bi bi-person-plus text-white fs-3"></i></Link>
                                   <Link to='/login'><i className="bi bi-box-arrow-in-left text-white fs-3"></i></Link>
                              </>
                         }
                         {
                              user && user.role === 0 &&
                              <>
                                   <Link to='/user/profile'><i className='bi bi-person-circle text-white fs-3'></i></Link>
                                   <Link to='/cart'><i className="bi bi-cart4 text-white fs-3"></i></Link>
                              </>
                         }
                         {
                              user && user.role === 1 &&
                              <Link to='/admin/users'><i className='bi bi-menu-up text-white fs-3'></i></Link>
                         }
                         {
                              user &&
                              <Link to='/' onClick={handleSignout}><i className="bi bi-box-arrow-right text-white fs-3"></i></Link>
                         }



                    </div>
               </div>
               <nav className="navbar navbar-expand-lg bg-light shadow">
                    <div className="container-fluid">
                         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                         </button>
                         <div className="collapse navbar-collapse" id="navbarSupportedContent">
                              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                   <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/"><h5>Home</h5></Link>
                                   </li>
                                   <li className="nav-item">
                                        <Link className="nav-link" to="/items"><h5>Products</h5></Link>
                                   </li>
                                   
                                   <div className=''>
                                        <form className="d-flex" role="search">
                                             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e=>dispatch({type:"UPDATE_ITEM", payload:e.target.value})}/>
                                        </form>
                                   </div>
                              </ul>

                         </div>
                    </div>
               </nav>
               {showError()}
          </>
     )
}

export default Navbar