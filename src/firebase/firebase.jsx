import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
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

// Initialize App Check for production
if (process.env.NODE_ENV === 'production') {
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('763BD0D6-8557-40D1-B764-2E81C4D2DE98'),
    isTokenAutoRefreshEnabled: true
  });
}

// Emulator only in development
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}
export { auth, RecaptchaVerifier, signInWithPhoneNumber  };

console.log("AUTH:", auth); // should NOT be undefined
console.log("FIREBASE APP:", app); // should NOT be undefined
console.log("FIREBASE CONFIG:", firebaseConfig); // should NOT be undefined






// // firebase/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, connectAuthEmulator } from "firebase/auth";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// const firebaseConfig = {
//   apiKey: "AIzaSyBxKGVr5ffZ5q_KglebLOQPKCjdoCzdpMY",
//   authDomain: "livyco-b65f5.firebaseapp.com",
//   projectId: "livyco-b65f5",
//   storageBucket: "livyco-b65f5.appspot.com",
//   messagingSenderId: "948960032829",
//   appId: "1:948960032829:web:924ff275abacebfffd5254",
//   measurementId: "G-WDVJECG9R8"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// // Initialize reCAPTCHA configuration
// // initializeRecaptchaConfig(auth, {
// //   siteKey: "gMY32VUo5l4IzxwtaIPiflcRuialfKBkVXVRDECMgGaCZ0hlfq", // Get this from Firebase Console
// // });

// // Initialize App Check for production
// if (process.env.NODE_ENV === 'production') {
//   const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('your-recaptcha-v3-site-key-from-firebase-console'),
//     isTokenAutoRefreshEnabled: true
//   });
// }

// // Emulator only in development
// if (window.location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }

// export { auth, RecaptchaVerifier, signInWithPhoneNumber };

// export { auth, RecaptchaVerifier, signInWithPhoneNumber };

