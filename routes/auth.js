const express=require('express')
const session=require('express-session');
const router=express.Router()
router.use(express.json())
const userModel=require('../models/user')

router.get('/test',async(req,res)=>{
    const a=await (userModel.findOne({Email:"tamila@gmail.com"}))
    if(a)
        console.log("true")
    else 
        console.log("false")    
    res.send("s")
})
router.get('/register',async(req,res)=>{
    res.render('register',{layout:'../views/layouts/AuthLayout',error:'',details:''})

}).post('/register',async(req,res)=>{

    const{
        UserName,
        Email,
        Password,
        retypePassword,
    }=req.body;
    
    var value={UserName:UserName,Email:Email,Password:Password,retypePassword:retypePassword}
    
    user=new userModel({
        UserName:UserName,
        Email:Email,
        Password:Password,
    }) 
    
    const email_regex=/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g;
    const password_regex=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}/g;
    
    const find_user=await userModel.findOne({UserName:UserName})
    const find_email=await userModel.findOne({Email:Email})
    // console.log(find_email)

    if(!(UserName && Email && Password && retypePassword))
       res.status(409).render('register',{layout:'../views/layouts/AuthLayout',error:'All fields must be filled',details:value})
    
    else if(find_user)
        res.status(409).render('register',{layout:'../views/layouts/AuthLayout',error:'UserName already exist',details:value})
    
    else if(find_email)
        res.status(409).render('register',{layout:'../views/layouts/AuthLayout',error:'Email already exist',details:value})

    else if(Password!=retypePassword )
        res.status(409).render('register',{layout:'../views/layouts/AuthLayout',error:'Password does not match',details:value})

    else if(!email_regex.test(Email))
        res.status(409).render('register',{layout:'../views/layouts/AuthLayout',error:'Invalid Email',details:value})

    else if(!password_regex.test(Password))
        res.status(409).render('register',{layout:'../views/layouts/AuthLayout',error:'Password must be match the pattern',details:value})    
    
    else{
        await user.save((err,data)=>{
                // console.log(data)
                if(err)
                    res.status(400).render('register',{layout:'../views/layouts/AuthLayout',error:err,details:value})
                else
                    res.status(200).redirect('/auth/login')
            })

    }
     

    
    
})
router.get('/login',(req,res)=>{
    res.render('login',{layout:'../views/layouts/AuthLayout',error:'',details:''})
})
.post('/login',async(req,res)=>{
    
    const{LoginEmail,LoginPassword}=req.body;
    var value={LoginEmail:LoginEmail,LoginPassword:LoginPassword}

    let user =await userModel.findOne({Email:LoginEmail,Password:LoginPassword})

    if(!(LoginEmail && LoginPassword))
        res.status(409).render('login',{layout:'../views/layouts/AuthLayout',error:'All fields must be filled!',details:value})
    else if(!user)
        res.status(409).render('login',{layout:'../views/layouts/AuthLayout',error:'Email or password mismatch!',details:value})
    else{
        req.session.isAuth=true; 
        req.session.UserName=user.UserName;
        req.session.Email=user.Email;
           
        res.status(200).redirect('/');
    }
    
})
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})
module.exports=router