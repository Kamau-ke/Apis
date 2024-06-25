const express=require('express')

const router=express.Router()

const {people}=require('../../data')

const {getPeople,postPeople, updatePerson, deletePerson}=require('../controllers/people')

router.get('/',getPeople)


router.post('/',postPeople)

router.put('/:id',updatePerson )

router.delete('/:id',deletePerson )

module.exports=router