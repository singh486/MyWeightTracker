//import * as firebase from "firebase/app";
var email;
var password;

function validate(){
    //validate user information here
    console.log("test")
    window.location.href = "mainPage.html"
}

function signUp(){
    //const firebase = require("firebase");
// Required for side-effects
//require("firebase/firestore");


    //require('firebase/database');
    //require('firebase/app');
    //var email = document.getElementById("email").value
    //var password = document.getElementById("pwd").value


    email = document.getElementById("email").value;
    password = document.getElementById("pwd").value;
    ValidateEmail(email)
    ValidatePassword(password)

    
      var db = firebase.firestore();
      
      
      db.collection("users").add({
        email: email,
        password: password
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    
    
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
