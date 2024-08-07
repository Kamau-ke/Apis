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
    // const products=await Product.find({} )
    
    return res.status(200).json({products, nbHits: products.length})
}


const getAllProducts=async(req, res)=>{
    const {featured, company, name, sort, fields, numericFilters}=req.query
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

    // numericFilters

    if(numericFilters){
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }

        const regEx=/\b(>|>=|=|<|<=)\b/g
        let filters=numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)

        const options=['price', 'rating']

        filters=filters.split(',').forEach(item=>{
            const [field, operator, value]=item.split('-')

            if(options.includes(field)){
                queryObject[field]={[operator]:Number(value)}
            }
            
        })
        
    }

    console.log(queryObject)
    result= await Product.find(queryObject)


    // sort
    if(sort){
       let sortedList=sort.split(',').join(' ')
       result=result.sort(sortedList)
    }else{
        result=result.sort('createdAt')
    }


    // field
    if(fields){
        let fieldList=fields.split(',').join(' ')
        result=result.select(fieldList)
     }

    //  numericFilters

    

   

    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 10
    const skip=(page-1)*limit

    result=result.skip(skip).limit(limit)


    


    const products=await result
    return res.status(200).json({products, nbHits: products.length})
}



module.exports={
    getAllProductsStatic,
    getAllProducts
}
