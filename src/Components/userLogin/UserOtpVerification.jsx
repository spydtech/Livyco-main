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


import { useState, useRef } from "react";
import { useEffect } from "react";
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
  const navigate = useNavigate();

  useEffect(() => {
    const otpData = JSON.parse(sessionStorage.getItem('otpVerificationData'));
    if (!otpData || !otpData.phone || !window.confirmationResult) {
      navigate("/user/login");
      return;
    }
    
    setPhoneNumber(`+91${otpData.phone}`);
    setUserData(otpData.userData || {});
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
      
      // 1. Verify OTP with Firebase - pass the string, not the array
      const result = await window.confirmationResult.confirm(otpString);
      const firebaseUser = result.user;
      
      // 2. Get Firebase token
      const firebaseToken = await firebaseUser.getIdToken();

      // 3. Verify with backend
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
        phone: phoneNumber.replace('+91', ''),
        firebaseUid: firebaseUser.uid,
        firebaseToken
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "OTP verification failed");
      }
      
      if (response.data.user.role !== 'user') {
        throw new Error("Access denied. user login only.");
      }

      // 4. Store tokens and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 5. Clear OTP verification data
      sessionStorage.removeItem('otpVerificationData');
      delete window.confirmationResult;

      // 6. Redirect to dashboard
      navigate("/");

    } catch (err) {
      console.error("OTP verification failed", err);
      setError(err.response?.data?.message || err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) { // Changed from 3 to 5 since we have 6 digits
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Optional Dark Overlay */}
      <div className="absolute inset-0 bg-white/50" />

      {/* Card */}
      <div className="relative z-10 bg-[#0140BA] rounded-xl p-8 md:p-12 w-full max-w-3xl flex justify-between items-center text-white">
        <div className="w-full max-w-sm">
          <img src={logo} alt="Logo" className="w-12 mb-4" />
          <h2 className="text-xl font-bold mb-2">OTP Verification</h2>
          <p className="text-sm text-white mb-6">
            Enter 6 digit OTP sent to <span className="font-semibold">{phoneNumber || "+91 9999999999"}</span>{" "}
            <span className="ml-1 cursor-pointer">✏️</span>
          </p>

          {/* OTP Inputs */}
          <form onSubmit={handleVerify}>
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  ref={(el) => (inputs.current[index] = el)}
                  className="w-12 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                />
              ))}
            </div>
            
            {error && <p className="text-red-300 text-sm mb-4">{error}</p>}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-[#0234c2] font-bold py-2 rounded-full hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "VERIFY OTP"}
            </button>
          </form>

          {/* Resend */}
          <p className="mt-4 text-sm">
            Didn't receive OTP?{" "}
            <span className="underline cursor-pointer text-yellow-300">Resend</span>
          </p>
        </div>

        {/* Woman Image */}
        <img src={woman} alt="Representative" className="hidden md:block w-48" />
      </div>
    </div>
  );
}