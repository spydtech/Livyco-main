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








// this code used for deploy the project

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/livco logo.png";
import bgImage from "../../assets/user/userLogin/login_bgimage.png";
import woman from "../../assets/user/userLogin/userLogin.png";
import { API_BASE_URL } from "../../Clients-components/PropertyController";

export default function UserOtpVerfication() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const otpData = JSON.parse(sessionStorage.getItem('otpVerificationData'));
    console.log("OTP Data from session:", otpData);
    
    if (!otpData || !otpData.phone || !window.confirmationResult) {
      console.log("No OTP data found, redirecting to login");
      navigate("/user/login");
      return;
    }
    
    setPhoneNumber(otpData.phone);
    setUserData(otpData.userData || {});
    setRole(otpData.role || 'user');
  }, [navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    
    // Combine the OTP array into a single string
    const otpString = otp.join('');
    
    if (!otpString || otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      
      // 1. Verify OTP with Firebase
      console.log("Verifying OTP with Firebase...");
      const result = await window.confirmationResult.confirm(otpString);
      console.log("Firebase OTP confirmation successful");
      
      // 2. Get Firebase ID token
      console.log("🪙 Getting Firebase ID token...");
      const idToken = await result.user.getIdToken();
      console.log("Firebase ID token received");
      
      // 3. Verify with backend using Firebase OTP endpoint
      console.log("Sending to backend for verification...");
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-firebase-otp`, {
        idToken,
        role: 'user' 
      }, {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log("Backend response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || "OTP verification failed");
      }

      // 4. Store tokens and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 5. Clear OTP verification data
      sessionStorage.removeItem('otpVerificationData');
      window.confirmationResult = null;

      console.log("Login successful!");
      setError("success:Login successful! Redirecting...");
      
      // 6. Redirect to dashboard
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.error("OTP verification failed", err);
      
      let errorMessage = "Invalid OTP. Please try again.";
      
      // Handle different error types
      if (err.response) {
        // Backend error
        console.error("Backend error details:", err.response.data);
        
        if (err.response.status === 401) {
          errorMessage = "Authentication failed. Please try again.";
        } else if (err.response.status === 403) {
          errorMessage = "Access denied. User login only.";
        } else if (err.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        // Network error
        errorMessage = "Network error. Please check your connection and try again.";
      } else {
        // Firebase or other errors
        if (err.code === 'auth/invalid-verification-code') {
          errorMessage = "Invalid OTP. Please check and try again.";
        } else if (err.code === 'auth/code-expired') {
          errorMessage = "OTP has expired. Please request a new one.";
        } else if (err.code === 'auth/too-many-requests') {
          errorMessage = "Too many attempts. Please try again later.";
        } else {
          errorMessage = err.message || "Invalid OTP. Please try again.";
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error when user starts typing

    // Auto-focus next input
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }

    // Auto-submit when all fields are filled
    if (value && index === 5) {
      const otpValue = newOtp.join('');
      if (otpValue.length === 6) {
        console.log("Auto-submitting OTP...");
        handleVerify();
      }
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace when current is empty
        inputs.current[index - 1].focus();
      } else if (otp[index]) {
        // Clear current input but stay focused
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    console.log("📋 Pasted data:", pasteData);
    
    if (pasteData.length === 6) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      setError(""); // Clear error on paste
      
      // Focus the last input
      if (inputs.current[5]) {
        inputs.current[5].focus();
      }
      
      // Auto-submit after paste
      console.log("Auto-submitting pasted OTP...");
      setTimeout(() => {
        handleVerify();
      }, 100);
    }
  };

  const clearAllInputs = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  };

  const handleResend = () => {
    // Clear session and redirect to login to resend OTP
    sessionStorage.removeItem('otpVerificationData');
    window.confirmationResult = null;
    navigate("/user/login");
  };

  if (!phoneNumber) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/50" />

      {/* Card */}
      <div className="relative z-10 bg-[#0140BA] rounded-xl p-8 md:p-12 w-full max-w-3xl flex justify-between items-center text-white">
        <div className="w-full max-w-sm">
          <img src={logo} alt="Logo" className="w-12 mb-4" />
          <h2 className="text-xl font-bold mb-2">OTP Verification</h2>
          <p className="text-sm text-white mb-6">
            Enter 6 digit OTP sent to <span className="font-semibold">+91 {phoneNumber}</span>
          </p>

          {/* OTP Inputs */}
          <form onSubmit={handleVerify} className="max-w-sm mx-auto px-2 sm:px-0">
            <div 
              className="flex justify-center gap-2 mb-6"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  ref={(el) => (inputs.current[index] = el)}
                  className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black font-semibold"
                  disabled={loading}
                />
              ))}
            </div>

            {/* Error/Success Message */}
            {error && (
              <div className={`p-3 rounded mb-4 text-center ${
                error.includes("success") 
                  ? "bg-green-100 border border-green-400 text-green-700" 
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}>
                {error.replace("success:", "")}
                {error.includes("Invalid OTP") && (
                  <button
                    type="button"
                    onClick={clearAllInputs}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-1 block"
                  >
                    Clear all inputs
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="w-full bg-yellow-400 text-[#0234c2] font-bold py-3 rounded-full hover:bg-yellow-300 transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  VERIFYING...
                </>
              ) : (
                'VERIFY OTP'
              )}
            </button>
          </form>

          {/* Resend */}
          <p className="mt-4 text-sm text-center">
            Didn't receive OTP?{" "}
            <button 
              onClick={handleResend}
              className="underline cursor-pointer text-yellow-300 hover:text-yellow-200"
            >
              Resend
            </button>
          </p>
        </div>

        {/* Woman Image */}
        <img src={woman} alt="Representative" className="hidden md:block w-48" />
      </div>
    </div>
  );
}