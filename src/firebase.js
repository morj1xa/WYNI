// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEQtI9xEiNEcf_-poOIYtLPJWUVAyg0N0",
    authDomain: "wyni-cf7fc.firebaseapp.com",
    projectId: "wyni-cf7fc",
    storageBucket: "wyni-cf7fc.firebasestorage.app",
    messagingSenderId: "463282633913",
    appId: "1:463282633913:web:83454e68e2fcd870ffaf68",
    measurementId: "G-E4S182VCCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);