const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
const Question=require('../models/question');
const questionTags=require('../models/questionTags')
const AuthMiddleware=require('../middleware/auth');
// const { vary } = require('express/lib/response');
router.use(express.json())
router.use(bodyParser.json())
router.post('/read',async(req,res)=>{
    const author_data_only=req.body.author_data_only;
    const question_id=req.body.question_id;
    if(question_id!=null){
        try{
            var question=await Question.find({_id:question_id})
            res.json(question)
        }catch(err){
            res.status(500).send(err)
        }
    }
    else{
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
        // console.log(question);
        res.redirect('/')
        
    }catch(err){
        res.status(500).send("POST ERROR : "+err);
    }
    
})
router.get('/ask',AuthMiddleware.isLoggedIn,(req,res)=>{
    var Valid_Loggedin=(req.session.isAuth)?true:false;
    res.render('CreateQ',{layout:'../views/layouts/CreateQuestionLayout',Valid_Loggedin:Valid_Loggedin})
})

router.post('/questionTags',async(req,res)=>{
    try{
         const tags=await questionTags.find().sort({name:1});
         res.send(tags);

        
    }catch(err){
        res.status(500).send(err)
    }
    // const tagName=req.body.name;
    
    // try{
    //     if(tagName.length===0){
    //         const tags=[]    
    //         res.send(tags)    
    //     }
    //     else{
    //         const tags=await questionTags.find({name:{$regex:tagName,$options:"$i"}});
    //         res.send(tags);

    //     }
    // }catch(err){
    //     res.status(500).send(err)
    // }
})

router.get('/view/:id',async(req,res)=>{
    const question_id=req.params.id;    
    // console.log(question_id);
    var Valid_Loggedin=(req.session.isAuth)?true:false;
    console.log("/view")
    res.render('questionFullView',{layout:'../views/layouts/CreateQuestionLayout',Valid_Loggedin:Valid_Loggedin,question_id:question_id})
    
})

router.get('/myQuestions',async(req,res)=>{
    
    // console.log(question_id);
    var Valid_Loggedin=(req.session.isAuth)?true:false;
    res.render('home',{Valid_Loggedin:Valid_Loggedin})
   
    
})
module.exports=router