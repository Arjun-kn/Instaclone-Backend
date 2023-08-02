let mongoose = require('mongoose')
let postschema = new mongoose.Schema({
    name:{ type: String, unique: true },
    location:String,
    description:String,
    PostImage:String,
    date:{
        type:String
        
    },
    like:{
        type:Number,
        default:10
    },
   
})

let postmodel = mongoose.model('Post', postschema)

module.exports = postmodel