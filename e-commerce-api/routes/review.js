const express=require('express')
const router=express.Router()
const {addReview, getAllReviews, editReview, deleteReview,getSingleProductReviews}=require('../controllers/review')
router.route('/').get(getAllReviews).post(addReview)
router.route('/:id').get(getSingleProductReviews).patch(editReview).delete(deleteReview)

module.exports=router