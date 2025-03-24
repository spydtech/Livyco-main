import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import ClientNav from "../Client-Navbar/ClientNav";

const ApproveCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tenant = location.state || {}; // Ensure tenant data is passed

  return (
    <>
    <ClientNav />
    <div className="p-6 bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-500 text-sm cursor-pointer" onClick={() => navigate(-1)}>
          Home / Tenant Request
        </h2>

       
      </div>

      {/* Tenant Profile Section */}
      <div className="bg-white p-6  flex items-center space-x-6 mb-6 justify-between">
       
        <div className="flex gap-4 items-center">
        <img src={tenant.profileImage} alt="Profile" className="w-16 h-16 rounded-full border" />
        <div>
        <h2 className="text-xl font-semibold">{tenant.name}</h2>
        <p className="text-gray-500">{tenant.tenantId}</p>
        </div>
         
        </div>
         {/* Contact Buttons */}
         <div className="flex space-x-4 items-end justify-end ml-auto">
          <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
            <FiMessageCircle className="text-black text-lg" />
          </button>
          <button className="p-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
            <FiPhone className="text-black text-lg" />
          </button>
        </div>
      </div>


      <div className="ml-[30%]  bg-white ">

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6  items-start justify-center">
        {/* Basic Details */}
        <div className="bg-white p-6 rounded-lg  md:w-[600px]  border-2">
          <h3 className="font-semibold text-gray-700 mb-4">Basic Details</h3>
          <div className="space-y-2 text-gray-600">
            <p><strong>Email ID:</strong> {tenant.email}</p>
            <p><strong>Date of Birth:</strong> {tenant.dob}</p>
            <p><strong>Aadhar Number:</strong> {tenant.aadhar}</p>
            <p><strong>Emergency Contact:</strong> {tenant.emergencyContact} ({tenant.emergencyName})</p>
            <p><strong>Address:</strong> {tenant.address}</p>
          </div>
        </div>

        {/* Stay Details */}
        <div className="bg-white p-6 rounded-lg border-2 md:w-[600px]">
          <h3 className="font-semibold text-gray-700 mb-4">Stay Details</h3>
          <div className="space-y-2 text-gray-600">
            <p className="font-semibold">{tenant.hostelName}</p>
            <p className="text-gray-500">{tenant.hostelAddress}</p>
            <p><strong>Check-in Date:</strong> {tenant.checkInDate}</p>
            <p><strong>Check-out Date:</strong> {tenant.checkOutDate}</p>
            <p><strong>Details:</strong> {tenant.roomDetails}</p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white p-6 rounded-lg border-2 mt-6 md:w-[600px]">
        <h3 className="font-semibold text-gray-700 mb-4">Payment Details</h3>
        <div className="space-y-2 text-gray-600">
          <p><strong>Advance Paid:</strong> {tenant.advancePaid}</p>
          <p><strong>Rent per month:</strong> {tenant.rentPerMonth}</p>
        </div>
      </div>
      </div>

      {/* Confirm Booking Button */}
      <div className="flex justify-center mt-8">
        <button className="w-64 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition">
         Approve and Process Refund
        </button>
      </div>
    </div>
    </>
  );
};

export default ApproveCheckout;

