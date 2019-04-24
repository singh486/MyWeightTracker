import firebase from 'firebase'
import 'firebase/database'
import 'firebase/auth'
import Rebase from 're-base'

//Initializing firebase
var config = {
    apiKey: "AIzaSyDo88tvxZlnPqj9qhOj7LLPeCq2HrrEzhw",
    authDomain: "myweighttracker-75d1e.firebaseapp.com",
    databaseURL: "https://myweighttracker-75d1e.firebaseio.com",
    projectId: "myweighttracker-75d1e",
    storageBucket: "myweighttracker-75d1e.appspot.com",
    messagingSenderId: "771221100990"
  };

  const app = firebase.initializeApp(config);
  
  //configure the authentication
  export const auth = firebase.auth()
  export const googleProvide = new firebase.auth.GoogleAuthProvider()

  //configure database
  const db = firebase.database(app)
  const base = Rebase.createClass(db)

  export default base