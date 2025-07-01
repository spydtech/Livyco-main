// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import {
//     Wifi,
//     Dumbbell,
//     Car,
//     Shield,
//     Snowflake,
//     Bolt,
//     Utensils,
//     UserCheck,
//     Flame,
//     Shirt,
//     Building2,
//     Sun,
//     Refrigerator
// } from "lucide-react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Dialog } from "@headlessui/react";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get the property data passed from the previous component
//   const [property, setProperty] = useState(location.state?.property || null);
//   // State to manage loading and error
//   // If property is not passed, we will fetch it using the ID
//   // Initially set loading to true if property is not available

//   const [isLoading, setIsLoading] = useState(!location.state?.property);
//   const [error, setError] = useState(null);


//   // If property wasn't passed via state, fetch it using the ID
//   useEffect(() => {
//   if (!property && id) {
//     const fetchProperty = async () => {
//       try {
//         setIsLoading(true);
//         const response = await propertyAPI.getPropertyById(id);
//         if (response.data.success) {
//           // Store the entire response.data object in state
//           setProperty(response.data);
//         }
//         setIsLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//       }
//     };
//     fetchProperty();
//   }
// }, [id, property]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalType, setModalType] = useState(null);

//   // Default images if none are provided
//   const images = property?.images || [
//     "/images/property1.jpg",
//     "/images/property2.jpg",
//     "/images/property3.jpg",
//     "/images/property4.jpg",
//     "/images/property5.jpg",
//   ];

//   if (isLoading) {
//     return (
//       <div className="p-6 bg-[#FFFFFF] min-h-screen flex justify-center items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-[#FFFFFF] min-h-screen">
//         <div className="bg-red-100 p-4 rounded-lg mb-6">
//           <button onClick={() => navigate(-1)} className="flex items-center text-gray-700">
//             <FaArrowLeft className="mr-2" /> Back
//           </button>
//         </div>
//         <div className="bg-white p-8 rounded-lg text-center">
//           <p className="text-red-500">Error: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="p-6 bg-[#FFFFFF] min-h-screen">
//         <div className="bg-blue-100 p-4 rounded-lg mb-6">
//           <button onClick={() => navigate(-1)} className="flex items-center text-gray-700">
//             <FaArrowLeft className="mr-2" /> Back
//           </button>
//         </div>
//         <div className="bg-white p-8 rounded-lg text-center">
//           <p>Property not found</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-[#FFFFFF] min-h-screen">
//       {/* Back Button */}
//       <div className="bg-blue-100 p-4 rounded-lg mb-6">
//         <button onClick={() => navigate(-1)} className="flex items-center text-gray-700">
//           <FaArrowLeft className="mr-2" /> Back
//         </button>
//       </div>

//       {/* Property Details */}
//       <div className="bg-white p-8 rounded-lg">
//         <h2 className="text-3xl font-semibold mb-6">Property Details</h2>

//         {/* Property Info */}
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="text-gray-600">Property Name</label>
//             <input 
//               className="w-full border p-2 rounded" 
//               value={property.property || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600">Location</label>
//             <input 
//               className="w-full border p-2 rounded" 
//               value={property.location || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600">Client ID</label>
//             <input 
//               className="w-full border p-2 rounded" 
//               value={property.clientId || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600">Owner Name</label>
//             <input 
//               className="w-full border p-2 rounded" 
//               value={property.name || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600">Contact Number</label>
//             <input 
//               className="w-full border p-2 rounded" 
//               value={property.phone || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600">Status</label>
//             <input 
//               className="w-full border p-2 rounded" 
//               value={property.status || "N/A"} 
//               readOnly 
//             />
//           </div>
//         </div>

//      {/* Description */}
// <div className="mb-6">
//   <label className="text-gray-600">Description</label>
//   <textarea 
//     className="w-full border p-2 rounded h-24" 
//     readOnly
//     value={property.description || "No description available"}
//   />
// </div>

// {/* Pricing & Amenities */}
// {/* Pricing & Amenities */}
// {/* Pricing & Amenities */}
// <div className="grid grid-cols-2 gap-10 bg-white p-8">
//   {/* Pricing Section */}
//   <div>
//     <h3 className="text-xl font-semibold mb-4">Pricing</h3>
//     <div className="grid grid-cols-3 gap-4">
//       <span className="font-medium text-gray-600">Sharing Type</span>
//       <span className="font-medium text-gray-600">Advance</span>
//       <span className="font-medium text-gray-600">Monthly Fee</span>

//       {property?.rooms?.roomTypes?.length > 0 ? (
//         property.rooms.roomTypes.map((room, index) => (
//           <React.Fragment key={index}>
//             <span className="text-gray-700">{room.label || "N/A"}</span>
//             <input 
//               className="border p-2 rounded text-gray-700" 
//               value={`₹ ${room.deposit || "0"}`} 
//               readOnly 
//             />
//             <input 
//               className="border p-2 rounded text-gray-700" 
//               value={`₹ ${room.price || "0"}`} 
//               readOnly 
//             />
//           </React.Fragment>
//         ))
//       ) : (
//         ["Single", "Double", "Triple", "Four", "Five", "Six"].map((type) => (
//           <React.Fragment key={type}>
//             <span className="text-gray-700">{type} Sharing</span>
//             <input className="border p-2 rounded text-gray-700" value="₹ 0" readOnly />
//             <input className="border p-2 rounded text-gray-700" value="₹ 0" readOnly />
//           </React.Fragment>
//         ))
//       )}
//     </div>
//   </div>

//           {/* Amenities Section */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Amenities</h3>
//             <div className="grid grid-cols-2 gap-y-4">
//               {[
//                 { name: "Internet", icon: Wifi },
//                 { name: "Gym", icon: Dumbbell },
//                 { name: "Parking Area", icon: Car },
//                 { name: "CCTV Camera", icon: Shield },
//                 { name: "A.C", icon: Snowflake },
//                 { name: "Power Backup", icon: Bolt },
//                 { name: "Food", icon: Utensils },
//                 { name: "Security", icon: UserCheck },
//                 { name: "Fire Safety", icon: Flame },
//                 { name: "Iron", icon: Shirt },
//                 { name: "Lift", icon: Building2 },
//                 { name: "Solar Power", icon: Sun },
//                 { name: "Refrigerator", icon: Refrigerator },
//               ].map(({ name, icon: Icon }) => (
//                 <div key={name} className="flex items-center gap-2 text-gray-700">
//                   <Icon className="w-5 h-5" />
//                   {name}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Image Carousel */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-4 flex justify-between">
//             Images / Videos{" "}
//             <span 
//               className="text-blue-600 cursor-pointer" 
//               onClick={() => setIsModalOpen(true)}
//             >
//               View All →
//             </span>
//           </h3>
//           <Swiper
//             modules={[Navigation, Pagination]}
//             spaceBetween={10}
//             slidesPerView={3}
//             navigation
//             pagination={{ clickable: true }}
//             className="w-full"
//           >
//             {images.map((img, index) => (
//               <SwiperSlide key={index}>
//                 <img 
//                   src={img} 
//                   alt={`Property ${index + 1}`} 
//                   className="w-full h-32 rounded-lg object-cover" 
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* View Owner Details */}
//         <div className="mb-6">
//           <button className="text-blue-600 flex items-center">
//             View Owner Details →
//           </button>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-center space-x-4">
//           <button className="bg-[#0827B2] text-white px-6 py-2 rounded-lg">
//             Approve Listing
//           </button>
//           <button 
//             onClick={() => setModalType("revision")}
//             className="bg-white border-[#0827B2] border text-[#0827B2] px-6 py-2 rounded-lg"
//           >
//             Request Revision
//           </button>
//           <button 
//             onClick={() => setModalType("cancel")}
//             className="bg-white border border-[#FF0404] text-[#FF0404] px-6 py-2 rounded-lg"
//           >
//             Reject Listing
//           </button>
//         </div>
//       </div>

//       {/* Modal for Request Revision */}
//       <Dialog 
//         open={modalType === "revision"} 
//         onClose={() => setModalType(null)} 
//         className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       >
//         <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
//           <h3 className="text-xl font-semibold">Request Revision</h3>
//           <p className="text-gray-600 text-sm mt-2">
//             Please provide details about the necessary revisions.
//           </p>
//           <textarea 
//             className="w-full border p-2 rounded h-24 mt-4" 
//             placeholder="Enter revision details..."
//           />
//           <div className="flex justify-between mt-4">
//             <button className="bg-[#0827B2] text-white px-6 py-2 rounded-lg">
//               Update
//             </button>
//             <button className="border border-[#0827B2] text-[#0827B2] px-6 py-2 rounded-lg">
//               Save
//             </button>
//             <button 
//               className="border border-[#FF0404] text-[#FF0404] px-6 py-2 rounded-lg" 
//               onClick={() => setModalType(null)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Dialog>

//       {/* Modal for Cancel Listing */}
//       <Dialog 
//         open={modalType === "cancel"} 
//         onClose={() => setModalType(null)} 
//         className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       >
//         <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
//           <h3 className="text-xl font-semibold">Cancel Listing</h3>
//           <p className="text-gray-600 text-sm mt-2">
//             Provide a reason for canceling this listing.
//           </p>
//           <textarea 
//             className="w-full border p-2 rounded h-24 mt-4" 
//             placeholder="Enter reason..."
//           />
//           <div className="mt-4 flex justify-center">
//             <button 
//               className="border border-[#FF0404] text-[#FF0404] px-6 py-2 rounded-lg w-full" 
//               onClick={() => setModalType(null)}
//             >
//               Cancel Listing
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default PropertyDetails;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import {
//   Wifi,
//   Dumbbell,
//   Car,
//   Shield,
//   Snowflake,
//   Bolt,
//   Utensils,
//   UserCheck,
//   Flame,
//   Shirt,
//   Building2,
//   Sun,
//   Refrigerator
// } from "lucide-react";
// import { Dialog } from "@headlessui/react";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const amenityIcons = {
//   wifi: Wifi,
//   gym: Dumbbell,
//   parking: Car,
//   security: Shield,
//   ac: Snowflake,
//   power: Bolt,
//   food: Utensils,
//   guard: UserCheck,
//   fire: Flame,
//   laundry: Shirt,
//   lift: Building2,
//   solar: Sun,
//   fridge: Refrigerator
// };

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [property, setProperty] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalType, setModalType] = useState(null);

//   // Get property data from location state or fetch from API
//   useEffect(() => {
//     if (location.state?.property) {
//       setProperty(location.state.property);
//       setIsLoading(false);
//     } else {
//       const fetchProperty = async () => {
//         try {
//           const response = await propertyAPI.getPropertyById(id);
//           if (response.data.success) {
//             setProperty(response.data.property);
//           } else {
//             setError(response.data.message || "Failed to fetch property");
//           }
//         } catch (err) {
//           setError(err.message || "Error fetching property");
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchProperty();
//     }
//   }, [id, location.state]);

//   if (isLoading) {
//     return (
//       <div className="p-6 bg-white min-h-screen flex justify-center items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-white min-h-screen">
//         <div className="bg-red-100 p-4 rounded-lg mb-6">
//           <button onClick={() => navigate(-1)} className="flex items-center text-gray-700">
//             <FaArrowLeft className="mr-2" /> Back
//           </button>
//         </div>
//         <div className="bg-white p-8 rounded-lg shadow-sm">
//           <div className="text-red-500 text-center py-8">{error}</div>
//         </div>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="p-6 bg-white min-h-screen">
//         <div className="bg-blue-100 p-4 rounded-lg mb-6">
//           <button onClick={() => navigate(-1)} className="flex items-center text-gray-700">
//             <FaArrowLeft className="mr-2" /> Back
//           </button>
//         </div>
//         <div className="bg-white p-8 rounded-lg shadow-sm">
//           <div className="text-gray-500 text-center py-8">Property not found</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-[#FFFFFF] min-h-screen">
//       {/* Back Button */}
//       <div className="bg-blue-100 p-4 rounded-lg mb-6">
//         <button onClick={() => navigate(-1)} className="flex items-center text-gray-700">
//           <FaArrowLeft className="mr-2" /> Back
//         </button>
//       </div>

//       {/* Property Details */}
//       <div className="bg-white p-8 rounded-lg shadow-sm">
//         <h2 className="text-3xl font-semibold mb-6">Property Details</h2>

//         {/* Property Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="text-gray-600 block mb-1">Property Name</label>
//             <input 
//               className="w-full border p-2 rounded bg-gray-50" 
//               value={property.property || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600 block mb-1">Location</label>
//             <input 
//               className="w-full border p-2 rounded bg-gray-50" 
//               value={property.location || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600 block mb-1">Client ID</label>
//             <input 
//               className="w-full border p-2 rounded bg-gray-50" 
//               value={property.clientId || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600 block mb-1">Owner Name</label>
//             <input 
//               className="w-full border p-2 rounded bg-gray-50" 
//               value={property.name || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600 block mb-1">Contact Number</label>
//             <input 
//               className="w-full border p-2 rounded bg-gray-50" 
//               value={property.phone || "N/A"} 
//               readOnly 
//             />
//           </div>
//           <div>
//             <label className="text-gray-600 block mb-1">Status</label>
//             <div className={`px-3 py-1 rounded-full text-xs inline-block ${getStatusColor(property.status)}`}>
//               {property.status || "N/A"}
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <label className="text-gray-600 block mb-1">Description</label>
//           <textarea 
//             className="w-full border p-2 rounded bg-gray-50 h-24" 
//             value={property.description || "No description available"} 
//             readOnly 
//           />
//         </div>

//         {/* Pricing & Amenities */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-6">
//           {/* Pricing Section */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Pricing</h3>
//             <div className="grid grid-cols-3 gap-4">
//               <span className="font-medium text-gray-600">Sharing Type</span>
//               <span className="font-medium text-gray-600">Advance</span>
//               <span className="font-medium text-gray-600">Fee</span>

//               {property.pricing?.length > 0 ? (
//                 property.pricing.map((price, index) => (
//                   <React.Fragment key={index}>
//                     <span className="text-gray-700">{price.type || "N/A"}</span>
//                     <input 
//                       className="border p-2 rounded bg-gray-50 text-gray-700" 
//                       value={price.deposit || "N/A"} 
//                       readOnly 
//                     />
//                     <input 
//                       className="border p-2 rounded bg-gray-50 text-gray-700" 
//                       value={price.price || "N/A"} 
//                       readOnly 
//                     />
//                   </React.Fragment>
//                 ))
//               ) : (
//                 <div className="col-span-3 text-gray-500 py-2">
//                   No pricing information available
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Amenities Section */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Amenities</h3>
//             <div className="grid grid-cols-2 gap-y-4">
//               {property.amenities?.length > 0 ? (
//                 property.amenities.map((amenity, index) => {
//                   const Icon = amenityIcons[amenity.toLowerCase().replace(/\s+/g, '')] || Utensils;
//                   return (
//                     <div key={index} className="flex items-center gap-2 text-gray-700">
//                       <Icon className="w-5 h-5" />
//                       {amenity}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="col-span-2 text-gray-500">
//                   No amenities listed
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Image Carousel */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-4 flex justify-between">
//             Images / Videos{" "}
//             {property.images?.length > 0 && (
//               <span 
//                 className="text-blue-600 cursor-pointer" 
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 View All →
//               </span>
//             )}
//           </h3>
          
//           {property.images?.length > 0 ? (
//             <Swiper
//               modules={[Navigation, Pagination]}
//               spaceBetween={10}
//               slidesPerView={3}
//               navigation
//               pagination={{ clickable: true }}
//               className="w-full"
//             >
//               {property.images.map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <img 
//                     src={img} 
//                     alt={`Property ${index + 1}`} 
//                     className="w-full h-32 rounded-lg object-cover" 
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           ) : (
//             <div className="text-gray-500 py-4">No images available</div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mt-8">
//           <button className="bg-[#0827B2] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
//             Approve Listing
//           </button>
//           <button 
//             onClick={() => setModalType("revision")}
//             className="bg-white border-[#0827B2] border text-[#0827B2] px-6 py-2 rounded-lg hover:bg-blue-50 transition"
//           >
//             Request Revision
//           </button>
//           <button 
//             onClick={() => setModalType("cancel")}
//             className="bg-white border border-[#FF0404] text-[#FF0404] px-6 py-2 rounded-lg hover:bg-red-50 transition"
//           >
//             Reject Listing
//           </button>
//         </div>
//       </div>

//       {/* Modal for Request Revision */}
//       <Dialog open={modalType === "revision"} onClose={() => setModalType(null)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//         <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
//           <Dialog.Title className="text-xl font-semibold">Request Revision</Dialog.Title>
//           <Dialog.Description className="text-gray-600 text-sm mt-2">
//             Please provide details about the necessary revisions.
//           </Dialog.Description>
          
//           <textarea 
//             className="w-full border p-2 rounded h-32 mt-4" 
//             placeholder="Enter revision details..."
//           />
          
//           <div className="flex justify-end gap-3 mt-4">
//             <button 
//               className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100"
//               onClick={() => setModalType(null)}
//             >
//               Cancel
//             </button>
//             <button 
//               className="bg-[#0827B2] text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//               onClick={() => {
//                 // Handle revision request
//                 setModalType(null);
//               }}
//             >
//               Submit Request
//             </button>
//           </div>
//         </div>
//       </Dialog>

//       {/* Modal for Cancel Listing */}
//       <Dialog open={modalType === "cancel"} onClose={() => setModalType(null)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//         <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
//           <Dialog.Title className="text-xl font-semibold">Reject Listing</Dialog.Title>
//           <Dialog.Description className="text-gray-600 text-sm mt-2">
//             Provide a reason for rejecting this listing.
//           </Dialog.Description>
          
//           <textarea 
//             className="w-full border p-2 rounded h-32 mt-4" 
//             placeholder="Enter reason for rejection..."
//           />
          
//           <div className="flex justify-end gap-3 mt-4">
//             <button 
//               className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100"
//               onClick={() => setModalType(null)}
//             >
//               Cancel
//             </button>
//             <button 
//               className="bg-[#FF0404] text-white px-4 py-2 rounded-lg hover:bg-red-700"
//               onClick={() => {
//                 // Handle rejection
//                 setModalType(null);
//               }}
//             >
//               Confirm Rejection
//             </button>
//           </div>
//         </div>
//       </Dialog>

//       {/* Full Screen Image Viewer */}
//       {isModalOpen && property.images?.length > 0 && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4">
//           <button 
//             onClick={() => setIsModalOpen(false)}
//             className="absolute top-4 right-4 text-white text-2xl"
//           >
//             ×
//           </button>
          
//           <Swiper
//             modules={[Navigation, Pagination]}
//             spaceBetween={10}
//             slidesPerView={1}
//             navigation
//             pagination={{ clickable: true }}
//             className="w-full max-w-4xl h-full"
//           >
//             {property.images.map((img, index) => (
//               <SwiperSlide key={index} className="flex items-center justify-center">
//                 <img 
//                   src={img} 
//                   alt={`Property ${index + 1}`} 
//                   className="max-h-full max-w-full object-contain" 
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       )}
//     </div>
//   );
// };

// // Helper function to get status color (same as in PropertyListings)
// const getStatusColor = (status) => {
//   switch (status?.toLowerCase()) {
//     case "active":
//       return "text-green-600 bg-green-100";
//     case "inactive":
//       return "text-gray-600 bg-gray-200";
//     case "pending":
//       return "text-yellow-600 bg-yellow-100";
//     case "rejected":
//       return "text-red-600 bg-red-100";
//     default:
//       return "text-gray-600 bg-gray-200";
//   }
// };

// export default PropertyDetails;




import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Wifi, Dumbbell, Car, Shield, Snowflake, Bolt, Utensils,
  UserCheck, Flame, Shirt, Building2, Sun, Refrigerator
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Dialog } from "@headlessui/react";
import propertyAPI from "../adminController"; // Adjust path

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [property, setProperty] = useState(location.state?.property || null);
  const [rooms, setRooms] = useState(location.state?.rooms || null);
  const [isLoading, setIsLoading] = useState(!location.state?.property);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalReason, setModalReason] = useState("");

  useEffect(() => {
    if (!property, rooms  && id) {
      const fetchProperty = async () => {
        try {
          setIsLoading(true);
          const response = await propertyAPI.getPropertyById(id);
          if (response.data.success) 
            setProperty(response.data);
            setRooms(response.data);

        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id, property, rooms]);
// console.log(rooms);
  const handleApprove = async () => {
  try {
    const response = await propertyAPI.approveProperty(id);
    if (response.data.success) {
      alert("Property approved successfully!");
      // Update local state or refresh data
      setProperty(prev => ({ ...prev, status: 'approved' }));
      // Optionally navigate back
      navigate(-1);
    } else {
      alert(response.data.message || "Failed to approve property");
    }
  } catch (err) {
    console.error("Approval error:", err);
    alert(err.response?.data?.message || "Error approving property");
  }
};

    const handleReject = async () => {
    if (modalReason.trim().length < 10) { // <--- This is the client-side check
    alert("Rejection reason must be at least 10 characters.");
    return;
  }
    try {
      const response = await propertyAPI.rejectProperty(id, { rejectionReason: modalReason });
      if (response.data.success) {
        alert("Listing rejected successfully");
        setProperty(prev => ({ ...prev, status: 'rejected', rejectionReason: modalReason }));
        setModalType(null);
        setModalReason("");
        navigate(-1); // Navigate back after rejection
      } else {
        alert(response.data.message || "Failed to reject property");
      }
    } catch (err) {
      console.error("Error rejecting listing:", err);
      alert(err.response?.data?.message || "Error rejecting listing. Please check console for more details.");
    }
  };

  const handleRevision = async () => {
    if (modalReason.trim().length < 5) {
      alert("Revision notes must be at least 10 characters.");
      return;
    }
    try {
      const response = await propertyAPI.requestRevision(id, { revisionNotes: modalReason });
      if (response.data.success) {
        alert("Revision requested successfully");
        setProperty(prev => ({ ...prev, status: 'revision_requested', revisionNotes: modalReason }));
        setModalType(null);
        setModalReason("");
      } else {
        alert(response.data.message || "Failed to request revision");
      }
    } catch (err) {
      console.error("Error requesting revision:", err);
      alert(err.response?.data?.message || "Error requesting revision. Please check console for more details.");
    }
  };
console.log(property);
  const images = property?.images || ["/images/property1.jpg"];

  if (isLoading) return (
    <div className="p-6 h-screen flex justify-center items-center">
      <div className="animate-spin h-12 w-12 border-2 border-blue-500 rounded-full border-b-transparent"></div>
    </div>
  );

  if (error) return <div className="p-6">Error: {error}</div>;
  if (!property) return <div className="p-6">Property not found</div>;

  return (
    <div className="p-6 bg-white min-h-screen">
      <button onClick={() => navigate(-1)} className="text-gray-700 mb-4 flex items-center">
        <FaArrowLeft className="mr-2" />Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Property Details</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {[["Property Name", property.property],
            ["Location", property.location],
            ["Client ID", property.clientId],
            ["Owner Name", property.name],
            ["Contact Number", property.phone],
            ["Status", property.status]
          ].map(([label, value], i) => (
            <div key={i}>
              <label className="text-gray-600">{label}</label>
              <input readOnly value={value || "N/A"} className="w-full border p-2 rounded" />
            </div>
          ))}
        </div>

        <label className="text-gray-600">Description</label>
        <textarea readOnly className="w-full border p-2 rounded mb-6" value={property.description || "No description available"} />

        <div className="grid grid-cols-2 gap-10 bg-white p-8">
  {/* Pricing Section */}
  <div>
    <h3 className="text-xl font-semibold mb-4">Pricing</h3>
     <div className="grid grid-cols-3 gap-4">
       <span className="font-medium text-gray-600">Sharing Type</span>
       <span className="font-medium text-gray-600">Advance</span>
       <span className="font-medium text-gray-600">Monthly Fee</span>

       {property?.rooms?.roomTypes?.length > 0 ? (
        
         property.rooms.roomTypes.map((room, index) => (
          
           <React.Fragment key={index}>
             <span className="text-gray-700">{room.label || "N/A"}</span>
             <input 
               className="border p-2 rounded text-gray-700" 
               value={`₹ ${room.deposit || "0"}`} 
               readOnly 
             />
             <input 
               className="border p-2 rounded text-gray-700" 
               value={`₹ ${room.price || "0"}`} 
               readOnly 
             />
           </React.Fragment>
         ))
       ) : (
         ["Single", "Double", "Triple", "Four", "Five", "Six"].map((type) => (
           <React.Fragment key={type}>
             <span className="text-gray-700">{type} Sharing</span>
             <input className="border p-2 rounded text-gray-700" value="₹ 0" readOnly />
             <input className="border p-2 rounded text-gray-700" value="₹ 0" readOnly />
         </React.Fragment>
         ))
       )}
     </div>
   </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-y-3">
              {[
                ["Internet", Wifi], ["Gym", Dumbbell], ["Parking", Car], ["CCTV", Shield],
                ["AC", Snowflake], ["Backup", Bolt], ["Food", Utensils], ["Security", UserCheck],
                ["Fire Safety", Flame], ["Iron", Shirt], ["Lift", Building2], ["Solar", Sun], ["Fridge", Refrigerator]
              ].map(([name, Icon]) => (
                <div key={name} className="flex items-center gap-2 text-gray-700">
                  <Icon className="w-4 h-4" /> {name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 flex justify-between">
            Images
            <span onClick={() => setModalType("images")} className="text-blue-500 cursor-pointer">View All →</span>
          </h3>
          <Swiper modules={[Navigation, Pagination]} spaceBetween={10} slidesPerView={3} navigation pagination={{ clickable: true }}>
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt="Property" className="rounded h-32 w-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-4">
         <button 
  onClick={handleApprove}
  disabled={property?.status === 'approved'}
  className={`bg-[#0827B2] text-white px-6 py-2 rounded-lg ${
    property?.status === 'approved' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
  }`}
>
  {property?.status === 'approved' ? 'Approved' : 'Approve Listing'}
</button>
          <button onClick={() => setModalType("revision")} className="border border-blue-700 text-blue-700 px-6 py-2 rounded">Request Revision</button>
          <button onClick={() => setModalType("reject")} className="border border-red-500 text-red-500 px-6 py-2 rounded">Reject</button>
        </div>
      </div>

      {/* Modal for Reject / Revision */}
      <Dialog open={modalType === "reject" || modalType === "revision"} onClose={() => setModalType(null)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded w-96">
          <h3 className="text-lg font-bold mb-2">{modalType === "revision" ? "Request Revision" : "Reject Listing"}</h3>
          <textarea className="w-full border p-2 rounded mb-4" placeholder="Enter reason..." value={modalReason} onChange={(e) => setModalReason(e.target.value)} />
          <div className="flex justify-between">
            <button onClick={() => modalType === "revision" ? handleRevision() : handleReject()} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
            <button onClick={() => setModalType(null)} className="text-gray-700">Cancel</button>
          </div>
        </div>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={modalType === "images"} onClose={() => setModalType(null)} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
        <div className="bg-white p-6 rounded max-w-3xl w-full">
          <h3 className="text-lg font-semibold mb-4">All Images</h3>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <img key={idx} src={img} alt="" className="rounded h-32 object-cover w-full" />
            ))}
          </div>
          <div className="mt-4 text-right">
            <button onClick={() => setModalType(null)} className="text-blue-600">Close</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PropertyDetails;
