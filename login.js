import { auth } from './Fire'
import firebase from 'firebase/app'

function validate(){
    //validate user information here
    console.log("test")
    window.location.href = "mainPage.html"

    var user = firebase.auth().currentUser;
    var email = firebase.auth().email;
    var password = firebase.auth().password;
    let db = firebase.firestore();
    db.collection('Users').doc(email).set({
        email: email,
        password: password
    }).then(() => {
        console.log("Successfully added user to firebase");
    }).catch({
        
    })
}