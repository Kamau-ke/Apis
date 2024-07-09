const User=require('../models/users')
const jwt=require('jsonwebtoken')

const {unAuthError}=require('../errors')

const authenticationMiddleware=async (req, res, next)=>{
    const authHeader=req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new unAuthError('Authentication failed')
    }

    const token=authHeader.split(' ')[1]

    try {
        const payload=jwt.verify(token, process.env.JWT_SECRET)
        
        req.user={userId: payload.userId, name:payload.name}
        next()

    } catch (error) {
        throw new unAuthError('Authentication invalid')
    }
}


module.exports=authenticationMiddleware