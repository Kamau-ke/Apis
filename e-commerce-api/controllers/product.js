const Product=require('../models/Products')
const {StatusCodes}=require('http-status-codes')
const badRequest=require('../errors/badRequest')
const path=require('path')
const fs=require('fs')

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
    res.status(StatusCodes.OK).json({msg: "Success! product removed"})
}

const uploadImage=async (req, res)=>{
    if(!req.files){
        throw new badRequest('No file uploaded')
    }

    const productImage=req.files.image

    if(productImage.mimetype.startsWith('image')){
        throw new badRequest('Please upload image')
    }

    const maxSize=1024*1024

    if(productImage.size > maxSize){
        throw new badRequest('Upload image of not more than 1MB')
    }

    const imagePath=path.join(
        __dirname,
        '../public/uploads', +`${productImage.name}`
    )

    await productImage.mv(imagePath)

    res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`})
}


module.exports={
    createProduct,
    viewProduct,
    viewProducts,
    editProduct,
    deleteProduct,
    uploadImage
}