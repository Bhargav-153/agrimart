import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnv } from "./getEnv.js";

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "agrimart-25722.firebaseapp.com",
  projectId: "agrimart-25722",
  storageBucket: "agrimart-25722.firebasestorage.app",
  messagingSenderId: "1067985594617",
  appId: "1:1067985594617:web:33e17e92b82bbb3bf45a28",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };