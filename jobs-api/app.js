require('dotenv').config()
require('express-async-errors')

// security

const helmet=require('helmet')
const cors=require('cors')
const xss=require('xss-clean')
const rateLimiter=require('express-rate-limit')

// 

const express=require('express')
const app=express()

const connectDB=require('./db/connect')

// swagger
const swaggerUI=require('swagger-ui-express')
const YAML=require('yamljs')
const swaggerDoc=YAML.load('./swagger.yaml')

const authRouter=require('./Routes/auth')
const jobsRouter=require('./Routes/jobs')
const authenticateUser=require('./middleware/authentication')


const notFoundMiddleware=require('./middleware/not-found')
const errorHandler=require('./middleware/error-handler')

app.use(express.json())

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false,
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res)=>{
    res.send("<h1>Jobs api</h1><a href='/api-docs'>Api documentation</a>")
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)



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
