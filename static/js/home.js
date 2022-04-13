function loadQuestions(result) {
    const questions = result
    document.getElementById("home_container").innerHTML=''
    
    var question_template=document.getElementById("question_grid_container_template");
    var questions_container=document.getElementById("home_container");
    // var tag_template=document.getElementById("tag_card");
    // questions_container.appendChild(question_template.content.cloneNode(true).children[0]);
    questions.forEach(question => {
        
        const question_card=question_template.content.cloneNode(true).children[0];
        const left_flex= question_card.children[0];
        const right_flex= question_card.children[1];

        left_flex.children[1].children[0].textContent=question.tags[0].name;

        right_flex.children[0].children[0].textContent=question.title;
        right_flex.children[1].children[1].textContent=question.author;
        
        question_card.addEventListener("click",()=>{
            // console.log(question._id)
            // window.location.href="/questions/view/"
            localStorage.setItem('questionID',question._id)
           window.location.href="/questions/view/"+question._id
           
        })

        questions_container.appendChild(question_card);
        
    });
}


function getQuestions(author_data_only) {
    // for(let i=0;i<5;i++){
    //     document.getElementById("home_container").innerHTML+=`
    //     <div class="question_container">
    //     <div class="question_head skeleton skeleton_text"></div>
    //     <div class="question_body skeleton skeleton_text"></div>
    //     <div class="question_author skeleton skeleton_text"></div>
    //     <div class="question_author skeleton skeleton_text"></div>
    //     </div>
    //     `
    // }

    $.ajax({
        url: '/questions/read',
        type: 'POST',
        data:JSON.stringify({author_data_only:author_data_only}),
        contentType: "application/json",
        success: function (result) {
            // console.log(result);
            loadQuestions(result);
        },
        error: function (err) {
            console.log(err);

        }
    });
}
getQuestions(false)

//LEFT SIDE NAV JS

var nav_my_questions_btn=document.getElementById("nav_my_questions_btn")
var nav_home_btn=document.getElementById("nav_home_btn")

nav_my_questions_btn.addEventListener("click",()=>{
    nav_my_questions_btn.classList.add("left_nav_active")
    nav_home_btn.classList.remove("left_nav_active")
    getQuestions(true)
    // window.location.href="/questions/myQuestions"
})

nav_home_btn.addEventListener("click",()=>{
    nav_home_btn.classList.add("left_nav_active")
    nav_my_questions_btn.classList.remove("left_nav_active")
    getQuestions(false)
    // window.location.href="/"
})