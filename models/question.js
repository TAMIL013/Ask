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
    },
    total_answers:{
        type:Number,
        required:true,
        default:0
    },
    most_relevance_percentage:{
        type:Number,
        required:true,
        default:0,
    }
})

module.exports = mongoose.model('Questions',questionSchema)