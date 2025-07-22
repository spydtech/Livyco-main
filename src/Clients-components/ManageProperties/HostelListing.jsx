// import React, { useState, useEffect } from "react";


// const HostelListing = ({ setShowTracker }) => {
//   const [hostelData, setHostelData] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [deletePostPopup, setdeletePostPopup] = useState(false);
//   const [isDeleted, setIsDeleted] = useState(false);




//   return (
//     <div className="text-black min-h-screen p-4 space-y-6">
//       {/* Active Hostel Listing */}
//       {!isDeleted && hostelData ? (
//         <div className="border border-gray-700 rounded-lg p-4">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-lg font-semibold">{hostelData.name}</h2>
//               <p className="text-sm text-gray-400 flex items-center">
//                 📍 {hostelData.street}, {hostelData.locality}, {hostelData.city}
//               </p>
//             </div>
//             {hostelData.images.length > 0 ? (
//               <img
//                 src={hostelData.images[0]} // Show first image
//                 alt="Hostel"
//                 className="w-16 h-16 rounded"
//               />
//             ) : (
//               <div className="w-16 h-16 border border-gray-500 flex items-center justify-center">
//                 <span className="text-gray-500">🖼️</span>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={() => setShowTracker(true)}
//             className="bg-blue-600 text-black py-2 px-4 rounded w-full mt-3"
//           >
//             Update
//           </button>
//           <div className="flex justify-between items-center mt-3">
//             <span className="text-green-500">● Active</span>
//             <button
//               className="text-blue-400 border border-blue-400 px-3 py-1 rounded"
//               onClick={() => setShowDeletePopup(true)}
//             >
//               Delete Listing
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-400">No hostel listing available.</p>
//       )}
//         <h3 className="text-lg font-semibold mt-4">
//           Pick Up where you left (1)
//         </h3>

//       {/* Inactive Hostel Listing */}
//       <div>
//         <button className="flex items-center text-gray-400">
//           <span className="text-xl mr-2">➕</span> Add a new branch
//         </button>
      
//         {/* <div className="border border-gray-700 rounded-lg p-4 mt-2">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-lg font-semibold">Abc Boys Hostel</h2>
//               <p className="text-sm text-gray-400 flex items-center">
//                 📍 P,No 123,abc, dfg xxxx, Hyd 5xxxxx
//               </p>
//             </div>
//             <div className="w-16 h-16 border border-gray-500 flex items-center justify-center">
//               <span className="text-gray-500">🖼️</span>
//             </div>
//           </div>
//           <button className="border border-blue-400 text-blue-400 py-2 px-4 rounded w-full mt-3">
//             EDIT
//           </button>
//           <div className="mt-3 text-gray-400">● Inactive</div>
//         </div> */}
//       </div>

//       {/* Success Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
//             <p className="text-gray-700 font-medium">
//               You have successfully listed your property.
//             </p>
//             <button
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//               onClick={() => setShowPopup(false)}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Popup */}
//       {showDeletePopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Delete Confirmation"
//               className="mx-auto mb-4"
//             />
//             <p className="text-gray-700 font-medium">
//               Do you wish to delete this post?
//             </p>
//             <div className="flex justify-center gap-4 mt-4">
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded-md"
//                 onClick={() => {
//                   setShowDeletePopup(false);
//                   setdeletePostPopup(true);
//                 }}
//               >
//                 YES
//               </button>

//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 onClick={() => setShowDeletePopup(false)}
//               >
//                 NO
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {deletePostPopup && (
//         <div className="fixed  inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
//             <img
//               src="https://s3-alpha-sig.figma.com/img/a526/496f/ad3822a3a9f22aeab19bf9f6438a4c1a?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mjq20rC~PIpgGRcXCUGptoaYV6FzM1BMUidxYgm~NDXE9EVipSKITIkJR7C13ezgglrY5XHw7-X6oHr8n1HFRflXCZ8PefYrLKXY-OomEBCjKxzrQRQ49yRCQd2XtnTkUYK7kr-pIY5~oY0Azho~k~PU6fY9-nOaWVUkxUCOUssZ7WbtYOc07R1JuUD49vY87yyG28oXxhMf4C0u0YcxvSog3vgOqmHiTFAHgIOM3TYX~Uio0-Jra~6Ra3nEgN2PScEWRd822djMdJoi-Q6w8mg1CYO7FVyft16pvd7WYh8tB4lVrGriz~DovM9mt~9~FGIkjs02ouLafMFiDG8XRw__"
//               alt="Success"
//               className="mx-auto w-24 h-24 mb-4"
//             />
//             <p className="text-gray-700 font-medium">
//               Post deleted successfully!
//             </p>
//             {/* <button
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//               onClick={() => setdeletePostPopup(false)}
//             >
//               OK
//             </button> */}
//             <button
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//               onClick={() => {
//                 setdeletePostPopup(false);
//                 setIsDeleted(true);
//                 localStorage.removeItem("propertyData"); // Remove hostel data
//                 localStorage.removeItem("images"); // Remove images
//                 setHostelData(null); // Ensure the UI updates immediately
//               }}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//       <div className="justify-center items-center flex w-full">
//         <button
//           className="bg-[#fee123] text-black px-10 py-3 rounded-md"
//           onClick={() => setShowTracker(true)} // Ensure tracker is shown
//         >
//           List New Property
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HostelListing;



// import React, { useState, useEffect } from "react";
// import { mediaAPI, pgAPI, propertyAPI, roomAPI } from "../PropertyController";

// const HostelListing = ({ setShowTracker,  onNewProperty = () => {}, setEditMode = () => {}, setPropertyId = () => {}  }) => {
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [propertyData, setPropertyData] = useState(null);
//   const [mediaData, setMediaData] = useState(null);
//   const [roomData, setRoomData] = useState(null);
//   const [pgData, setPgData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAllPropertyData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const [propertyRes, mediaRes, roomRes, pgRes] = await Promise.all([
//         propertyAPI.getProperty(),
//         mediaAPI.getMedia(),
//         roomAPI.getRoomTypes(),
//         pgAPI.getPGProperty()
//       ]);

//       if (!propertyRes.data?.success) throw new Error("Failed to fetch property data");
      
//       setPropertyData(propertyRes.data.property);
//       setMediaData(mediaRes.data?.media || null);
//       setRoomData(roomRes.data?.roomTypes || null);
//       setPgData(pgRes.data?.pgProperty || null);

//       // Store complete data for edit mode
//       const completeData = {
//         property: propertyRes.data.property,
//         media: mediaRes.data?.media || null,
//         rooms: roomRes.data?.roomTypes || null,
//         pg: pgRes.data?.pgProperty || null
//       };
//       localStorage.setItem("propertyCompleteData", JSON.stringify(completeData));

//     } catch (err) {
//       console.error("Error fetching property data:", err);
//       setError(err.message);
      
//       // Fallback to localStorage if available
//       try {
//         const localData = JSON.parse(localStorage.getItem("propertyCompleteData"));
//         if (localData) {
//           setPropertyData(localData.property);
//           setMediaData(localData.media);
//           setRoomData(localData.rooms);
//           setPgData(localData.pg);
//         }
//       } catch (e) {
//         console.error("Error reading local storage:", e);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllPropertyData();
//   }, []);

//   const handleEdit = () => {
//     if (!propertyData) return;
    
//     // Prepare all data for edit mode
//     const editData = {
//       property: propertyData,
//       media: mediaData,
//       rooms: roomData,
//       pg: pgData
//     };
    
//     // Store in localStorage for the edit flow
//     localStorage.setItem("editPropertyData", JSON.stringify(editData));
    
//     // Pass the property ID to the edit flow
//     onNewProperty(propertyData._id);
//     setEditMode(true);
//     setShowTracker(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await Promise.all([
//         propertyAPI.deleteProperty(),
//         pgData && pgAPI.deletePGProperty(),
//         roomData && roomAPI.deleteRoomType(),
//         mediaData && mediaAPI.deleteMediaItem()
//       ]);
//       fetchAllPropertyData();
//       setShowDeletePopup(false);
//     } catch (err) {
//       console.error("Error deleting property:", err);
//       setError("Failed to delete property. Please try again.");
//     }
//   };

//   const handleNewProperty = () => {
//     // Clear any existing property data
//     setPropertyId(null);
//     setEditMode(false);
//     setShowTracker(true);
//     onNewProperty();
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen p-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
//       </div>
//     );
//   }

//   if (error && !propertyData) {
//     return (
//       <div className="text-black min-h-screen p-4 flex flex-col items-center justify-center">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 max-w-md">
//           <p className="font-medium">Error loading property:</p>
//           <p>{error}</p>
//         </div>
//         <button
//           onClick={() => onNewProperty()}
//           className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md"
//         >
//           Create New Property
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="text-black min-h-screen p-4 space-y-6 max-w-3xl mx-auto">
//       {propertyData ? (
//         <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex justify-between items-start">
//             <div className="flex-1 mr-4">
//               <h2 className="text-xl font-bold text-gray-800">{propertyData.name}</h2>
//               <p className="text-sm text-gray-600 mt-1 flex items-center">
//                 <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                 </svg>
//                 {[
//                   propertyData.street,
//                   propertyData.locality,
//                   propertyData.city
//                 ].filter(Boolean).join(', ')}
//               </p>
//               <div className="mt-2 flex flex-wrap gap-2">
//                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                   propertyData.status === 'approved' 
//                     ? 'bg-green-100 text-green-800' 
//                     : propertyData.status === 'rejected'
//                     ? 'bg-red-100 text-red-800'
//                     : 'bg-yellow-100 text-yellow-800'
//                 }`}>
//                   Status: {propertyData.status ? propertyData.status.charAt(0).toUpperCase() + propertyData.status.slice(1) : 'Pending'}
//                 </span>
                
//                 {roomData && roomData.length > 0 && (
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     Rooms: {roomData.length}
//                   </span>
//                 )}
                
//                 {pgData && (
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                     PG: Available
//                   </span>
//                 )}
//               </div>
              
//               <div className="mt-2 text-sm text-gray-600">
//                 <p>Registration ID: {propertyData.registrationId}</p>
//                 <p>GST: {propertyData.gstNo}</p>
//               </div>
              
//               {pgData && (
//                 <div className="mt-2">
//                   <p className="text-sm font-medium">PG Details:</p>
//                   <p className="text-sm text-gray-600">Gender: {pgData.gender}</p>
//                   <p className="text-sm text-gray-600">Food: {pgData.foodIncluded}</p>
//                 </div>
//               )}
//             </div>
            
//             <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
//               {mediaData?.images?.[0]?.url ? (
//                 <img
//                   src={mediaData.images[0].url}
//                   alt="Property"
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/150';
//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="mt-4 flex space-x-3">
//             <button
//               onClick={handleEdit}
//               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//               </svg>
//               Edit
//             </button>
//             <button
//               onClick={() => setShowDeletePopup(true)}
//               className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 py-2 px-4 rounded-md flex items-center justify-center"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//               </svg>
//               Delete
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="border border-gray-200 rounded-lg p-8 text-center">
//           <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//           </svg>
//           <h3 className="mt-2 text-lg font-medium text-gray-900">No property listed</h3>
//           <p className="mt-1 text-gray-500">Get started by creating a new property listing.</p>
//         </div>
//       )}

//       <div className="mt-8">
//         <button
//           onClick={handleNewProperty}
//           className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-md shadow-sm flex items-center justify-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           List New Property
//         </button>
//       </div>

//       {showDeletePopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
//             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//               <div className="sm:flex sm:items-start">
//                 <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                   <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                 </div>
//                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Delete property</h3>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">
//                       Are you sure you want to delete this property? All of your data will be permanently removed.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//               <button
//                 type="button"
//                 className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
//                 onClick={handleDelete}
//               >
//                 Delete
//               </button>
//               <button
//                 type="button"
//                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 onClick={() => setShowDeletePopup(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HostelListing;


// import React, { useState, useEffect } from "react";
// import { mediaAPI, pgAPI, propertyAPI, roomAPI } from "../PropertyController";

// const HostelListing = ({ setShowTracker, onNewProperty = () => {}, setEditMode = () => {}, setPropertyId = () => {} }) => {
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [propertyToDelete, setPropertyToDelete] = useState(null);
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAllProperties = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Fetch all properties
//       const propertyRes = await propertyAPI.getProperty();
//       console.log("Properties API Response:", propertyRes); // Debug log
      
//       if (!propertyRes.data?.success) {
//         throw new Error(propertyRes.data?.message || "Failed to fetch properties");
//       }
      
//       // Extract properties array from response
//       const propertiesArray = propertyRes.data.data.map(item => item.property) || [];
//       console.log("Extracted Properties:", propertiesArray); // Debug log
      
//       if (propertiesArray.length === 0) {
//         setProperties([]);
//         setLoading(false);
//         return;
//       }

//       // Fetch additional data for each property
//       const propertiesWithDetails = await Promise.all(
//         propertiesArray.map(async (property) => {
//           try {
//             console.log(`Fetching details for property ${property._id}`); // Debug log
//             const [mediaRes, roomRes, pgRes] = await Promise.all([
//               mediaAPI.getMedia(property._id).catch(e => {
//                 console.error(`Media API error for ${property._id}:`, e);
//                 return { data: { media: null } };
//               }),
//               roomAPI.getRoomTypes(property._id).catch(e => {
//                 console.error(`Rooms API error for ${property._id}:`, e);
//                 return { data: { roomTypes: null } };
//               }),
//               pgAPI.getPGProperty(property._id).catch(e => {
//                 console.error(`PG API error for ${property._id}:`, e);
//                 return { data: { pgProperty: null } };
//               })
//             ]);

//             console.log(`Details for ${property._id}:`, { // Debug log
//               media: mediaRes.data,
//               rooms: roomRes.data,
//               pg: pgRes.data
//             });

//             return {
//               ...property,
//               media: mediaRes.data?.media || null,
//               rooms: roomRes.data?.roomTypes || null,
//               pg: pgRes.data?.pgProperty || null
//             };
//           } catch (err) {
//             console.error(`Error processing property ${property._id}:`, err);
//             return {
//               ...property,
//               media: null,
//               rooms: null,
//               pg: null
//             };
//           }
//         })
//       );
      
//       console.log("Final properties data:", propertiesWithDetails); // Debug log
//       setProperties(propertiesWithDetails);
      
//     } catch (err) {
//       console.error("Error in fetchAllProperties:", err);
//       setError(err.message || "Failed to load properties");
      
//       // Check if we have cached data
//       const cachedData = localStorage.getItem("propertyCompleteData");
//       if (cachedData) {
//         try {
//           const parsedData = JSON.parse(cachedData);
//           setProperties(Array.isArray(parsedData) ? parsedData : [parsedData]);
//         } catch (e) {
//           console.error("Error parsing cached data:", e);
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllProperties();
//   }, []);

//   const handleEdit = (propertyId) => {
//     const property = properties.find(p => p._id === propertyId);
//     if (!property) {
//       console.error("Property not found for editing:", propertyId);
//       return;
//     }
    
//     console.log("Editing property:", property); // Debug log
    
//     const editData = {
//     property: {
//         ...property,
//         location: property.location || { 
//           type: "Point", 
//           coordinates: [
//             parseFloat(property.longitude) || 0, 
//             parseFloat(property.latitude) || 0
//           ] 
//         }
//       },
//       media: property.media,
//       rooms: property.rooms,
//       pg: property.pg
//     };
    
//     localStorage.setItem("editPropertyData", JSON.stringify(editData));
//     setPropertyId(propertyId);

//     setEditMode(true);
//     setShowTracker(true);
//   };

//   const handleDelete = async (propertyId) => {
//     try {
//       setLoading(true);
//       console.log("Deleting property:", propertyId); // Debug log
      
//       // First delete associated data
//       await Promise.all([
//         mediaAPI.deleteMediaItem(propertyId).catch(e => console.error("Media delete error:", e)),
//         roomAPI.deleteRoomType(propertyId).catch(e => console.error("Rooms delete error:", e)),
//         pgAPI.deletePGProperty(propertyId).catch(e => console.error("PG delete error:", e))
//       ]);
      
//       // Then delete the main property
//       await propertyAPI.deleteProperty(propertyId);
      
//       // Refresh the list
//       await fetchAllProperties();
//     } catch (err) {
//       console.error("Error deleting property:", err);
//       setError("Failed to delete property. Please try again.");
//     } finally {
//       setLoading(false);
//       setShowDeletePopup(false);
//       setPropertyToDelete(null);
//     }
//   };

//   const handleNewProperty = () => {
//     setPropertyId(null);
//     setEditMode(false);
//     setShowTracker(true);
//     onNewProperty();
//   };

//   if (loading && properties.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen p-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
//       </div>
//     );
//   }

//   if (error && properties.length === 0) {
//     return (
//       <div className="text-black min-h-screen p-4 flex flex-col items-center justify-center">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 max-w-md">
//           <p className="font-medium">Error loading properties:</p>
//           <p>{error}</p>
//           <button 
//             onClick={fetchAllProperties} 
//             className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
//           >
//             Retry
//           </button>
//         </div>
//         <button
//           onClick={handleNewProperty}
//           className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md"
//         >
//           Create New Property
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="text-black min-h-screen p-4 space-y-6 max-w-3xl mx-auto">
//       {properties.length > 0 ? (
//         <div className="space-y-4">
//           {properties.map((property) => (
//             <div key={property._id} className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1 mr-4">
//                   <h2 className="text-xl font-bold text-gray-800">{property.name}</h2>
//                   <p className="text-sm text-gray-600 mt-1 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                     </svg>
//                     {[property.street, property.locality, property.city].filter(Boolean).join(', ')}
//                   </p>
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       property.status === 'approved' ? 'bg-green-100 text-green-800' : 
//                       property.status === 'rejected' ? 'bg-red-100 text-red-800' : 
//                       'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       Status: {property.status?.charAt(0).toUpperCase() + property.status?.slice(1) || 'Pending'}
//                     </span>
//                     {property.rooms?.length > 0 && (
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         Rooms: {property.rooms.length}
//                       </span>
//                     )}
//                     {property.pg && (
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                         PG: Available
//                       </span>
//                     )}
//                   </div>
//                   <div className="mt-2 text-sm text-gray-600">
//                     <p>Registration ID: {property.registrationId}</p>
//                     <p>GST: {property.gstNo}</p>
//                   </div>
//                   {property.pg && (
//                     <div className="mt-2">
//                       <p className="text-sm font-medium">PG Details:</p>
//                       <p className="text-sm text-gray-600">Gender: {property.pg.gender}</p>
//                       <p className="text-sm text-gray-600">Food: {property.pg.foodIncluded}</p>
//                     </div>
//                   )}
//                 </div>
//                 <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
//                   {property.media?.images?.[0]?.url ? (
//                     <img
//                       src={property.media.images[0].url}
//                       alt="Property"
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'https://via.placeholder.com/150';
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-400">
//                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="mt-4 flex space-x-3">
//                 <button
//                   onClick={() => handleEdit(property._id)}
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     setPropertyToDelete(property._id);
//                     setShowDeletePopup(true);
//                   }}
//                   className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 py-2 px-4 rounded-md flex items-center justify-center"
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                   </svg>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="border border-gray-200 rounded-lg p-8 text-center">
//           <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//           </svg>
//           <h3 className="mt-2 text-lg font-medium text-gray-900">No properties listed</h3>
//           <p className="mt-1 text-gray-500">Get started by creating a new property listing.</p>
//         </div>
//       )}

//       <div className="mt-8">
//         <button
//           onClick={handleNewProperty}
//           className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-md shadow-sm flex items-center justify-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           List New Property
//         </button>
//       </div>

//       {showDeletePopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
//             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//               <div className="sm:flex sm:items-start">
//                 <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                   <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                 </div>
//                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Delete property</h3>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">
//                       Are you sure you want to delete this property? All of your data will be permanently removed.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//               <button
//                 type="button"
//                 className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
//                 onClick={() => handleDelete(propertyToDelete)}
//               >
//                 Delete
//               </button>
//               <button
//                 type="button"
//                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 onClick={() => setShowDeletePopup(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HostelListing;



import React, { useState, useEffect } from "react";
import { mediaAPI, pgAPI, propertyAPI, roomAPI } from "../PropertyController";

const HostelListing = ({ setShowTracker, onNewProperty = () => {}, setEditMode = () => {}, setPropertyId = () => {} }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const propertyRes = await propertyAPI.getProperty();
      console.log("Properties API Response:", propertyRes);
      
      if (!propertyRes.data?.success) {
        throw new Error(propertyRes.data?.message || "Failed to fetch properties");
      }
      
      const propertiesArray = propertyRes.data.data.map(item => item.property) || [];
      console.log("Extracted Properties:", propertiesArray);
      
      if (propertiesArray.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      const propertiesWithDetails = await Promise.all(
        propertiesArray.map(async (property) => {
          try {
            console.log(`Fetching details for property ${property._id}`);
            const [mediaRes, roomRes, pgRes] = await Promise.all([
              mediaAPI.getMediaByProperty(property._id).catch(e => {
                console.error(`Media API error for ${property._id}:`, e);
                return { data: { media: null } };
              }),
              roomAPI.getRoomTypes(property._id).catch(e => {
                console.error(`Rooms API error for ${property._id}:`, e);
                return { data: { roomTypes: null } };
              }),
              pgAPI.getPGProperty(property._id).catch(e => {
                console.error(`PG API error for ${property._id}:`, e);
                return { data: { pgProperty: null } };
              })
            ]);

            console.log(`Details for ${property._id}:`, {
              media: mediaRes.data,
              rooms: roomRes.data,
              pg: pgRes.data
            });

            return {
              ...property,
              media: mediaRes.data?.media || null,
              rooms: roomRes.data?.roomTypes || null, // Corrected: Uses roomRes for roomTypes
              pg: pgRes.data?.pgProperty || null
            };
          } catch (err) {
            console.error(`Error processing property ${property._id}:`, err);
            return {
              ...property,
              media: null,
              rooms: null,
              pg: null
            };
          }
        })
      );
      
      console.log("Final properties data:", propertiesWithDetails);
      setProperties(propertiesWithDetails);
      
    } catch (err) {
      console.error("Error in fetchAllProperties:", err);
      setError(err.message || "Failed to load properties");
      
      const cachedData = localStorage.getItem("propertyCompleteData");
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setProperties(Array.isArray(parsedData) ? parsedData : [parsedData]);
        } catch (e) {
          console.error("Error parsing cached data:", e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

 const handleEdit = (propertyId) => {
    const property = properties.find(p => p._id === propertyId);
    if (!property) {
      console.error("Property not found");
      return;
    }

    const editData = {
      property: {
        ...property,
        latitude: property.location?.coordinates?.[1]?.toString() || '',
        longitude: property.location?.coordinates?.[0]?.toString() || '',
        location: property.location || {
          type: "Point",
          coordinates: [
            parseFloat(property.longitude || 0),
            parseFloat(property.latitude || 0)
          ]
        }
      },
      media: property.media || { images: [], videos: [] },
      rooms: property.rooms || [],
      pg: property.pg || null
    };

    if (!editData.property._id) {
      console.error("Invalid property data for editing");
      return;
    }

    localStorage.setItem("editPropertyData", JSON.stringify(editData));
    setEditMode(true, editData.property);
    setPropertyId(propertyId);
    setShowTracker(true);
  };

  // const handleDelete = async (propertyId) => {
  //   try {
  //     setLoading(true);
  //     console.log("Deleting property:", propertyId);
      
  //     await Promise.all([
  //       mediaAPI.deleteMediaItem(propertyId).catch(e => console.error("Media delete error:", e)),
  //       roomAPI.deleteRoomType(propertyId).catch(e => console.error("Rooms delete error:", e)),
  //       pgAPI.deletePGProperty(propertyId).catch(e => console.error("PG delete error:", e))
  //     ]);
      
  //     await propertyAPI.deleteProperty(propertyId);
      
  //     await fetchAllProperties();
  //   } catch (err) {
  //     console.error("Error deleting property:", err);
  //     setError("Failed to delete property. Please try again.");
  //   } finally {
  //     setLoading(false);
  //     setShowDeletePopup(false);
  //     setPropertyToDelete(null);
  //   }
  // };
 const handleDelete = async (propertyId) => {
    try {
      setLoading(true);
      
      // First delete dependent records
      const [mediaRes, roomRes, pgRes] = await Promise.all([
        mediaAPI.deleteMediaItem(propertyId).catch(e => ({ data: { success: false } })),
        roomAPI.deleteRoomType(propertyId).catch(e => ({ data: { success: false } })),
        pgAPI.deletePGProperty(propertyId).catch(e => ({ data: { success: false } }))
      ]);

      // Check if all dependencies were deleted successfully
      if (!mediaRes.data?.success || !roomRes.data?.success || !pgRes.data?.success) {
        console.warn("Some dependent records couldn't be deleted, proceeding with property deletion");
      }

      // Then delete the property itself
      const deleteRes = await propertyAPI.deleteProperty(propertyId);
      
      if (!deleteRes.data?.success) {
        throw new Error(deleteRes.data?.message || "Failed to delete property");
      }

      // Update UI state
      setProperties(prev => prev.filter(p => p._id !== propertyId));
      localStorage.removeItem('propertyCompleteData');
      
    } catch (err) {
      console.error("Delete failed:", err);
      setError(err.response?.data?.message || err.message || "Failed to delete property. Please try again.");
    } finally {
      setLoading(false);
      setShowDeletePopup(false);
      setPropertyToDelete(null);
    }
  };



  





  const handleNewProperty = () => {
    setPropertyId(null);
    setEditMode(false);
    setShowTracker(true);
    onNewProperty();
  };

  if (loading && properties.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error && properties.length === 0) {
    return (
      <div className="text-black min-h-screen p-4 flex flex-col items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 max-w-md">
          <p className="font-medium">Error loading properties:</p>
          <p>{error}</p>
          <button 
            onClick={fetchAllProperties} 
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Retry
          </button>
        </div>
        <button
          onClick={handleNewProperty}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md"
        >
          Create New Property
        </button>
      </div>
    );
  }

  return (
    <div className="text-black min-h-screen p-4 space-y-6 max-w-3xl mx-auto">
      {properties.length > 0 ? (
        <div className="space-y-4">
          {properties.map((property) => (
            <div key={property._id} className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <h2 className="text-xl font-bold text-gray-800">{property.name}</h2>
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {[property.street, property.locality, property.city].filter(Boolean).join(', ')}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      property.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      property.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      Status: {property.status?.charAt(0).toUpperCase() + property.status?.slice(1) || 'Pending'}
                    </span>
                    {property.rooms?.length > 0 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Rooms: {property.rooms.length}
                      </span>
                    )}
                    {property.pg && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        PG: Available
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Registration ID: {property.registrationId}</p>
                    <p>GST: {property.gstNo}</p>
                  </div>
                  {property.pg && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">PG Details:</p>
                      <p className="text-sm text-gray-600">Gender: {property.pg.gender}</p>
                      <p className="text-sm text-gray-600">Food: {property.pg.foodIncluded}</p>
                    </div>
                  )}
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  {property.media?.images?.[0]?.url ? (
                    <img
                      src={property.media.images[0].url}
                      alt="Property"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleEdit(property._id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => {
                    setPropertyToDelete(property._id);
                    setShowDeletePopup(true);
                  }}
                  className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 py-2 px-4 rounded-md flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No properties listed</h3>
          <p className="mt-1 text-gray-500">Get started by creating a new property listing.</p>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={handleNewProperty}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-md shadow-sm flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          List New Property
        </button>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete property</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this property? All of your data will be permanently removed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => handleDelete(propertyToDelete)}
              >
                Delete
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelListing;
