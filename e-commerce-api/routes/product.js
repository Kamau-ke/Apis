const express=require('express')
const router=express.Router()
const {authenticateUser, authorizePermission}=require('../middlewares/auth')

const { createProduct,
    viewProduct,
    viewProducts,
    editProduct,
    deleteProduct}=require('../controllers/product')

router.route('/').post([authenticateUser, authorizePermission('admmin')],createProduct).get(viewProducts)
router.route('/:id').get(viewProduct).patch([authenticateUser, authorizePermission('admmin')],editProduct).delete([authenticateUser, authorizePermission('admmin')], deleteProduct)

module.exports=router