const mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true,
    },
})
module.exports=mongoose.model("Users",userSchema);