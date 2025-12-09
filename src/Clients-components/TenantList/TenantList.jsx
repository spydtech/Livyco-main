// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
// import { FaBed, FaComment, FaPhone, FaEye, FaArrowLeft } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import { FiUpload, FiSearch } from "react-icons/fi";
// import { TbAdjustmentsHorizontal } from "react-icons/tb";
// import TenantProfile from "./TenantProfile";
// import FilterModal from "../TenantRequests/FilterModal";
// import ClientNav from "../Client-Navbar/ClientNav";
// // import FilterModal from "../TenantRequests/FilterModal";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";


// const TanantList = () => {
//   const [tenants, setTenants] = useState([
//     { id: 1, name: "Tenant 1", code: "LVC00000010", bed: "201", building: "Building 1" },
//     { id: 2, name: "Tenant 2", code: "LVC00000011", bed: "202", building: "Building 1" },
//     { id: 3, name: "Tenant 3", code: "LVC00000012", bed: "203", building: "Building 2" },
//     { id: 4, name: "Tenant 4", code: "LVC00000013", bed: "204", building: "Building 3" },
//   ]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedTenant, setSelectedTenant] = useState(null);
//   const [showFilter, setShowFilter] = useState(false); // State for filter visibility
//   const [activeTab, setActiveTab] = useState("Building 1");
//   const [selectedBuilding, setSelectedBuilding] = useState("Building 1");

//    const [searchQuery, setSearchQuery] = useState("");
//    const navigate = useNavigate(); // ✅ Define navigate before using it
  
//     // Filter tenants based on search query
//      // Filter tenants based on search query
//      const filteredTenants = tenants.filter(
//       (tenant) =>
//         tenant.building === selectedBuilding &&
//         tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
  
    
//   const addTenant = (newTenant) => {
//     setTenants([...tenants, { ...newTenant, id: tenants.length + 1 }]);
//     setShowPopup(false);
//   };

//   return (
//     <>
//     <ClientNav />
//     <div className="">
//       {selectedTenant ? (
//         <TenantProfile tenant={selectedTenant} onClose={() => setSelectedTenant(null)} />
//       ) : (
//         <>
//           <div className="bg-[#FFDC82] p-5 flex items-center gap-4">
//             <FaArrowLeft
//               className="cursor-pointer"
//               onClick={() => setSelectedTenant(null)}
//             />
//             <h1 className="text-xl font-semibold">Tenant Profile</h1>
//           </div>
//           <div className="flex items-center  mb-4 py-10 p-10">
//             <input
//               type="text"
//               placeholder="Search By name , Room number"
//               className="w-1/2 p-2 border rounded-3xl text-sm bg-[#F8F8FF] focus:outline-none focus:ring-1 focus:ring-gray-400"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//            <svg 
//            onClick={() => setShowFilter(!showFilter)} // Toggle filter visibility
//            width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M17.4974 7.79199L29.1641 7.79199M5.83073 28.2087H10.2057M5.83073 7.79199L11.6641 7.79199M16.0391 28.2087L29.1641 28.2087M24.7891 18.0003H29.1641M5.83073 18.0003L18.9557 18.0003" stroke="#333333" stroke-linecap="round"/>
// <path d="M11.6667 7.79167C11.6667 9.4025 12.9725 10.7083 14.5833 10.7083C16.1942 10.7083 17.5 9.4025 17.5 7.79167C17.5 6.18084 16.1942 4.875 14.5833 4.875C12.9725 4.875 11.6667 6.18084 11.6667 7.79167Z" stroke="#333333" stroke-linecap="round"/>
// <path d="M18.9557 17.9997C18.9557 19.6105 20.2616 20.9163 21.8724 20.9163C23.4832 20.9163 24.7891 19.6105 24.7891 17.9997C24.7891 16.3888 23.4832 15.083 21.8724 15.083C20.2616 15.083 18.9557 16.3888 18.9557 17.9997Z" stroke="#333333" stroke-linecap="round"/>
// <path d="M10.2057 28.2087C10.2057 29.8195 11.5116 31.1253 13.1224 31.1253C14.7332 31.1253 16.0391 29.8195 16.0391 28.2087C16.0391 26.5978 14.7332 25.292 13.1224 25.292C11.5116 25.292 10.2057 26.5978 10.2057 28.2087Z" stroke="#333333" stroke-linecap="round"/>
// </svg>
//            <button
//               className="bg-[#FEE123] px-4 py-2 rounded flex items-center ml-[25%]"
//               onClick={() => navigate("/client/addtenant")}
//             >
//               <IoMdAdd className="mr-2" /> Add New <span className="font-bold">Tenant</span>
//             </button>
//           </div>
         
       
//           <div className="flex items-center justify-center mb-4 py-10 p-10 ">
//           <div className="flex -space-x-2 ">
//           <button
//             className={`px-4 py-2 rounded-l-lg mx-2 ${
//               selectedBuilding === "Building 1" ? "bg-[#0827B2] text-white" : "bg-gray-300"
//             }`}
//             onClick={() => setSelectedBuilding("Building 1")}
//           >
//             Building 1
//           </button>
//           <button
//             className={`px-4 py-2  mx-2 ${
//               selectedBuilding === "Building 2" ? "bg-[#0827B2] text-white" : "bg-gray-300"
//             }`}
//             onClick={() => setSelectedBuilding("Building 2")}
//           >
//             Building 2
//           </button>
//           <button
//             className={`px-4 py-2 rounded-r-lg mx-2 ${
//               selectedBuilding === "Building 3" ? "bg-[#0827B2] text-white" : "bg-gray-300"
//             }`}
//             onClick={() => setSelectedBuilding("Building 3")}
//           >
//             Building 3
//           </button>
//           </div>
//         </div>

//         <div className="mt-5 p-10">
//           <div className="grid grid-cols-5 gap-4 font-semibold">
//             <p>Tenant Name</p>
//             <p>Bed Number</p>
//             <p>Chat / Call</p>
//             <p>View Profile</p>
//             <p>Hide / Unhide</p>
//           </div>

//           {filteredTenants.map((tenant) => (
//             <div key={tenant.id} className="grid grid-cols-5 gap-4 py-2 border-b">
//               <div className="flex items-center">
//                 <img
//                   src="https://via.placeholder.com/40"
//                   alt="Profile"
//                   className="rounded-full w-10 h-10 mr-2"
//                 />
//                 <div>
//                   <p className="font-semibold">{tenant.name}</p>
//                   <p className="text-sm text-gray-500">{tenant.code}</p>
//                 </div>
//               </div>
//               <p className="flex items-center"><FaBed className="mr-2" /> {tenant.bed}</p>
//               <div className="flex space-x-5 mt-2">
//                 <div className="bg-[#FEE123] rounded-full p-2">
//                 <FiMessageCircle className="text-black  text-2xl  " />
//                 </div>
//                 <div className="bg-[#FEE123] rounded-full p-2">
//                 <FiPhone className="text-black text-2xl bg-[#FEE123] rounded-full w-5 h-5" />
//                 </div>
//               </div>
//               <div className="flex items-center text-[#000000] cursor-pointer"
//                onClick={() => navigate(`/client/tenantprofile/${tenant.id}`, { state: tenant })} // ✅ Fixed navigate
//               >
//                 Profile <MdKeyboardDoubleArrowRight className="mt-1 text-xl" />
//               </div>
//               <FaEye className="text-lg cursor-pointer" />
//             </div>
//           ))}
//         </div>
//         </>
//       )}
//       {showPopup && <AddNewTenant setShowPopup={setShowPopup} addTenant={addTenant} />}
//       {showFilter && <FilterModal onClose={() => setShowFilter(false)} />} {/* Render Filter component */}
//     </div>
//     </>
//   );
// };

// // AddNewTenant component remains the same
// export default TanantList; 


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaBed, FaArrowLeft, FaEye } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";
// import TenantProfile from "./TenantProfile";
// import FilterModal from "../TenantRequests/FilterModal";
// import { bookingAPI } from "../PropertyController";

// const TenantList = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBuilding, setSelectedBuilding] = useState("");
//   const [buildings, setBuildings] = useState([]);
//   const [selectedTenant, setSelectedTenant] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   // Fetch all bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await bookingAPI.getBookingsByProperty();
//         const rawBookings = res.data.bookings;

//         // Extract building names (property names)
//         const uniqueBuildings = [
//           ...new Set(rawBookings.map((b) => b.property?.name || "Unknown")),
//         ];

//         // Format bookings
//         const formatted = rawBookings.map((b) => ({
//           id: b.id,
//           userName: b.user?.name || "N/A",
//           phone: b.user?.phone || "N/A",
//           clientId: b.user?.clientId || "N/A",
//           propertyName: b.property?.name || "N/A",
//           propertyLocality: b.property?.locality || "",
//           city: b.property?.city || "",
//           roomNumber: b.roomNumber || "N/A",
//           roomType: b.roomType || "N/A",
//           floor: b.floor ?? "N/A",
//         }));

//         setBookings(formatted);
//         setBuildings(uniqueBuildings);
//         setSelectedBuilding(uniqueBuildings[0]); // Default to first building
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   useEffect(() => {
//   const filtered = bookings.filter(
//     (b) =>
//       b.propertyName === selectedBuilding &&
//       (b.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         b.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()))
//   );
//   setFilteredBookings(filtered);
// }, [searchQuery, selectedBuilding, bookings]);

//   return (
//     <>
//       <ClientNav />
//       <div className="">
//         {selectedTenant ? (
//           <TenantProfile
//             tenant={selectedTenant}
//             onClose={() => setSelectedTenant(null)}
//           />
//         ) : (
//           <>
//             <div className="bg-[#FFDC82] p-5 flex items-center gap-4">
//               <FaArrowLeft className="cursor-pointer" />
//               <h1 className="text-xl font-semibold">Tenant Profile</h1>
//             </div>

//             <div className="flex items-center gap-4 px-10 pt-8">
//               <input
//                 type="text"
//                 placeholder="Search by name or room number"
//                 className="w-1/2 p-2 border rounded-3xl text-sm bg-[#F8F8FF] focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />

//               <svg
//                 onClick={() => setShowFilter(true)}
//                 width="35"
//                 height="36"
//                 viewBox="0 0 35 36"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="cursor-pointer"
//               >
//                 <path d="M17.4974 7.79199L29.1641 7.79199M5.83073 28.2087H10.2057M5.83073 7.79199L11.6641 7.79199M16.0391 28.2087L29.1641 28.2087M24.7891 18.0003H29.1641M5.83073 18.0003L18.9557 18.0003" stroke="#333" strokeLinecap="round" />
//                 <path d="M11.6667 7.79167C11.6667 9.4025 12.9725 10.7083 14.5833 10.7083C16.1942 10.7083 17.5 9.4025 17.5 7.79167C17.5 6.18084 16.1942 4.875 14.5833 4.875C12.9725 4.875 11.6667 6.18084 11.6667 7.79167Z" stroke="#333" strokeLinecap="round" />
//                 <path d="M18.9557 17.9997C18.9557 19.6105 20.2616 20.9163 21.8724 20.9163C23.4832 20.9163 24.7891 19.6105 24.7891 17.9997C24.7891 16.3888 23.4832 15.083 21.8724 15.083C20.2616 15.083 18.9557 16.3888 18.9557 17.9997Z" stroke="#333" strokeLinecap="round" />
//                 <path d="M10.2057 28.2087C10.2057 29.8195 11.5116 31.1253 13.1224 31.1253C14.7332 31.1253 16.0391 29.8195 16.0391 28.2087C16.0391 26.5978 14.7332 25.292 13.1224 25.292C11.5116 25.292 10.2057 26.5978 10.2057 28.2087Z" stroke="#333" strokeLinecap="round" />
//               </svg>

//               <button
//                 className="bg-[#FEE123] px-4 py-2 rounded flex items-center ml-auto"
//                 onClick={() => navigate("/client/addtenant")}
//               >
//                 <IoMdAdd className="mr-2" /> Add New <span className="font-bold">Tenant</span>
//               </button>
//             </div>

//             {/* Building Tabs */}
//             <div className="flex items-center justify-center mt-6 gap-4">
//               {buildings.map((building) => (
//                 <button
//                   key={building}
//                   className={`px-4 py-2 rounded ${
//                     selectedBuilding === building
//                       ? "bg-[#0827B2] text-white"
//                       : "bg-gray-300"
//                   }`}
//                   onClick={() => setSelectedBuilding(building)}
//                 >
//                   {building}
//                 </button>
//               ))}
//             </div>

//             {/* Tenant Grid */}
//             <div className="mt-8 px-10">
//               <div className="grid grid-cols-5 gap-4 font-semibold">
//                 <p>Tenant Name</p>
//                 <p>Room Number</p>
//                 <p>Chat / Call</p>
//                 <p>View Profile</p>
//                 <p>Hide / Unhide</p>
//               </div>

//               {filteredBookings.map((tenant) => (
//                 <div key={tenant.id} className="grid grid-cols-5 gap-4 py-3 border-b">
//                   <div>
//                     <p className="font-semibold">{tenant.userName}</p>
//                     <p className="text-sm text-gray-500">{tenant.clientId}</p>
//                   </div>
//                   <p className="flex items-center">
//                     <FaBed className="mr-2" /> {tenant.roomNumber}
//                   </p>
//                   <div className="flex space-x-4 mt-1">
//                     <div className="bg-[#FEE123] rounded-full p-2">
//                       <FiMessageCircle className="text-black text-xl" />
//                     </div>
//                     <div className="bg-[#FEE123] rounded-full p-2">
//                       <FiPhone className="text-black text-xl" />
//                     </div>
//                   </div>
//                   <div
//                     className="flex items-center text-[#000] cursor-pointer"
//                     onClick={() => navigate(`/client/tenantprofile/${tenant.id}`, { state: tenant })

//                     }
//                   >
//                     Profile <MdKeyboardDoubleArrowRight className="ml-1 text-xl" />
//                   </div>
//                   <FaEye className="text-lg cursor-pointer" />
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {showPopup && <AddNewTenant setShowPopup={setShowPopup} />}
//       {showFilter && (
//   <FilterModal
//     propertyData={bookings} // ✅ CORRECT
//     onApply={(filters) => {
//       // Apply actual filtering logic
//       const filtered = bookings.filter((b) => {
//         const matchBuilding = !filters.selectedBuilding || b.propertyName === filters.selectedBuilding;
//         const matchRoomType = !filters.selectedRoomType || b.roomType === filters.selectedRoomType;
//         const matchFloor = filters.selectedFloor === null || b.floor === filters.selectedFloor;
//         return matchBuilding && matchRoomType && matchFloor;
//       });

//       setFilteredBookings(filtered);
//     }}
//     onClose={() => setShowFilter(false)}
//   />
// )}



//       </div>
//     </>
//   );
// };

// export default TenantList;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaBed, FaArrowLeft, FaEye } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import { FiMessageCircle, FiPhone } from "react-icons/fi";
// import ClientNav from "../Client-Navbar/ClientNav";
// import FilterModal from "../TenantRequests/FilterModal";
// import { bookingAPI, propertyAPI } from "../PropertyController";

// const TenantList = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedTenant, setSelectedTenant] = useState(null);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filters, setFilters] = useState({
//     selectedBuilding: "",
//     selectedRoomType: "",
//     selectedFloor: null,
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const bookingsRes = await bookingAPI.getBookingsByProperty();
//         const propertiesRes = await propertyAPI.getCompletePropertyData();

//         const allProperties = propertiesRes.data.data;
//         setProperties(allProperties);

//         const formattedBookings = bookingsRes.data.bookings.map((b, index) => ({
//           id: b.id || index,
//           userName: b.user?.name || "N/A",
//           phone: b.user?.phone || "N/A",
//           clientId: b.user?.clientId || "N/A",
//           propertyId: b.property?._id || "",
//           propertyName: b.property?.name || "N/A",
//           propertyLocality: b.property?.locality || "",
//           city: b.property?.city || "",
//           roomNumber: b.roomNumber || "N/A",
//           roomType: b.roomType || "N/A",
//           floor: b.floor ?? null,
//         }));

//         setBookings(formattedBookings);

//         if (allProperties.length > 0) {
//           setFilters((prev) => ({
//             ...prev,
//             selectedBuilding: allProperties[0].basicInfo.name,
//           }));
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     let filtered = bookings;

//     if (filters.selectedBuilding) {
//       filtered = filtered.filter((b) => b.propertyName === filters.selectedBuilding);
//     }

//     if (filters.selectedRoomType) {
//       filtered = filtered.filter((b) => b.roomType === filters.selectedRoomType);
//     }

//     if (filters.selectedFloor !== null) {
//       filtered = filtered.filter((b) => b.floor === filters.selectedFloor);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (b) =>
//           b.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           b.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [filters, searchQuery, bookings]);

//   const uniqueBuildings = properties.map((p) => p.basicInfo.name);

//   return (
//     <>
//       <ClientNav />
//       <div>
//         {selectedTenant ? (
//           <TenantProfile tenant={selectedTenant} onClose={() => setSelectedTenant(null)} />
//         ) : (
//           <>
//             <div className="bg-[#FFDC82] p-5 flex items-center gap-4">
//               <FaArrowLeft className="cursor-pointer" />
//               <h1 className="text-xl font-semibold">Tenant Profile</h1>
//             </div>

//             {/* Search + Filter */}
//             <div className="flex items-center gap-4 px-10 pt-8">
//               <input
//                 type="text"
//                 placeholder="Search by name or room number"
//                 className="w-1/2 p-2 border rounded-3xl text-sm bg-[#F8F8FF] focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <svg
//                 onClick={() => setShowFilter(true)}
//                 width="35"
//                 height="36"
//                 viewBox="0 0 35 36"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="cursor-pointer"
//               >
//                 {/* Filter Icon */}
//                 <path d="M17.4974 7.79199L29.1641 7.79199M5.83073 28.2087H10.2057M5.83073 7.79199L11.6641 7.79199M16.0391 28.2087L29.1641 28.2087M24.7891 18.0003H29.1641M5.83073 18.0003L18.9557 18.0003" stroke="#333" strokeLinecap="round" />
//               </svg>

//               <button
//                 className="bg-[#FEE123] px-4 py-2 rounded flex items-center ml-auto"
//                 onClick={() => navigate("/client/addtenant")}
//               >
//                 <IoMdAdd className="mr-2" /> Add New <span className="font-bold">Tenant</span>
//               </button>
//             </div>

//             {/* Building Tabs */}
//             <div className="flex items-center justify-center mt-6 gap-4">
//               {uniqueBuildings.map((building) => (
//                 <button
//                   key={building}
//                   className={`px-4 py-2 rounded ${
//                     filters.selectedBuilding === building
//                       ? "bg-[#0827B2] text-white"
//                       : "bg-gray-300"
//                   }`}
//                   onClick={() =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       selectedBuilding: building,
//                     }))
//                   }
//                 >
//                   {building}
//                 </button>
//               ))}
//             </div>

//             {/* Tenant Table */}
//             <div className="mt-8 px-10">
//               <div className="grid grid-cols-5 gap-4 font-semibold">
//                 <p>Tenant Name</p>
//                 <p>Room Number</p>
//                 <p>Chat / Call</p>
//                 <p>View Profile</p>
//                 <p>Hide / Unhide</p>
//               </div>

//               {filteredBookings.map((tenant) => (
//                 <div key={tenant.id} className="grid grid-cols-5 gap-4 py-3 border-b">
//                   <div>
//                     <p className="font-semibold">{tenant.userName}</p>
//                     <p className="text-sm text-gray-500">{tenant.clientId}</p>
//                   </div>
//                   <p className="flex items-center">
//                     <FaBed className="mr-2" /> {tenant.roomNumber}
//                   </p>
//                   <div className="flex space-x-4 mt-1">
//                     <div className="bg-[#FEE123] rounded-full p-2">
//                       <FiMessageCircle className="text-black text-xl" />
//                     </div>
//                     <div className="bg-[#FEE123] rounded-full p-2">
//                       <FiPhone className="text-black text-xl" />
//                     </div>
//                   </div>
//                   <div
//                     className="flex items-center text-[#000] cursor-pointer"
//                     onClick={() =>
//                       navigate(`/client/tenantprofile/${tenant.id}`, {
//                         state: tenant,
//                       })
//                     }
//                   >
//                     Profile <MdKeyboardDoubleArrowRight className="ml-1 text-xl" />
//                   </div>
//                   <FaEye className="text-lg cursor-pointer" />
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Filter Modal */}
//          {showFilter && (
//         <FilterModal
//           propertyData={properties} // ✅ Use the state variable
//           onApply={(appliedFilters) => setFilters(appliedFilters)}
//           onClose={() => setShowFilter(false)}
//         />

//         )}
//       </div>
//     </>
//   );
// };

// export default TenantList;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaArrowLeft, FaEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import ClientNav from "../Client-Navbar/ClientNav";
import FilterModal from "../TenantRequests/FilterModal";
import { bookingAPI, propertyAPI } from "../PropertyController";

const TenantList = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    selectedBuilding: "",
    selectedRoomType: "",
    selectedFloor: null,
    bookingType: "all",
  });

  const navigate = useNavigate();

  // Function to fetch offline bookings
  const fetchOfflineBookings = async () => {
    try {
      const API_BASE_URL = "http://localhost:5000";
      const response = await fetch(`${API_BASE_URL}/api/offline-bookings`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.log("Offline bookings endpoint not available");
        return [];
      }
      
      const data = await response.json();
      console.log("Offline bookings with populated data:", data); // Debug log
      return data;
    } catch (error) {
      console.log("Offline bookings not available:", error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch online bookings
        const bookingsRes = await bookingAPI.getBookingsByProperty();
        
        // Fetch offline bookings 
        const offlineBookingsData = await fetchOfflineBookings();
        
        // Fetch properties
        const propertiesRes = await propertyAPI.getCompletePropertyData();

        const allProperties = propertiesRes.data.data;
        setProperties(allProperties);

        // Format online bookings
        const formattedOnlineBookings = bookingsRes.data.bookings.map((b, index) => ({
          id: b.id || `online-${index}`,
          userName: b.user?.name || "N/A",
          phone: b.user?.phone || "N/A",
          clientId: b.user?.clientId || "N/A",
          propertyId: b.property?._id || "",
          propertyName: b.property?.name || "N/A",
          propertyLocality: b.property?.locality || "",
          city: b.property?.city || "",
          roomNumber: b.roomNumber || "N/A",
          roomType: b.roomType || "N/A",
          floor: b.floor ?? null,
          bookingType: "online",
          bookingStatus: b.bookingStatus,
        }));

        // Format offline bookings - now with properly populated tenant data
        let formattedOfflineBookings = [];
        
        if (Array.isArray(offlineBookingsData)) {
          formattedOfflineBookings = offlineBookingsData.map((booking, index) => {
            console.log("Processing offline booking with populated data:", booking); 
            
            // Extract room number from roomIdentifier 
            let roomNumber = "N/A";
            if (booking.roomDetails?.roomIdentifier) {
              const roomParts = booking.roomDetails.roomIdentifier.split('-');
              roomNumber = roomParts[0] || booking.roomDetails.roomNumber || "N/A";
            } else {
              roomNumber = booking.roomDetails?.roomNumber || "N/A";
            }
            
            // Get tenant details from populated tenant object
            let tenantName = "N/A";
            let phone = "N/A";
            let clientId = "N/A";
            
            // Check if tenant is populated 
            if (booking.tenant && typeof booking.tenant === 'object' && booking.tenant._id) {
              // Tenant is properly populated
              tenantName = booking.tenant.name || 
                          booking.tenant.fullName || 
                          booking.tenant.userName || 
                          "Tenant";
              phone = booking.tenant.phone || 
                     booking.tenant.contactNumber || 
                     booking.tenant.mobile || 
                     "N/A";
              clientId = booking.tenant.clientId || booking.createdBy || "N/A";
            } else if (booking.createdBy) {
              // Fallback to createdBy if tenant is not populated
              tenantName = `User ${booking.createdBy}`;
              clientId = booking.createdBy;
            }
            
            
            let propertyName = "N/A";
            let propertyLocality = "";
            let city = "";
            
            if (booking.propertyId && typeof booking.propertyId === 'object' && booking.propertyId._id) {
              
              propertyName = booking.propertyId.name || "N/A";
              propertyLocality = booking.propertyId.locality || "";
              city = booking.propertyId.city || "";
            }
            
            return {
              id: booking._id || `offline-${index}`,
              userName: tenantName,
              phone: phone,
              clientId: clientId,
              propertyId: booking.propertyId?._id || "",
              propertyName: propertyName,
              propertyLocality: propertyLocality,
              city: city,
              roomNumber: roomNumber,
              roomType: booking.roomDetails?.sharingType || "N/A",
              floor: booking.roomDetails?.floor ?? null,
              bookingType: "offline",
              originalData: booking,
            };
          });
        }

        
        const allBookings = [...formattedOnlineBookings, ...formattedOfflineBookings];
        console.log("All bookings with proper names:", allBookings); 
        setBookings(allBookings);

        if (allProperties.length > 0) {
          setFilters((prev) => ({
            ...prev,
            selectedBuilding: allProperties[0].basicInfo.name,
          }));
        }
      } catch (err) {
        console.error("Error fetching main data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (filters.selectedBuilding) {
      filtered = filtered.filter((b) => b.propertyName === filters.selectedBuilding);
    }

    if (filters.selectedRoomType) {
      filtered = filtered.filter((b) => b.roomType === filters.selectedRoomType);
    }

    if (filters.selectedFloor !== null) {
      filtered = filtered.filter((b) => b.floor === filters.selectedFloor);
    }

    // Apply booking type filter
    if (filters.bookingType !== "all") {
      filtered = filtered.filter((b) => b.bookingType === filters.bookingType);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (b) =>
          b.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (b.clientId && b.clientId.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredBookings(filtered);
  }, [filters, searchQuery, bookings]);

  const uniqueBuildings = properties.map((p) => p.basicInfo.name);

  return (
    <>
      <ClientNav />
      <div>
        <div className="bg-[#FFDC82] p-5 flex items-center gap-4">
          <FaArrowLeft className="cursor-pointer" />
          <h1 className="text-xl font-semibold">Tenant Profile</h1>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-4 px-10 pt-8">
          <input
            type="text"
            placeholder="Search by name or room number"
            className="w-1/2 p-2 border rounded-3xl text-sm bg-[#F8F8FF] focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            onClick={() => setShowFilter(true)}
            width="35"
            height="36"
            viewBox="0 0 35 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path d="M17.4974 7.79199L29.1641 7.79199M5.83073 28.2087H10.2057M5.83073 7.79199L11.6641 7.79199M16.0391 28.2087L29.1641 28.2087M24.7891 18.0003H29.1641M5.83073 18.0003L18.9557 18.0003" stroke="#333" strokeLinecap="round" />
          </svg>

          <button
            className="bg-[#FEE123] px-4 py-2 rounded flex items-center ml-auto"
            onClick={() => navigate("/client/addtenant")}
          >
            <IoMdAdd className="mr-2" /> Add New <span className="font-bold">Tenant</span>
          </button>
        </div>

        {/* Booking Type Tabs */}
        <div className="flex items-center justify-center mt-6 gap-4">
          <button
            className={`px-6 py-2 rounded ${
              filters.bookingType === "all"
                ? "bg-[#0827B2] text-white"
                : "bg-gray-300"
            }`}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                bookingType: "all",
              }))
            }
          >
            All
          </button>
          <button
            className={`px-6 py-2 rounded ${
              filters.bookingType === "online"
                ? "bg-green-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                bookingType: "online",
              }))
            }
          >
            Online Booking
          </button>
          <button
            className={`px-6 py-2 rounded ${
              filters.bookingType === "offline"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                bookingType: "offline",
              }))
            }
          >
            Offline Booking
          </button>
        </div>

        {/* Building Tabs */}
        <div className="flex items-center justify-center mt-6 gap-4">
          {uniqueBuildings.map((building) => (
            <button
              key={building}
              className={`px-4 py-2 rounded ${
                filters.selectedBuilding === building
                  ? "bg-[#0827B2] text-white"
                  : "bg-gray-300"
              }`}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  selectedBuilding: building,
                }))
              }
            >
              {building}
            </button>
          ))}
        </div>

        {/* Tenant Table */}
        <div className="mt-8 px-10">
          <div className="grid grid-cols-5 gap-4 font-semibold">
            <p>Tenant Name</p>
            <p>Room Number</p>
            <p>Chat / Call</p>
            <p>View Profile</p>
            <p>Hide / Unhide</p>
          </div>

          {filteredBookings.map((tenant) => (
            <div key={tenant.id} className="grid grid-cols-5 gap-4 py-3 border-b">
              <div>
                <p className="font-semibold">{tenant.userName}</p>
                <p className="text-sm text-gray-500">{tenant.clientId}</p>
              </div>
              <p className="flex items-center">
                <FaBed className="mr-2" /> {tenant.roomNumber}
              </p>
              <div className="flex space-x-4 mt-1">
                <div className="bg-[#FEE123] rounded-full p-2">
                  <FiMessageCircle className="text-black text-xl" />
                </div>
                <div className="bg-[#FEE123] rounded-full p-2">
                  <FiPhone className="text-black text-xl" />
                </div>
              </div>
              <div
                className="flex items-center text-[#000] cursor-pointer"
                onClick={() =>
                  navigate(`/client/tenantprofile/${tenant.id}`, {
                    state: {
                      ...tenant,
                      isOfflineBooking: tenant.bookingType === 'offline',
                      originalData: tenant.originalData
                    },
                  })
                }
              >
                Profile <MdKeyboardDoubleArrowRight className="ml-1 text-xl" />
              </div>
              <FaEye className="text-lg cursor-pointer" />
            </div>
          ))}
        </div>

        {/* Filter Modal */}
        {showFilter && (
          <FilterModal
            propertyData={properties}
            onApply={(appliedFilters) => {
              setFilters(prev => ({
                ...prev,
                ...appliedFilters,
                bookingType: prev.bookingType
              }));
            }}
            onClose={() => setShowFilter(false)}
          />
        )}
      </div>
    </>
  );
};

export default TenantList;