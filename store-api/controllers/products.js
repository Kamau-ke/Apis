const Product=require('../models/products')

const getAllProductsStatic=async(req, res)=>{

    const {featured, company, name}=req.query
    const queryObject={}

    if(featured){
        queryObject.featured=featured==='true'?true: false
    }


    if(company){
        queryObject.company=company
    }

    if(name){
        queryObject.name={$regex: name, $options:'i'}
    }

    console.log(queryObject)
    const products=await Product.find(queryObject )
    
    return res.status(200).json({products, nbHits: products.length})
}
const getAllProducts=async(req, res)=>{
   return res.status(200).json({msg:'all products route'})
}

module.exports={
    getAllProductsStatic,
    getAllProducts
}