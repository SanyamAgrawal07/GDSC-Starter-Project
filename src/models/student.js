const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    roll:{
        type:String,
        trim:true,
        uppercase:true
    }
})

const student = mongoose.model('student',studentSchema)

module.exports = student