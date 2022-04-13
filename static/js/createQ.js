
const tagsContainer= document.getElementById('tag_search_result');
const tagTemplate= document.getElementById('tag_style')
const input_tag_container=document.getElementById("input_tag_container")
const question_submit_btn=document.getElementById("btn_add_q")

const question_title=document.getElementById("Q_title");
const question_Descript=document.getElementById("Q_Descript");
const question_tags=document.getElementById("Q_tags");

const question_dropdown=document.getElementById("Q_dropdown");
const question_dropdown_content=document.getElementById('Q_tags_dropdown_content');

let tag_index
let tags=[]
// question_tags.addEventListener("input",(e)=>{
//     const value=e.target.value;
//     getTags(value);
// })

question_submit_btn.addEventListener("click",()=>{  
    $.ajax({
        url:'/questions/create',
        type:'POST',
        contentType:'application/json',
        data:JSON.stringify({
                title:question_title.value,
                des:question_Descript.value,
            //    tags:(Array.from(tags_set))
                tags:(tags[tag_index])
             }),
        success:(data)=>{
                window.location.href="/"    
            // console.log("post question successfully "+data)
             },
        error:(err)=>{
                console.log("post question error "+err)
             }         
    })
})

// question_tags.onfocus=()=>{
//     document.getElementById('tag_search_result').style.display='flex';
// }

question_dropdown.onfocus=()=>{
    // question_dropdown.style.borderBottomColor='red';
    // document.getElementById('Q_tags_dropdown_content').style.visibility='visible';
}
question_dropdown.onblur=()=>{
    // document.getElementById('Q_tags_dropdown_content').style.visibility='hidden';
}
getTags(); //function call
function getTags(){
    
    
    $.ajax({
        url:'/questions/questionTags',
        type:'POST',
        contentType:'application/json',
        // data:JSON.stringify({name:value}),
        success:function(data){
            tags=data
            loadTags()
            // console.log(data);
        },
        error:function(err){
            console.log("dd  "+err)
        }
    });

}

function loadTags(){
    
    tags.forEach((tag,index)=>{
        // console.log(tag);
        question_dropdown_content.innerHTML+=`
        <p class="tag_dropdown_option" onclick="addTag(${index})" >${tag.name}</p>`

    })
    // tagsContainer.textContent='';
    
    // if(tags.length!=0){
    //     tags.forEach(tag => {
    //         if(!tags_set.has(tag.name)){
    //             const tag_card=tagTemplate.content.cloneNode(true).children[0];
    //             tag_card.children[0].textContent=tag.name;
    //             tagsContainer.appendChild(tag_card);
    //         }
    //     });
    // }
}

function addTag(index){
    // console.log(tags[index]);
    question_dropdown.value=tags[index].name;
    // tags_set.clear();
    // tags_set.add(tags[index]);
    tag_index=index;
    console.log(tag_index);
//    alert(tag.children[0].textContent)
//    tag.setAttribute('onclick','removeTag(this)')
//    tag.setAttribute('class','tag')
//    input_tag_container.insertBefore(tag,question_tags)
   
//    tags_set.add(tag.children[0].textContent);
//     // console.log(tags_set);

//    question_tags.value=''
//    tagsContainer.textContent='';
//    document.getElementById('tag_search_result').style.display='none';
}
// function removeTag(tag){
//    input_tag_container.removeChild(tag)
//    tags_set.delete(tag.children[0].textContent);
// //    console.log(tags_set);

//    question_tags.value=''
//    tagsContainer.textContent='';
//    document.getElementById('tag_search_result').style.display='none';
// }