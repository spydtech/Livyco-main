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






// AddTenant.jsx
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ClientNav from "../Client-Navbar/ClientNav";
import { userAPI } from "../PropertyController";

const AddTenant = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    location: "",
    phone: "",
    whatsappUpdates: false,
    userType: "student",
    instituteName: "",
    guardianName: "",
    guardianContact: "",
    aadhaarNumber: "",
    aadharPhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { label: "Basic Details", id: "basic" },
    { label: "Contact Information", id: "contact" },
    { label: "KYC Information", id: "kyc" },
    { label: "Allocation", id: "allocation" },
  ];

  // ✅ handle change (file, checkbox, text, radio safe)
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files[0]) {
      if (files[0].size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          aadharPhoto: "File size must be less than 5MB",
        }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const validateTab = (tab) => {
    const newErrors = {};
    if (tab === "basic") {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.location) newErrors.location = "Location is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
    }
    if (tab === "kyc") {
      if (!formData.aadhaarNumber)
        newErrors.aadhaarNumber = "Aadhaar is required";
      else if (!/^\d{12}$/.test(formData.aadhaarNumber))
        newErrors.aadhaarNumber = "Invalid Aadhaar number";
      if (!formData.aadharPhoto)
        newErrors.aadharPhoto = "Aadhaar photo is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Final tenant submit -> go to Allocation page
  const handleNext = async (nextTab) => {
    if (nextTab === "allocation") {
      if (!validateTab(activeTab)) return;

      try {
        setIsSubmitting(true);

        // prepare FormData
        const tenantFormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null && value !== "") {
            tenantFormData.append(key, value);
          }
        });

        // Log FormData being sent
        console.log("FormData being sent:");
        for (let pair of tenantFormData.entries()) {
          console.log(pair[0], ":", pair[1]);
        }

        // ✅ Call API
        const tenantResponse = await userAPI.addTenantByClient(tenantFormData);

        // Log API response
        console.log("Tenant API response:", tenantResponse.data);

        // Determine actual data returned
        // Determine actual data returned
        const { tenant, data, user } = tenantResponse.data;
        const tenantData = tenant || data || user;
        console.log("Tenant data to send to allocation page:", tenantData);

        if (tenantResponse.data.success && tenantData) {
          navigate("/client/property/structure", {
            state: {
              tenantData: tenantData, // pass tenant to allocation page
            },
          });
        } else {
          alert("Tenant added but no data received from API");
        }

      } catch (error) {
        console.error("Tenant submission error:", error);
        alert(error.response?.data?.message || "Failed to add tenant");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (validateTab(activeTab)) {
      setActiveTab(nextTab);
    }
  };

  return (
    <>
      <ClientNav />
      <div className="w-full min-h-screen bg-[#F8F8FF] p-4 md:p-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex overflow-x-auto p-4 space-x-8 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 font-semibold whitespace-nowrap relative ${activeTab === tab.id ? "text-black" : "text-gray-400"
                  }`}
                onClick={() => {
                  if (tab.id === "allocation") {
                    handleNext("allocation");
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
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
            {activeTab === "basic" && (
              <BasicTab
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleNext={handleNext}
              />
            )}
            {activeTab === "contact" && (
              <ContactTab
                formData={formData}
                handleChange={handleChange}
                handleNext={handleNext}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "kyc" && (
              <KYCTab
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleNext={handleNext}
                setActiveTab={setActiveTab}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTenant;

// --- Components ---
const BasicTab = ({ formData, errors, handleChange, handleNext }) => (
  <div className="space-y-6">
    <InputField
      label="Full Name*"
      name="name"
      value={formData.name}
      onChange={handleChange}
      error={errors.name}
    />
    <InputField
      label="Email"
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
    />
    <InputField
      label="Phone Number*"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      error={errors.phone}
    />
    <InputField
      label="Location*"
      name="location"
      value={formData.location}
      onChange={handleChange}
      error={errors.location}
    />
    <GenderField formData={formData} handleChange={handleChange} />
    <InputField
      label="Date of Birth"
      name="dob"
      type="date"
      value={formData.dob}
      onChange={handleChange}
    />

    <button
      onClick={() => handleNext("contact")}
      className="w-full bg-[#FEE123] py-3 rounded-lg font-medium"
    >
      Next
    </button>
  </div>
);

const ContactTab = ({ formData, handleChange, handleNext, setActiveTab }) => (
  <div className="space-y-6">
    <div className="flex items-center">
      <input
        type="checkbox"
        name="whatsappUpdates"
        checked={formData.whatsappUpdates}
        onChange={handleChange}
        className="h-4 w-4"
      />
      <label className="ml-2 text-sm font-medium text-gray-700">
        Get Updates on WhatsApp
      </label>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        User Type
      </label>
      <div className="flex space-x-4">
        {["student", "professional"].map((ut) => (
          <label key={ut} className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value={ut}
              checked={formData.userType === ut}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="capitalize">{ut}</span>
          </label>
        ))}
      </div>
    </div>
    {formData.userType === "student" && (
      <>
        <InputField
          label="Institute Name"
          name="instituteName"
          value={formData.instituteName}
          onChange={handleChange}
        />
        <InputField
          label="Guardian Name"
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
        />
        <InputField
          label="Guardian Contact"
          name="guardianContact"
          value={formData.guardianContact}
          onChange={handleChange}
        />
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
);

const KYCTab = ({
  formData,
  errors,
  handleChange,
  handleNext,
  setActiveTab,
  isSubmitting,
}) => (
  <div className="space-y-6">
    <InputField
      label="Aadhaar Number*"
      name="aadhaarNumber"
      value={formData.aadhaarNumber}
      onChange={handleChange}
      placeholder="12-digit Aadhaar number"
      error={errors.aadhaarNumber}
    />
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Aadhaar Photo*
      </label>
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
      {errors.aadharPhoto && (
        <p className="text-red-500 text-sm mt-1">{errors.aadharPhoto}</p>
      )}
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
        disabled={isSubmitting}
        className="flex-1 bg-[#FEE123] py-2 rounded-lg font-medium disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Next"}
      </button>
    </div>
  </div>
);

// Helpers
const InputField = ({ label, name, type = "text", value, onChange, placeholder = "", error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded ${error ? "border-red-500" : "border-[#BCBCBC]"}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const GenderField = ({ formData, handleChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Gender
    </label>
    <div className="flex space-x-4">
      {["male", "female", "other"].map((g) => (
        <label key={g} className="flex items-center space-x-2">
          <input
            type="radio"
            name="gender"
            value={g}
            checked={formData.gender === g}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span className="capitalize">{g}</span>
        </label>
      ))}
    </div>
  </div>
);
