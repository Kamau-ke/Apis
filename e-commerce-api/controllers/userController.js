const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')
const notFoundError=require('../errors/notFound')
const badRequestError=require('../errors/badRequest')
const checkPermission=require('../utils/checkPermission')
const createTokenUser=require('../utils/createTokenUser')
const attachCookiesToResponse=require('../utils/jwt')

const showAllUsers=async (req, res)=>{
    const users=await User.find({role:"user"}).select('-password')
    res.status(StatusCodes.OK).json({users})
}

const getSingleUser=async (req, res)=>{
    const user=await User.find({_id: req.params.id}).select('-password')
    if(!user){
        throw new notFoundError('User not found')
    }
    checkPermission(req.user, user._id)

    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser=async (req, res)=>{
    res.status(StatusCodes.OK).json({user:req.user})
}

const updateUser=async (req, res)=>{
    const {email, name}=req.body

    if(!email || !name){
        throw new badRequestError('Please provide all values')
    }

    const user=await User.find({_id: req.user.userId})

    user.email=email
    user.name=name

    await user.save()

    const tokenUser=createTokenUser(user)

    attachCookiesToResponse({res, user:tokenUser})
    res.status(StatusCodes.OK).json({user:tokenUser})

}

const updatePassword=async (req, res)=>{
    const {newPassword, oldPassword}=req.body

    if(!newPassword || !oldPassword){
        throw new badRequestError('Please provide both values')
    }

    const user=await User.find({_id:req.user.userId})

    const isValidPassword=await user.comparePassword(oldPassword)

    if(!isValidPassword){
        throw new badRequestError('wrong password')
    }

    user.password=newPassword

    await user.save()

    res.status(StatusCodes.Ok).json('Success! password updated')
}


module.exports={
    showAllUsers,
    showCurrentUser,
    updatePassword,
    updateUser,
    getSingleUser
}

