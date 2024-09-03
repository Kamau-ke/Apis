const badRequest = require('../errors/badRequest')
const notFound=require('../errors/notFound')
const Review=require('../models/Reviews')
const {StatusCodes}=require('http-status-codes')
const Product=require('../models/Products')
const addReview=async (req, res)=>{
    const {id:productId}=req.params
    const isValidProduct=await Product.findOne({_id:productId})
    if(!isValidProduct){
        throw new notFound('Product not found')
    }

    const alreadyReviewed=await Review.findOne({
        product:productId,
        user:req.user.userId
    })

    if(alreadyReviewed){
        throw new badRequest('You have reviewed this product already')
    }
    const review=await Review.create(req.body)
    
    res.status(StatusCodes.OK).json({review})
}

const getAllReviews=async (req, res)=>{
    const reviews=await Review.find({})

    res.status(StatusCodes.OK).json({reviews})
}

const getReview=async (req, res)=>{
    const {id:reviewId}=req.params
    const review=await Review.findOne({_id:reviewId})
    if(!review){
        throw new notFound('Review not found')
    }

    res.status(StatusCodes.OK).json({review})
}

const editReview=async (req, res)=>{
    const {id:reviewId}=req.params
    const review=await Review.findOne({_id:reviewId})
    if(!review){
        throw new notFound('Review not found')
    }
    const updatedReview=await Review.findOneAndUpdate({_id:reviewId}, req.body, {new:true})
    res.status(StatusCodes.OK).json({updatedReview})
}

const deleteReview=async (req, res)=>{
    const {id:reviewId}=req.params
    const review=await Review.findOne({_id:reviewId})
    if(!review){
        throw new notFound('Review not found')
    }
    await Review.findOneAndDelete({_id:reviewId})
    res.status(StatusCodes.OK).json({msg: 'Review deleted successfully'})
}

module.exports={addReview,getAllReviews, getReview,editReview, deleteReview}