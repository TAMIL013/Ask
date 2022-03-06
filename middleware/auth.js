const session=require('express-session')


module.exports={
    isLoggedIn:(req,res,next)=>{
        console.log(req.session.isAuth)
        if(req.session.isAuth){
            next()
        }
        else{
            res.redirect('/auth/login')
        }    
    },
    test:(req,res,next)=>{
        res.send("done")
    }
}