const jwt=require('jsonwebtoken')
const {unAuthorized}=require('../errors')
const User=require('../model/user')
const authenticationMiddleware=async (req, res, next)=>{
    const authHeader=req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer') ){
        throw new unAuthorized('no token')
    }

    const token=authHeader.split(' ')[1]

    try {
        const payload=jwt.verify(token, process.env.JWT_SECRET)
        req.user={userId:payload.userId, name: payload.name }
        next()
    } catch (error) {
        unAuthorized('Authentication failed')
    }
}

module.exports=authenticationMiddleware