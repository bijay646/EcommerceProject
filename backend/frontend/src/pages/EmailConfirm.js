import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { userConfirmation } from '../api/userAPI'

const EmailConfirm = () => {
     const params = useParams()
     const token = params.token
     const [success, setSuccess] = useState(false)
     const [error, setError] = useState('')

     useEffect(() => {
          userConfirmation(token)
               .then(data => {
                    if (data.error) {
                         setError(data.error)
                         setSuccess('')
                    }
                    else {
                         setSuccess(true)
                         setError('')
                    }
               })
               .catch(error => console.log(error))

     }, [])

     const showError = () => {
          if (error) {
               return <div className='alert alert-danger'>{error}</div>
          }
     }
     const showSuccess = () => {
          if (success) {
               return <div className='alert alert-success'>User Verified Successfully.</div>
          }
     }


     return (
          <>
               <Navbar />
               {showError()}
               {showSuccess()}
               <Footer />
          </>
     )
}

export default EmailConfirm