const getAllProductsStatic=async(req, res)=>{
    
    res.status(200).json({msg:'all products static'})
}
const getAllProducts=async(req, res)=>{
    res.status(200).json({msg:'all products route'})
}

module.exports={
    getAllProductsStatic,
    getAllProducts
}