const User=require('../models/User')
const badRequest=require('../errors/badRequest')
const unAuthorized=require('../errors/unAuthorized')
const jwt=require('jsonwebtoken')
const {StatusCodes}=require('http-status-codes')
const createTokenUser=require('../utils/createTokenUser')
const {attachCookiesToResponse}=require('../utils/jwt')

const register=async (req,res)=>{
    const {email, password, name}=req.body
    const emailExists=await User.findOne({email})
    if(emailExists){
        throw new badRequest('Email already exists please choose another one')
    }

    const isFirstAccount=(await User.countDocuments({}))==0
    const role=isFirstAccount ? 'admin':'user'
    const user=await User.create({email, name, password, role})

    const tokenUser=createTokenUser(user)

    attachCookiesToResponse({res, user:tokenUser})
    
    res.status(200).json({user: tokenUser})
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

    const tokenUser=createTokenUser(user)

    attachCookiesToResponse({res, user:tokenUser})

    res.status(StatusCodes.OK).json({user:tokenUser})
}


const logout=async (req,res)=>{
    res.cookie('token', 'logout', {
        httpOnly:true,
        expires:new Date(Date.now() + 1000)
    })

    res.status(StatusCodes.OK).json({msg:'User logged out!'})
}

module.exports={
    register, 
    login,
    logout
}
