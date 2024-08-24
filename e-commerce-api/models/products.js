const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide product name']
    },
    description:{
        type:String,
        required:[true, 'Please provide description']
    },
    category:{
        type:String,
        enum:{
            values:['Electronics', 'Clothing', 'Office'],
            message:'{Value} is not supported'
        }
    },
    price:{
        type:Number,
        required:[true, 'Provide price'],
        default:0
    },
    image:{
        type:String,
        required:[true, 'Provide image']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Product', productSchema)