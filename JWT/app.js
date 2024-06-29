require('dotenv').config()
require('express-async-errors')

const express=require('express')
const app=express()
const mainRouter=require('./Routes/main')

const notFoundMiddleware=require('./middleware/not-found')
const errorHandler=require('./middleware/error-handler')

app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1', mainRouter)

app.use(errorHandler)
app.use(notFoundMiddleware)



const port=process.env.port || 3000

const start=async()=>{
    try {

        app.listen(port, ()=>console.log(`app listening to port ${port}`))
        
    } catch (error) {
        console.log(error)
    }
}

start()
