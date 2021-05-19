import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBCf5MR-DPeO_oWeyZK7iI4w2ZcH5xvzqM",
    authDomain: "k-buddy-8a3bf.firebaseapp.com",
    projectId: "k-buddy-8a3bf",
    storageBucket: "k-buddy-8a3bf.appspot.com",
    messagingSenderId: "132561395789",
    appId: "1:132561395789:web:02c93412f9e8b9d48dbc04"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;