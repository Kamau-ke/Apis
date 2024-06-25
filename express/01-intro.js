const express=require('express')
const app=express()

app.get('/', (req, res)=>{
    if(req.url==='/'){
        res.status(200).send('Welcome to home page')
    
    }
    
})

app.get('/about', (req, res)=>{
    res.status(200).send('Welcome to about page')
})

app.all('*', (req, res)=>{
    res.status(404).send('Page not found')
})


app.listen(5000, ()=>{
    console.log('Server running on port 5000....')
})