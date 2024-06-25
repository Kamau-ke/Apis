
const {people}=require('../../data')
const getPeople= (req,res)=>{
    res.status(200).json({'Success':true, "data":people})
}

const postPeople= (req,res)=>{
    const {name}=req.body

    if(!name){
        return res.status(400).json({Success:false, msg:'Please provide name'})
    }
    res.status(200).json({Success:true, person:name})
}

const updatePerson=(req, res)=>{
    const {id}=req.params
    const name=req.body.name
    const data=[...people]
    const person=data.find(person=>{
        return person.id===Number(id)
    })

    if(!person){
       return res.status(404).json({Success:false, msg:"Person does not exist"})
    }

    const newPeople=data.map(person=>{
        if(person.id===Number(id)){
            person.name=name
        }
        return person
    })

    res.status(200).json({Success:true, data:newPeople}) 
}

const deletePerson=(req, res)=>{

    const {id}=req.params
    const data=[...people]
    
    const person=data.find(person=>{
        return person.id===Number(id)
    })

    if(!person){
       return res.status(404).json({Success:false, msg:`No person with id- ${id}`})
    }

   const newPeople= data.filter(person=>{
        return person.id!==Number(id)
    })

    res.status(200).json({Success:true, data:newPeople})

 }

module.exports={getPeople, postPeople, updatePerson, deletePerson}