// import { initializeApp } from "firebase/app"
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth'; 

const config  = {
  apiKey: 'AIzaSyCCrjodp3GuXJoNSjst5ukSTNcPY0w7R-Y',
  authDomain: 'english-article-adee4.firebaseapp.com',
  projectId: "english-article-adee4",
  storageBucket: "english-article-adee4.appspot.com",
  messagingSenderId: "280426861108",
  appId: "1:280426861108:web:2b18a0b0507cda9385f061",
};
 
if (!firebase.apps.length) {
    firebase.initializeApp(config)
    // firebase.analytics()
}

export const app = initializeApp(config);
export const auth = firebase.auth
// export const db = firebase.firestore
export default firebase