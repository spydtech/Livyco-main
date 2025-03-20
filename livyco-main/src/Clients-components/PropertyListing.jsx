import React from 'react';
import logo from '../assets/client-main/logo.png';
import bgimage from '../assets/client-main/client-main-bg-image.png';
import { Link } from 'react-router-dom';

const PropertyListing = () => {
  return (
    <div>
    <div className="relative flex min-h-screen bg-blue-900 text-white p-6 md:p-12">
      {/* Top Section with Logo and Button */}
      <div className="absolute top-4 left-6 flex items-center ">
        
        <div className=" ">
          <img 
          src={logo}
          className='w-24 h-24'
          />
        </div>
      </div>
      <div className="absolute top-10 right-6">
        <button className="bg-yellow-400 border px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-all">
          View Plans and Pricing
        </button>
      </div>

      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl font-semibold mb-4">For Property Owners</h1>
        <p className="text-3xl mb-6 md:w-1/2">
          List out your <span className="text-yellow-400 font-semibold">PG</span> for free with
          <span className="text-yellow-400 font-semibold"> Livyco</span>
        </p>
        <div className="flex bg-blue-950 p-10 text-center w-[400px] rounded-lg ">
          <div className="mr-6 text-center ">
            <p className="font-bold text-xl">no 1</p>
            <p className="text-sm">Trusted platform</p>
          </div>
          <div className="mr-6">
            <p className="font-bold text-xl">n+</p>
            <p className="text-sm">Owners</p>
          </div>
          <div>
            <p className="font-bold text-xl">n+</p>
            <p className="text-sm">Tenants</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Let’s set things up!</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <p className="text-sm text-gray-600">
              Are you a registered user?{' '}
              <Link to="/client/client-login">
              <span className="text-blue-600 cursor-pointer hover:underline">Login</span>
              </Link>
            </p>
            <button className="w-full bg-yellow-400 text-black p-3 rounded-md font-semibold hover:bg-yellow-500 transition-all">
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
      <div className="absolute  -top-10 left-0 w-full h-[500px]  bg-cover bg-center"
       style={{ backgroundImage: `url(${bgimage})` }}>
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