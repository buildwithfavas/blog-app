// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQr1F2T0EcPNnsk9ck2eb8qX8x1n-ozik",
  authDomain: "blogproject-d4ff6.firebaseapp.com",
  projectId: "blogproject-d4ff6",
  storageBucket: "blogproject-d4ff6.firebasestorage.app",
  messagingSenderId: "697462124027",
  appId: "1:697462124027:web:3eb45bc616f99a239aaf5e",
  measurementId: "G-R4BT9J5DTJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
provider.setCustomParameters({
  prompt:"select_account"
})
export const db=getFirestore(app)
