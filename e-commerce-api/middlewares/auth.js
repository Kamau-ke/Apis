const unAuthorized=require('../errors/unAuthorized')
const {isValidToken}=require('../utils/jwt')

const authenticateUser=async (req, res, next)=>{
    const token=req.signedCookies.token

    if(!token){
        throw new unAuthorized('Authentication invalid')
    }

    try {

        const {name, id, role}=isValidToken({token})
        req.user={name, id, role}

        next()
        
    } catch (error) {
        throw new unAuthorized('Authentication invalid')
    }
}

const authorizeRole= (...roles)=>{
    return(req, res, next)=>{
        if(!roles){
            throw new unAuthorized('un authorized to access this route')
        }
        next()
    }
}


module.exports={
    authenticateUser, authorizeRole
}
