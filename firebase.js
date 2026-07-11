import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMYbpyAlaSFd9eC-yxZLz8-kiCU9JE5JU",
  authDomain: "make-money-bot-52a90.firebaseapp.com",
  projectId: "make-money-bot-52a90",
  storageBucket: "make-money-bot-52a90.firebasestorage.app",
  messagingSenderId: "654181544752",
  appId: "1:654181544752:web:c808d0497217e786430ef5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.doc = doc;
window.getDoc = getDoc;
window.setDoc = setDoc;
window.updateDoc = updateDoc;
console.log("Firebase loaded");
console.log(window.db);
window.firebaseReady = true;
console.log("Firebase Ready");
