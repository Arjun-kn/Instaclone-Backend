let express = require('express')
let post = require('./Router/post')
// let bodyparser = require('body-parser')
let mongoose = require('mongoose')
let app = express()
let cors = require('cors')
require('dotenv').config()

// app.use(cors())
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, 
}));


app.use(express.static("public/images"))
;//

mongoose.connect(process.env.MongoDB).then((data)=>{
    console.log('Db connected')
}).catch(err=>{
    console.log(err)
    
});


app.use('/', post)

app.listen(process.env.port,(req,res)=>{
 console.log("App is running")   
})


module.exports = app