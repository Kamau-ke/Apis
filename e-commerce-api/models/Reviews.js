const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please provide review title']
    },
    comment:{
        type:String,
        required:[true, 'Please provide review comment']
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true, 'Please provide rating']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Products',
        required:true
    }
},{timestamps:true})


module.exports=mongoose.model('Review', reviewSchema)