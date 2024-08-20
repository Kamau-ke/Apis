const express=require('express')
const router=express.Router()
const {createProduct, getProducts}=require('../controllers/product')
const uploadImage=require('../controllers/upload')

router.route('/').post(createProduct).get(getProducts)
router.route('/uploads').post(uploadImage)

module.exports=router
