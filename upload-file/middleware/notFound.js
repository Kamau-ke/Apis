const notFound=(req, res, next)=>{
    res.status(404).send('Url not found')
}

module.exports=notFound