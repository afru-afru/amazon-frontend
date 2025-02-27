import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBN_0hq_w-wEkzO1newsbQNlgXGb9vpNcM",
  authDomain: "clone-f1dfb.firebaseapp.com",
  projectId: "clone-f1dfb",
  storageBucket: "clone-f1dfb.firebasestorage.app",
  messagingSenderId: "902391515801",
  appId: "1:902391515801:web:56bf515d8815cc33e18608",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db = app.firestore()
