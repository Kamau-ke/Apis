const customApiError=require('./customApiError')
class badRequest extends customApiError{
    constructor(message){
        super(message)
        this.statusCode=400
    }
}

module.exports=badRequest