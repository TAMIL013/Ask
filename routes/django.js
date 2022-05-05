const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const Question = require('../models/question');
const questionTags = require('../models/questionTags')
const AuthMiddleware = require('../middleware/auth');
// const { vary } = require('express/lib/response');
router.use(express.json())
router.use(bodyParser.json())

const request = require('request');

// router.get('/getData', (req, res) => {
//     // var Valid_Loggedin=(req.session.isAuth)?true:false;
//     // res.render('CreateQ',{layout:'../views/layouts/CreateQuestionLayout',Valid_Loggedin:Valid_Loggedin})
//     // res.send("hello")
    
//     request('http://127.0.0.1:8000/', function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(response)
//             res.send(body)

//         }
//     })
// })
router.post('/RelevancePercentage/:answer',(req,res)=>{
    // request('http://127.0.0.1:8000/add', function (error, response, body) {
    //     // if (!error && response.statusCode == 200) {
    //         // }
    //         body.send(JSON.stringify({"name":"express"}))
    // })
    data={"my_answer":req.params.answer}
    request.post(
        {headers: {'content-type' : 'application/json'},
        url:     'http://127.0.0.1:8000/',
        body:    JSON.stringify(data)
      }, function(error, response, body){
        // console.log(body);
        relevance_data=JSON.parse(body)
        // console.log(relevance_data)
        res.send(relevance_data.predicted_topic)
      });
})


module.exports = router