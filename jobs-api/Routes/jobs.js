const express=require('express')
const router=express.Router()

const {getAllJobs, getJob, deleteJob, createJob, updateJob}=require('../controllers/jobs')
const { route } = require('./auth')

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports=router