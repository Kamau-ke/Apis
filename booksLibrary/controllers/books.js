const createBook=(req,res)=>{
    res.send('Add new book')
}

const getAllBooks=(req,res)=>{
    res.send('All books')
}

const getBook=(req,res)=>{
    res.send('One book')
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