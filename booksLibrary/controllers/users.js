const User=require('../model/user')
const {StatusCodes}=require('http-status-codes')
const { badRequest, unAuthorized }=require('../errors')
const jwt=require('jsonwebtoken')

const register=async (req, res)=>{
    try {
        const user=await User.create({...req.body})
        const token=user.createJWT()
        res.status(StatusCodes.CREATED).json({user:{name: user.getName()}, token })
    } catch (error) {
        console.log(error);
        
        res.status(StatusCodes.BAD_REQUEST).json({error: error.message})
        
    }
    
}

const login=async (req, res)=>{
    const {email, password}=req.body

    if(!email || !password){
        throw new badRequest('Please provide name and password')
    }

    const user=await User.findOne({email})
    
    
    if(!user){
        throw new badRequest('Invalid credentials')
    }

    
    const isCorrectPassword=await user.comparePassword(password)
    
    if(!isCorrectPassword){
       throw new unAuthorized('Invalid password')
    }

    const token = await user.createJWT()
    res.status(200).json({user : {name: user.getName()}, token})
   
    
    // res.send('login ')
}

module.exports={register, login}