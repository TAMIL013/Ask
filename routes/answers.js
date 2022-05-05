const express=require("express")
const router=express.Router()
const bodyParser=require('body-parser')
const request = require('request');
const Question=require('../models/question');

router.use(express.json())
router.use(bodyParser.json())

const AnswerSchema=require('../models/answer')
const AuthMiddleware=require('../middleware/auth');



router.post('/post',async(req,res)=>{
    const{
        question_id,
        your_answer
    }=req.body;
    console.log(your_answer)
    
    try{
        var question=await Question.findOne({_id:question_id})
        console.log(question)
        data={"my_answer":your_answer}
         request.post(
            {headers: {'content-type' : 'application/json'},
            url:     'http://127.0.0.1:8000/',
            body:    JSON.stringify(data)
        },async(error, response, body)=>{
            relevance_data=JSON.parse(body)
            console.log(relevance_data)
            let index=(relevance_data.all_topics.indexOf(question.tags[0].name));
            console.log(index)
            console.log(relevance_data.all_percentages[0][index])  
            // console.log((relevance_data.all_percentages[0][index])*100)
            let my_relevance=(Math.round((relevance_data.all_percentages[0][index])*100)) 
            console.log(my_relevance)
            const answer =new AnswerSchema({
                question_id:question_id,
                content:your_answer,
                author:req.session.UserName,
                relevance_percentage:my_relevance
            }); 
            const p1=await answer.save();
            await Question.updateOne({_id:question_id},{$set:{total_answers:question.total_answers+1}})
            if(my_relevance>question.most_relevance_percentage)
                await Question.updateOne({_id:question_id},{$set:{most_relevance_percentage:my_relevance}})
            
            console.log(my_relevance)
            return
        });
        
    
        // res.render(question)
        res.redirect('/')
        
        
    }catch(err){
        res.status(500).send("POST ERROR : "+err);
    }
})

router.post('/read',async(req,res)=>{
    const question_id=req.body.question_id
    try{
        var answers=await AnswerSchema.find({question_id:question_id}).sort({relevance_percentage:-1})
        res.json(answers)
    }catch(err){
        res.status(500).send(err)
    }
})
module.exports=router