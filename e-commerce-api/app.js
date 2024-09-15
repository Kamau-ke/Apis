const express=require('express')
const app=express()
const connectDB=require('./db/connect')
require('dotenv').config()
require('express-async-errors')
const authUserRoutes=require('./routes/auth')
const notFoundMiddleware=require('./middlewares/notFound')
const errorHandlerMiddleware=require('./middlewares/errorHandler')
const productsRouter=require('./routes/product')
const reviewRouter=require('./routes/review')
const userRouter=require('./routes/userRoutes')
const cookieParser=require('cookie-parser')

app.use(express.static('./public'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authUserRoutes)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/review', reviewRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, console.log('App listening on port 3000') )
    } catch (error) {
       console.log(error);
        
    }
}

start()