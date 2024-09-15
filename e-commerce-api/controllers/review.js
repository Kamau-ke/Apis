const badRequest = require('../errors/badRequest')
const notFound=require('../errors/notFound')
const Review=require('../models/Reviews')
const {StatusCodes}=require('http-status-codes')
const Product=require('../models/Products')
const checkPermission=require('../utils/checkPermission')
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

    req.body.user=req.user.userId
    const review=await Review.create(req.body)
    
    res.status(StatusCodes.OK).json({review})
}

const getAllReviews=async (req, res)=>{
    const reviews=await Review.find({}).populate(
       { path:'product',
        select:'name company price'
      }
    )

    res.status(StatusCodes.OK).json({reviews, count: reviews.length})
}



const editReview=async (req, res)=>{
    const {id:reviewId}=req.params
    const {title, rating, comment}=req.body

    const review=await Review.findOne({_id:reviewId})
    if(!review){
        throw new notFound('Review not found')
    }
    checkPermission(req.user, review.user)

    review.title=title,
    review.rating=rating,
    review.comment=comment

    await review.save()

    const updatedReview=await Review.findOneAndUpdate({_id:reviewId}, req.body, {new:true})
    res.status(StatusCodes.OK).json({updatedReview})
}

const deleteReview=async (req, res)=>{
    const {id:reviewId}=req.params
    const review=await Review.findOne({_id:reviewId})
    if(!review){
        throw new notFound('Review not found')
    }

    checkPermission(req.user, review.user)

    await review.remove()
    res.status(StatusCodes.OK).json({msg: 'success! review removed'})
}

const getSingleProductReviews=async (req, res)=>{
    const {id:productId}=req.params
    const reviews=await Review.find({})
    res.status(StatusCodes.OK).json({revies, count:reviews.length})
}

module.exports={addReview,getAllReviews, editReview, deleteReview, getSingleProductReviews}