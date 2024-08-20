const badRequest=require('../errors/badRequest')
const cloudinary=require('cloudinary').v2
const path=require('path')
const fs=require('fs')
const fileUpload= async(req, res)=>{  
    if(!req.files){
     throw new badRequest('No file uploaded')
    }

    const productImage=req.files.image

    if(!productImage.mimetype.startsWith('image')){
        throw new badRequest('Upload image')
    }

    const maxSize=1024*1024
    
    if(productImage.size>maxSize){
        throw new badRequest('Upload smaller image size 1Mb')
    }
    const imagePath=path.join(__dirname, `../public/uploads/`+`${productImage.name}`)

    await productImage.mv(imagePath)
    
    console.log(req.files.image);
    

    return res.status(200).json({image:{src: `/uploads/${productImage.name}`}})
}

const uploadProductImage=async (req, res)=>{
    try {
        const result=await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                use_filename:true,
                folder:'file-upload'
            }
        )
        
        
        fs.unlinkSync(req.files.image.tempFilePath)
       
        res.status(200).json({image: {src: result.secure_url}})
    } catch (error) {
        console.log(error);
        res.send('err')
    }
}

module.exports=uploadProductImage