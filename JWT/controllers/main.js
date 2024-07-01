const customAPIError=require('../errors/custom-error')

const jwt=require('jsonwebtoken')

const {badRequestError}=require('../errors')

const login=async (req, res)=>{
    const {username, password}=req.body
    

    if(!username || !password){
        
    throw new badRequestError('provide username and password')

   
    }

    const id=new Date().getDate()

    // console.log(id)

    const token=jwt.sign({id,username}, process.env.JWT_SECRET,{expiresIn:'30d'})

    
    res.status(200).json({msg:'user created', token})
}

const dashboard=async (req, res)=>{
        
        const {id,username}=req.user
        
        
        let luckyNumber=Math.floor(Math.random()*100)
        res.status(200).json({msg:`Hello ${username}`, secret:`Your lucky number is ${luckyNumber}`})

  
}

module.exports={login, dashboard}