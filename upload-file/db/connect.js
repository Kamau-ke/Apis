const mongoose=require('mongoose')

const start=(uri)=>{
    mongoose.connect(uri)
    .then(console.log('Connected to database'))
    .catch(err=>console.log(err))
}

module.exports=start