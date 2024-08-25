const customApiError=require('./customApiError')
const {StatusCodes}=require('http-status-codes')

class unAuthorized extends customApiError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.UNAUTHORIZED
    }
}

module.exports=unAuthorized