const unAuthorized=require('../errors/unAuthorized')
const {isValidToken}=require('../utils/jwt')

const authenticateUser=async (req, res, next)=>{
    let token;

    const authHeader=req.headers.authorization

    if(authHeader && authHeader.startsWith('Bearer')){
        token=authHeader.split(' ')[1]
    }

    // check token in cookies

    else if(req.cookies.token){
        token=req.cookies.token
    }

    if(!token){
        throw new unAuthorized("Authentication failed")
    }

    try {
        const payload=isValidToken(token)

        req.user={
            userId:payload.user.userId,
            role:payload.user.role
        }
        next()

    } catch (error) {
        throw new unAuthorized('Authentication invalid')
    }

}

const authorizeRoles= (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.roles)){
            throw new unAuthorized('Un authorized to access this route')
        }
        next()
    }
}


module.exports={authenticateUser, authorizeRoles}