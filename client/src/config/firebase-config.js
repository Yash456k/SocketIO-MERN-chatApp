import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4gXCXgaM2Ojv7mxMHXoxruWQD2ZlTVSo",
  authDomain: "chatapp-b24e5.firebaseapp.com",
  projectId: "chatapp-b24e5",
  storageBucket: "chatapp-b24e5.appspot.com",
  messagingSenderId: "118083428712",
  appId: "1:118083428712:web:7afdfdc00c89099377b6dd",
  measurementId: "G-NYYXTQ2LZH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
