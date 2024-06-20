const Task=require('../models/Task')
const getTasks=async(req, res)=>{
    try {
        const tasks=await Task.find({})
      return  res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
}


const getTask=async(req, res)=>{
    try {
        
        const {id:taskID}=req.params
        const task=await Task.findOne({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`No task with id ${taskID}`})
        }

      return  res.status(200).json({task})

    } catch (error) {
      return  res.status(500).json({msg:error})
    }
}


const createTask= async (req, res)=>{
    try {
        const task=await Task.create(req.body)
        console.log(task)
       return res.status(201).json({task})
        
    } catch (error) {
       return res.status(500).json({msg:error})
    }
}
const updateTask=async (req, res)=>{
    try {
        const {id:taskID}=req.params
        const task=await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new:true,
            runValidators:true
        })
    
        if(!task){
            return res.status(404).json({msg:`No task with id ${taskID}`})
        }
    
       return res.status(200).json({task})
    } catch (error) {
        return res.status(500).json({msg:error})
    }
   
}
const deleteTask=async (req, res)=>{
    try {
        const {id:taskID}=req.params
        const task=await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`No task with id ${taskID}`})
        }
       return res.status(200).json({task})
    } catch (error) {
       return res.status(500).json({msg: error})
    }

    
}

module.exports={getTasks, getTask, createTask, updateTask, deleteTask}