const express=require("express")
const router=express.Router()
const bodyParser=require('body-parser')

router.use(express.json())
router.use(bodyParser.json())

const AnswerSchema=require('../models/answer')
const AuthMiddleware=require('../middleware/auth');

router.post('/post',async(req,res)=>{
    const{
        question_id,
        your_answer
    }=req.body;
    
    const answer =new AnswerSchema({
        question_id:question_id,
        content:your_answer,
        author:req.session.UserName,
    });
    try{
        const p1=await answer.save();
        res.redirect('/')
        
        
    }catch(err){
        res.status(500).send("POST ERROR : "+err);
    }
})

router.post('/read',async(req,res)=>{
    const question_id=req.body.question_id
    try{
        var answers=await AnswerSchema.find({question_id:question_id})
        res.json(answers)
    }catch(err){
        res.status(500).send(err)
    }
})
module.exports=router