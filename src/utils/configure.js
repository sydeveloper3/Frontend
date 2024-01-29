// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCz5xUTHQ28WpfF8pY1sSsUkZRWMOy_fAo",
  authDomain: "chat-dcc5b.firebaseapp.com",
  projectId: "chat-dcc5b",
  storageBucket: "chat-dcc5b.appspot.com",
  messagingSenderId: "394048715729",
  appId: "1:394048715729:web:0c24af9e0af50b9560fef0",
  measurementId: "G-R2EE44KFR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
export {auth, provider};