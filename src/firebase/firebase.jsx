// import { initializeApp } from "firebase/app";
// // import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, connectAuthEmulator  } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBxKGVr5ffZ5q_KglebLOQPKCjdoCzdpMY",
//   authDomain: "livyco-b65f5.firebaseapp.com",
//   projectId: "livyco-b65f5",
//   storageBucket: "livyco-b65f5.appspot.com",
//   messagingSenderId: "948960032829",
//   appId: "1:948960032829:web:924ff275abacebfffd5254",
//   measurementId: "G-WDVJECG9R8"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Configure auth settings
// // auth.settings.appVerificationDisabledForTesting = false; // Set to true only for testing

// console.log("Firebase initialized successfully");
// console.log("Auth instance:", auth);

// export { auth, RecaptchaVerifier, signInWithPhoneNumber };
// export default app;




// firebase/firebase.js
// It is used in the live-after deployed
// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBxKGVr5ffZ5q_KglebLOQPKCjdoCzdpMY",
//   authDomain: "livyco-b65f5.firebaseapp.com",
//   projectId: "livyco-b65f5",
//   storageBucket: "livyco-b65f5.appspot.com",
//   messagingSenderId: "948960032829",
//   appId: "1:948960032829:web:924ff275abacebfffd5254",
//   measurementId: "G-WDVJECG9R8"
// };

// // Initialize Firebase with error handling
// let app;
// let auth;

// try {
//   app = initializeApp(firebaseConfig);
//   auth = getAuth(app);
  
//   // Disable App Check for testing if needed (remove in production)
//   // Note: This property might not exist in newer Firebase versions
//   if (auth.settings && typeof auth.settings.appVerificationDisabledForTesting !== 'undefined') {
//     auth.settings.appVerificationDisabledForTesting = false;
//   }
  
//   console.log("Firebase initialized successfully");
// } catch (error) {
//   console.error("Firebase initialization error:", error);
//   throw error;
// }

// export { auth, RecaptchaVerifier, signInWithPhoneNumber };
// export default app;





// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Initialize App Check for production
// if (process.env.NODE_ENV === 'production') {
//   const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('763BD0D6-8557-40D1-B764-2E81C4D2DE98'),
//     isTokenAutoRefreshEnabled: true
//   });
// }

// // Emulator only in development
// if (window.location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }
// export { auth, RecaptchaVerifier, signInWithPhoneNumber  };

// console.log("AUTH:", auth); // should NOT be undefined
// console.log("FIREBASE APP:", app); // should NOT be undefined
// console.log("FIREBASE CONFIG:", firebaseConfig); // should NOT be undefined






// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signOut, connectAuthEmulator } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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
// Initialize reCAPTCHA configuration
// initializeRecaptchaConfig(auth, {
//   siteKey: "gMY32VUo5l4IzxwtaIPiflcRuialfKBkVXVRDECMgGaCZ0hlfq", // Get this from Firebase Console
// });

// Initialize App Check for production
// if (process.env.NODE_ENV === 'production') {
//   const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('your-recaptcha-v3-site-key-from-firebase-console'),
//     isTokenAutoRefreshEnabled: true
//   });
// }

//Emulator only in development
// if (window.location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }
// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, RecaptchaVerifier, googleProvider,signOut, signInWithPhoneNumber };

//export { auth, RecaptchaVerifier, signInWithPhoneNumber };

