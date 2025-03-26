import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import ClientNav from "../Client-Navbar/ClientNav";

const TanentConfirmbox = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const tenant = location.state || {}; // Ensure tenant data is passed
  
  
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);

 

  if (!tenant) {
    return <div className="text-center mt-10 text-lg text-red-500">Tenant data not available.</div>;
  }

  return (
    <>
    <ClientNav />
    <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-7xl">
      <h2 className="text-gray-500 text-sm cursor-pointer" onClick={() => navigate(-1)}>
          Home / Tenant Request
        </h2>
      </div>

      {/* Card Container */}
      <div className="bg-[#F8F8FF] shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl space-y-4">
        
        {/* Tenant Details */}
        <div className="flex justify-between border p-2  pb-4">
          <div>
            <h2 className="text-xl font-semibold">{tenant.name}</h2>
            <p className="text-gray-600">{tenant.email}</p>
            <p className="text-gray-600">{tenant.phone || "98********"}</p>
            <p className="text-gray-600">Booking Amount: ₹{tenant.bookingAmount || "2000"}/-</p>
            <p className="text-gray-600">Joined on {tenant.joinedDate || "02-02-2021"}</p>
            <p className="text-green-600">KYC has been verified</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Check out On</p>
            <p className="text-md font-semibold">{tenant.checkOutDate || "09 Jan 2025"}</p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border p-2 py-4 flex justify-between items-center">
          <div className="">
            <h3 className="font-semibold">Payment Detailed</h3>
            <p className="text-gray-600 justify-between flex">Last Due paid on: {tenant.lastDuePaid || "dd/mm/yyyy"}</p>
            <p className="text-gray-600 justify-between flex">Advance amount: ₹{tenant.advancePaid || "2,000"}</p>
            <p className="text-gray-600 justify-between flex">Outstanding Due: ₹{tenant.outstandingDue || "0"}</p>
          </div>
          <div className="text-blue-500 cursor-pointer flex items-center -mt-12">
            <span>View all Transactions</span>
            <FiExternalLink className="ml-1" />
          </div>
        </div>

        {/* Room Details */}
        <div className="py-4 border p-2">
           
          <h3 className="font-semibold">Room Detailed</h3>
          <div className="flex justify-between items-center">
          <div>
          <p className="text-gray-600">Booking detail</p>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
              {tenant.roomNumber || "Room 101 - Bed B"}
            </span>
            <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
              {tenant.sharingType || "2 Sharing"}
            </span>
          </div>
          </div>
        </div>

        {/* Approve Check-out Checkbox */}
        <div className="flex items-center justify-center mt-4">
          <input
            type="checkbox"
            id="approveCheckout"
            className="mr-2"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="approveCheckout" className="text-gray-700">
            Approve Check-out
          </label>
        </div>

        {/* Approve Button */}
        <div className="flex justify-center mt-4">
          <button
            className={`w-64 py-3 text-lg font-semibold rounded-md shadow-md transition ${
              isChecked ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isChecked}
            onClick={() => alert("Refund Processed!")}
          >
            Approve and Process Refund
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default TanentConfirmbox;
