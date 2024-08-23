const customApiError=require('./customApiError')
const {StatusCodes}=require('http-status-codes')

class badRequest extends customApiError{
    constructor(message){
        super(message)
        this.satatusCode=StatusCodes.BAD_REQUEST
    }
}

module.exports=badRequest