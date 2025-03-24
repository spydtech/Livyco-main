import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { FaBed, FaComment, FaPhone, FaEye, FaArrowLeft } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FiUpload, FiSearch } from "react-icons/fi";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import TenantProfile from "./TenantProfile";
import FilterModal from "../TenantRequests/FilterModal";
import ClientNav from "../Client-Navbar/ClientNav";
// import FilterModal from "../TenantRequests/FilterModal";
import { FiMessageCircle, FiPhone } from "react-icons/fi";


const TanantList = () => {
  const [tenants, setTenants] = useState([
    { id: 1, name: "Tenant 1", code: "LVC00000010", bed: "201", building: "Building 1" },
    { id: 2, name: "Tenant 2", code: "LVC00000011", bed: "202", building: "Building 1" },
    { id: 3, name: "Tenant 3", code: "LVC00000012", bed: "203", building: "Building 2" },
    { id: 4, name: "Tenant 4", code: "LVC00000013", bed: "204", building: "Building 3" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showFilter, setShowFilter] = useState(false); // State for filter visibility
  const [activeTab, setActiveTab] = useState("Building 1");
  const [selectedBuilding, setSelectedBuilding] = useState("Building 1");

   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate(); // ✅ Define navigate before using it
  
    // Filter tenants based on search query
     // Filter tenants based on search query
     const filteredTenants = tenants.filter(
      (tenant) =>
        tenant.building === selectedBuilding &&
        tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    
  const addTenant = (newTenant) => {
    setTenants([...tenants, { ...newTenant, id: tenants.length + 1 }]);
    setShowPopup(false);
  };

  return (
    <>
    <ClientNav />
    <div className="">
      {selectedTenant ? (
        <TenantProfile tenant={selectedTenant} onClose={() => setSelectedTenant(null)} />
      ) : (
        <>
          <div className="bg-[#FFDC82] p-5 flex items-center gap-4">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => setSelectedTenant(null)}
            />
            <h1 className="text-xl font-semibold">Tenant Profile</h1>
          </div>
          <div className="flex items-center  mb-4 py-10 p-10">
            <input
              type="text"
              placeholder="Search By name , Room number"
              className="w-1/2 p-2 border rounded-3xl text-sm bg-[#F8F8FF] focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
           <svg 
           onClick={() => setShowFilter(!showFilter)} // Toggle filter visibility
           width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4974 7.79199L29.1641 7.79199M5.83073 28.2087H10.2057M5.83073 7.79199L11.6641 7.79199M16.0391 28.2087L29.1641 28.2087M24.7891 18.0003H29.1641M5.83073 18.0003L18.9557 18.0003" stroke="#333333" stroke-linecap="round"/>
<path d="M11.6667 7.79167C11.6667 9.4025 12.9725 10.7083 14.5833 10.7083C16.1942 10.7083 17.5 9.4025 17.5 7.79167C17.5 6.18084 16.1942 4.875 14.5833 4.875C12.9725 4.875 11.6667 6.18084 11.6667 7.79167Z" stroke="#333333" stroke-linecap="round"/>
<path d="M18.9557 17.9997C18.9557 19.6105 20.2616 20.9163 21.8724 20.9163C23.4832 20.9163 24.7891 19.6105 24.7891 17.9997C24.7891 16.3888 23.4832 15.083 21.8724 15.083C20.2616 15.083 18.9557 16.3888 18.9557 17.9997Z" stroke="#333333" stroke-linecap="round"/>
<path d="M10.2057 28.2087C10.2057 29.8195 11.5116 31.1253 13.1224 31.1253C14.7332 31.1253 16.0391 29.8195 16.0391 28.2087C16.0391 26.5978 14.7332 25.292 13.1224 25.292C11.5116 25.292 10.2057 26.5978 10.2057 28.2087Z" stroke="#333333" stroke-linecap="round"/>
</svg>
           <button
              className="bg-[#FEE123] px-4 py-2 rounded flex items-center ml-[25%]"
              onClick={() => navigate("/client/addtenant")}
            >
              <IoMdAdd className="mr-2" /> Add New <span className="font-bold">Tenant</span>
            </button>
          </div>
         
       
          <div className="flex items-center justify-center mb-4 py-10 p-10 ">
          <div className="flex -space-x-2 ">
          <button
            className={`px-4 py-2 rounded-l-lg mx-2 ${
              selectedBuilding === "Building 1" ? "bg-[#0827B2] text-white" : "bg-gray-300"
            }`}
            onClick={() => setSelectedBuilding("Building 1")}
          >
            Building 1
          </button>
          <button
            className={`px-4 py-2  mx-2 ${
              selectedBuilding === "Building 2" ? "bg-[#0827B2] text-white" : "bg-gray-300"
            }`}
            onClick={() => setSelectedBuilding("Building 2")}
          >
            Building 2
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg mx-2 ${
              selectedBuilding === "Building 3" ? "bg-[#0827B2] text-white" : "bg-gray-300"
            }`}
            onClick={() => setSelectedBuilding("Building 3")}
          >
            Building 3
          </button>
          </div>
        </div>

        <div className="mt-5 p-10">
          <div className="grid grid-cols-5 gap-4 font-semibold">
            <p>Tenant Name</p>
            <p>Bed Number</p>
            <p>Chat / Call</p>
            <p>View Profile</p>
            <p>Hide / Unhide</p>
          </div>

          {filteredTenants.map((tenant) => (
            <div key={tenant.id} className="grid grid-cols-5 gap-4 py-2 border-b">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="rounded-full w-10 h-10 mr-2"
                />
                <div>
                  <p className="font-semibold">{tenant.name}</p>
                  <p className="text-sm text-gray-500">{tenant.code}</p>
                </div>
              </div>
              <p className="flex items-center"><FaBed className="mr-2" /> {tenant.bed}</p>
              <div className="flex space-x-5 mt-2">
                <div className="bg-[#FEE123] rounded-full p-2">
                <FiMessageCircle className="text-black  text-2xl  " />
                </div>
                <div className="bg-[#FEE123] rounded-full p-2">
                <FiPhone className="text-black text-2xl bg-[#FEE123] rounded-full w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center text-[#000000] cursor-pointer"
               onClick={() => navigate(`/client/tenantprofile/${tenant.id}`, { state: tenant })} // ✅ Fixed navigate
              >
                Profile <MdKeyboardDoubleArrowRight className="mt-1 text-xl" />
              </div>
              <FaEye className="text-lg cursor-pointer" />
            </div>
          ))}
        </div>
        </>
      )}
      {showPopup && <AddNewTenant setShowPopup={setShowPopup} addTenant={addTenant} />}
      {showFilter && <FilterModal onClose={() => setShowFilter(false)} />} {/* Render Filter component */}
    </div>
    </>
  );
};

// AddNewTenant component remains the same
export default TanantList;  

// import React, { useState } from "react";
// import { FaBed, FaComment, FaPhone, FaEye,FaArrowLeft } from "react-icons/fa";
// import { IoMdAdd,  } from "react-icons/io";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import { FiUpload, FiSearch } from "react-icons/fi";
// import { TbAdjustmentsHorizontal } from "react-icons/tb";
// import TenantProfile from "./TenantProfile"; // Import the TenantProfile component

// const TenantDetails = () => {
//   const [tenants, setTenants] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedTenant, setSelectedTenant] = useState(null);

//   const addTenant = (newTenant) => {
//     setTenants([...tenants, { ...newTenant, id: tenants.length + 1 }]);
//     setShowPopup(false);
//   };

//   return (
//     <div className="p-5">
//       {selectedTenant ? (
//         <TenantProfile tenant={selectedTenant} onClose={() => setSelectedTenant(null)} />
//       ) : (
//         <>
//           <div className="bg-yellow-300 p-3 flex items-center gap-4">
//            <FaArrowLeft
//               className="cursor-pointer" // Add cursor pointer for better UX
//               onClick={() => setSelectedTenant(null)} // Reset selectedTenant to null
//             />
//             <h1 className="text-xl font-semibold">Tenant Profile</h1>
//           </div>
//           <div className="flex justify-between items-center mt-5">
//             <input
//               type="text"
//               placeholder="Search By name , Room number"
//               className="border p-2 rounded w-1/2"
//             /> 
// <TbAdjustmentsHorizontal />
//             <button
//               className="bg-yellow-500 px-4 py-2 rounded flex items-center"
//               onClick={() => setShowPopup(true)}
//             >
//               <IoMdAdd className="mr-2" /> Add New <span className="font-bold">Tenant</span>
//             </button>
//           </div>

//           <div className="mt-5">
//             <div className="grid grid-cols-5 gap-4 font-semibold">
//               <p>Tenant Name</p>
//               <p>Bed Number</p>
//               <p>Chat / Call</p>
//               <p>View Profile</p>
//               <p>Hide / Unhide</p>
//             </div>

//             {tenants.map((tenant) => (
//               <div key={tenant.id} className="grid grid-cols-5 gap-4 py-2 border-b">
//                 <div className="flex items-center">
//                   <img
//                     src="https://via.placeholder.com/40"
//                     alt="Profile"
//                     className="rounded-full w-10 h-10 mr-2"
//                   />
//                   <div>
//                     <p className="font-semibold">{tenant.name}</p>
//                     <p className="text-sm text-gray-500">{tenant.code}</p>
//                   </div>
//                 </div>
//                 <p className="flex items-center"><FaBed className="mr-2" /> {tenant.bed}</p>
//                 <div className="flex space-x-8">
//                   <FaComment className="text-yellow-500 text-lg" />
//                   <FaPhone className="text-yellow-500 text-lg" />
//                 </div>
//                 <div className="flex items-center text-blue-500"
//                       onClick={() => setSelectedTenant(tenant)}
//                     >Profile <MdKeyboardDoubleArrowRight className="mt-1 text-xl" /></div>
//                 <FaEye className="text-lg cursor-pointer" />
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//       {showPopup && <AddNewTenant setShowPopup={setShowPopup} addTenant={addTenant} />}
//     </div>
//   );
// };

// const AddNewTenant = ({ setShowPopup, addTenant }) => {
//   const [activeTab, setActiveTab] = useState("basic");
//   const [basicDetails, setBasicDetails] = useState({ name: "", email: "", gender: "", dob: "" });
//   const [contactInfo, setContactInfo] = useState({ mobileNumber: "", whatsappUpdates: false, userType: "student", instituteName: "", guardianName: "", guardianContact: "" });
//   const [kycInfo, setKycInfo] = useState({ aadharNumber: "", aadharPhoto: null });
//   const [allocationInfo, setAllocationInfo] = useState({ sharingType: "", rent: "", billingCycle: "monthly", roomDetails: "", checkInDate: "" });

//   const handleSave = () => {
//     const newTenant = {
//       ...basicDetails,
//       ...contactInfo,
//       ...kycInfo,
//       ...allocationInfo,
//       id: Date.now(), // Unique ID for the tenant
//     };
//     addTenant(newTenant);
//   };

//   const handleFileChange = (event) => {
//     setKycInfo({ ...kycInfo, aadharPhoto: event.target.files[0] });
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white w-full max-w-3xl p-10 rounded-lg shadow-lg relative">
//         <button 
//           className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
//           onClick={() => setShowPopup(false)}
//         >
//           ✖
//         </button>

//         <div className="flex space-x-10 border-b-2 pb-2">
//           {[
//             { label: "Basic Details", id: "basic" },
//             { label: "Contact Information", id: "contact" },
//             { label: "KYC Information", id: "kyc" },
//             { label: "Allocation", id: "allocation" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               className={`text-lg font-semibold pb-2 transition-all ${
//                 activeTab === tab.id
//                   ? "text-black border-b-2 border-blue-500"
//                   : "text-gray-400"
//               }`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {activeTab === "basic" && (
//           <div className="mt-5">
//             <div className="flex justify-center mb-5">
//               <div className="bg-yellow-400 w-3/2 rounded-full p-3">
//                 <span className="text-white text-xl">✏️</span>
//               </div>
//             </div>
//             <input
//               type="text"
//               placeholder="Full Name*"
//               className="border p-3 w-full mb-3 rounded"
//               value={basicDetails.name}
//               onChange={(e) => setBasicDetails({ ...basicDetails, name: e.target.value })}
//             />
//             <input
//               type="email"
//               placeholder="Email ID*"
//               className="border p-3 w-full mb-3 rounded"
//               value={basicDetails.email}
//               onChange={(e) => setBasicDetails({ ...basicDetails, email: e.target.value })}
//             />
//             <div className="flex space-x-5 mb-3">
//               <label className="flex items-center space-x-2">
//                 <label htmlFor=""> Gender</label>
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Male"
//                   onChange={(e) => setBasicDetails({ ...basicDetails, gender: e.target.value })}
//                 />
//                 <span>Male</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Female"
//                   onChange={(e) => setBasicDetails({ ...basicDetails, gender: e.target.value })}
//                 />
//                 <span>Female</span>
//               </label>
//             </div>
//             <input
//               type="text"
//               placeholder="DD/MM/YYYY"
//               className="border p-3 w-full mb-5 rounded"
//               value={basicDetails.dob}
//               onChange={(e) => setBasicDetails({ ...basicDetails, dob: e.target.value })}
//             />
//             <button
//               className="bg-yellow-400 px-6 py-3 rounded font-bold w-full"
//               onClick={() => setActiveTab("contact")}
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {activeTab === "contact" && (
//           <div className="mt-5">
//             <input
//               type="text"
//               placeholder="Mobile Number"
//               className="border p-3 w-full mb-3 rounded"
//               value={contactInfo.mobileNumber}
//               onChange={(e) => setContactInfo({ ...contactInfo, mobileNumber: e.target.value })}
//             />
//             <div className="flex items-center mb-3">
//               <input
//                 type="checkbox"
//                 checked={contactInfo.whatsappUpdates}
//                 onChange={(e) => setContactInfo({ ...contactInfo, whatsappUpdates: e.target.checked })}
//                 className="mr-2"
//               />
//               <span>Get Updates on WhatsApp</span>
//             </div>
//             <div className="flex space-x-5 mb-3">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="professional"
//                   checked={contactInfo.userType === "professional"}
//                   onChange={(e) => setContactInfo({ ...contactInfo, userType: e.target.value })}
//                   className="mr-2"
//                 />
//                 <span>Professional</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="userType"
//                   value="student"
//                   checked={contactInfo.userType === "student"}
//                   onChange={(e) => setContactInfo({ ...contactInfo, userType: e.target.value })}
//                   className="mr-2"
//                 />
//                 <span>Student</span>
//               </label>
//             </div>
//             <input
//               type="text"
//               placeholder="Institute Name"
//               className="border p-3 w-full mb-3 rounded"
//               value={contactInfo.instituteName}
//               onChange={(e) => setContactInfo({ ...contactInfo, instituteName: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Guardian Name"
//               className="border p-3 w-full mb-3 rounded"
//               value={contactInfo.guardianName}
//               onChange={(e) => setContactInfo({ ...contactInfo, guardianName: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Guardian Contact Number"
//               className="border p-3 w-full mb-5 rounded"
//               value={contactInfo.guardianContact}
//               onChange={(e) => setContactInfo({ ...contactInfo, guardianContact: e.target.value })}
//             />
//             <button
//               className="bg-yellow-400 px-6 py-3 rounded font-bold w-full"
//               onClick={() => setActiveTab("kyc")}
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {activeTab === "kyc" && (
//           <div className="mt-5">
//             <input
//               type="text"
//               placeholder="Aadhar Card Number"
//               className="border p-3 w-full mb-3 rounded"
//               value={kycInfo.aadharNumber}
//               onChange={(e) => setKycInfo({ ...kycInfo, aadharNumber: e.target.value })}
//             />
//             <div className="flex items-center mb-3">
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="aadhar-upload"
//               />
//               <label
//                 htmlFor="aadhar-upload"
//                 className="w-full p-2 border border-gray-300 rounded flex items-center justify-between cursor-pointer"
//               >
//                 <span>{kycInfo.aadharPhoto ? kycInfo.aadharPhoto.name : "Upload Aadhar Photo"}</span>
//                 <FiUpload className="text-gray-500" />
//               </label>
//             </div>
//             <button
//               className="bg-yellow-400 px-6 py-3 rounded font-bold w-full"
//               onClick={() => setActiveTab("allocation")}
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {activeTab === "allocation" && (
//           <div className="mt-5">
//             <select
//               value={allocationInfo.sharingType}
//               onChange={(e) => setAllocationInfo({ ...allocationInfo, sharingType: e.target.value })}
//               className="border p-3 w-full mb-3 rounded"
//             >
//               <option value="">Type of sharing</option>
//               <option value="single">Single Sharing</option>
//               <option value="double">Double Sharing</option>
//               <option value="triple">Triple Sharing</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Rent"
//               className="border p-3 w-full mb-3 rounded"
//               value={allocationInfo.rent}
//               onChange={(e) => setAllocationInfo({ ...allocationInfo, rent: e.target.value })}
//             />
//             <div className="flex space-x-5 mb-3">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="billingCycle"
//                   value="monthly"
//                   checked={allocationInfo.billingCycle === "monthly"}
//                   onChange={(e) => setAllocationInfo({ ...allocationInfo, billingCycle: e.target.value })}
//                 />
//                 <span>Per Month</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="billingCycle"
//                   value="daily"
//                   checked={allocationInfo.billingCycle === "daily"}
//                   onChange={(e) => setAllocationInfo({ ...allocationInfo, billingCycle: e.target.value })}
//                 />
//                 <span>Per Day</span>
//               </label>
//             </div>
//             <input
//               type="text"
//               placeholder="Room & Bed Details"
//               className="border p-3 w-full mb-3 rounded"
//               value={allocationInfo.roomDetails}
//               onChange={(e) => setAllocationInfo({ ...allocationInfo, roomDetails: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Check-in Date (DD/MM/YYYY)"
//               className="border p-3 w-full mb-5 rounded"
//               value={allocationInfo.checkInDate}
//               onChange={(e) => setAllocationInfo({ ...allocationInfo, checkInDate: e.target.value })}
//             />
//             <button
//               className="bg-yellow-400 px-6 py-3 rounded font-bold w-full"
//               onClick={handleSave}
//             >
//               Save
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TenantDetails;