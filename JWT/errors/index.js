const customApiError=require('./custom-error')
const unAuthError=require('./unauthenticated')
const badRequestError=require('./bad-request')

module.exports={
    customApiError,
    unAuthError,
    badRequestError
}