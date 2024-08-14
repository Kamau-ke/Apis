const Book=require('../model/books')
const {StatusCodes}=require('http-status-codes')
const {badRequest, unAuthorized}=require('../errors')
const createBook=async (req,res)=>{
    
    req.body.createdBy=req.user.userId
    const book=await Book.create(req.body)
    
    res.status(StatusCodes.CREATED).json({book})
}

const getAllBooksMix =async (req, res)=>{
    const books=await Book.find({})
    res.status(StatusCodes.OK).json({books})
}

const getAllBooks=async (req,res)=>{
    const {user: {userId}}=req
    // if(!userId){
    //     throw new unAuthorized('Please login first')
    // }

    const books=await Book.find({createdBy: userId})
    res.status(StatusCodes.OK).json({books})
}

const getBook=async (req,res)=>{
    const {user:{userId},params:{id:bookId} }=req
    const book=await Book.findOne({_id: bookId, createdBy:userId })
    if(!book){
        throw new badRequest('Book does not exist')
    }
    res.status(StatusCodes.OK).json({book})
}


const editBook=async (req,res)=>{
    const {user:{userId}, params:{id:bookId}, body:{title, author}}=req
    if(!title || !author ){
        throw new badRequest('title or author cannot be empty')
    }

    const book=await Book.findOneAndUpdate({_id: bookId, createdBy:userId}, req.body, {runValidators:true})

    res.status(StatusCodes.OK).json({book})
}

const deleteBook=async (req,res)=>{
    const {user:{userId}, params:{id:bookId}}=req

    const book=await Book.findOneAndDelete({_id: bookId, createdBy:userId})

    if(!book){
        throw new badRequest('Book does not exist')
    }

    res.status(StatusCodes.OK).json({msg: 'Book successfully removed'})

    
}

module.exports={
    createBook,
    getAllBooks,
    getAllBooksMix,
    getBook,
    editBook,
    deleteBook
}