const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide name']
    },
    email:{
        type:String,
        required:[true, 'please provide email'],
        validate:{
            validator:validator.isEmail,
            message:'please provide correct email'
        },
        unique:true
    },

    password:{
        type:String,
        required:[true, 'Please provide password'],
        minlength:6
    },

    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    }

})

userSchema.pre('save', async function(){
    // if(!this.isModified('password')) return;
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt)

})

userSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

userSchema.methods.createToken=async function (user){
    
}

module.exports=mongoose.model('User', userSchema)