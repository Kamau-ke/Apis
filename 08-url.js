const http=require('http')
const {readFileSync}=require('fs')

const home=readFileSync('./methods-public/index.html')
http.createServer((req,res)=>{
    res.writeHead(200, 'text/html')

    if(req.url==='/'){
        res.end(home)
    }
}).listen(5000, ()=>{
    console.log('server running on port 5000...')
})