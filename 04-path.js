const path=require('path')
const { readFile }=require('fs')
const sep=path.sep

const filePath=path.join( `.${sep}content`, 'files', 'report.txt')
const fullpath=path.resolve(__dirname, 'content', 'files', 'report.txt')
readFile(filePath, 'utf8', (err,result)=>{
    if(err){
        console.log(err)
    }
    console.log(result)
})

// const fullpath=path.join(__dirname, 'content', 'file', 'report.txt')


console.log(fullpath)