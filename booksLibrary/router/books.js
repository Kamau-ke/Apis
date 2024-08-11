const express=require('express')
const router=express.Router()
const {createBook,
    getAllBooks,
    getBook,
    editBook,
    deleteBook}=require('../controllers/books')


router.route('/').get(getAllBooks).post(createBook)
router.route('/:id').get(getBook).patch(editBook).delete(deleteBook)

module.exports=router