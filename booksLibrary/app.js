require('dotenv').config()

const express=require('express')
const app=express()
require('express-async-errors')

const connectDB=require('./db/connect')
const booksRouter=require('./router/books')
const userRouter=require('./router/users')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const authenticationMiddleware=require('./middleware/auth')
app.use(express.json())


app.use('/api/v1/books',authenticationMiddleware, booksRouter)
app.use('/api/v1/user', userRouter)

app.use(errorHandlerMiddleware)


const start=async (uri)=>{
    await connectDB(uri)
    app.listen(3000, console.log('App listening to port 3000'))
}

start(process.env.MONGO_URL)
