const addReview=async (req, res)=>{
    res.send('add your review')
}

const getAllReviews=async (req, res)=>{
    res.send('get all reviews')
}

const getReview=async (req, res)=>{
    res.send('get review')
}

const editReview=async (req, res)=>{
    res.send('edit review')
}

const deleteReview=async (req, res)=>{
    res.send('delete review')
}

module.exports={addReview,getAllReviews, getReview,editReview, deleteReview}