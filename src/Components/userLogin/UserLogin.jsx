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
