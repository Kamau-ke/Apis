const express=require('express')
const app=express()
const connectDB=require('./db/connect')
require('dotenv').config()
require('express-async-errors')
const authUserRoutes=require('./routes/authUser')
const notFoundMiddleware=require('./middlewares/notFound')
const errorHandlerMiddleware=require('./middlewares/errorHandler')

app.use(express.json())
app.use('/api/v1/users', authUserRoutes)
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