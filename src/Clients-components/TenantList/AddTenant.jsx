import React,{useState } from 'react'
import ClientNav from '../Client-Navbar/ClientNav';
import { FiUpload, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const AddTenant = () => {
    const [activeTab, setActiveTab] = useState("basic");
    const [basicDetails, setBasicDetails] = useState({ name: "", email: "", gender: "", dob: "" });
    const [contactInfo, setContactInfo] = useState({ mobileNumber: "", whatsappUpdates: false, userType: "student", instituteName: "", guardianName: "", guardianContact: "" });
    const [kycInfo, setKycInfo] = useState({ aadharNumber: "", aadharPhoto: null });
    const [allocationInfo, setAllocationInfo] = useState({ sharingType: "", rent: "", billingCycle: "monthly", roomDetails: "", checkInDate: "" });
  
    const handleSave = () => {
      const newTenant = {
        ...basicDetails,
        ...contactInfo,
        ...kycInfo,
        ...allocationInfo,
        id: Date.now(), // Unique ID for the tenant
      };
      addTenant(newTenant);
    };
  
    const handleFileChange = (event) => {
      setKycInfo({ ...kycInfo, aadharPhoto: event.target.files[0] });
    };
    const tabs = [
        { label: "Basic Details", id: "basic" },
        { label: "Contact Information", id: "contact" },
        { label: "KYC Information", id: "kyc" },
        { label: "Allocation", id: "allocation" },
      ];
    return (
      <>
      <ClientNav />
      <div className=" top-0 left-0 w-full h-full flex items-center justify-center bg-[#F8F8FF]">
        <div className=" w-full max-w-5xl p-10  ">
          {/* <button 
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
            onClick={() => setShowPopup(false)}
          >
            ✖
          </button> */}
  
  <div className="flex space-x-32 p-5 relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className="text-lg font-semibold pb-2 relative"
                onClick={() => setActiveTab(tab.id)}
              >
                <span
                  className={`transition-all ${
                    activeTab === tab.id ? "text-black" : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </span>

                {/* Motion Underline Effect */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-1 bg-[#FEE123] rounded"
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className='mt-5 rounded-3xl  bg-[#FFFFFF] p-5 text-[#333333]'>
  
          {activeTab === "basic" && (
            <div className="mt-5 w-1/2 items-center justify-center ml-48 space-y-10">
              <div className="flex justify-center mb-5">
                <div className="bg-[#FEE123] w-20 h-20 rounded-full p-7">
                  <span className="text-white text-xl">✏️</span>
                </div>
              </div>
              <div>
              <label>Full Name*</label>
              <input
                type="text"
                placeholder="Full Name*"
                className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
                value={basicDetails.name}
                onChange={(e) => setBasicDetails({ ...basicDetails, name: e.target.value })}
              />
              </div>
              <div>
                <label>Email ID*</label>
              <input
                type="email"
                placeholder="Email ID*"
                className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
                value={basicDetails.email}
                onChange={(e) => setBasicDetails({ ...basicDetails, email: e.target.value })}
              />
              </div>
              <div>
              <div className="flex flex-col space-x-5 mb-3 space-y-2">
               
                  <label htmlFor=""> Gender</label>
                  <div className='flex space-x-5'>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={(e) => setBasicDetails({ ...basicDetails, gender: e.target.value })}
                  />
                  <span>Male</span>
               
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={(e) => setBasicDetails({ ...basicDetails, gender: e.target.value })}
                  />
                  <span>Female</span>
                </label>
                </div>
                </div>

              </div>
              <div>
                <label>Date of Birth</label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                className="border border-[#BCBCBC] p-3 w-full mb-5 rounded"
                value={basicDetails.dob}
                onChange={(e) => setBasicDetails({ ...basicDetails, dob: e.target.value })}
              />
              </div>
              <div className='py-5'>
              <button
                className="bg-[#FEE123] px-6 py-3 rounded-xl text-[#333333] w-full"
                onClick={() => setActiveTab("contact")}
              >
                Next
              </button>
              </div>
            </div>
          )}
  
          {activeTab === "contact" && (
            <div className="mt-5 w-1/2 ml-[25%] py-10 text-[#333333] bg-[#FFFFFF]">
                <div>
                    <label>Phone Number</label>
              <input
                type="text"
                placeholder="Mobile Number"
                className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
                value={contactInfo.mobileNumber}
                onChange={(e) => setContactInfo({ ...contactInfo, mobileNumber: e.target.value })}
              />
              </div>
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={contactInfo.whatsappUpdates}
                  onChange={(e) => setContactInfo({ ...contactInfo, whatsappUpdates: e.target.checked })}
                  className="mr-2 w-5 h-5"
                />
                <span>Get Updates on WhatsApp</span>
              </div>
              <div className="flex space-x-5 mb-3">
                <label className="flex items-center space-x-2">
                <span>I'm a</span>
                  <input
                    type="radio"
                    name="userType"
                    value="professional"
                    checked={contactInfo.userType === "professional"}
                    onChange={(e) => setContactInfo({ ...contactInfo, userType: e.target.value })}
                    className="mr-2 w-5 h-5"
                  />
                  <span>Professional</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={contactInfo.userType === "student"}
                    onChange={(e) => setContactInfo({ ...contactInfo, userType: e.target.value })}
                    className="mr-2 w-5 h-5"
                  />
                  <span>Student</span>
                </label>
              </div>
              <div>
                <label>Institute Name</label>
              <input
                type="text"
                placeholder="Institute Name"
                className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
                value={contactInfo.instituteName}
                onChange={(e) => setContactInfo({ ...contactInfo, instituteName: e.target.value })}
              />
              </div>
              <div>
                <label>Guardian Name</label>
              <input
                type="text"
                placeholder="Guardian Name"
                className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
                value={contactInfo.guardianName}
                onChange={(e) => setContactInfo({ ...contactInfo, guardianName: e.target.value })}
              />
              </div>
              <div>
                <label>Guardian Contact Number</label>
              <input
                type="text"
                placeholder="Guardian Contact Number"
                className="border border-[#BCBCBC] p-3 w-full mb-5 rounded"
                value={contactInfo.guardianContact}
                onChange={(e) => setContactInfo({ ...contactInfo, guardianContact: e.target.value })}
              />
              </div>
              <div className='pt-5'> 
              <button
                className="bg-[#FEE123] px-6 py-3 rounded  w-full"
                onClick={() => setActiveTab("kyc")}
              >
                Next
              </button>
              </div>
            </div>
          )}
  
          {activeTab === "kyc" && (
            <div className=" mt-5 w-1/2 ml-[25%] py-10 text-[#333333] bg-[#FFFFFF] h-[600px] items-center justify-center">
                <div>
                    <label>aadhar card Number*</label>
              <input
                type="text"
                placeholder="0000 0000 0000"
                className="border p-3 w-full mb-3 rounded border-[#BCBCBC]"
                value={kycInfo.aadharNumber}
                onChange={(e) => setKycInfo({ ...kycInfo, aadharNumber: e.target.value })}
              />
              </div>
              <div className="flex flex-col items-center mb-3">
                <div>
                <label className='-ml-56'>Upload Aadhar Photo*</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden border-[#BCBCBC] flex"
                  id="aadhar-upload"
                />
                </div>
                <label
                  htmlFor="aadhar-upload"
                  className="w-full p-2 border border-[#BCBCBC] rounded flex items-center justify-between cursor-pointer"
                >
                  <span>{kycInfo.aadharPhoto ? kycInfo.aadharPhoto.name : "Upload Aadhar Photo"}</span>
                  <FiUpload className="text-gray-500" />
                </label>
              </div>
              <button
                className="bg-[#FEE123] px-6 py-3 rounded-lg  w-full"
                onClick={() => setActiveTab("allocation")}
              >
                Next
              </button>
            </div>
          )}
  
          {activeTab === "allocation" && (
            <div className="mt-5 w-1/2 ml-[25%] py-10 text-[#333333] bg-[#FFFFFF] h-[600px] items-center justify-center space-y-5">
              <div>
                <label>Room&Bed Allocation Type*</label>
              <select
                value={allocationInfo.sharingType}
                onChange={(e) => setAllocationInfo({ ...allocationInfo, sharingType: e.target.value })}
                className="border  border-[#BCBCBC] p-3 w-full mb-3 rounded"
              >
                <option value="">Type of sharing</option>
                <option value="single">Single Sharing</option>
                <option value="double">Double Sharing</option>
                <option value="triple">Triple Sharing</option>
              </select>
              </div>
              <div>
                <label>Rent*</label>
              <input
                type="text"
                placeholder="Rent"
                className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
                value={allocationInfo.rent}
                onChange={(e) => setAllocationInfo({ ...allocationInfo, rent: e.target.value })}
              />
              </div>
              <div className="flex space-x-5 mb-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="billingCycle"
                    value="monthly"
                    checked={allocationInfo.billingCycle === "monthly"}
                    onChange={(e) => setAllocationInfo({ ...allocationInfo, billingCycle: e.target.value })}
                  />
                  <span>Per Month</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="billingCycle"
                    value="daily"
                    checked={allocationInfo.billingCycle === "daily"}
                    onChange={(e) => setAllocationInfo({ ...allocationInfo, billingCycle: e.target.value })}
                  />
                  <span>Per Day</span>
                </label>
              </div>
              <div>
                <label>Room & Bed Details*</label>
              <input
                type="text"
                placeholder="Room & Bed Details"
                className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
                value={allocationInfo.roomDetails}
                onChange={(e) => setAllocationInfo({ ...allocationInfo, roomDetails: e.target.value })}
              />
              </div>
              <div>
                <label>Check-in Date*</label>
              <input
                type="text"
                placeholder="Check-in Date (DD/MM/YYYY)"
                className="border border-[#BCBCBC] p-3 w-full mb-5 rounded"
                value={allocationInfo.checkInDate}
                onChange={(e) => setAllocationInfo({ ...allocationInfo, checkInDate: e.target.value })}
              />
              </div>
              <button
                className="bg-[#FEE123] px-6 py-3 rounded-lg  w-full"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
      </>
    );
  };

export default AddTenant