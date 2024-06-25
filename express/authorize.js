const auth=(req, res, next)=>{
    const {user}=req.query
    if(user==='Ian'){
        req.user={'name':'Ian'}

        console.log('Authorized')
        next()
    }else{
        res.status(401).send('Unauthorized')
    }

    
}

module.exports=auth