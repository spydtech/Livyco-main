// import { useState } from "react";
// import HostelRoomSelection from "./HostelRoomSelection";

// const RoomSelection = ({ nextStep }) => {
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const [proceed, setProceed] = useState(false);

//   const rooms = [
//     { id: 1, label: "Single Room", blocks: 1 },
//     { id: 2, label: "Double Sharing", blocks: 2 },
//     { id: 3, label: "Triple Sharing", blocks: 3 },
//     { id: 4, label: "Four Sharing", blocks: 4 },
//     { id: 5, label: "Five Sharing", blocks: 5 },
//     { id: 6, label: "Six Sharing", blocks: 6 },
//   ];

//   const toggleSelection = (id) => {
//     setSelectedRooms((prev) =>
//       prev.includes(id) ? prev.filter((roomId) => roomId !== id) : [...prev, id]
//     );
//   };

//   const handleContinue = () => {
//     if (selectedRooms.length > 0) {
//       setProceed(true);
//     } else {
//       alert("Please select at least one room type before continuing.");
//     }
//   };

//   return (
//     <div className="mx-auto p-6 rounded-lg">
//       {proceed ? (
//         <HostelRoomSelection
//           nextStep={nextStep}
//           selectedRooms={selectedRooms}
//         />
//       ) : (
//         <>
//           <h2 className="text-xl font-semibold mb-4">
//             Select types of room available
//           </h2>
//           <div className="grid grid-cols-3 gap-4">
//             {rooms.map((room) => (
//               <div
//                 key={room.id}
//                 className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${
//                   selectedRooms.includes(room.id) ? "bg-yellow-200" : ""
//                 }`}
//                 onClick={() => toggleSelection(room.id)}
//               >
//                 <div className="grid grid-cols-2 gap-1 w-16 h-16 bg-yellow-100">
//                   {[...Array(room.blocks)].map((_, index) => (
//                     <div
//                       key={index}
//                       className="bg-yellow-400 w-full h-full"
//                     ></div>
//                   ))}
//                 </div>
//                 <p className="mt-2 text-sm">{room.label}</p>
//                 <input
//                   type="checkbox"
//                   checked={selectedRooms.includes(room.id)}
//                   readOnly
//                   className="mt-2"
//                 />
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={handleContinue}
//             className="w-full bg-yellow-400 text-black py-2 mt-6 rounded-lg font-semibold"
//           >
//             Continue
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default RoomSelection;



// import { useState, useEffect } from "react";
// import HostelRoomSelection from "./HostelRoomSelection";

// const RoomSelection = ({ nextStep }) => {
//   const [selectedRooms, setSelectedRooms] = useState(() => {
//     // Retrieve selected rooms from local storage or default to an empty array
//     const storedRooms = localStorage.getItem("selectedRooms");
//     return storedRooms ? JSON.parse(storedRooms) : [];
//   });

//   const [proceed, setProceed] = useState(false);

//   const rooms = [
//     { id: 1, label: "Single Room", blocks: 1 },
//     { id: 2, label: "Double Sharing", blocks: 2 },
//     { id: 3, label: "Triple Sharing", blocks: 3 },
//     { id: 4, label: "Four Sharing", blocks: 4 },
//     { id: 5, label: "Five Sharing", blocks: 5 },
//     { id: 6, label: "Six Sharing", blocks: 6 },
//   ];

//   // Save selected rooms to local storage whenever the selection changes
//   useEffect(() => {
//     localStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
//   }, [selectedRooms]);

//   const toggleSelection = (id) => {
//     setSelectedRooms((prev) =>
//       prev.includes(id) ? prev.filter((roomId) => roomId !== id) : [...prev, id]
//     );
//   };

//   const handleContinue = () => {
//     if (selectedRooms.length > 0) {
//       setProceed(true);
//     } else {
//       alert("Please select at least one room type before continuing.");
//     }
//   };

//   return (
//     <div className="mx-auto p-6 rounded-lg">
//       {proceed ? (
//         <HostelRoomSelection
//           nextStep={nextStep}
//           selectedRooms={selectedRooms}
//         />
//       ) : (
//         <>
//           <h2 className="text-xl font-semibold mb-4">
//             Select types of room available
//           </h2>
//           <div className="grid grid-cols-3 gap-4">
//             {rooms.map((room) => (
//               <div
//                 key={room.id}
//                 className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${
//                   selectedRooms.includes(room.id) ? "bg-yellow-200" : ""
//                 }`}
//                 onClick={() => toggleSelection(room.id)}
//               >
//                 <div className="grid grid-cols-2 gap-1 w-16 h-16 bg-yellow-100">
//                   {[...Array(room.blocks)].map((_, index) => (
//                     <div
//                       key={index}
//                       className="bg-yellow-400 w-full h-full"
//                     ></div>
//                   ))}
//                 </div>
//                 <p className="mt-2 text-sm">{room.label}</p>
//                 <input
//                   type="checkbox"
//                   checked={selectedRooms.includes(room.id)}
//                   readOnly
//                   className="mt-2"
//                 />
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={handleContinue}
//             className="w-full bg-yellow-400 text-black py-2 mt-6 rounded-lg font-semibold"
//           >
//             Continue
//           </button>
//         </>
//       )}
//     </div>
//   );
// };
//nextStep, prevStep, propertyId, isEditMode
// export default RoomSelection;




// import { useState, useEffect } from "react";
// import { roomAPI } from "../PropertyController";
// import HostelRoomSelection from "./HostelRoomSelection";

// const RoomSelection = ({ nextStep, prevStep, propertyId, isEditMode }) => {
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const [proceed, setProceed] = useState(false);
//   const [roomTypes, setRoomTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);

//   // Standard room types matching backend
//   const defaultRoomTypes = [
//     { type: "single", label: "Single Room", capacity: 1 },
//     { type: "double", label: "Double Sharing", capacity: 2 },
//     { type: "triple", label: "Triple Sharing", capacity: 3 },
//     { type: "quad", label: "Four Sharing", capacity: 4 },
//     { type: "quint", label: "Five Sharing", capacity: 5 },
//     { type: "hex", label: "Six Sharing", capacity: 6 }
//   ];

//   useEffect(() => {
//     const fetchRoomTypes = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         if (propertyId) {
//           const response = await roomAPI.getRoomTypes(propertyId);
//           const fetchedRoomTypes = response.data.roomTypes || [];

//           // Merge with defaults, avoiding duplicates
//           const mergedTypes = [
//             ...defaultRoomTypes.filter(
//               defaultType => !fetchedRoomTypes.some(f => f.type === defaultType.type)
//             ),
//             ...fetchedRoomTypes
//           ];

//           setRoomTypes(mergedTypes);

//           // In edit mode, select all existing room types by default
//           if (isEditMode) {
//             setSelectedRooms(fetchedRoomTypes.map(room => room.type));

//             // Also ensure floor configuration is initialized
//             try {
//               const floorResponse = await roomAPI.getFloorData(propertyId);
//               if (!floorResponse.data?.selectedRooms) {
//                 await roomAPI.saveFloorData(propertyId, {
//                   selectedRooms: fetchedRoomTypes.map(room => room.type),
//                   floors: []
//                 });
//               }
//             } catch (floorErr) {
//               console.log("Initializing floor config:", floorErr.message);
//             }
//           } else {
//             setSelectedRooms([]);
//           }
//         } else {
//           setRoomTypes(defaultRoomTypes);
//           const storedRooms = localStorage.getItem("selectedRooms");
//           setSelectedRooms(storedRooms ? JSON.parse(storedRooms) : []);
//         }
//       } catch (err) {
//         console.error("Error loading room types:", err);
//         setError("Failed to load room types. Using default options.");
//         setRoomTypes(defaultRoomTypes);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoomTypes();
//   }, [propertyId, isEditMode]);

//   const saveRoomSelection = async () => {
//     setIsSaving(true);
//     try {
//       // Format the room types data properly
//       const roomsToSave = roomTypes
//         .filter(room => selectedRooms.includes(room.type))
//         .map(room => ({
//           type: room.type,
//           label: room.label || `${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room`,
//           capacity: room.capacity || 1,
//           availableCount: room.availableCount || 0,
//           price: room.price || 0,
//           amenities: room.amenities || [],
//           images: room.images || []
//         }));

//       // Ensure we have valid room types to save
//       if (roomsToSave.length === 0) {
//         throw new Error("No valid room types selected");
//       }

//       if (propertyId) {
//         // First save the room types
//         await roomAPI.createRoomTypes(propertyId, { roomTypes: roomsToSave });

//         // Then save the selected rooms in floorConfig
//         await roomAPI.saveFloorData(propertyId, {
//           selectedRooms,
//           floors: [] // Initialize with empty floors
//         });
//       } else {
//         localStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
//       }
//     } catch (err) {
//       console.error("Save error details:", {
//         error: err,
//         response: err.response?.data
//       });
//       setError(err.response?.data?.message || err.message || "Failed to save selection");
//       throw err;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const toggleSelection = (type) => {
//     setSelectedRooms(prev => 
//       prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
//     );
//   };

//   const handleContinue = async () => {
//     if (selectedRooms.length === 0) {
//       setError("Please select at least one room type");
//       return;
//     }

//     try {
//       await saveRoomSelection();
//       setProceed(true);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to save selection");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center p-8">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
//         <p className="mt-2">Loading room types...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto p-6 rounded-lg max-w-4xl">
//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
//           <p>{error}</p>
//         </div>
//       )}

//       {proceed ? (
//         <HostelRoomSelection
//           nextStep={nextStep}
//           prevStep={prevStep}
//           selectedRooms={selectedRooms}
//           roomTypes={roomTypes}
//           propertyId={propertyId}
//           isEditMode={isEditMode}
//         />
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">
//               {isEditMode ? "Edit" : "Select"} room types
//             </h2>
//             <div className="text-sm text-gray-500">
//               {selectedRooms.length} selected
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {roomTypes.map(room => (
//               <div
//                 key={room.type}
//                 className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
//                   selectedRooms.includes(room.type) 
//                     ? "bg-yellow-100 border-yellow-400 shadow-md" 
//                     : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => toggleSelection(room.type)}
//               >
//                 <div className={`grid grid-cols-2 gap-1 w-16 h-16 ${
//                   selectedRooms.includes(room.type) ? "bg-yellow-200" : "bg-gray-100"
//                 } rounded-md p-1`}>
//                   {[...Array(Math.min(room.capacity, 4))].map((_, i) => (
//                     <div
//                       key={i}
//                       className={`${
//                         selectedRooms.includes(room.type) ? "bg-yellow-500" : "bg-gray-300"
//                       } w-full h-full rounded-sm`}
//                     />
//                   ))}
//                   {room.capacity > 4 && (
//                     <div className="col-span-2 text-xs text-center flex items-center justify-center">
//                       +{room.capacity - 4} more
//                     </div>
//                   )}
//                 </div>
//                 <p className="mt-3 font-medium">{room.label}</p>
//                 <p className="text-sm text-gray-500">
//                   Capacity: {room.capacity} person{room.capacity > 1 ? 's' : ''}
//                 </p>
//                 <div className="mt-2 w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
//                   {selectedRooms.includes(room.type) && (
//                     <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between mt-8">
//             <button
//               onClick={prevStep}
//               className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleContinue}
//               className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md ${
//                 selectedRooms.length === 0 || isSaving ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               disabled={selectedRooms.length === 0 || isSaving}
//             >
//               {isSaving ? 'Saving...' : 'Continue'}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default RoomSelection;



// import { useState, useEffect } from "react";
// import { roomAPI } from "../PropertyController";
// import HostelRoomSelection from "./HostelRoomSelection";

// const RoomSelection = ({ nextStep, prevStep, propertyId, isEditMode }) => {
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const [proceed, setProceed] = useState(false);
//   const [roomTypes, setRoomTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);

//   const defaultRoomTypes = [
//     { type: "single", label: "Single Room", capacity: 1 },
//     { type: "double", label: "Double Sharing", capacity: 2 },
//     { type: "triple", label: "Triple Sharing", capacity: 3 },
//     { type: "quad", label: "Four Sharing", capacity: 4 },
//     { type: "quint", label: "Five Sharing", capacity: 5 },
//     { type: "hex", label: "Six Sharing", capacity: 6 }
//   ];

//   useEffect(() => {
//     const fetchRoomTypes = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         if (propertyId) {
//           const response = await roomAPI.getRoomTypes(propertyId);
//           const fetchedRoomTypes = response.data.roomTypes || [];
//           console.log("Fetched room types:", fetchedRoomTypes);
//           // Merge with defaults, prioritizing fetched data
//           const mergedTypes = defaultRoomTypes.map(defaultType => {
//             const fetchedType = fetchedRoomTypes.find(f => f.type === defaultType.type);
//             return fetchedType || defaultType;
//           });

//           // Add any custom room types from backend that aren't in defaults
//           fetchedRoomTypes.forEach(fetchedType => {
//             if (!defaultRoomTypes.some(d => d.type === fetchedType.type)) {
//               mergedTypes.push(fetchedType);
//             }
//           });

//           setRoomTypes(mergedTypes);

//           if (isEditMode) {
//             setSelectedRooms(fetchedRoomTypes.map(room => room.type));
//           }
//         } else {
//           setRoomTypes(defaultRoomTypes);
//           const storedRooms = localStorage.getItem("selectedRooms");
//           setSelectedRooms(storedRooms ? JSON.parse(storedRooms) : []);
//         }
//       } catch (err) {
//         console.error("Error loading room types:", err);
//         setError("Failed to load room types. Using default options.");
//         setRoomTypes(defaultRoomTypes);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoomTypes();
//   }, [propertyId, isEditMode]);

//   const saveRoomSelection = async () => {
//   setIsSaving(true);
//   try {
//     const roomsToSave = roomTypes
//       .filter(room => selectedRooms.includes(room.type))
//       .map(room => ({
//         type: room.type,
//         label: room.label || `${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room`,
//         capacity: room.capacity || 1,
//         availableCount: room.availableCount || 0,
//         price: room.price || 0,
//         deposit: room.deposit || 0,
//         amenities: room.amenities || [],
//         images: room.images || []
//       }));

//     if (roomsToSave.length === 0) {
//       throw new Error("No valid room types selected");
//     }

//     if (propertyId) {
//       // First save the room types
//       await roomAPI.createRoomTypes(propertyId, { roomTypes: roomsToSave });

//       // Then save the selected rooms in floorConfig
//       await roomAPI.saveFloorData(propertyId, {
//         selectedRooms,
//         floors: [] // Initialize with empty floors
//       });
//     } else {
//       localStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
//     }
//     return true;
//   } catch (err) {
//     console.error("Save error details:", {
//       error: err,
//       response: err.response?.data
//     });
//     setError(err.response?.data?.message || err.message || "Failed to save selection");
//     return false;
//   } finally {
//     setIsSaving(false);
//   }
// };

//   const toggleSelection = (type) => {
//     setSelectedRooms(prev => 
//       prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
//     );
//   };

//   const handleContinue = async () => {
//     if (selectedRooms.length === 0) {
//       setError("Please select at least one room type");
//       return;
//     }

//     const success = await saveRoomSelection();
//     if (success) {
//       setProceed(true);
//     }
//   };

//   if (loading) {
//     return <div className="text-center p-8">Loading room types...</div>;
//   }

//   return (
//     <div className="mx-auto p-6 rounded-lg max-w-4xl">
//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
//           <p>{error}</p>
//         </div>
//       )}

//       {proceed ? (
//         <HostelRoomSelection
//           nextStep={nextStep}
//           prevStep={prevStep}
//           selectedRooms={selectedRooms}
//           roomTypes={roomTypes}
//           propertyId={propertyId}
//           isEditMode={isEditMode}
//         />
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">
//               {isEditMode ? "Edit" : "Select"} room types
//             </h2>
//             <div className="text-sm text-gray-500">
//               {selectedRooms.length} selected
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {roomTypes.map(room => (
//               <div
//                 key={room.type}
//                 className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
//                   selectedRooms.includes(room.type) 
//                     ? "bg-yellow-100 border-yellow-400 shadow-md" 
//                     : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => toggleSelection(room.type)}
//               >
//                 {/* Room visualization */}
//                 <div className={`grid grid-cols-2 gap-1 w-16 h-16 ${
//                   selectedRooms.includes(room.type) ? "bg-yellow-200" : "bg-gray-100"
//                 } rounded-md p-1`}>
//                   {[...Array(Math.min(room.capacity, 4))].map((_, i) => (
//                     <div
//                       key={i}
//                       className={`${
//                         selectedRooms.includes(room.type) ? "bg-yellow-500" : "bg-gray-300"
//                       } w-full h-full rounded-sm`}
//                     />
//                   ))}
//                   {room.capacity > 4 && (
//                     <div className="col-span-2 text-xs text-center">
//                       +{room.capacity - 4} more
//                     </div>
//                   )}
//                 </div>
//                 <p className="mt-3 font-medium">{room.label}</p>
//                 <p className="text-sm text-gray-500">
//                   Capacity: {room.capacity} person{room.capacity > 1 ? 's' : ''}
//                 </p>
//                 <div className="mt-2 w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
//                   {selectedRooms.includes(room.type) && (
//                     <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between mt-8">
//             <button
//               onClick={prevStep}
//               className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleContinue}
//               disabled={selectedRooms.length === 0 || isSaving}
//               className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md ${
//                 selectedRooms.length === 0 || isSaving ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//             >
//               {isSaving ? 'Saving...' : 'Continue'}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default RoomSelection;


import { useState, useEffect } from "react";
import { roomAPI } from "../PropertyController";
import HostelRoomSelection from "./HostelRoomSelection";

const RoomSelection = ({ nextStep, prevStep, propertyId, isEditMode }) => {

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [proceed, setProceed] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const defaultRoomTypes = [
    { type: "single", label: "Single Room", capacity: 1 },
    { type: "double", label: "Double Sharing", capacity: 2 },
    { type: "triple", label: "Triple Sharing", capacity: 3 },
    { type: "quad", label: "Four Sharing", capacity: 4 },
    { type: "quint", label: "Five Sharing", capacity: 5 },
    { type: "hex", label: "Six Sharing", capacity: 6 }
  ];

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        setLoading(true);
        setError(null);

        if (propertyId) {
          // Property exists, fetch from API
          const response = await roomAPI.getRoomTypes(propertyId);
          const roomConfig = response.data?.roomConfig || {};
          const fetchedRoomTypes = roomConfig.roomTypes || [];

          // Merge with default room types
          const mergedTypes = defaultRoomTypes.map(defaultType => {
            const fetchedType = fetchedRoomTypes.find(f => f.type === defaultType.type);
            return fetchedType || defaultType;
          });

          // Add any custom types not in default
          fetchedRoomTypes.forEach(fetchedType => {
            if (!defaultRoomTypes.some(d => d.type === fetchedType.type)) {
              mergedTypes.push(fetchedType);
            }
          });

          setRoomTypes(mergedTypes);

          if (isEditMode) {
            setSelectedRooms(fetchedRoomTypes.map(room => room.type));
          }
        } else {
          // Temp mode: use defaults and localStorage
          setRoomTypes(defaultRoomTypes);

          const storedRooms = localStorage.getItem("tempSelectedRooms");
          setSelectedRooms(storedRooms ? JSON.parse(storedRooms) : []);
        }
      } catch (err) {
        console.error("Error loading room types:", err);
        setError("Failed to load room types. Using default options.");
        setRoomTypes(defaultRoomTypes);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, [propertyId, isEditMode]);

  // Save temp room selections if propertyId is not yet created
  useEffect(() => {
    if (!propertyId) {
      localStorage.setItem("tempSelectedRooms", JSON.stringify(selectedRooms));
    }
  }, [selectedRooms, propertyId]);

  console.log("propertyId in RoomSelection:-", propertyId);
  const saveRoomSelection = async () => {
    setIsSaving(true);
    try {
      const roomsToSave = roomTypes
        .filter(room => selectedRooms.includes(room.type))
        .map(room => ({
          type: room.type,
          label: room.label || `${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room`,
          capacity: room.capacity || 1,
          availableCount: room.availableCount || 0,
          price: room.price || 0,
          deposit: room.deposit || 0,
          amenities: room.amenities || [],
          images: room.images || []
        }));

      if (roomsToSave.length === 0) {
        throw new Error("No valid room types selected");
      }

      if (propertyId) {
        await roomAPI.createRoomTypes(propertyId, { roomTypes: roomsToSave });
        await roomAPI.saveFloorData(propertyId, {
          selectedRooms,
          floors: []
        });
      } else {
        localStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
      }
      return true;
    } catch (err) {
      console.error("Save error:", err);
      setError(err.response?.data?.message || err.message || "Failed to save selection");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSelection = (type) => {
    setSelectedRooms(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleContinue = async () => {
    if (selectedRooms.length === 0) {
      setError("Please select at least one room type");
      return;
    }

    const success = await saveRoomSelection();
    if (success) {
      setProceed(true);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading room types...</div>;
  }

  return (
    <div className="mx-auto p-6 rounded-lg max-w-4xl">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      {proceed ? (
        <HostelRoomSelection
          nextStep={nextStep}
          prevStep={prevStep}
          selectedRooms={selectedRooms}
          roomTypes={roomTypes}
          propertyId={propertyId}
          isEditMode={isEditMode}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {isEditMode ? "Edit" : "Select"} room types
            </h2>
            <div className="text-sm text-gray-500">
              {selectedRooms.length} selected
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {roomTypes.map(room => (
              <div
                key={room.type}
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${selectedRooms.includes(room.type)
                    ? "bg-yellow-100 border-yellow-400 shadow-md"
                    : "hover:bg-gray-50"
                  }`}
                onClick={() => toggleSelection(room.type)}
              >
                <div className={`grid grid-cols-2 gap-1 w-16 h-16 ${selectedRooms.includes(room.type) ? "bg-yellow-200" : "bg-gray-100"
                  } rounded-md p-1`}>
                  {[...Array(Math.min(room.capacity, 4))].map((_, i) => (
                    <div
                      key={i}
                      className={`${selectedRooms.includes(room.type) ? "bg-yellow-500" : "bg-gray-300"
                        } w-full h-full rounded-sm`}
                    />
                  ))}
                  {room.capacity > 4 && (
                    <div className="col-span-2 text-xs text-center">
                      +{room.capacity - 4} more
                    </div>
                  )}
                </div>
                <p className="mt-3 font-medium">{room.label}</p>
                <p className="text-sm text-gray-500">
                  Capacity: {room.capacity} person{room.capacity > 1 ? 's' : ''}
                </p>
                <div className="mt-2 w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
                  {selectedRooms.includes(room.type) && (
                    <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={selectedRooms.length === 0 || isSaving}
              className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md ${selectedRooms.length === 0 || isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isSaving ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomSelection;