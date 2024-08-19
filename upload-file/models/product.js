const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Provide product name']
    },
    price:{
        type:Number,
        required:[true, 'Provide product price']
    },
    image:{
        type:String,
        required:[true, 'Provide image']
    }
})

module.exports=mongoose.model('Product', productSchema)