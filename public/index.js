//import * as firebase from "firebase/app";
var email = document.getElementById("email").value;
var password = document.getElementById("pwd").value;

//var password;
//var documentReference = docRef.id;

function validate(){
    //validate user information here
    //console.log("IN VALIDATION METHOD");
    var e = document.getElementById("email").value
    var p = document.getElementById("pwd").value
    //var pushedRef = firebase.database().ref('/users').push({ email: e });
    //console.log(pushedRef.key);
    //console.log("VALIDATION EMAIL: " + e);
    //console.log("VALIDATION PASSWORD: " + p);

    ValidateLogin(e, p)
    //console.log("test")
    //window.location.href = "mainPage.html"
}

function signUp(){
    
    //const firebase = require("firebase");
    // Required for side-effects
    //require("firebase/firestore");

    //require('firebase/database');
    //require('firebase/app');
    var email = document.getElementById("email").value
    var password = document.getElementById("pwd").value


    //email = document.getElementById("email").value;
    //password = document.getElementById("pwd").value;
    console.log("GLOBAL EMAIL: " + email);
    console.log("GLOBAL PASSWR: " + password);
    ValidateEmail(email)
    ValidatePassword(password)
    ValidateExistingEmail(email)

    
      var db = firebase.firestore();
            
      db.collection("users").doc(email).set({
        //email: email,
        password: password
      })
      .then(function(docRef) {
          //documentReference = docRef.id;
        //console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    
    
    
    //console.log(localStorage)
    console.log(email)
    console.log(password)
}
function ValidateExistingEmail(mail){
    var db = firebase.firestore();
    db.collection('users').doc(mail).get().then(function(doc){
            if (doc.exists) {
                console.log("Document data:", doc.data());
                alert("This email already exists!!")
            } 
    })
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

function ValidateLogin(mail, pass){
    console.log("Email shit: " + mail);
    console.log("Password shit: " + pass);
    var db = firebase.firestore();
    db.collection('users').doc(mail).get().then(function(doc){
        var docRef = db.collection("users").doc(mail);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                var passFromDB = doc.data().password;
                if(passFromDB==pass){
                    window.location.href = "mainPage.html"
                }
                else{
                    alert("You entered the wrong password!")
                }
                console.log(doc.data().password)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
           // console.log("Password HERERERERER: " + passFromDB);
    })
  //console.log("Document Reference ID: " + documentReference)
    //firebase.firestore().ref.child('users').orderByChild('email').equalTo(mail).on("value", function(snapshot) {
        /*console.log(snapshot.val());
        snapshot.forEach(function(data) {
            console.log(data.key);
        });*/
    //});
    //console.log("KEYYYYY: " + ref)

    //db.collection('users').doc(mail).get().then(function(doc){
    //db.collection('users').doc(documentReference).get().then(function(doc){
        console.log("In this statement db")
        /*if(doc.exists){
            console.log("NVIDIA")
            var passFromDB = db.collection('users').doc(pass).data();
            if(passFromDB==pass){
                console.log("You have success man");
            }
        }
        else{
            console.log("fucking bishhhhh");
        }
        }).then(() => {

        }).catch({
    */
      //  })
      localStorage.clear()
      localStorage.setItem(mail, pass)
}


