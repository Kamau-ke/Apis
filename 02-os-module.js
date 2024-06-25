const os=require('os')
let mem=os.totalmem()
let type=os.type()
let machine=os.machine()
let user=os.userInfo().username


module.exports={mem, type, machine, user}