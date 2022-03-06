const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
const Question=require('../models/question');
const questionTags=require('../models/questionTags')
const AuthMiddleware=require('../middleware/auth');
const { vary } = require('express/lib/response');
router.use(express.json())
router.use(bodyParser.json())
router.post('/read',async(req,res)=>{
    const author_data_only=req.body.author_data_only;
    try{
   //DEFALUT GET ALL QUESTIONS QUERY 
   //GET USER POSTED QUESTIONS ONLY QUERY
        if(author_data_only)     
            var questions=await Question.find({author:req.session.UserName}).sort({ $natural: -1 });
        else
            var questions=await Question.find().sort({ $natural: -1 });

        // console.log(author_data_only)
        
        res.json(questions);
    }catch(err){
        res.status(500).send(err);
    }    
})
router.post('/create',async(req,res)=>{
    const{
        title,
        des,
        tags
    }=req.body;

    const question=new Question({
        title: title,
        des:des,
        tags:tags,
        author:req.session.UserName,
    });
    try{
        const p1=await question.save();
        res.redirect('/')
        
    }catch(err){
        res.status(500).send("POST ERROR : "+err);
    }
    
})
router.get('/',AuthMiddleware.isLoggedIn,(req,res)=>{
    var Valid_Loggedin=(req.session.isAuth)?true:false;
    res.render('CreateQ',{layout:'../views/layouts/CreateQuestionLayout',Valid_Loggedin:Valid_Loggedin})
})

router.post('/questionTags',async(req,res)=>{
    const tagName=req.body.name;
    
    try{
        if(tagName.length===0){
            const tags=[]    
            res.send(tags)    
        }
        else{
            const tags=await questionTags.find({name:{$regex:tagName,$options:"$i"}});
            res.send(tags);

        }
    }catch(err){
        res.status(500).send(err)
    }
})
module.exports=router