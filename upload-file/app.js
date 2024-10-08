require('dotenv').config()
const express=require('express')
const app=express()
const connect=require('./db/connect')
const uri=process.env.MONGO_URL
const notFound=require('./middleware/notFound')
const productRoutes=require('./routes/product')
const fileUpload=require('express-fileupload')
const errorHandlerMiddleware=require('./middleware/errorHandler')
const cloudinary=require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
})

app.use(fileUpload({
    useTempFiles:true
}))

app.use(express.json())
app.use('/api/v1/product', productRoutes)

app.use(notFound)
app.use(errorHandlerMiddleware)
const start=async ()=>{
    try {
        await connect(uri)
        app.listen(3000, console.log('App running on port 3000'))
    } catch (error) {
        console.log(error);
        
    }
 
}

start()