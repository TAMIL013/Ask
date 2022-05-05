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
    },
    relevance_percentage:{
        type:Number,
        require:true
    }
})

module.exports= mongoose.model('Answers',answerSchema)