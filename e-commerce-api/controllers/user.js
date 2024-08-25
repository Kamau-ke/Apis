const User=require('../models/user')
const badRequest=require('../errors/badRequest')
const unAuthorized=require('../errors/unAuthorized')
const jwt=require('jsonwebtoken')
const {StatusCodes}=require('http-status-codes')

const register=async (req,res)=>{
    const user=await User.create(req.body)
    
    res.status(200).json({user})
}


const login=async (req,res)=>{
    const {email, password}=req.body

    if(!email || !password){
        throw new badRequest('Provide email and password')
    }

    const user=await User.findOne({email})

    if(!user){
        throw new unAuthorized('Invalid credentials')
    }

    const isMatch=await user.comparePassword(password)

    if(!isMatch){
        throw new unAuthorized('Invalid password')
    }

    const token =await jwt.sign({id:user._id, name:user.name}, process.env.JWT_SECRET,{expiresIn:'30d'} )

    res.status(StatusCodes.OK).json({token})
}


const logout=(req,res)=>{
    res.send('logout user')
}

module.exports={
    register, 
    login,
    logout
}
