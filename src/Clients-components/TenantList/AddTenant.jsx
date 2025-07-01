// import React,{useState } from 'react'
// import ClientNav from '../Client-Navbar/ClientNav';
// import { FiUpload, FiSearch } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { userAPI } from '../PropertyController';

// const AddTenant = () => {
//     const [activeTab, setActiveTab] = useState("basic");
//     const [basicDetails, setBasicDetails] = useState({ name: "", email: "", gender: "", dob: "" });
//     const [contactInfo, setContactInfo] = useState({ mobileNumber: "", whatsappUpdates: false, userType: "student", instituteName: "", guardianName: "", guardianContact: "" });
//     const [kycInfo, setKycInfo] = useState({ aadharNumber: "", aadharPhoto: null });
//     const [allocationInfo, setAllocationInfo] = useState({ sharingType: "", rent: "", billingCycle: "monthly", roomDetails: "", checkInDate: "" });
  
//     const handleSave = () => {
//       const newTenant = {
//         ...basicDetails,
//         ...contactInfo,
//         ...kycInfo,
//         ...allocationInfo,
//         id: Date.now(), // Unique ID for the tenant
//       };
//       addTenant(newTenant);
//     };
  
//     const handleFileChange = (event) => {
//       setKycInfo({ ...kycInfo, aadharPhoto: event.target.files[0] });
//     };
//     const tabs = [
//         { label: "Basic Details", id: "basic" },
//         { label: "Contact Information", id: "contact" },
//         { label: "KYC Information", id: "kyc" },
//         { label: "Allocation", id: "allocation" },
//       ];
//     return (
//       <>
//       <ClientNav />
//       <div className=" top-0 left-0 w-full h-full flex items-center justify-center bg-[#F8F8FF]">
//         <div className=" w-full max-w-5xl p-10  ">
//           {/* <button 
//             className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
//             onClick={() => setShowPopup(false)}
//           >
//             ✖
//           </button> */}
  
//   <div className="flex space-x-32 p-5 relative">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 className="text-lg font-semibold pb-2 relative"
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 <span
//                   className={`transition-all ${
//                     activeTab === tab.id ? "text-black" : "text-gray-400"
//                   }`}
//                 >
//                   {tab.label}
//                 </span>

//                 {/* Motion Underline Effect */}
//                 {activeTab === tab.id && (
//                   <motion.div
//                     layoutId="underline"
//                     className="absolute left-0 bottom-0 w-full h-1 bg-[#FEE123] rounded"
//                     transition={{ type: "spring", stiffness: 100 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>
//           <div className='mt-5 rounded-3xl  bg-[#FFFFFF] p-5 text-[#333333]'>
  
//           {activeTab === "basic" && (
//             <div className="mt-5 w-1/2 items-center justify-center ml-48 space-y-10">
//               <div className="flex justify-center mb-5">
//                 <div className="bg-[#FEE123] w-20 h-20 rounded-full p-7">
//                   <span className="text-white text-xl">✏️</span>
//                 </div>
//               </div>
//               <div>
//               <label>Full Name*</label>
//               <input
//                 type="text"
//                 placeholder="Full Name*"
//                 className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
//                 value={basicDetails.name}
//                 onChange={(e) => setBasicDetails({ ...basicDetails, name: e.target.value })}
//               />
//               </div>
//               <div>
//                 <label>Email ID*</label>
//               <input
//                 type="email"
//                 placeholder="Email ID*"
//                 className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
//                 value={basicDetails.email}
//                 onChange={(e) => setBasicDetails({ ...basicDetails, email: e.target.value })}
//               />
//               </div>
//               <div>
//               <div className="flex flex-col space-x-5 mb-3 space-y-2">
               
//                   <label htmlFor=""> Gender</label>
//                   <div className='flex space-x-5'>
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="Male"
//                     onChange={(e) => setBasicDetails({ ...basicDetails, gender: e.target.value })}
//                   />
//                   <span>Male</span>
               
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="Female"
//                     onChange={(e) => setBasicDetails({ ...basicDetails, gender: e.target.value })}
//                   />
//                   <span>Female</span>
//                 </label>
//                 </div>
//                 </div>

//               </div>
//               <div>
//                 <label>Date of Birth</label>
//               <input
//                 type="text"
//                 placeholder="DD/MM/YYYY"
//                 className="border border-[#BCBCBC] p-3 w-full mb-5 rounded"
//                 value={basicDetails.dob}
//                 onChange={(e) => setBasicDetails({ ...basicDetails, dob: e.target.value })}
//               />
//               </div>
//               <div className='py-5'>
//               <button
//                 className="bg-[#FEE123] px-6 py-3 rounded-xl text-[#333333] w-full"
//                 onClick={() => setActiveTab("contact")}
//               >
//                 Next
//               </button>
//               </div>
//             </div>
//           )}
  
//           {activeTab === "contact" && (
//             <div className="mt-5 w-1/2 ml-[25%] py-10 text-[#333333] bg-[#FFFFFF]">
//                 <div>
//                     <label>Phone Number</label>
//               <input
//                 type="text"
//                 placeholder="Mobile Number"
//                 className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
//                 value={contactInfo.mobileNumber}
//                 onChange={(e) => setContactInfo({ ...contactInfo, mobileNumber: e.target.value })}
//               />
//               </div>
//               <div className="flex items-center mb-3">
//                 <input
//                   type="checkbox"
//                   checked={contactInfo.whatsappUpdates}
//                   onChange={(e) => setContactInfo({ ...contactInfo, whatsappUpdates: e.target.checked })}
//                   className="mr-2 w-5 h-5"
//                 />
//                 <span>Get Updates on WhatsApp</span>
//               </div>
//               <div className="flex space-x-5 mb-3">
//                 <label className="flex items-center space-x-2">
//                 <span>I'm a</span>
//                   <input
//                     type="radio"
//                     name="userType"
//                     value="professional"
//                     checked={contactInfo.userType === "professional"}
//                     onChange={(e) => setContactInfo({ ...contactInfo, userType: e.target.value })}
//                     className="mr-2 w-5 h-5"
//                   />
//                   <span>Professional</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="userType"
//                     value="student"
//                     checked={contactInfo.userType === "student"}
//                     onChange={(e) => setContactInfo({ ...contactInfo, userType: e.target.value })}
//                     className="mr-2 w-5 h-5"
//                   />
//                   <span>Student</span>
//                 </label>
//               </div>
//               <div>
//                 <label>Institute Name</label>
//               <input
//                 type="text"
//                 placeholder="Institute Name"
//                 className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
//                 value={contactInfo.instituteName}
//                 onChange={(e) => setContactInfo({ ...contactInfo, instituteName: e.target.value })}
//               />
//               </div>
//               <div>
//                 <label>Guardian Name</label>
//               <input
//                 type="text"
//                 placeholder="Guardian Name"
//                 className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
//                 value={contactInfo.guardianName}
//                 onChange={(e) => setContactInfo({ ...contactInfo, guardianName: e.target.value })}
//               />
//               </div>
//               <div>
//                 <label>Guardian Contact Number</label>
//               <input
//                 type="text"
//                 placeholder="Guardian Contact Number"
//                 className="border border-[#BCBCBC] p-3 w-full mb-5 rounded"
//                 value={contactInfo.guardianContact}
//                 onChange={(e) => setContactInfo({ ...contactInfo, guardianContact: e.target.value })}
//               />
//               </div>
//               <div className='pt-5'> 
//               <button
//                 className="bg-[#FEE123] px-6 py-3 rounded  w-full"
//                 onClick={() => setActiveTab("kyc")}
//               >
//                 Next
//               </button>
//               </div>
//             </div>
//           )}
  
//           {activeTab === "kyc" && (
//             <div className=" mt-5 w-1/2 ml-[25%] py-10 text-[#333333] bg-[#FFFFFF] h-[600px] items-center justify-center">
//                 <div>
//                     <label>aadhar card Number*</label>
//               <input
//                 type="text"
//                 placeholder="0000 0000 0000"
//                 className="border p-3 w-full mb-3 rounded border-[#BCBCBC]"
//                 value={kycInfo.aadharNumber}
//                 onChange={(e) => setKycInfo({ ...kycInfo, aadharNumber: e.target.value })}
//               />
//               </div>
//               <div className="flex flex-col items-center mb-3">
//                 <div>
//                 <label className='-ml-56'>Upload Aadhar Photo*</label>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="hidden border-[#BCBCBC] flex"
//                   id="aadhar-upload"
//                 />
//                 </div>
//                 <label
//                   htmlFor="aadhar-upload"
//                   className="w-full p-2 border border-[#BCBCBC] rounded flex items-center justify-between cursor-pointer"
//                 >
//                   <span>{kycInfo.aadharPhoto ? kycInfo.aadharPhoto.name : "Upload Aadhar Photo"}</span>
//                   <FiUpload className="text-gray-500" />
//                 </label>
//               </div>
//               <button
//                 className="bg-[#FEE123] px-6 py-3 rounded-lg  w-full"
//                 onClick={() => setActiveTab("allocation")}
//               >
//                 Next
//               </button>
//             </div>
//           )}
  
//           {activeTab === "allocation" && (
//             <div className="mt-5 w-1/2 ml-[25%] py-10 text-[#333333] bg-[#FFFFFF] h-[600px] items-center justify-center space-y-5">
//               <div>
//                 <label>Room&Bed Allocation Type*</label>
//               <select
//                 value={allocationInfo.sharingType}
//                 onChange={(e) => setAllocationInfo({ ...allocationInfo, sharingType: e.target.value })}
//                 className="border  border-[#BCBCBC] p-3 w-full mb-3 rounded"
//               >
//                 <option value="">Type of sharing</option>
//                 <option value="single">Single Sharing</option>
//                 <option value="double">Double Sharing</option>
//                 <option value="triple">Triple Sharing</option>
//               </select>
//               </div>
//               <div>
//                 <label>Rent*</label>
//               <input
//                 type="text"
//                 placeholder="Rent"
//                 className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
//                 value={allocationInfo.rent}
//                 onChange={(e) => setAllocationInfo({ ...allocationInfo, rent: e.target.value })}
//               />
//               </div>
//               <div className="flex space-x-5 mb-3">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="billingCycle"
//                     value="monthly"
//                     checked={allocationInfo.billingCycle === "monthly"}
//                     onChange={(e) => setAllocationInfo({ ...allocationInfo, billingCycle: e.target.value })}
//                   />
//                   <span>Per Month</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="billingCycle"
//                     value="daily"
//                     checked={allocationInfo.billingCycle === "daily"}
//                     onChange={(e) => setAllocationInfo({ ...allocationInfo, billingCycle: e.target.value })}
//                   />
//                   <span>Per Day</span>
//                 </label>
//               </div>
//               <div>
//                 <label>Room & Bed Details*</label>
//               <input
//                 type="text"
//                 placeholder="Room & Bed Details"
//                 className="border border-[#BCBCBC] p-3 w-full mb-3 rounded"
//                 value={allocationInfo.roomDetails}
//                 onChange={(e) => setAllocationInfo({ ...allocationInfo, roomDetails: e.target.value })}
//               />
//               </div>
//               <div>
//                 <label>Check-in Date*</label>
//               <input
//                 type="text"
//                 placeholder="Check-in Date (DD/MM/YYYY)"
//                 className="border border-[#BCBCBC] p-3 w-full mb-5 rounded"
//                 value={allocationInfo.checkInDate}
//                 onChange={(e) => setAllocationInfo({ ...allocationInfo, checkInDate: e.target.value })}
//               />
//               </div>
//               <button
//                 className="bg-[#FEE123] px-6 py-3 rounded-lg  w-full"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </div>
//           )}
//           </div>
//         </div>
//       </div>
//       </>
//     );
//   };

// export default AddTenant






import React, { useState } from 'react';
import { FiUpload } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClientNav from '../Client-Navbar/ClientNav';
import { userAPI } from '../PropertyController';

const AddTenant = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    // Basic Details
    name: "",
    email: "",
    gender: "",
    dob: "",
    location: "",
    
    // Contact Info
    phone: "",
    whatsappUpdates: false,
    userType: "student",
    instituteName: "",
    guardianName: "",
    guardianContact: "",
    
    // KYC
    aadhaarNumber: "",
    aadharPhoto: null,
    
    // Allocation
    sharingType: "",
    rent: "",
    billingCycle: "monthly",
    roomDetails: "",
    checkInDate: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { label: "Basic Details", id: "basic" },
    { label: "Contact Information", id: "contact" },
    { label: "KYC Information", id: "kyc" },
    { label: "Allocation", id: "allocation" },
  ];

  const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;
  
  if (type === 'file' && files[0]) {
    if (files[0].size > 5 * 1024 * 1024) { // 5MB
      setErrors(prev => ({
        ...prev,
        aadharPhoto: 'File size must be less than 5MB'
      }));
      return;
    }
  }
  
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : 
            type === 'file' ? files[0] : value
  }));
};

  const validateTab = (tab) => {
    const newErrors = {};
    
    if (tab === 'basic') {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.location) newErrors.location = 'Location is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    }
    
    if (tab === 'kyc') {
      if (!formData.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar is required';
      else if (!/^\d{12}$/.test(formData.aadhaarNumber))
        newErrors.aadhaarNumber = 'Invalid Aadhaar number';
      if (!formData.aadharPhoto) newErrors.aadharPhoto = 'Aadhar photo is required';
    }
    
    if (tab === 'allocation') {
      if (!formData.sharingType) newErrors.sharingType = 'Sharing type is required';
      if (!formData.rent) newErrors.rent = 'Rent is required';
      if (!formData.roomDetails) newErrors.roomDetails = 'Room details are required';
      if (!formData.checkInDate) newErrors.checkInDate = 'Check-in date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (nextTab) => {
    if (validateTab(activeTab)) {
      setActiveTab(nextTab);
    }
  };

 const handleSubmit = async () => {
  if (!validateTab('allocation')) return;
  
  try {
    setIsSubmitting(true);
    
    // Step 1: Create tenant
    const tenantFormData = new FormData();
    tenantFormData.append('name', formData.name);
    tenantFormData.append('email', formData.email);
    tenantFormData.append('phone', formData.phone);
    tenantFormData.append('location', formData.location);
    tenantFormData.append('gender', formData.gender);
    if (formData.dob) tenantFormData.append('dob', formData.dob);
    tenantFormData.append('aadhaarNumber', formData.aadhaarNumber);
    tenantFormData.append('whatsappUpdates', formData.whatsappUpdates);
    tenantFormData.append('userType', formData.userType);
    if (formData.instituteName) tenantFormData.append('instituteName', formData.instituteName);
    if (formData.guardianName) tenantFormData.append('guardianName', formData.guardianName);
    if (formData.guardianContact) tenantFormData.append('guardianContact', formData.guardianContact);
    
    // Make sure the file is properly appended
    if (formData.aadharPhoto) {
      tenantFormData.append('aadharPhoto', formData.aadharPhoto);
    }

    console.log('Submitting tenant data...'); // Debug log
    
    // Create tenant using API
    const tenantResponse = await userAPI.addTenantByClient(tenantFormData);
    console.log('Tenant response:', tenantResponse); // Debug log

    if (tenantResponse.data.success) {
      // Step 2: Allocate room
      const allocationData = {
        userId: tenantResponse.data.tenant.id,
        sharingType: formData.sharingType,
        rent: formData.rent,
        billingCycle: formData.billingCycle,
        roomDetails: formData.roomDetails,
        checkInDate: formData.checkInDate
      };

      console.log('Submitting allocation data...', allocationData); // Debug log
      
      const allocationResponse = await userAPI.allocateRoom(allocationData);
      console.log('Allocation response:', allocationResponse); // Debug log

      if (allocationResponse.data.success) {
        navigate('/client/tenants', { 
          state: { 
            success: 'Tenant added and room allocated successfully',
            newTenant: tenantResponse.data.tenant
          } 
        });
      }
    }
  } catch (error) {
    console.error('Submission error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      alert(error.response.data.message || 'Failed to complete process');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
      alert('No response received from server');
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
      alert('Error setting up request');
    }
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      <ClientNav />
      <div className="w-full min-h-screen bg-[#F8F8FF] p-4 md:p-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="flex overflow-x-auto p-4 space-x-8 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 font-semibold whitespace-nowrap relative ${activeTab === tab.id ? 'text-black' : 'text-gray-400'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-1 bg-[#FEE123]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-10">
            {/* Basic Details Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FEE123] rounded-full">
                    <span className="text-2xl">✏️</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded ${errors.name ? 'border-red-500' : 'border-[#BCBCBC]'}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#BCBCBC] rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded ${errors.phone ? 'border-red-500' : 'border-[#BCBCBC]'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded ${errors.location ? 'border-red-500' : 'border-[#BCBCBC]'}`}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <span>Female</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === "other"}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <span>Other</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#BCBCBC] rounded"
                  />
                </div>
                
                <button
                  onClick={() => handleNext("contact")}
                  className="w-full bg-[#FEE123] py-3 rounded-lg font-medium"
                >
                  Next
                </button>
              </div>
            )}

            {/* Contact Information Tab */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="whatsappUpdates"
                    checked={formData.whatsappUpdates}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">Get Updates on WhatsApp</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="userType"
                        value="student"
                        checked={formData.userType === "student"}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <span>Student</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="userType"
                        value="professional"
                        checked={formData.userType === "professional"}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <span>Professional</span>
                    </label>
                  </div>
                </div>
                
                {formData.userType === "student" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
                      <input
                        type="text"
                        name="instituteName"
                        value={formData.instituteName}
                        onChange={handleChange}
                        className="w-full p-3 border border-[#BCBCBC] rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                        className="w-full p-3 border border-[#BCBCBC] rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Contact</label>
                      <input
                        type="tel"
                        name="guardianContact"
                        value={formData.guardianContact}
                        onChange={handleChange}
                        className="w-full p-3 border border-[#BCBCBC] rounded"
                      />
                    </div>
                  </>
                )}
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setActiveTab("basic")}
                    className="flex-1 py-2 border border-gray-300 rounded-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleNext("kyc")}
                    className="flex-1 bg-[#FEE123] py-2 rounded-lg font-medium"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* KYC Information Tab */}
            {activeTab === "kyc" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number*</label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleChange}
                    placeholder="12-digit Aadhaar number"
                    className={`w-full p-3 border rounded ${errors.aadhaarNumber ? 'border-red-500' : 'border-[#BCBCBC]'}`}
                  />
                  {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Photo*</label>
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    {formData.aadharPhoto ? (
                      <div className="text-center">
                        <p className="font-medium">{formData.aadharPhoto.name}</p>
                        <p className="text-sm text-gray-500">Click to change</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Upload Aadhaar Photo</span>
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="aadharPhoto"
                      onChange={handleChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  {errors.aadharPhoto && <p className="text-red-500 text-sm mt-1">{errors.aadharPhoto}</p>}
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="flex-1 py-2 border border-gray-300 rounded-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleNext("allocation")}
                    className="flex-1 bg-[#FEE123] py-2 rounded-lg font-medium"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Allocation Tab */}
            {activeTab === "allocation" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Allocation Type*</label>
                  <select
                    name="sharingType"
                    value={formData.sharingType}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded ${errors.sharingType ? 'border-red-500' : 'border-[#BCBCBC]'}`}
                  >
                    <option value="">Select sharing type</option>
                    <option value="single">Single Sharing</option>
                    <option value="double">Double Sharing</option>
                    <option value="triple">Triple Sharing</option>
                    <option value="dormitory">Dormitory</option>
                  </select>
                  {errors.sharingType && <p className="text-red-500 text-sm mt-1">{errors.sharingType}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rent*</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3">₹</span>
                    <input
                      type="number"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      className={`w-full p-3 pl-8 border rounded ${errors.rent ? 'border-red-500' : 'border-[#BCBCBC]'}`}
                    />
                  </div>
                  {errors.rent && <p className="text-red-500 text-sm mt-1">{errors.rent}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Billing Cycle*</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="billingCycle"
                        value="monthly"
                        checked={formData.billingCycle === "monthly"}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <span>Monthly</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="billingCycle"
                        value="daily"
                        checked={formData.billingCycle === "daily"}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <span>Daily</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room & Bed Details*</label>
                  <input
                    type="text"
                    name="roomDetails"
                    value={formData.roomDetails}
                    onChange={handleChange}
                    placeholder="e.g., Room 101, Bed 2"
                    className={`w-full p-3 border rounded ${errors.roomDetails ? 'border-red-500' : 'border-[#BCBCBC]'}`}
                  />
                  {errors.roomDetails && <p className="text-red-500 text-sm mt-1">{errors.roomDetails}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date*</label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded ${errors.checkInDate ? 'border-red-500' : 'border-[#BCBCBC]'}`}
                  />
                  {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setActiveTab("kyc")}
                    className="flex-1 py-2 border border-gray-300 rounded-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-[#FEE123] py-2 rounded-lg font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Tenant'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTenant;