//Node provide following globals
// 1: setTimeout, 2: __dirname, 3: __filename, 4: process
// const file=__filename
// console.log(process)

// setTimeout(()=>{
//     console.log('hello')
// },3000)

const Interval=setInterval(()=>{
    console.log('hello Interval')
},2000)

setTimeout(()=>{
    clearInterval(Interval)
}, 7000)



