const jwt=require('jsonwebtoken')

const createToken=async ({payload})=>{
    const token =await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})

    return token
}

const isValidToken=({token})=>jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse= ({res, user})=>{
    const token= createToken({payload: user})

    const oneDay=1000*60*60*24

    res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now() + oneDay) ,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    })
}


module.exports={
    createToken,
    isValidToken,
    attachCookiesToResponse
}