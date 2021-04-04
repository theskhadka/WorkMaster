import * as firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyCCD3AZJzcGlyW1OH9IKoFeSyF4ynYlM_M",
    authDomain: "workmaster-6aef3.firebaseapp.com",
    projectId: "workmaster-6aef3",
    storageBucket: "workmaster-6aef3.appspot.com",
    messagingSenderId: "221109066223",
    appId: "1:221109066223:web:0bce3445d1be0ed7627e1a"
  };

  // Initialize Firebase
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();