import firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDwpRDX6iAMTsOUu0L6BIWb7Mypnvu2WB0",
    authDomain: "rita-a448c.firebaseapp.com",
    databaseURL: "https://rita-a448c.firebaseio.com",
    projectId: "rita-a448c",
    storageBucket: "rita-a448c.appspot.com",
    messagingSenderId: "1063849712384",
    appId: "1:1063849712384:web:c5bba1f221b115185ff1e5"
};

// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);
export default fire;