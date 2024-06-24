require('dotenv').config()
require('express-async-errors')
const express=require('express')
const app=express()

const connectDB=require('./db/connect')

app.use(express.json())
// middlewares
const notFoundMiddleware=require('./middleware/not-found')
const router = require('./Routes/products')
const errorHandler=require('./middleware/error-handler')
app.use('/api/v1/products', router)
app.get('/', (req, res)=>{
    res.send('<h1>Store api</h1> <a href="/api/v1/products">Products</a>')
})

const port=process.env.PORT || 3000
app.use(notFoundMiddleware)
app.use(errorHandler)

const start=async()=>{
    try {
        // connectDB

        await connectDB(process.env.MONGO_URI)

        app.listen(port, console.log(`Server listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()

