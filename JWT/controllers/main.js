const {createCustomError}=require('../errors/custom-error')

const login=async (req, res)=>{
    const {username, password}=req.body

    if(!username || !password){
       throw new customAPIError('please provide username and password', 400)
    }
    
    res.send('Login/Register')
}

const dashboard=(req, res)=>{
    let luckyNumber=Math.floor(Math.random()*100)
    res.status(200).json({name:'john doe', msg:`Your lucky number is ${luckyNumber}`})
}

module.exports={login, dashboard}