const express=require('express')
const app=express()
const tasks=require('./routes/tasks')

const connectDB=require('./db/connect')
require('dotenv').config()
const notFound=require('./middleware/not-found')

const uri=process.env.URI

app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/tasks',tasks )
app.use(notFound)
var port=3000


const start= async ()=>{
    try {
        await connectDB(uri)
        app.listen(port, console.log(`App listening to port  ${port}`))

    } catch (error) {
        console.log(error)
    }
}

start()