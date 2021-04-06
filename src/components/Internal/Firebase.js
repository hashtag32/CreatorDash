import * as firebase from "firebase";


var firebaseConfig = {
  apiKey: "AIzaSyDl94jr5ST-9xlGts3yUpmXZa21zWKMUDk",
  authDomain: "creatordash-a90d0.firebaseapp.com",
  projectId: "creatordash-a90d0",
  storageBucket: "creatordash-a90d0.appspot.com",
  messagingSenderId: "405894709203",
  appId: "1:405894709203:web:69f5ddbdc1a6edaa453926",
  measurementId: "G-WYMDZHNRGX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();

// alias
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// todo: Maybe add this to access offline pwa
// https://stackoverflow.com/questions/57234932/how-to-use-firebase-auth-and-cloud-firestore-from-different-components-as-a-sing
// https://firebase.google.com/docs/projects/pwa
firestore.enablePersistence();


export { firestore, auth, firebase, storage };
