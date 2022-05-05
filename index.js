const express=require('express');
const mongoose=require('mongoose');
const expressLayout=require('express-ejs-layouts');
const bodyParser = require('body-parser');
const url='mongodb+srv://Tamil:1234ASK@cluster0.7tttm.mongodb.net/QuestionsDB?retryWrites=true&w=majority';

const app=express();
//session 
const session=require('express-session');
const mongoDBSession=require('connect-mongodb-session')(session);
var SessionStore=new mongoDBSession({
  uri:url,
  collection:'Sessions',
});

app.use(session({
  secret:'secret code',
  resave:false,
  saveUninitialized:false,
  store:SessionStore,
  cookie:{
    // expires:new Date(Date.now()+ (30*1000)),
    // maxAge:5*60*1000,
  }
}))


mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true})
const con=mongoose.connection;

con.on("open", function () {
  console.log("MongoBD Connected successfully");
});

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(expressLayout);


app.set('layout', './layouts/MainLayout.ejs')
app.set('view engine', 'ejs');


const QuestionRouter=require('./routes/questions')
const AuthRouter=require('./routes/auth')
const AnswerRouter=require('./routes/answers') 
const AuthMiddleware=require('./middleware/auth')

const djangoRouter=require('./routes/django')

app.use('/questions',QuestionRouter)
app.use('/answers',AnswerRouter)
app.use('/auth',AuthRouter)

app.use('/django',djangoRouter)
app.get('/',(req,res)=>{
    var Valid_Loggedin=(req.session.isAuth)?true:false;
    res.render('Home',{Valid_Loggedin:Valid_Loggedin});
})

app.listen(3000,()=>{
    console.log("listening in port 3000")
})