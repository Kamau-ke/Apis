const eventEmitter=require('events')

const customEvents=new eventEmitter()

console.log(customEvents)
customEvents.on('event', ()=>{
    console.log('event emmitted')
})

customEvents.emit('event')