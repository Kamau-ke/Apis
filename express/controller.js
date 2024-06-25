const {people, products} =require('../data')

app.get('/', (req, res)=>{
    res.send("<h2>welcome</h2> <a href='/products'>Products</a>")
})

app.get('/api/products', (req,res)=>{
    const newProduct=products.map(product=>{
        const {id, name, image,price}=product
        return {id, name, image, price}
    })

    res.json(newProduct)
})

app.get('/api/products/:productID', (req, res)=>{
    const {productID}=req.params
    const product=products.find(product=> product.id==Number(productID))

    if(!product){
        res.status(404).send('Product does not exist')
    }else{

        res.json(product)
    }

})

app.get('/api/v1/query', (req, res)=>{
    const {search, limit}=req.query
    
    let newProducts=[...products]
    if(search){

         newProducts=newProducts.filter(product=>{
           return product.name.startsWith(search)
        })
    }

     if(limit){
            newProducts=newProducts.slice(0, Number(limit))
    }
       
    if(newProducts.length<1){

        newProducts={"success":true, "data":[]}
    }
    


    res.status(200).json(newProducts)
})