import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, connectAuthEmulator  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxKGVr5ffZ5q_KglebLOQPKCjdoCzdpMY",
  authDomain: "livyco-b65f5.firebaseapp.com",
  projectId: "livyco-b65f5",
  storageBucket: "livyco-b65f5.appspot.com",
  messagingSenderId: "948960032829",
  appId: "1:948960032829:web:924ff275abacebfffd5254",
  measurementId: "G-WDVJECG9R8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}
export { auth, RecaptchaVerifier, signInWithPhoneNumber  };

console.log("AUTH:", auth); // should NOT be undefined
console.log("FIREBASE APP:", app); // should NOT be undefined
console.log("FIREBASE CONFIG:", firebaseConfig); // should NOT be undefined
