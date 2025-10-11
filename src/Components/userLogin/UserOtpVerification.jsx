// import { useState, useRef } from "react";
// import {  useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import logo from "../../assets/livco logo.png";
// import bgImage from "../../assets/user/userLogin/login_bgimage.png";
// import woman from "../../assets/user/userLogin/userLogin.png";
// import { API_BASE_URL } from "../../Clients-components/PropertyController";

// export default function UserOtpVerfication() {
//   const [otp, setOtp] = useState(["", "", "", "","", ""]);
//  const inputs = useRef([]);
//   const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [userData, setUserData] = useState(null);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//     const otpData = JSON.parse(sessionStorage.getItem('otpVerificationData'));
//     if (!otpData || !otpData.phone || !window.confirmationResult) {
//       navigate("/user/login");
//       return;
//     }
    
//     setPhoneNumber(`+91${otpData.phone}`);
//     setUserData(otpData.userData || {}); // Ensure userData is at least an empty object
//   }, [navigate]);
  
//     const handleVerify = async (e) => {
//     e.preventDefault();
//     setError("");
  
//     if (!otp || otp.length !== 6) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }
  
//     try {
//       setLoading(true);
      
//       // 1. Verify OTP with Firebase
//       const result = await window.confirmationResult.confirm(otp);
//       const firebaseUser = result.user;
      
//       // 2. Get Firebase token
//       const firebaseToken = await firebaseUser.getIdToken();
  
//       // 3. Verify with backend
//       const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
//         phone: phoneNumber.replace('+91', ''), // Use the phone number directly
//         firebaseUid: firebaseUser.uid,
//         firebaseToken
//       });
  
//       if (!response.data.success) {
//         throw new Error(response.data.message || "OTP verification failed");
//       }
//       // Check if user has User role
//       if (response.data.user.role !== 'user') {
//         throw new Error("Access denied. user login only.");
//       }
  
//       // 4. Store tokens and user data
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
  
//       // 5. Clear OTP verification data
//       sessionStorage.removeItem('otpVerificationData');
//       delete window.confirmationResult;
  
//       // 6. Redirect to dashboard
//       navigate("/");
  
//     } catch (err) {
//       console.error("OTP verification failed", err);
//       setError(err.response?.data?.message || err.message || "Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (index, value) => {
//     if (!/^[0-9]?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       inputs.current[index + 1].focus();
//     }
//   };

//   const handleBackspace = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputs.current[index - 1].focus();
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Blurred Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center "
//         style={{ backgroundImage: `url(${bgImage})` }}
//       />
//       {/* Optional Dark Overlay */}
//       <div className="absolute inset-0 bg-white/50" />

//       {/* Card */}
//       <div className="relative z-10 bg-[#0140BA] rounded-xl p-8 md:p-12 w-full max-w-3xl flex justify-between items-center text-white">
//         <div className="w-full max-w-sm">
//           <img src={logo} alt="Logo" className="w-12 mb-4" />
//           <h2 className="text-xl font-bold mb-2">OTP Verification</h2>
//           <p className="text-sm text-white mb-6">
//             Enter 6 digit OTP sent to <span className="font-semibold">+91 9999999999</span>{" "}
//             <span className="ml-1 cursor-pointer">✏️</span>
//           </p>

//           {/* OTP Inputs */}
//           <form onSubmit={handleVerify} >
//           <div className="flex justify-between gap-2 mb-6">
//             <div className="flex justify-between gap-2 mb-6">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   onKeyDown={(e) => handleBackspace(index, e)}
//                   ref={(el) => (inputs.current[index] = el)} // Assign ref to each input
//                   className="w-12 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
//                 />
//               ))}
//             </div>
            
//             {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
//           </div>
//           </form>

//           {/* Verify Button */}
//           <button 
//            type="submit"
//           onClick={handleVerify}
//           className="w-full bg-yellow-400 text-[#0234c2] font-bold py-2 rounded-full hover:bg-yellow-300 transition">
//             VERIFY OTP
//           </button>

//           {/* Resend */}
//           <p className="mt-4 text-sm">
//             Didn’t receive OTP?{" "}
//             <span className="underline cursor-pointer text-yellow-300">Resend</span>
//           </p>
//         </div>

//         {/* Woman Image */}
//         <img src={woman} alt="Representative" className="hidden md:block w-48" />
//       </div>
//     </div>
//   );
// }


// import { useState, useRef } from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import logo from "../../assets/livco logo.png";
// import bgImage from "../../assets/user/userLogin/login_bgimage.png";
// import woman from "../../assets/user/userLogin/userLogin.png";
// import { API_BASE_URL } from "../../Clients-components/PropertyController";

// export default function UserOtpVerfication() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputs = useRef([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const otpData = JSON.parse(sessionStorage.getItem('otpVerificationData'));
//     if (!otpData || !otpData.phone || !window.confirmationResult) {
//       navigate("/user/login");
//       return;
//     }
    
//     setPhoneNumber(`+91${otpData.phone}`);
//     setUserData(otpData.userData || {});
//   }, [navigate]);

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setError("");
    
//     // Combine the OTP array into a single string
//     const otpString = otp.join('');
    
//     if (!otpString || otpString.length !== 6) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);
      
//       // 1. Verify OTP with Firebase - pass the string, not the array
//       const result = await window.confirmationResult.confirm(otpString);
//       const firebaseUser = result.user;
      
//       // 2. Get Firebase token
//       const firebaseToken = await firebaseUser.getIdToken();

//       // 3. Verify with backend
//       const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
//         phone: phoneNumber.replace('+91', ''),
//         firebaseUid: firebaseUser.uid,
//         firebaseToken
//       });

//       if (!response.data.success) {
//         throw new Error(response.data.message || "OTP verification failed");
//       }
      
//       if (response.data.user.role !== 'user') {
//         throw new Error("Access denied. user login only.");
//       }

//       // 4. Store tokens and user data
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));

//       // 5. Clear OTP verification data
//       sessionStorage.removeItem('otpVerificationData');
//       delete window.confirmationResult;

//       // 6. Redirect to dashboard
//       navigate("/");

//     } catch (err) {
//       console.error("OTP verification failed", err);
//       setError(err.response?.data?.message || err.message || "Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (index, value) => {
//     if (!/^[0-9]?$/.test(value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) { // Changed from 3 to 5 since we have 6 digits
//       inputs.current[index + 1].focus();
//     }
//   };

//   const handleBackspace = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputs.current[index - 1].focus();
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Blurred Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       />
//       {/* Optional Dark Overlay */}
//       <div className="absolute inset-0 bg-white/50" />

//       {/* Card */}
//       <div className="relative z-10 bg-[#0140BA] rounded-xl p-8 md:p-12 w-full max-w-3xl flex justify-between items-center text-white">
//         <div className="w-full max-w-sm">
//           <img src={logo} alt="Logo" className="w-12 mb-4" />
//           <h2 className="text-xl font-bold mb-2">OTP Verification</h2>
//           <p className="text-sm text-white mb-6">
//             Enter 6 digit OTP sent to <span className="font-semibold">{phoneNumber || "+91 9999999999"}</span>{" "}
//             <span className="ml-1 cursor-pointer">✏️</span>
//           </p>

//           {/* OTP Inputs */}
//          <form onSubmit={handleVerify} className="max-w-sm mx-auto px-2 sm:px-0">
//   <div className="flex justify-center gap-2 mb-6">
//     {otp.map((digit, index) => (
//       <input
//         key={index}
//         type="text"
//         maxLength="1"
//         value={digit}
//         onChange={(e) => handleChange(index, e.target.value)}
//         onKeyDown={(e) => handleBackspace(index, e)}
//         ref={(el) => (inputs.current[index] = el)}
//         className="w-8 h-8 sm:w-8 sm:h-8 md:w-12 md:h-12 text-center text-base border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
//       />
//     ))}
//   </div>
 
//   {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
 
//   <button
//     type="submit"
//     disabled={loading}
//     className="w-full bg-yellow-400 text-[#0234c2] font-bold py-2 rounded-full hover:bg-yellow-300 transition disabled:opacity-50"
//   >
//     {loading ? "VERIFYING..." : "VERIFY OTP"}
//   </button>
// </form>

//           {/* Resend */}
//           <p className="mt-4 text-sm">
//             Didn't receive OTP?{" "}
//             <span className="underline cursor-pointer text-yellow-300">Resend</span>
//           </p>
//         </div>

//         {/* Woman Image */}
//         <img src={woman} alt="Representative" className="hidden md:block w-48" />
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { API_BASE_URL } from "../PropertyController";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    const otpData = JSON.parse(sessionStorage.getItem('otpVerificationData'));
    if (!otpData || !otpData.phone) {
      navigate("/client/client-login");
      return;
    }
    
    setPhoneNumber(otpData.phone);
    setCountdown(30);
  }, [navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    setError("");

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      
      if (!window.confirmationResult) {
        throw new Error("OTP session expired. Please request a new OTP.");
      }

      console.log("🔐 Verifying OTP with Firebase...");
      
      // Confirm OTP with Firebase
      const result = await window.confirmationResult.confirm(otpValue);
      
      // Get Firebase ID token
      const idToken = await result.user.getIdToken();
      console.log("✅ Firebase ID token received");
      
      // Verify with backend
      console.log("🔄 Sending to backend for verification...");
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/verify-firebase-otp`,
        { idToken },
        {
          timeout: 15000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "OTP verification failed");
      }

      console.log("✅ Backend verification successful");

      // Store data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Cleanup
      sessionStorage.removeItem('otpVerificationData');
      window.confirmationResult = null;

      setError("success:Login successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/client/dashboard");
      }, 1500);

    } catch (err) {
      console.error("❌ OTP verification failed", err);
      
      let errorMessage = "OTP verification failed";
      
      if (err.code === 'auth/invalid-verification-code') {
        errorMessage = "Invalid OTP. Please check and try again.";
      } else if (err.code === 'auth/code-expired') {
        errorMessage = "OTP has expired. Please request a new one.";
      } else if (err.response?.status === 401) {
        errorMessage = err.response.data?.message || "Authentication failed.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else {
        errorMessage = err.message || "Something went wrong.";
      }
      
      setError(errorMessage);
      setOtp(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === 5) {
      const otpValue = newOtp.join('');
      if (otpValue.length === 6) {
        handleVerify();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">OTP Verification</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter code sent to <span className="font-semibold">+91 {phoneNumber}</span>
        </p>

        {error && (
          <div className={`p-3 rounded mb-4 text-center ${
            error.includes("success") 
              ? "bg-green-100 border border-green-400 text-green-700" 
              : "bg-red-100 border border-red-400 text-red-700"
          }`}>
            {error.replace("success:", "")}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                disabled={loading}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otp.join('').length !== 6}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded disabled:opacity-50 transition duration-200"
          >
            {loading ? 'Verifying...' : 'VERIFY OTP'}
          </button>

          <Link to="/client/client-login">
            <button
              type="button"
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 rounded transition duration-200"
            >
              Back to Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;