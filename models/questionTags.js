const mongoose=require('mongoose');

var tagSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
    }
})
module.exports=mongoose.model("questionTags",tagSchema);