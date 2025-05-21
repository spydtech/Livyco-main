// // src/auth/authController.js
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// export const setUpRecaptcha = () => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//       size: "invisible",
//       callback: (response) => {
//         console.log("Recaptcha resolved", response);
//       },
//     });
//   }
// };

// export const sendOTP = async (phoneNumber) => {
//   setUpRecaptcha();
//   const appVerifier = window.recaptchaVerifier;

//   try {
//     const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//     window.confirmationResult = confirmation;
//     return confirmation;
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     throw error;
//   }
// };

// export const verifyOtp = async (otp) => {
//   try {
//     const result = await window.confirmationResult.confirm(otp);
//     const token = await result.user.getIdToken();
//     return { token, phoneNumber: result.user.phoneNumber };
//   } catch (error) {
//     throw error;
//   }
// };

// src/services/api.js

const BASE_URL = "http://localhost:5000/api/auth"; // Adjust if needed

export const getClientById = async (clientId) => {
  try {
    const response = await fetch(`/api/user/client?clientId=${encodeURIComponent(clientId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // if using auth
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user by clientId:', error);
    throw error;
  }
};