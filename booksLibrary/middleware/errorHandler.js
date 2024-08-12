const customApiError=require('../errors/customApiError')
const {StatusCodes}=require('http-status-codes')

const errorHandlerMiddleware=(err, req, res, next)=>{

    
    if(err instanceof customApiError){
       
        return res.status(err.statusCode).json({msg: err.message})
    }

   console.log(err);
   
    res.status(StatusCodes.BAD_REQUEST).json({msg:'Something went wrong, please try again later'})
    
}

module.exports=errorHandlerMiddleware