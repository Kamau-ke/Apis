const {createReadStream}=require('fs')

const readStream=createReadStream('./content/files/report.txt', 'utf8')
readStream.on('data',(result)=>{
    console.log(result)
})

