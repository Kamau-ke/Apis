const express=require('express')
const router=express.Router()
const {addReview, getReview, getAllReviews, editReview, deleteReview}=require('../controllers/review')
router.route('/').get(getAllReviews).post(addReview)
router.route('/:id').get(getReview).patch(editReview).delete(deleteReview)

module.exports=router