const customApiError=require('./customApiError')
class unAuthorized extends customApiError{
    constructor(message){
        super(message)
        this.statusCode=401
    }
}

module.exports=unAuthorized