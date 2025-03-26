import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPhone, FaComment } from "react-icons/fa";
import { FiMessageCircle, FiPhone } from "react-icons/fi";

const TenantProfile = () => {
  const [showMoveOutForm, setShowMoveOutForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reason, setReason] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");
  const [refund, setRefund] = useState("");
  const [notify, setNotify] = useState(false);
  const [showRentOptions, setShowRentOptions] = useState(false);
  const [rentOption, setRentOption] = useState("");
  const [customDate, setCustomDate] = useState("");
 
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  const handleCheckboxChange = () => {
    setNotify(!notify);
    if (!notify) {
      setShowRentOptions(false);
      setRentOption("");
      setCustomDate("");
      setGracePeriod("");
    }
  };

  const handleSavePreferences = () => {
    setPreferencesSaved(true);
    setTimeout(() => setPreferencesSaved(false), 3000);
  };

  const handleCheckOutClick = () => {
    setShowMoveOutForm(!showMoveOutForm);
  };

  const handleConfirmVacancy = () => {
    setShowSuccessPopup(true); // Show success popup
    setShowMoveOutForm(false); // Hide the move-out form
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false); // Close success popup
  };
  const location = useLocation(); 
  const navigate = useNavigate();
  const tenant = location.state; // Get the passed tenant data

  if (!tenant) {
    return <p>No tenant data found.</p>; // Handle missing data case
  }

  return (
    <div className="bg-[#F8F8FF] min-h-screen">
      {/* Header */}
      <div className="bg-[#0827B2] p-4 text-white flex items-center">
        <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)}/>
        <h1 className="ml-3 text-xl font-semibold">Tenant Profile</h1>
      </div>

      <div className="p-6">
        {/* Profile Section */}
        <div className="bg-[#F8F8FF] p-6  flex items-center space-x-6 mb-6 justify-between">
              
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

        {/* Details Section */}
        <div className="flex justify-between mx-8">
          <div className="mt-6 grid lg:grid-cols-1 grid-cols-3 gap-6">
            {/* Basic Details */}
            <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] ">
              <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <p className="font-semibold">Email ID:</p>
                <p>{tenant.email}</p>

                <p className="font-semibold">Date of birth:</p>
                <p>{tenant.dob}</p>

                <p className="font-semibold">Aadhar Number:</p>
                <p>{tenant.aadharNumber}</p>

                <p className="font-semibold">Emergency Contact Number:</p>
                <p>{tenant.guardianContact}</p>

                <p className="font-semibold">Address:</p>
                <p>#H.NO, Street, City, India</p>
              </div>
            </div>

            {/* Stay Details */}
            <div className="bg-[#F8F8FF] p-4 rounded-lg border border-[#727070] mt-4">
              <h3 className="text-lg font-semibold mb-3">Stay Details</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <p className="font-semibold">Hostel:</p>
                <p>{}</p>

                <p className="font-semibold">Check-in Date:</p>
                <p>{tenant.checkInDate}</p>

                <p className="font-semibold">Check-out Date:</p>
                <p>DD/MM/YYYY</p>

                <p className="font-semibold">Room:</p>
                <p>{tenant.roomDetails}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-[#F8F8FF] p-4 rounded-lg  border border-[#727070] mt-4">
              <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <p className="font-semibold">Advance Paid:</p>
                <p>₹0000.00</p>

                <p className="font-semibold">Rent per Month:</p>
                <p>₹{tenant.rent}</p>

                <p className="font-semibold">Total Rent Paid (Months):</p>
                <p>24 months</p>

                <p className="font-semibold">Total Rent Paid:</p>
                <p>₹00000.00</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 text-[#090909]  h-auto w-[320px] p-4 space-y-10 ">
      {preferencesSaved && <p className="text-green-600 font-semibold">Preferences Updated!</p>}

      {/* Notify Checkbox */}
      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox"  className="w-6 h-6 " checked={notify} onChange={handleCheckboxChange} />
        <span>Notify guests of pending due</span>
      </label>

      {/* Rent Collection Date and Grace Period Fields */}
      {notify && (
        <div className="mt-4 space-y-3">
          <label className="block text-sm font-semibold">Specify rent collection date</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg cursor-pointer"
            placeholder="Select date"
            onFocus={() => setShowRentOptions(true)}
            readOnly
          />

          {/* Rent Date Options */}
          {showRentOptions && (
            <div className="border p-2 rounded-lg bg-white shadow">
              <button
                className={`block w-full text-left p-2 ${rentOption === "end" ? "bg-gray-200" : ""}`}
                onClick={() => {
                  setRentOption("end");
                  setShowRentOptions(false);
                }}
              >
                End of every month
              </button>
              <button
                className={`block w-full text-left p-2 ${rentOption === "start" ? "bg-gray-200" : ""}`}
                onClick={() => {
                  setRentOption("start");
                  setShowRentOptions(false);
                }}
              >
                Starting of every month
              </button>
              <button
                className={`block w-full text-left p-2 ${rentOption === "custom" ? "bg-gray-200" : ""}`}
                onClick={() => setRentOption("custom")}
              >
                Customize the date
              </button>
              
            </div>
          )}

          {/* Custom Date Picker */}
          {rentOption === "custom" && (
            <input
              type="date"
              className="w-full border p-2 rounded-lg"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
            />
          )}

          {/* Grace Period */}
          <label className="block text-sm font-semibold mt-3">Specify Grace Period</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="e.g. 5 days"
            value={gracePeriod}
            onChange={(e) => setGracePeriod(e.target.value)}
          />
           {/* Save Preferences */}
      <button
        className="w-full bg-yellow-400 py-2 mt-4 font-semibold rounded-lg"
        onClick={handleSavePreferences}
      >
        Save my preferences
      </button>
        </div>
      )}

     

      {/* Other Options */}
      <div className="mt-4 space-y-5 text-">
        <button className="text-[#090909]">View Payment History →</button>
        <hr className="shadow-md text-[#727070]" />
        <button className="text-red-600">Mark Check Out →</button>
        <hr className="shadow-md" />
      </div>
    </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center"
          onClick={() => navigate("/client/confirmbooking")}
        >
          <button className="bg-yellow-400 px-10 py-3 text-lg font-semibold rounded-lg w-1/2">
            Save
          </button>
        </div>
      </div>

      {/* Move-Out Request Popup */}
      {showMoveOutForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-center mb-4">
              Are you sure you want to proceed with the tenant's move-out request?
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-medium mb-1">Reason for Vacancy *</label>
                <select
                  className="w-full border p-2 rounded-lg"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="">Value</option>
                  <option value="Lease Ended">Lease Ended</option>
                  <option value="Tenant Request">Tenant Request</option>
                  <option value="Eviction">Eviction</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Grace Period *</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg"
                  placeholder="eg 5 days"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-1">Initiate Refund *</label>
              <select
                className="w-full border p-2 rounded-lg"
                value={refund}
                onChange={(e) => setRefund(e.target.value)}
              >
                <option value="">Select your answer</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex items-center text-yellow-600 mb-6">
              <span className="text-xl">⚠️</span>
              <p className="ml-2 text-sm font-medium">
                <strong>Note:</strong> Once confirmed, the tenant will be notified, and the
                vacancy process will begin.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
                onClick={handleCheckOutClick}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleConfirmVacancy}
              >
                Confirm Vacancy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Tenant vacancy confirmed successfully!
            </h2>
            <p className="mb-4">Notification has been sent.</p>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              onClick={handleCloseSuccessPopup}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantProfile;