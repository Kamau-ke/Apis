const express=require('express')
const router=express.Router()

const { createProduct,
    viewProduct,
    viewProducts,
    editProduct,
    deleteProduct}=require('../controllers/product')

router.route('/').post(createProduct).get(viewProducts)
router.route('/:id').get(viewProduct).patch(editProduct).delete(deleteProduct)

module.exports=router