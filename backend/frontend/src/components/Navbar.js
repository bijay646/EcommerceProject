import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
     return (
          <>
               <div className='row bg-dark text-white pt-2'>
                    <div className='col-3'>
                         <Link className="navbar-brand fs-3 fw-bold" to="/">Navbar</Link>
                    </div>
                    <div className='col-6'> <form className="d-flex" role="search">
                         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                         <button className="btn btn-warning" type="submit">Search</button>
                    </form></div>
                    <div className='col-3 d-flex justify-content-evenly'>
                    <Link to='/register'><i class="bi bi-person-plus text-white fs-3"></i></Link>
                    <Link to='/login'><i class="bi bi-box-arrow-left text-white fs-3"></i></Link>
                    <Link to='/cart'><i class="bi bi-cart4 text-white fs-3"></i></Link>
                    </div>
               </div>
               <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">

                         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                         </button>
                         <div className="collapse navbar-collapse" id="navbarSupportedContent">
                              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                   <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                   </li>
                                   <li className="nav-item">
                                        <Link className="nav-link" to="#">Link</Link>
                                   </li>


                              </ul>

                         </div>
                    </div>
               </nav>


          </>
     )
}

export default Navbar