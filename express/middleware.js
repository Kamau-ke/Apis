const logger=require('./logger')
const auth=require('./authorize')

// app.use(logger) for all urls

// for specific urls we add path

app.use('/',[logger, auth] )

app.get('/', (req, res)=>{
    
    res.send('Home')
})
app.get('/api/home', (req, res)=>{
    
    res.send('Home api')
})

app.get('/api/about', (req, res)=>{
    
    res.send('About api')
})

app.get('/about', (req, res)=>{


    res.send('About')
})