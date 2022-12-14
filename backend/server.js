const express = require('express')
require('dotenv').config()
const cors = require('cors')

//importing routes
const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRoute')
const UserRoute = require('./routes/userRoute')
const OrderRoute = require('./routes/orderRoute')


const app = express()
var corOptions = {
     origin:"http://localhost:3000"
}


//middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



//routes
app.use('/api',CategoryRoute)
app.use('/api',ProductRoute)
app.use('/api',UserRoute)
app.use('/api',OrderRoute)
app.use('/api/public/uploads', express.static('public/uploads'))


app.get('/',(req,res)=>{
     res.send("hello")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
     console.log("Server started at port " + PORT)
})