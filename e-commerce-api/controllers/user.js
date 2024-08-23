const User=require('../models/user')
const register=async (req,res)=>{
    const user=await User.create(req.body)
    res.status(200).json({user})
}


const login=(req,res)=>{
    res.send('login user')
}

const logout=(req,res)=>{
    res.send('logout user')
}

module.exports={
    register, 
    login,
    logout
}
