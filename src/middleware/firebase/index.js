import firebase from 'firebase/app';
import auth from "firebase/auth";

firebase.initializeApp( {
    apiKey: "AIzaSyBdNhNqKLE3nz-45nsFbGfIz9LSEdBvP_U",
    authDomain: "movies-tvs-proj.firebaseapp.com",
    databaseURL: "https://movies-tvs-proj-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "movies-tvs-proj",
    storageBucket: "movies-tvs-proj.appspot.com",
    messagingSenderId: "582862217194",
    appId: "1:582862217194:web:1377c6f18c28446c06dc93"
});


export default {
    firebase
}