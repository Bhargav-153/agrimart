// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getEnv } from "./getEnv.js";

// const firebaseConfig = {
//   apiKey: getEnv('VITE_FIREBASE_API'),
//   authDomain: "agrimart-25722.firebaseapp.com",
//   projectId: "agrimart-25722",
//   storageBucket: "agrimart-25722.firebasestorage.app",
//   messagingSenderId: "1067985594617",
//   appId: "1:1067985594617:web:33e17e92b82bbb3bf45a28",
// };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { auth, provider };



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "agrimart-da8ca.firebaseapp.com",
  projectId: "agrimart-da8ca",
  storageBucket: "agrimart-da8ca.firebasestorage.app",
  messagingSenderId: "421450266914",
  appId: "1:421450266914:web:55f9f4a8b398facc400d7b",
  measurementId: "G-27MB6D42SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);