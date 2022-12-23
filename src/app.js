const express = require('express')
const path = require('path')
const cors = require('cors')
require('./mongoose')
const studentRouter = require('./routers/student')

const app = express()
const port = process.env.PORT

const publicDirectoryPath = path.join(__dirname,'../public')

app.use(cors())
app.use(express.static(publicDirectoryPath))

app.listen(port, ()=>{
    console.log('app is running on '+port)
})

app.use(studentRouter)