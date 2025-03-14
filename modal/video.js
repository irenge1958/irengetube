const mongoose=require('mongoose')
const videoScheme=mongoose.Schema({
    userID:{
        type:String,
        required:true,
    },
    pic:{
        type:String,
        required:true,
    },
    videourl:{
        type:String,
        
      
    },
    title:{
        type:String,
        required:true,
      
    },
    likes:{
        type:Array,
        default:[]
    },
    dislikes:{
        type:Array,
        default:[]
    },
    view:{
        type:Number,
        default:0,
        min:0
    },
   tagg:{
    type:[String],
    default:[]
   },
   description:{
    type:String,
    default:''
   },

},
{timestamps:true}
)
module.exports=mongoose.model('video',videoScheme)