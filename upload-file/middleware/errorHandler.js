const customApiError=require('../errors/customApiError')
const {StatusCodes}=require('http-status-codes')

const errorHandlerMiddleware=(err, req, res, next)=>{
    
    // if(err instanceof customApiError){
       
    //     return res.status(err.statusCode).json({msg: err.message})
    // }
    let customError={
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, please try again later"
    }
    
    if(err.name==='ValidationError'){
        customError.msg=Object.values(err.errors).map(item=>item.message).join(',')
        customError.statusCode=StatusCodes.BAD_REQUEST
    }

    if(err.name==='CastError'){
        customError.msg=`No item found with the value ${err.value}`,
        customError.statusCode=StatusCodes.BAD_REQUEST
    }

    if(err.code && err.code===11000){
        customError.msg=`Duplicate value for ${Object.keys(err.keyValue)} field, please choose another value`,
        customError.statusCode=StatusCodes.BAD_REQUEST
    }

//    console.log(err);
   
    res.status(customError.statusCode).json({msg: customError.msg})
    
}

module.exports=errorHandlerMiddleware