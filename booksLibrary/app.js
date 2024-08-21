require('dotenv').config()

const express=require('express')
const app=express()
require('express-async-errors')
const cloudinary=require('cloudinary').v2
const connectDB=require('./db/connect')
const booksRouter=require('./router/books')
const userRouter=require('./router/users')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const authenticationMiddleware=require('./middleware/auth')
const fileUpload=require('express-fileupload')

cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

app.use(fileUpload({
    useTempFiles:true
}))
app.use(express.json())
app.use('/api/v1/books',authenticationMiddleware, booksRouter)
app.use('/api/v1/user', userRouter)

app.use(errorHandlerMiddleware)


const start=async (uri)=>{
    await connectDB(uri)
    app.listen(3000, console.log('App listening to port 3000'))
}

start(process.env.MONGO_URL)
