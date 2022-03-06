
const tagsContainer= document.getElementById('tag_search_result');
const tagTemplate= document.getElementById('tag_style')
const input_tag_container=document.getElementById("input_tag_container")
const question_submit_btn=document.getElementById("btn_add_q")

const question_title=document.getElementById("Q_title");
const question_Descript=document.getElementById("Q_Descript");
const question_tags=document.getElementById("Q_tags");




const tags_set=new Set();

question_tags.addEventListener("input",(e)=>{
    const value=e.target.value;
    getTags(value);
})

question_submit_btn.addEventListener("click",()=>{  
    $.ajax({
        url:'/questions/create',
        type:'POST',
        contentType:'application/json',
        data:JSON.stringify({
                title:question_title.value,
                des:question_Descript.value,
               tags:(Array.from(tags_set))
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

question_tags.onfocus=()=>{
    document.getElementById('tag_search_result').style.display='flex';
}
// question_tags.onblur=()=>{
//     document.getElementById('tag_search_result').style.display='none';
// }
function getTags(value){
    
    
    $.ajax({
        url:'/questions/questionTags',
        type:'POST',
        contentType:'application/json',
        data:JSON.stringify({name:value}),
        success:function(data){
            loadTags(data)
        },
        error:function(err){
            console.log("dd  "+err)
        }
    });

}

function loadTags(tags){
    
    tagsContainer.textContent='';
    
    if(tags.length!=0){
        tags.forEach(tag => {
            if(!tags_set.has(tag.name)){
                const tag_card=tagTemplate.content.cloneNode(true).children[0];
                tag_card.children[0].textContent=tag.name;
                tagsContainer.appendChild(tag_card);
            }
        });
    }
}

function addTag(tag){
//    alert(tag.children[0].textContent)
   tag.setAttribute('onclick','removeTag(this)')
   tag.setAttribute('class','tag')
   input_tag_container.insertBefore(tag,question_tags)
   
   tags_set.add(tag.children[0].textContent);
    // console.log(tags_set);

   question_tags.value=''
   tagsContainer.textContent='';
   document.getElementById('tag_search_result').style.display='none';
}
function removeTag(tag){
   input_tag_container.removeChild(tag)
   tags_set.delete(tag.children[0].textContent);
//    console.log(tags_set);

   question_tags.value=''
   tagsContainer.textContent='';
   document.getElementById('tag_search_result').style.display='none';
}