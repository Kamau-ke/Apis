const mongoose=require('mongoose')

const singleItemSchema=new mongoose.Schema({
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
  
})

const orderSchema=new mongoose.Schema({
    tax:{
        type:Number,
        required:true
    },
    shippingFee:{
        type:Number,
        required:true
    },
    subtotal:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    orderItems:[singleItemSchema],
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    clientSecret: {
        type: String,
        required: true,
      },
    paymentIntentId: {
        type: String,
      },
}, {timestamps:true})


module.exports=mongoose.model('Order', orderSchema)