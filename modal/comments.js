const mongoose=require("mongoose")
const commentScheme=mongoose.Schema({
userID:{
    type:String,
    required:true
},
videoId:{
    type:String,
    required:true
},
content:{
    type:String,
    required:true
}

},{timestamps:true})
module.exports=mongoose.model('comments',commentScheme)
