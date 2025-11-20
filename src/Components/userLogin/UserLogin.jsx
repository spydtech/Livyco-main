import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import logo from "../../assets/livco logo.png"; // Adjust the path as necessary
import girlImage from "../../assets/user/userLogin/userLogin.png";
import bgimage from "../../assets/user/userLogin/login_bgimage.png"; // Adjust the path as necessary
import { auth } from "../../firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { API_BASE_URL } from "../../Clients-components/PropertyController";
import axios from "axios";

function UserLogin() {
  const [phone, setPhone] = useState("");
 const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

   const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("reCAPTCHA verified");
      },
      'expired-callback': () => {
        console.log("reCAPTCHA expired");
      }
    });
  }
};


   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);

      // 1. Check with backend if phone exists
      const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, { phone });
      
      if (!response.data.success) {
        setError(response.data.message || "Phone number not registered. Please register first.");
        return;
      }

      // 2. Setup Firebase Recaptcha and send OTP
      const phoneNumber = "+91" + phone;
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmation;

      // Store minimal data in sessionStorage for OTP verification
      sessionStorage.setItem('otpVerificationData', JSON.stringify({
        phone,
        userData: response.data.user
      }));

      navigate("/user/otp-verification");

    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Blurred Background */}
  <div
    className="absolute inset-0 bg-cover bg-center "
    style={{ backgroundImage: `url(${bgimage})` }}
  />

  {/* Overlay (optional dimming) */}
  <div className="absolute inset-0 bg-white/50" />
      <div className="bg-[#0234c2] flex  text-white rounded-xl p-8 w-full max-w-3xl shadow-lg absolute ">
        {/* Logo */}
        <div>
        
        <div className="mb-4 flex items-center">
          <img src={logo} alt="Logo" className="w-14 h-16 mr-2" />
          {/* <span className="font-bold text-xl text-yellow-400">Livyco</span> */}
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Hi Welcome!</h2>
        <p className="mb-6 text-gray-200">Enter your Phone Number</p>
        <p className="mb-4 text-sm text-gray-300">We will send you 4 digit verification code</p>

        {/* Phone Input */}
        <form onSubmit={handleSubmit}>
        
        <div className="flex items-center bg-white rounded-md overflow-hidden mb-4">
          <span className="text-black text-sm px-2 border-r border-gray-300">🇮🇳 +91</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Mobile number"
            className="w-full px-3 py-2 outline-none text-black"
          />
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-300 mb-4">
          By signing up, you agree to our{" "}
          <span className="underline text-white cursor-pointer">Terms of Use</span> and{" "}
          <span className="underline text-white cursor-pointer">Privacy Policy</span>
        </p>
        <Link to="/user/register">
        <p className="  text-gray-300 mb-4"> 
          If you don't have an account ? {" "}
         <span className="underline text-white cursor-pointer">Rigister</span>
          </p>
          </Link>

        {/* Send OTP */}
        {/* <Link to="/user/otp-verification" > */}
        <button 
         type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 text-[#0234c2] font-bold py-2 rounded-full hover:bg-yellow-300 transition">
          {loading ? 'Sending...' : 'SEND OTP'}
        </button>
        {/* </Link> */}
        </form>

        {/* Divider */}
        <div className="flex items-center my-4 text-gray-300 text-sm">
          <div className="flex-grow border-t border-gray-500"></div>
          <span className="mx-3">OR</span>
          <div className="flex-grow border-t border-gray-500"></div>
          <div id="recaptcha-container"></div>

        </div>

        {/* Google Sign In */}

        <button className="w-full border border-white py-2 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-[#0234c2] transition">
          <FaGoogle className="text-lg" />
          Sign up with Google
        </button>
        </div>
        <div>
        <img
        src={girlImage}
        alt="Representative"
       className="absolute hidden md:block right-12 bottom-8 max-w-xs z-0"
      />

        </div>
          
      </div>

      {/* Right Side Image */}
    
    </div>
  );
}

export default UserLogin;





// this code used in the live-after deployed

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";
// import logo from "../../assets/livco logo.png";
// import girlImage from "../../assets/user/userLogin/userLogin.png";
// import bgimage from "../../assets/user/userLogin/login_bgimage.png";
// import { auth } from "../../firebase/firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { API_BASE_URL } from "../../Clients-components/PropertyController";
// import axios from "axios";

// function UserLogin() {
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Initialize reCAPTCHA
//   const initializeRecaptcha = () => {
//     try {
//       console.log("Initializing reCAPTCHA...");
      
//       // Clear existing reCAPTCHA
//       if (window.recaptchaVerifier) {
//         try {
//           window.recaptchaVerifier.clear();
//         } catch (e) {
//           console.log("Clearing old recaptcha:", e);
//         }
//       }

//       // Create invisible reCAPTCHA
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         'recaptcha-container',
//         {
//           size: 'invisible',
//         },
//         auth
//       );

//       console.log("reCAPTCHA initialized successfully");
      
//     } catch (error) {
//       console.error("Failed to initialize reCAPTCHA:", error);
//     }
//   };

//   useEffect(() => {
//     // Initialize reCAPTCHA after component mounts
//     const timer = setTimeout(() => {
//       initializeRecaptcha();
//     }, 1000);

//     return () => {
//       clearTimeout(timer);
//       // Cleanup
//       if (window.recaptchaVerifier) {
//         try {
//           window.recaptchaVerifier.clear();
//         } catch (err) {
//           console.log("Cleanup error:", err);
//         }
//       }
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!phone || phone.length !== 10) {
//       setError("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       // 1. Check with backend if user exists with user role
//       console.log("Checking user existence...");
//       const response = await axios.post(`${API_BASE_URL}/api/auth/check-user`, { 
//         phone,
//         role: 'user' // Specify role for user login
//       });
      
//       if (!response.data.success) {
//         setError(response.data.message || "User not registered. Please register first.");
//         return;
//       }

//       console.log("User found, proceeding with OTP...");

//       // 2. Ensure reCAPTCHA is ready
//       if (!window.recaptchaVerifier) {
//         initializeRecaptcha();
//         await new Promise(resolve => setTimeout(resolve, 500));
//       }

//       const phoneNumber = "+91" + phone;
      
//       console.log("Sending OTP to:", phoneNumber);
      
//       // 3. Send OTP via Firebase
//       const confirmation = await signInWithPhoneNumber(
//         auth, 
//         phoneNumber, 
//         window.recaptchaVerifier
//       );
      
//       window.confirmationResult = confirmation;

//       // Store verification data
//       sessionStorage.setItem('otpVerificationData', JSON.stringify({
//         phone,
//         userData: response.data.user,
//         role: 'user', // Store role
//         timestamp: Date.now()
//       }));

//       console.log("OTP sent successfully");
//       navigate("/user/otp-verification");

//     } catch (err) {
//       console.error("OTP sending error:", err);
      
//       let errorMessage = "Failed to send OTP. Please try again.";
      
//       switch (err.code) {
//         case 'auth/invalid-phone-number':
//           errorMessage = "Invalid phone number format.";
//           break;
//         case 'auth/quota-exceeded':
//           errorMessage = "Too many attempts. Please try again later.";
//           break;
//         case 'auth/too-many-requests':
//           errorMessage = "Too many requests. Please try again later.";
//           break;
//         case 'auth/network-request-failed':
//           errorMessage = "Network error. Please check your internet connection.";
//           break;
//         case 'auth/app-not-authorized':
//           errorMessage = "Authentication service error. Please contact support.";
//           break;
//         case 'auth/operation-not-allowed':
//           errorMessage = "Phone authentication is not enabled.";
//           break;
//         default:
//           errorMessage = err.response?.data?.message || err.message || errorMessage;
//       }
      
//       setError(errorMessage);
      
//       // Reset reCAPTCHA on error
//       setTimeout(() => {
//         initializeRecaptcha();
//       }, 1000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetRecaptcha = () => {
//     initializeRecaptcha();
//     setError("Security check reset. Please try again.");
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Blurred Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: `url(${bgimage})` }}
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-white/50" />
      
//       <div className="bg-[#0234c2] flex text-white rounded-xl p-8 w-full max-w-3xl shadow-lg absolute">
//         {/* Left Side - Form */}
//         <div className="w-full md:w-1/2">
//           <div className="mb-4 flex items-center">
//             <img src={logo} alt="Logo" className="w-14 h-16 mr-2" />
//           </div>

//           <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Hi Welcome User!</h2>
//           <p className="mb-6 text-gray-200">Enter your Phone Number</p>
//           <p className="mb-4 text-sm text-gray-300">We will send you 6 digit verification code</p>

//           {/* Phone Input Form */}
//           <form onSubmit={handleSubmit}>
//             <div className="flex items-center bg-white rounded-md overflow-hidden mb-4">
//               <span className="text-black text-sm px-2 border-r border-gray-300">🇮🇳 +91</span>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                 placeholder="Enter Mobile number"
//                 className="w-full px-3 py-2 outline-none text-black"
//                 maxLength={10}
//                 required
//               />
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
//                 <p className="text-red-600 text-sm">{error}</p>
//                 {error.includes("reCAPTCHA") && (
//                   <button
//                     type="button"
//                     onClick={resetRecaptcha}
//                     className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
//                   >
//                     Reset Security Check
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Terms */}
//             <p className="text-xs text-gray-300 mb-4">
//               By signing up, you agree to our{" "}
//               <span className="underline text-white cursor-pointer">Terms of Use</span> and{" "}
//               <span className="underline text-white cursor-pointer">Privacy Policy</span>.
//             </p>
            
//             <Link to="/user/register">
//               <p className="text-gray-300 mb-4">
//                 If you don't have an account? {" "}
//                 <span className="underline text-white cursor-pointer">Register</span>
//               </p>
//             </Link>

//             {/* Send OTP Button */}
//             <button 
//               type="submit"
//               disabled={loading}
//               className="w-full bg-yellow-400 text-[#0234c2] font-bold py-2 rounded-full hover:bg-yellow-300 transition disabled:opacity-50"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   SENDING OTP...
//                 </span>
//               ) : (
//                 'SEND OTP'
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-4 text-gray-300 text-sm">
//             <div className="flex-grow border-t border-gray-500"></div>
//             <span className="mx-3">OR</span>
//             <div className="flex-grow border-t border-gray-500"></div>
//           </div>

//           {/* Google Sign In */}
//           <button className="w-full border border-white py-2 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-[#0234c2] transition">
//             <FaGoogle className="text-lg" />
//             Sign up with Google
//           </button>
//         </div>

//         {/* Right Side - Image */}
//         <div className="hidden md:block md:w-1/2 flex justify-center items-center">
//           <img
//             src={girlImage}
//             alt="Representative"
//             className="max-w-xs"
//           />
//         </div>
//       </div>

//       {/* reCAPTCHA Container - Hidden but in DOM */}
//       <div id="recaptcha-container" className="invisible"></div>
//        <div id="recaptcha-container"></div>
//     </div>
//   );
// }

// export default UserLogin;