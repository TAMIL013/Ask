//register page setup
var username=document.getElementById("UserName");
var email=document.getElementById("Email");
var password=document.getElementById("Password")
var retypePassword=document.getElementById("retypePassword")

var upper=document.getElementById("uppercase")
var lower=document.getElementById("lowercase")
var number=document.getElementById("number")
var length=document.getElementById("length")

var retype=document.getElementById("retype_password_message");
password.onfocus = function() {
  document.getElementById("password_message").style.display = "flex";
  }
password.onblur = function() {
    document.getElementById("password_message").style.display = "none";
  }  

password.onkeyup=()=>{
    if(password.value.match(/[a-z]/g)){
        lower.classList.remove('invalid');
        lower.classList.add('valid');
    }else{
        lower.classList.remove('valid');
        lower.classList.add('invalid');
    }

    if(password.value.match(/[A-Z]/g)){
        upper.classList.remove('invalid')
        upper.classList.add('valid')
    }else{
        upper.classList.remove('valid')
        upper.classList.add('invalid')
    }

    if(password.value.match(/[0-9]/g)){
        number.classList.remove('invalid')
        number.classList.add('valid')
    }else{
        number.classList.remove('valid')
        number.classList.add('invalid')
    }
    if(password.value.length>=8){
        length.classList.remove('invalid')
        length.classList.add('valid')
    }else{
        length.classList.remove('valid')
        length.classList.add('invalid')
    }
}

retypePassword.onchange=function(){
    if(!password.value.match(retypePassword.value)){
        retype.style.display="block";
    }
    else{
        retype.style.display="none";
    }
   
}

username.onclick=()=>{
    document.getElementById("server_side_error_container").style.display="none";
}
email.onclick=()=>{
    document.getElementById("server_side_error_container").style.display="none";
}
password.onclick=()=>{
    document.getElementById("server_side_error_container").style.display="none";
}
retypePassword.onclick=()=>{
    document.getElementById("server_side_error_container").style.display="none";
}



//Login page setup
    //Go to login.ejs
