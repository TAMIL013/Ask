const mongoose=require('mongoose');

var questionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        // required:false
    },
    tags:{
        type:Array,
        required:true
    },
    author:{
        type:String,
        required:true,
        default:"Unknown"
    }
})

module.exports = mongoose.model('Questions',questionSchema)