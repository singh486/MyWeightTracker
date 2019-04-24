function validate(){
    //validate user information here
    console.log("test")
    window.location.href = "mainPage.html"
}

function signUp(){
    var email = document.getElementById("email").value
    var password = document.getElementById("pwd").value
    ValidateEmail(email)
    ValidatePassword(password)
    
    console.log(email)
    console.log(password)
}

function ValidateEmail(mail){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}

function ValidatePassword(pass){
    if(pass.length == 0){
        alert("Please enter a password")
    }
}