const questionID=(localStorage.getItem('questionID'))
getQuestion(questionID)

function getQuestion(questionID){
    $.ajax({
        url: '/questions/read',
        type: 'POST',
        data:JSON.stringify({question_id:questionID}),
        contentType: "application/json",
        success: function (result) {
            // console.log(result);
            loadQuestion(result);
            getAnswers(questionID)
        },
        error: function (err) {
            console.log(err);
            
        }
    });
}
function getAnswers(questionID){
    $.ajax({
        url:'/answers/read',
        type:'POST',
        data:JSON.stringify({question_id:questionID}),
        contentType:'application/json',
        success:(data)=>{
            loadAnswers(data)
        },
        error:(err)=>{
            console.log(err)
        }
    })
}
function loadAnswers(answers){
    const answers_container=document.getElementById("answers_container")
    const total_answers=document.getElementById("answer_grid_container_template").content.cloneNode(true).children[0];
    
    if(answers.length<=1)
        total_answers.children[0].textContent=answers.length+" Answer"
    else
        total_answers.children[0].textContent=answers.length+" Answers"

    answers_container.appendChild(total_answers)    

    answers.forEach(answer =>{
        const answer_card=document.getElementById("answer_grid_container_template").content.cloneNode(true).children[1];
        const left_flex=answer_card.children[0];
        const right_flex= answer_card.children[1];

        left_flex.children[0].children[0].textContent=answer.relevance_percentage+"%";
        right_flex.children[0].children[0].textContent=answer.content;
        right_flex.children[1].children[1].textContent=answer.author;
      
        answers_container.appendChild(answer_card)
    })

    // console.log(answers)
}
function loadQuestion(result) {
    const questions = result
    document.getElementById("question_full_view_container").innerHTML=''
    
    var question_template=document.getElementById("question_grid_container_template");
    var questions_container=document.getElementById("question_full_view_container");
    // var tag_template=document.getElementById("tag_card");
    // questions_container.appendChild(question_template.content.cloneNode(true).children[0]);
    questions.forEach(question => {
        
        const question_card=question_template.content.cloneNode(true).children[0];
        const left_flex= question_card.children[0];
        const right_flex= question_card.children[1];

        left_flex.children[1].children[0].textContent=question.tags[0].name;
        left_flex.children[0].children[0].textContent=question.most_relevance_percentage+"%";

        if(question.total_answers > 1)
            left_flex.children[2].children[0].textContent=question.total_answers+" Answers";
        else
            left_flex.children[2].children[0].textContent=question.total_answers+" Answer";

        right_flex.children[0].children[0].textContent=question.title;
        right_flex.children[1].children[0].textContent=question.des;
        right_flex.children[2].children[1].textContent=question.author;
       

        questions_container.appendChild(question_card);
        
    });
}

// POST YOUR ANSWER
var post_answer_btn=document.getElementById("btn_post_your_answer");

post_answer_btn.addEventListener("click",()=>{
    $.ajax({
        url:'/answers/post',
        type:'POST',
        contentType:'application/json',
        data:JSON.stringify({
            question_id:questionID,
            your_answer:document.getElementById("your_answer").value,
        }),
        success:()=>{
            window.location.href="/questions/view/"+questionID
        // console.log("post question successfully "+data)
         },
    error:(err)=>{
            console.log("post question error "+err)
         }    
    })
})