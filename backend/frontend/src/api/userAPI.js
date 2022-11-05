import { API } from "../config";


//to register new user
export const userRegister = (user) => {
//     console.log(user)
    return fetch(`${API}/register`, {
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(error=>console.log(error))
}


//to confirm email 
export const userConfirmation = (token)=>{
    return fetch(`${API}/verifyUser/${token}`,{
        method:"GET"
    })
    .then(response => response.json())
    .catch(error=>console.log(error))
}


// forget password
export const forgetpassword = (email) => {
     return fetch(`${API}/forgetpassword`,{
         method:"POST",
         headers:{
             Accept: "application/json",
             "Content-Type":"application/json"
         },
         body:JSON.stringify({email})
     })
     .then(res=>res.json())
     .catch(error=>console.log(error))
 }

 
//reset Password
export const resetPassword = (password, token) => {
     return fetch(`${API}/resetpassword/${token}`,{
         method:"POST",
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json"
         },
         body: JSON.stringify({password})
     })
     .then(res=>res.json())
     .catch(error=>console.log(error))
 }


 // sign in
export const signin = (email, password) => {
     return fetch(`${API}/signin`, {
         method:"POST",
         headers: {
             Accept: "application/json",
             "Content-Type":"application/json"
         },
         body: JSON.stringify({email, password})
     })
     .then(res=>res.json())
     .catch(error=>console.log(error))
 }
 
 // authenticate
 export const authenticate = (data) => {
     localStorage.setItem('jwt', JSON.stringify(data))
 }
 

 //  to check if authenticated or not
 export const isAuthenticated = () => {
     if(localStorage.getItem('jwt')){
         return JSON.parse(localStorage.getItem('jwt'))
     }
     else{
         return false
     }
 }

 
 // signout
 export const signout = () => {
     return fetch(`${API}/signout`, {
         method:"GET"
     })
     .then(res=>res.json())
     .catch(error=>console.log(error))
 }
 
 