import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { authenticate, isAuthenticated, signin } from '../api/userAPI'

const Login = () => {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [error, setError] = useState('')
     const [success, setSuccess] = useState(false)

     const { user } = isAuthenticated()

     const navigate = useNavigate()

     const handleSubmit = e => {
          e.preventDefault()
          signin(email, password)
               .then(data => {
                    if (data.error) {
                         setError(data.error)
                    }
                    else {
                         authenticate(data)
                         setSuccess(true)

                    }
               })
               .catch(err => console.log(err))
     }

     const showError = () => {
          if (error) {
               return <div className='alert alert-danger'>{error}</div>
          }
     }
     const redirect = () => {
          if (success) {
               if (user && user.role === 0) {
                    navigate('/user/profile')
               }
               else if (user && user.role === 1) {
                    navigate('/admin/dashboard')
               }
               else {
                    return
               }
          }
     }


     return (
          <>
               <Navbar />
               <main className="form-signin w-50 m-auto mx-auto my-5 shadow-lg p-5">
                    <form>
                         {showError()}
                         {redirect()}
                         <img className="mb-4" src="./logo192.png" alt="" width="72" height="57" />
                         <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                         <div className="form-floating mb-2">
                              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                              <label htmlFor="floatingInput">Email address</label>
                         </div>
                         <div className="form-floating mb-2">
                              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                              <label htmlFor="floatingPassword">Password</label>
                         </div>

                         <div className="checkbox mb-3">
                              <label>
                                   <input type="checkbox" value="remember-me" /> Remember me
                              </label>
                         </div>
                         <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign in</button>
                         <Link to='/forgetpassword'>Forget Password</Link><br />
                         I do not have an account. <Link to='/register'>Register</Link>
                         <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
                    </form>
               </main>
               <Footer />
          </>
     )
}

export default Login