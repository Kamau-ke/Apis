const {StatusCodes}=require('http-status-codes')
const errorHandler=(err, req, res,next )=>{
    console.log(err);
    
    let customError={
        statusCode:err.statusCode || 500,
        message:err.message || 'Something went wrong, please try again later'
    }

    if(err.code && err.code===11000){
        customError.statusCode=StatusCodes.BAD_REQUEST
        customError.message=`Duplicate value entered for ${Object.keys(err.keyValue)}, please choose another value`
    }

    if(err.name==='ValidationError'){
        customError.statusCode=StatusCodes.BAD_REQUEST,
        customError.message=Object.values(err.errors).map(item=>item.message).join(',')
    }

    res.status(customError.statusCode).json({msg:customError.message})

    
}

module.exports=errorHandler