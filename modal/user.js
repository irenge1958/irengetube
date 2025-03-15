const mongoose=require('mongoose')
const userScheme=mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:30,
        unique:true
    },
    email:{
        type:String,
        required:true,
        min:3,
        max:30,
        unique:true
    },
    password:{
        type:String,
    
        min:6,
    },
    subscribings:{
        type:Array,
        default:[]
    },
    subscribers: {
        type: Number,
        default: 0, // Optional: set a default value of 0 for new users
        min: 0      // Optional: ensures that the number of subscribers cannot go below 0
    },
    profilepicture:{
     type:String,
     default:""
    },
   fromgoogle:{
    type:Boolean,
    default:false
   },
   history:{
    type:Array
   }
},
{timestamps:true}
)
module.exports=mongoose.model('users',userScheme)