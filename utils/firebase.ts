import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAfjPCn_4Q8q7NmRDJoUT-1mapu1Q2C8n0",
    authDomain: "kitchen-8fc40.firebaseapp.com",
    databaseURL: "https://kitchen-8fc40-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kitchen-8fc40",
    storageBucket: "kitchen-8fc40.appspot.com",
    messagingSenderId: "769995716009",
    appId: "1:769995716009:web:2c51aec129e1a9920c40b8"
  };
// Initialize Firebase
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();