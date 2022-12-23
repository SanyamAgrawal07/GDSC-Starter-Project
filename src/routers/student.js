const express = require('express')
const mongoose = require('mongoose')
const student = require('../models/student')

const router = new express.Router()
router.use(express.json())

router.post('/register',async(req,res)=>{
    const existingStudent = await student.findOne({roll:req.body.roll}).exec()
    // console.log(existingStudent)
    if(existingStudent) return res.status(400).send()
    const newStudent = new student(req.body)
    await newStudent.save()
    return res.send(newStudent)
})

router.get('/students',async(req,res)=>{
    const students = await student.find()
    return res.send(students)
})

router.patch('/update/:roll',async (req,res)=>{
    const existingStudent = await student.findOne({roll:req.params.roll}).exec()
    if(!existingStudent) return res.status(404).send()
    const checkStudent = await student.findOne({roll:req.body.roll}).exec()
    if(checkStudent) return res.status(400).send()
    if(req.body.name!='')
        existingStudent.name=req.body.name
    if(req.body.roll!='')
        existingStudent.roll=req.body.roll
    await existingStudent.save()
    return res.send(existingStudent)
})

router.delete('/delete/:roll',async(req,res)=>{
    const existingStudent = await student.findOne({roll:req.params.roll}).exec()
    if(!existingStudent) return res.status(404).send()
    await existingStudent.remove()
    return res.send(existingStudent)
})

module.exports = router