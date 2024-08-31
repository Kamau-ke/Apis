const Product=require('../models/Products')
const {StatusCodes}=require('http-status-codes')
const badRequest=require('../errors/badRequest')

const createProduct=async (req, res)=>{
    const product =await Product.create({...req.body})
    res.status(StatusCodes.OK).json({product})
}

const viewProducts=async (req, res)=>{
    const products=await Product.find({})

    res.status(StatusCodes.OK).json({products, count: products.length})

}

const viewProduct=async (req, res)=>{
    const {id:productId}=req.params
    const product=await Product.find({_id:productId})

    if(!product){
        throw new badRequest('No item found with that id')
    }

    res.status(StatusCodes.OK).json({product})
}

const editProduct=async (req, res)=>{
    const {id:productId}=req.params
    const product=await Product.find({_id:productId})
    if(!product){
        throw new badRequest('Product not found')
    }
    const newProduct=await Product.findOneAndUpdate({_id:productId},req.body, {runValidators:true, new:true})

    res.status(StatusCodes.OK).json({newProduct})
}

const deleteProduct=async (req, res)=>{
    const {id:productId}=req.params
    const product=await Product.find({_id})
    if(!product){
        throw new badRequest('product not found')
    }

    await Product.findOneAndDelete({_id:productId})
    res.status(StatusCodes.OK).json({msg: "product deleted successfully"})
}


module.exports={
    createProduct,
    viewProduct,
    viewProducts,
    editProduct,
    deleteProduct
}