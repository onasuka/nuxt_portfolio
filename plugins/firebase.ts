import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
    apikey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

if(!firebase.app.length) {
    firebase.initializeApp(clientCredentials);
}

// export default firebase;
export default function (app, inject) {
    //（'呼び出すときの名前','firebase内の機能を呼び出している'）
  inject('firebase', firebase) 
  inject('auth', firebase.auth()
}