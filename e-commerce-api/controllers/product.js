const createProduct=(req, res)=>{
    res.send('create product')
}

const viewProducts=(req, res)=>{
    res.send('view products')
}

const viewProduct=(req, res)=>{
    res.send('view product')
}

const editProduct=(req, res)=>{
    res.send('edit product')
}

const deleteProduct=(req, res)=>{
    res.send('delete product')
}


module.exports={
    createProduct,
    viewProduct,
    viewProducts,
    editProduct,
    deleteProduct
}