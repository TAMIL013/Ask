const mongoose=require('mongoose')

var answerSchema=new mongoose.Schema({
    question_id:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Answers',answerSchema)