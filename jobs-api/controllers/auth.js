const User = require('../models/users');
const { StatusCodes } = require('http-status-codes');
const {badRequestError, unAuthError}=require('../errors');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        const token=user.createJwt()
        
        res.status(StatusCodes.CREATED).json({ user:{name: user.getName()}, token });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const {email, password}=req.body

    if(!email || !password){
        throw new badRequestError('Please provide email and password')
    }

    const user=await User.findOne({email})

    if(!user){
        throw new unAuthError('Invalid credentials')
    }

    const isCorrectPassword=await user.comparePassword(password)

    if(!isCorrectPassword){
        throw new unAuthError('Invalid credentials')
    }

    const token =jwt.sign({userId:user._id, name:user.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})

    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
};

module.exports = {
    register,
    login
};
