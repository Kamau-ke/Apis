require('dotenv').config()
require('express-async-errors')

const express=require('express')
const app=express()

const connectDB=require('./db/connect')

const authRouter=require('./Routes/auth')
const jobsRouter=require('./Routes/jobs')


const notFoundMiddleware=require('./middleware/not-found')
const errorHandler=require('./middleware/error-handler')

app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)



app.use(errorHandler)
app.use(notFoundMiddleware)


const port=process.env.port || 3000


const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>console.log(`app listening to port ${port}`))
        
    } catch (error) {
        console.log(error)
    }
}

start()
