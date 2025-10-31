// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";
// import logo from "../../assets/livco logo.png";
// import girlImage from "../../assets/user/userLogin/userLogin.png";
// import bgimage from "../../assets/user/userLogin/login_bgimage.png";
// import { API_BASE_URL } from "../../Clients-components/PropertyController";

// function UserRegister() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     location: "",
//     role: "user",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Validate form data
//     if (!formData.name || !formData.phone || !formData.location) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Send registration data to backend
//       const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       console.log("Registration successful:", data);

//       // Show success message and navigate to login
//       alert("Registration successful! Please login to continue.");
//       navigate("/user/login");
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert(error.message || "An error occurred during registration");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: `url(${bgimage})` }}
//       />
//       <div className="absolute inset-0 bg-white/50" />

//       <div className="bg-[#0234c2] flex flex-col md:flex-row text-white rounded-xl p-6 md:p-8 w-full max-w-3xl shadow-lg relative z-10">
//         {/* Form Section */}
//         <div className="flex-1 md:pr-6">
//           <div className="mb-4 flex items-center justify-center md:justify-start">
//             <img src={logo} alt="Logo" className="w-14 h-16 mr-2" />
//           </div>

//           <h2 className="text-2xl font-semibold text-yellow-400 mb-2 text-center md:text-left">
//             Hi Welcome!
//           </h2>
//           <p className="mb-6 text-gray-200 text-center md:text-left">
//             Create your account below
//           </p>

//           {error && <p className="text-red-400 mb-2">{error}</p>}

//           <form onSubmit={handleRegister} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-md text-black"
//               required
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-md text-black"
//               required
//             />

//             <div className="flex items-center bg-white rounded-md overflow-hidden">
//               <span className="text-black text-sm px-2 border-r border-gray-300">
//                 🇮🇳 +91
//               </span>
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Enter Mobile Number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 outline-none text-black"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-yellow-400 text-[#0234c2] font-bold py-2 rounded-full hover:bg-yellow-300 transition"
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </form>

//           <p className="text-xs text-gray-300 mt-4 text-center md:text-left">
//             By signing up, you agree to our{" "}
//             <span className="underline text-white cursor-pointer">
//               Terms of Use
//             </span>{" "}
//             and{" "}
//             <span className="underline text-white cursor-pointer">
//               Privacy Policy
//             </span>
//           </p>

//           <div className="flex items-center my-4 text-gray-300 text-sm">
//             <div className="flex-grow border-t border-gray-500"></div>
//             <span className="mx-3">OR</span>
//             <div className="flex-grow border-t border-gray-500"></div>
//           </div>

//           <button className="w-full border border-white py-2 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-[#0234c2] transition">
//             <FaGoogle className="text-lg" />
//             Sign up with Google
//           </button>
//         </div>

//         {/* Right Image Section */}
//         <div className="relative flex-1 hidden md:block">
//           <img
//             src={girlImage}
//             alt="Representative"
//             className="absolute right-12 bottom-8 max-w-xs z-0"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserRegister;



//this code used for deploy the project

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import logo from "../../assets/livco logo.png";
import girlImage from "../../assets/user/userLogin/userLogin.png";
import bgimage from "../../assets/user/userLogin/login_bgimage.png";
import { API_BASE_URL } from "../../Clients-components/PropertyController";

function UserRegister() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form data
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // Send registration data to backend
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration successful:", data);

      // Show success message and navigate to login
      alert("Registration successful! Please login to continue.");
      navigate("/user/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgimage})` }}
      />
      <div className="absolute inset-0 bg-white/50" />

      <div className="bg-[#0234c2] flex flex-col md:flex-row text-white rounded-xl p-6 md:p-8 w-full max-w-3xl shadow-lg relative z-10">
        {/* Form Section */}
        <div className="flex-1 md:pr-6">
          <div className="mb-4 flex items-center justify-center md:justify-start">
            <img src={logo} alt="Logo" className="w-14 h-16 mr-2" />
          </div>

          <h2 className="text-2xl font-semibold text-yellow-400 mb-2 text-center md:text-left">
            Hi Welcome!
          </h2>
          <p className="mb-6 text-gray-200 text-center md:text-left">
            Create your account below
          </p>

          {error && <p className="text-red-400 mb-2">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md text-black"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md text-black"
              required
            />

            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <span className="text-black text-sm px-2 border-r border-gray-300">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="Enter Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 outline-none text-black"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-[#0234c2] font-bold py-2 rounded-full hover:bg-yellow-300 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-xs text-gray-300 mt-4 text-center md:text-left">
            By signing up, you agree to our{" "}
            <span className="underline text-white cursor-pointer">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="underline text-white cursor-pointer">
              Privacy Policy
            </span>
          </p>

          <div className="flex items-center my-4 text-gray-300 text-sm">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="mx-3">OR</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>

          <button className="w-full border border-white py-2 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-[#0234c2] transition">
            <FaGoogle className="text-lg" />
            Sign up with Google
          </button>
        </div>

        {/* Right Image Section */}
        <div className="relative flex-1 hidden md:block">
          <img
            src={girlImage}
            alt="Representative"
            className="absolute right-12 bottom-8 max-w-xs z-0"
          />
        </div>
      </div>
    </div>
  );
}

export default UserRegister;