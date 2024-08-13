const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please provide title']
    },
    author:{
        type:String,
        required:[true, 'Please provide author']
    },
    genre:{
        type:String,
        required:[true, 'Please provide genre'],
        enum:{values:['Fantasy',
            'Science', 
            'Fiction',
            'Mystery',
            'Thriller',
            'Romance',
            'Horror',
            'Historical', 'Fiction',
            'Biography',
            'Memoir',
            'Self-Help',
            'Non-Fiction',
           ' Young Adult (YA)',
            'Dystopian',
            'Adventure',
            'Literary-Fiction',
            'Crime',
            'Humor',
            'Graphic-Novels',
            'Poetry',
           ' Spirituality', ], message:'{VALUE} is not supported'},
    },
    publishedDate:{
        type:Date
    },

    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'please provide user']
    }
}, {timestamps:true})

module.exports=mongoose.model('Book', bookSchema)