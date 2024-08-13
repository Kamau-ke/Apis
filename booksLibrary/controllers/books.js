const Book=require('../model/books')
const {StatusCodes}=require('http-status-codes')

const createBook=async (req,res)=>{
    
    req.body.createdBy=req.user.userId
    const book=await Book.create(req.body)
    
    res.status(StatusCodes.CREATED).json({book})
}

const getAllBooks=(req,res)=>{
    res.send('All books')
}

const getBook=async (req,res)=>{
    const {user:{userId},params:{id:bookId} }=req
    const book=await Book.findOne({_id: bookId, createdBy:userId })
    res.status(StatusCodes.OK).json({book})
}


const editBook=(req,res)=>{
    res.send('Edit book')
}

const deleteBook=(req,res)=>{
    res.send('delete book')
}

module.exports={
    createBook,
    getAllBooks,
    getBook,
    editBook,
    deleteBook
}