// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from '../assets/client-main/logo.png';
// import bgimage from '../assets/client-main/client-main-bg-image.png';
// import { Link } from 'react-router-dom';
// import { API_BASE_URL } from "./PropertyController";

// const PropertyListing = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     location: '',
//     role: 'client'
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form data
//     if (!formData.name || !formData.phone || !formData.location) {
//       alert('Please fill all fields');
//       return;
//     }
  
//     try {
//       // Send registration data to backend
//       const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }
  
//       console.log('Registration successful:', data);
      
//       // Show success message and navigate to login
//       alert('Registration successful! Please login to continue.');
//       navigate('/client/client-login');
      
//     } catch (error) {
//       console.error('Registration error:', error);
//       alert(error.message || 'An error occurred during registration');
//     }
//   };
//   return (
//     <div>
//     <div className="relative flex min-h-screen bg-blue-900 text-white p-6 md:p-12">
//       {/* Top Section with Logo and Button */}
//       <div className="absolute top-4 left-6 flex items-center ">
        
//         <div className=" ">
//           <img 
//           src={logo}
//           className='w-24 h-24'
//           />
//         </div>
//       </div>
//       <div className="absolute top-10 right-6">
//         <button className="bg-yellow-400 border px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-all">
//           View Plans and Pricing
//         </button>
//       </div>

//       {/* Left Section */}
//       <div className="text-white md:w-1/2 mt-[10%]">
//         <h1 className="text-4xl font-bold leading-snug">
//           List out your <span className="text-yellow-400">PG</span> for free <br />
//           with <span className="text-yellow-400">Livyco</span>
//         </h1>

//         {/* Stats Box */}
//         <div className="bg-[#000367FA] text-white mt-6 p-6 rounded-xl flex justify-around shadow-lg">
//           <div className="text-center">
//             <p className="text-xl font-semibold">no 1</p>
//             <p className="text-sm text-gray-400">Trusted platform</p>
//           </div>
//           <div className="text-center">
//             <p className="text-xl font-semibold">n+</p>
//             <p className="text-sm text-gray-400">Owners</p>
//           </div>
//           <div className="text-center">
//             <p className="text-xl font-semibold">n+</p>
//             <p className="text-sm text-gray-400">Tenants</p>
//           </div>
//         </div>

//         {/* Call to Action Button */}
//         <button className="mt-6 bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500">
//           List property now
//         </button>
//       </div>

//       {/* Right Section */}
//       <div className="w-full md:w-1/2 flex justify-center items-center">
//         <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-xl font-semibold mb-4">Let’s set things up!</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Name"
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter your mobile number"
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               required
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               required
//             />
//             <p className="text-sm text-gray-600">
//               Are you a registered user?{' '}
//               <Link to="/client/client-login">
//               <span className="text-blue-600 cursor-pointer hover:underline">Login</span>
//               </Link>
//             </p>
//             <button 
//             type="submit"
//             className="w-full bg-yellow-400 text-black p-3 rounded-md font-semibold hover:bg-yellow-500 transition-all">
//               Continue
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//      <div className="flex flex-col items-center justify-center p-8 bg-white min-h-screen">
//      {/* Heading */}
//      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">
//        List your property for free in just 3 easy steps
//      </h2>

//      {/* Steps Container */}
//      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
//        {/* Step 1 */}
//        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
//          <div className="w-12 h-12 bg-gray-300 text-gray-700 flex items-center justify-center text-lg font-bold rounded-full mb-4">
//            1
//          </div>
//          <h3 className="font-semibold text-gray-800">Provide property details</h3>
//          <p className="text-gray-600 text-center mt-2">
//            Share the Location, Photos, Videos, and Key Details of Your Property
//          </p>
//        </div>

//        {/* Step 2 */}
//        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
//          <div className="w-12 h-12 bg-gray-300 text-gray-700 flex items-center justify-center text-lg font-bold rounded-full mb-4">
//            2
//          </div>
//          <h3 className="font-semibold text-gray-800">Choose your Plan</h3>
//          <p className="text-gray-600 text-center mt-2">
//            Specify your rent expectations and pick a plan.
//          </p>
//        </div>

//        {/* Step 3 */}
//        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
//          <div className="w-12 h-12 bg-gray-300 text-gray-700 flex items-center justify-center text-lg font-bold rounded-full mb-4">
//            3
//          </div>
//          <h3 className="font-semibold text-gray-800">Enjoy Hassle-free check-ins</h3>
//          <p className="text-gray-600 text-center mt-2">
//            Effortless check-ins for your tenants, no hassle involved.
//          </p>
//        </div>
//      </div>

//      {/* Divider */}
//      <div className="w-full max-w-6xl my-8 border-t border-gray-300 flex items-center justify-center relative">
//        <span className="bg-white px-3 text-gray-600 absolute -top-3">OR</span>
//      </div>

//      {/* Call-to-Action */}
//      <div className="bg-blue-200 text-blue-900 font-medium p-4 rounded-md text-center w-full max-w-2xl">
//        Get help from us by giving a call on <span className="font-bold">+91 0000000000</span>
//      </div>
//    </div>
//    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
//       {/* Background Image */}
//       <div className="absolute  -top-10 left-0 w-full h-[500px]  bg-cover bg-center"
//        style={{ backgroundImage: `url(${bgimage})` }}>
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//       </div>
      
//       {/* Card Section */}
//       <div className="relative bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl h-[500px] text-center mt-24">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Why Choose <span className="text-blue-600">Livyco</span>?
//         </h2>
//       </div>

     
//     </div>
//    </div>
//   );
// };

// export default PropertyListing;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/client-main/logo.png';
import bgimage from '../assets/client-main/client-main-bg-image.png';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from "./PropertyController";

const PropertyListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'client'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    try {
      // Send registration data to backend
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      console.log('Registration successful:', data);
      
      // Show success message and navigate to login
      alert('Registration successful! Please login to continue.');
      navigate('/client/client-login');
      
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'An error occurred during registration');
    }
  };

  return (
    <div>
      <div className="relative flex min-h-screen bg-blue-900 text-white p-6 md:p-12">
        {/* Top Section with Logo and Button */}
        <div className="absolute top-4 left-6 flex items-center">
          <div className="">
            <img 
              src={logo}
              className='w-24 h-24'
              alt="Livyco Logo"
            />
          </div>
        </div>
        <div className="absolute top-10 right-6">
          <button className="bg-yellow-400 border px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-all">
            View Plans and Pricing
          </button>
        </div>

        {/* Left Section */}
        <div className="text-white md:w-1/2 mt-[10%]">
          <h1 className="text-4xl font-bold leading-snug">
            List out your <span className="text-yellow-400">PG</span> for free <br />
            with <span className="text-yellow-400">Livyco</span>
          </h1>

          {/* Stats Box */}
          <div className="bg-[#000367FA] text-white mt-6 p-6 rounded-xl flex justify-around shadow-lg">
            <div className="text-center">
              <p className="text-xl font-semibold">no 1</p>
              <p className="text-sm text-gray-400">Trusted platform</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">n+</p>
              <p className="text-sm text-gray-400">Owners</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">n+</p>
              <p className="text-sm text-gray-400">Tenants</p>
            </div>
          </div>

          {/* Call to Action Button */}
          <button className="mt-6 bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500">
            List property now
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Let's set things up!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <p className="text-sm text-gray-600">
                Are you a registered user?{' '}
                <Link to="/client/client-login">
                  <span className="text-blue-600 cursor-pointer hover:underline">Login</span>
                </Link>
              </p>
              <button 
                type="submit"
                className="w-full bg-yellow-400 text-black p-3 rounded-md font-semibold hover:bg-yellow-500 transition-all"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-white min-h-screen">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">
          List your property for free in just 3 easy steps
        </h2>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Step 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
            <div className="w-12 h-12 bg-gray-300 text-gray-700 flex items-center justify-center text-lg font-bold rounded-full mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-800">Provide property details</h3>
            <p className="text-gray-600 text-center mt-2">
              Share the Location, Photos, Videos, and Key Details of Your Property
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
            <div className="w-12 h-12 bg-gray-300 text-gray-700 flex items-center justify-center text-lg font-bold rounded-full mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-800">Choose your Plan</h3>
            <p className="text-gray-600 text-center mt-2">
              Specify your rent expectations and pick a plan.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
            <div className="w-12 h-12 bg-gray-300 text-gray-700 flex items-center justify-center text-lg font-bold rounded-full mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-800">Enjoy Hassle-free check-ins</h3>
            <p className="text-gray-600 text-center mt-2">
              Effortless check-ins for your tenants, no hassle involved.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-6xl my-8 border-t border-gray-300 flex items-center justify-center relative">
          <span className="bg-white px-3 text-gray-600 absolute -top-3">OR</span>
        </div>

        {/* Call-to-Action */}
        <div className="bg-blue-200 text-blue-900 font-medium p-4 rounded-md text-center w-full max-w-2xl">
          Get help from us by giving a call on <span className="font-bold">+91 0000000000</span>
        </div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
        {/* Background Image */}
        <div 
          className="absolute -top-10 left-0 w-full h-[500px] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        {/* Card Section */}
        <div className="relative bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl h-[500px] text-center mt-24">
          <h2 className="text-2xl font-semibold text-gray-800">
            Why Choose <span className="text-blue-600">Livyco</span>?
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;