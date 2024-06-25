const { rejects } = require('assert')
const {readFile, writeFile}=require('fs')

const {promisify}=require('util')

const readFilePromise=promisify(readFile)
const writeFilePromise=promisify(writeFile)

// function start(){
//     readFilePromise('./content/files/report.txt', 'utf8').then(data){
//         console.log(data)
//     }
// }

// function getFile(){
//     return new Promise((resolve, rejects)=>{
//         readFile('./content/files/report.txt', 'utf8', (err, data)=>{
//             if(data){
//                 resolve(data)
//             }else{
//                 rejects(err)
//             }
//         })
//     })
    
// }

// getFile().then(data=>{
//     console.log(data)
// }).catch(err=>console.log(err))


// readFilePromise('./content/files/report.txt', 'utf8').then(data=>{
//     console.log(data)
// }).catch(err=>console.log(err))


const start= async () =>{
    try{
      const first=  await readFilePromise('./content/files/report.txt', 'utf8')
       await writeFilePromise('./content/files/report.txt', ' Habari zenu tena', {flag: 'a', encoding: 'utf8'})
       console.log(first)
    }
    catch(err){
        console.log(err)
    }


}

start()


// fs.writeFile('./content/files/report.txt', 'Hello world', 'utf8', (err)=>{
//     if(err){console.log(err)}
//     console.log('Success')
// })

// fs.readFile('./content/files/report.txt','utf8' (err, data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log()
//     }
// })