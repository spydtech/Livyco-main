// import { useState, useEffect } from "react";
// import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";

// export default function HostelRoomSelection({ selectedRooms, nextStep }) {
//   const [floors, setFloors] = useState(0);
//   const [currentFloor, setCurrentFloor] = useState(1);
//   const [floorData, setFloorData] = useState(() => {
//     return JSON.parse(localStorage.getItem("hostelRoomData")) || {};
//   });
//   const [roomNumbers, setRoomNumbers] = useState({});
//   const [showRoomRent, setShowRoomRent] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("hostelRoomData", JSON.stringify(floorData));
//   }, [floorData]);

//   const handleRoomNumberChange = (roomType, value) => {
//     setRoomNumbers((prev) => ({ ...prev, [roomType]: value }));
//   };
//   const rooms = [
//     { id: 1, label: "Single Room", blocks: 1 },
//     { id: 2, label: "Double Sharing", blocks: 2 },
//     { id: 3, label: "Triple Sharing", blocks: 3 },
//     { id: 4, label: "Four Sharing", blocks: 4 },
//     { id: 5, label: "Five Sharing", blocks: 5 },
//     { id: 6, label: "Six Sharing", blocks: 6 },
//   ];

//   const saveFloorData = () => {
//     setFloorData((prev) => ({
//       ...prev,
//       [currentFloor]: roomNumbers,
//     }));
//   };

//   const handleSaveFloor = () => {
//     saveFloorData();
//     setRoomNumbers({}); // Clears input for next floor
//     if (currentFloor < floors) {
//       setCurrentFloor((prev) => prev + 1);
//     }
//   };

//   const handleFinalSave = () => {
//     saveFloorData();
//     setShowRoomRent(true);
//   };

//   const filteredRooms = rooms.filter((room) => selectedRooms.includes(room.id));

//   if (showRoomRent) {
//     return (
//       <RoomRent
//         nextStep={nextStep}
//         selectedRooms={filteredRooms.map((room) => room.label)}
//       />
//     );
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-lg font-semibold mb-4">
//         Select types of room available
//       </h2>

//       <div className="flex items-center gap-4 mb-4">
//         <span className="text-sm">No. of floors in the Hostel</span>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setFloors(Math.max(0, floors - 1))}
//             className="border p-2 rounded-md"
//           >
//             <Minus size={16} />
//           </button>
//           <span className="text-lg font-bold w-8 text-center">{floors}</span>
//           <button
//             onClick={() => setFloors(floors + 1)}
//             className="border p-2 rounded-md"
//           >
//             <Plus size={16} />
//           </button>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="text-sm">Floor Number:</label>
//         <input
//           type="text"
//           className="border p-2 rounded-md ml-2 w-16 text-center"
//           value={currentFloor}
//           readOnly
//         />
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
//         {rooms
//           .filter((room) => selectedRooms.includes(room.id))
//           .map((room) => (
//             <div key={room.id} className="border w-72 p-6 rounded-md relative">
//               <div className="flex justify-center gap-1 mb-2">
//                 {[...Array(room.blocks)].map((_, index) => (
//                   <div key={index} className="bg-yellow-400 w-8 h-16"></div>
//                 ))}
//               </div>
//               <h3 className="text-center font-semibold mb-2">{room.label}</h3>
//               <label className="text-xs block mb-1">
//                 Please mention room numbers*
//               </label>
//               <input
//                 type="text"
//                 className="border p-2 rounded-md w-full"
//                 placeholder="Eg 101A"
//                 value={roomNumbers[room.label] || ""}
//                 onChange={(e) =>
//                   handleRoomNumberChange(room.label, e.target.value)
//                 }
//               />
//             </div>
//           ))}
//       </div>

//       <div className="flex justify-between mt-6">
//         {currentFloor < floors && (
//           <button
//             className="bg-yellow-400 text-black py-2 px-6 rounded-md"
//             onClick={handleSaveFloor}
//           >
//             Add Next Floor 😊
//           </button>
//         )}
//         <button
//           className="border py-2 px-6 rounded-md"
//           onClick={handleFinalSave}
//         >
//           Save & Continue
//         </button>
//       </div>
//     </div>
//   );
// }

// function RoomRent({ selectedRooms, nextStep }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [roomData, setRoomData] = useState(() => {
//     return JSON.parse(localStorage.getItem("roomRentData")) || {};
//   });

//   useEffect(() => {
//     localStorage.setItem("roomRentData", JSON.stringify(roomData));
//   }, [roomData]);

//   const currentRoom = selectedRooms[currentIndex];

//   const handleChange = (field, value) => {
//     setRoomData((prev) => ({
//       ...prev,
//       [currentRoom]: { ...prev[currentRoom], [field]: value },
//     }));
//   };

//   const handleCheckboxChange = (amenity) => {
//     setRoomData((prev) => ({
//       ...prev,
//       [currentRoom]: {
//         ...prev[currentRoom],
//         amenities: {
//           ...prev[currentRoom]?.amenities,
//           [amenity]: !prev[currentRoom]?.amenities?.[amenity] || false,
//         },
//       },
//     }));
//   };

//   const nextRoom = () => {
//     setCurrentIndex((prev) => (prev + 1) % selectedRooms.length);
//   };

//   const prevRoom = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? selectedRooms.length - 1 : prev - 1
//     );
//   };

//   const handleSave = () => {
//     localStorage.setItem("roomRentData", JSON.stringify(roomData));
//     alert("Rent details saved!");
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md w-full  mx-auto">
//       <h2 className="text-lg font-semibold text-center mb-4">
//         Configure Rent & Amenities
//       </h2>

//       <div className="flex items-center justify-between">
//         <button
//           onClick={prevRoom}
//           className="p-2 rounded-full hover:bg-gray-200"
//         >
//           <ChevronLeft size={24} />
//         </button>

//         <h3 className="text-xl font-bold">{currentRoom}</h3>

//         <button
//           onClick={nextRoom}
//           className="p-2 rounded-full hover:bg-gray-200"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       <div className="mt-4">
//         <div className="mb-3">
//           <label className="block text-sm font-medium">
//             Rent for Single Bed*
//           </label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md"
//             placeholder="₹"
//             value={roomData[currentRoom]?.rent || ""}
//             onChange={(e) => handleChange("rent", e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="block text-sm font-medium">Deposit*</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md"
//             placeholder="₹"
//             value={roomData[currentRoom]?.deposit || ""}
//             onChange={(e) => handleChange("deposit", e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="block text-sm font-medium">Amenities</label>
//           <div className="flex space-x-4">
//             {["A.C", "Iron", "Wi-Fi", "Laundry"].map((amenity) => (
//               <label key={amenity} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4"
//                   checked={roomData[currentRoom]?.amenities?.[amenity] || false}
//                   onChange={() => handleCheckboxChange(amenity)}
//                 />
//                 <span>{amenity}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       <button
//         className="w-full mt-4 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500"
//         // onClick={handleSave}
//         onClick={() => {
//           handleSave();
//           nextStep();
//         }}
//       >
//         Save and Continue
//       </button>
//     </div>
//   );
// }





// import { useState, useEffect } from "react";
// import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
// import { roomAPI } from "../PropertyController";

// const HostelRoomSelection = ({ 
//   selectedRooms, 
//   nextStep, 
//   prevStep,
//   roomTypes,
//   propertyId,
//   isEditMode
// }) => {
//   const [floors, setFloors] = useState(1);
//   const [currentFloor, setCurrentFloor] = useState(1);
//   const [floorData, setFloorData] = useState({});
//   const [roomNumbers, setRoomNumbers] = useState({});
//   const [showRoomRent, setShowRoomRent] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [initialLoad, setInitialLoad] = useState(true);

//   // Get filtered rooms based on selection
//   const filteredRooms = roomTypes
//     .filter(room => selectedRooms.includes(room.type))
//     .map(room => ({
//       id: room.type,
//       label: room.label,
//       type: room.type,
//       capacity: room.capacity
//     }));

//   // Load existing floor data in edit mode
//   useEffect(() => {
//     const loadFloorData = async () => {
//       if (!propertyId || !isEditMode) {
//         setInitialLoad(false);
//         return;
//       }

//       try {
//         setIsSaving(true);
//         const response = await roomAPI.getFloorData(propertyId);

//         if (response.data.success) {
//           const floors = response.data.floors || {};
//           setFloorData(floors);

//           // Set number of floors
//           const floorCount = Object.keys(floors).length;
//           setFloors(floorCount > 0 ? floorCount : 1);

//           // Pre-fill room numbers for first floor if available
//           if (floors[1]) {
//             setRoomNumbers(floors[1]);
//           }
//         }
//       } catch (err) {
//         console.error("Failed to load floor data:", err);
//         setError("Failed to load existing floor configuration");
//       } finally {
//         setIsSaving(false);
//         setInitialLoad(false);
//       }
//     };

//     loadFloorData();
//   }, [propertyId, isEditMode]);

//   // Handle room number input changes
//   const handleRoomNumberChange = (roomType, value) => {
//     setRoomNumbers(prev => ({ 
//       ...prev, 
//       [roomType]: value 
//     }));
//   };

//   // Save current floor data before moving to next floor
//   const saveCurrentFloor = () => {
//     if (Object.keys(roomNumbers).length > 0) {
//       setFloorData(prev => ({
//         ...prev,
//         [currentFloor]: roomNumbers
//       }));
//     }
//   };

//   // Handle floor navigation
//   const handleFloorChange = (newFloor) => {
//     saveCurrentFloor();
//     setRoomNumbers(floorData[newFloor] || {});
//     setCurrentFloor(newFloor);
//   };

//   // Handle final save before moving to rent configuration
//   const handleFinalSave = async () => {
//     setIsSaving(true);
//     setError(null);
//     saveCurrentFloor();

//     try {
//       // Prepare floors data for API
//       const floorsData = Object.entries(floorData).map(([floorNum, rooms]) => ({
//         floor: parseInt(floorNum),
//         rooms
//       }));

//       // Save to backend if property exists
//       if (propertyId) {
//         await roomAPI.saveFloorData({
//           selectedRooms: filteredRooms.map(room => room.type),
//           floors: floorsData
//         });
//       } else {
//         localStorage.setItem("floorData", JSON.stringify(floorData));
//       }

//       setShowRoomRent(true);
//     } catch (err) {
//       console.error("Failed to save floor data:", err);
//       setError(err.response?.data?.message || "Failed to save floor configuration");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (initialLoad) {
//     return (
//       <div className="text-center p-8">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
//         <p className="mt-2">Loading floor configuration...</p>
//       </div>
//     );
//   }

//   if (showRoomRent) {
//     return (
//       <RoomRent
//         nextStep={nextStep}
//         prevStep={() => setShowRoomRent(false)}
//         selectedRooms={filteredRooms}
//         roomTypes={roomTypes}
//         propertyId={propertyId}
//         isEditMode={isEditMode}
//       />
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">
//         {isEditMode ? "Edit" : "Configure"} Room Numbers by Floor
//       </h2>

//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Floor selection controls */}
//       <div className="flex items-center gap-4 mb-6">
//         <span className="text-sm font-medium">Number of floors:</span>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => {
//               const newFloors = Math.max(1, floors - 1);
//               setFloors(newFloors);
//               if (currentFloor > newFloors) {
//                 handleFloorChange(newFloors);
//               }
//             }}
//             className="border p-2 rounded-md hover:bg-gray-100"
//             disabled={floors <= 1 || isEditMode}
//           >
//             <Minus size={16} />
//           </button>
//           <span className="text-lg font-bold w-8 text-center">{floors}</span>
//           <button
//             onClick={() => setFloors(floors + 1)}
//             className="border p-2 rounded-md hover:bg-gray-100"
//             disabled={isEditMode}
//           >
//             <Plus size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Floor navigation */}
//       <div className="flex items-center justify-center gap-4 mb-6">
//         <button
//           onClick={() => handleFloorChange(currentFloor - 1)}
//           disabled={currentFloor <= 1}
//           className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
//         >
//           <ChevronLeft size={24} />
//         </button>
//         <span className="text-lg font-semibold">Floor {currentFloor}</span>
//         <button
//           onClick={() => handleFloorChange(currentFloor + 1)}
//           disabled={currentFloor >= floors}
//           className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       {/* Room number inputs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         {filteredRooms.map((room) => (
//           <div 
//             key={`${room.type}_${currentFloor}`} 
//             className="border p-4 rounded-md"
//           >
//             <div className="flex justify-center gap-1 mb-2">
//               {[...Array(Math.min(room.capacity, 6))].map((_, index) => (
//                 <div key={index} className="bg-yellow-400 w-6 h-10 rounded-sm"></div>
//               ))}
//             </div>
//             <h3 className="text-center font-semibold mb-2">{room.label}</h3>
//             <label className="text-xs block mb-1 text-gray-600">
//               Room numbers (comma separated):
//             </label>
//             <input
//               type="text"
//               className="border p-2 rounded-md w-full"
//               placeholder="Eg: 101, 102, 103A"
//               value={roomNumbers[room.type] || ""}
//               onChange={(e) => handleRoomNumberChange(room.type, e.target.value)}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Navigation buttons */}
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={prevStep}
//           className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
//         >
//           Back
//         </button>

//         <button
//           className={`bg-yellow-400 text-black py-2 px-6 rounded-md hover:bg-yellow-500 ${
//             isSaving ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//           onClick={handleFinalSave}
//           disabled={isSaving}
//         >
//           {isSaving ? 'Saving...' : 'Save & Continue'}
//         </button>
//       </div>
//     </div>
//   );
// };

// // RoomRent component for configuring prices and amenities
// const RoomRent = ({ 
//   selectedRooms, 
//   nextStep, 
//   prevStep,
//   roomTypes,
//   propertyId,
//   isEditMode
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [roomData, setRoomData] = useState({});
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [initialLoad, setInitialLoad] = useState(true);

//   // Initialize room data from existing or defaults
//   useEffect(() => {
//     const initializeData = async () => {
//       try {
//         setIsSaving(true);
//         let existingData = {};

//         // Load existing data in edit mode
//         if (propertyId && isEditMode) {
//           const response = await roomAPI.getRoomRentData(propertyId);
//           if (response.data.success) {
//             response.data.rentData.forEach(item => {
//               existingData[item.roomType] = {
//                 price: item.price,
//                 deposit: item.deposit,
//                 availableCount: item.availableCount,
//                 amenities: item.amenities.reduce((acc, amenity) => {
//                   acc[amenity] = true;
//                   return acc;
//                 }, {})
//               };
//             });
//           }
//         } else {
//           // Load from localStorage for new properties
//           const savedData = JSON.parse(localStorage.getItem("roomRentData")) || {};
//           existingData = savedData;
//         }

//         // Initialize data structure for all selected rooms
//         const initializedData = {};
//         selectedRooms.forEach(room => {
//           const roomType = roomTypes.find(r => r.type === room.type);
//           initializedData[room.type] = {
//             price: roomType?.price ,
//             deposit: roomType?.deposit ,
//             availableCount: roomType?.availableCount ,
//             amenities: {
//               AC: false,
//               WiFi: false,
//               Laundry: false,
//               Iron: false,
//               TV: false,
//               Geyser: false,
//               ...(roomType?.amenities || []).reduce((acc, amenity) => {
//                 acc[amenity] = true;
//                 return acc;
//               }, {}),
//               ...existingData[room.type]?.amenities
//             },
//             ...existingData[room.type]
//           };
//         });

//         setRoomData(initializedData);
//       } catch (err) {
//         console.error("Failed to initialize room data:", err);
//         setError("Failed to load existing room configuration");
//       } finally {
//         setIsSaving(false);
//         setInitialLoad(false);
//       }
//     };

//     initializeData();
//   }, [selectedRooms, roomTypes, propertyId, isEditMode]);

//   const currentRoom = selectedRooms[currentIndex];
//   const currentData = roomData[currentRoom?.type] || {};

//   // Handle form field changes
//   const handleChange = (field, value) => {
//     setRoomData(prev => ({
//       ...prev,
//       [currentRoom.type]: {
//         ...prev[currentRoom.type],
//         [field]: Number(value) 
//       }
//     }));
//   };

//   // Handle amenity toggle
//   const handleAmenityToggle = (amenity) => {
//     setRoomData(prev => ({
//       ...prev,
//       [currentRoom.type]: {
//         ...prev[currentRoom.type],
//         amenities: {
//           ...prev[currentRoom.type].amenities,
//           [amenity]: !prev[currentRoom.type].amenities[amenity]
//         }
//       }
//     }));
//   };

//   // Navigate between rooms
//   const navigateRoom = (direction) => {
//     setCurrentIndex(prev => 
//       direction === 'next' 
//         ? (prev + 1) % selectedRooms.length 
//         : prev === 0 ? selectedRooms.length - 1 : prev - 1
//     );
//   };

//   // Save room rent configuration
//   const handleSave = async () => {
//     setIsSaving(true);
//     setError(null);

//     try {
//       // Validate required fields
//       const validationErrors = [];
//       selectedRooms.forEach(room => {
//         const data = roomData[room.type];
//         if (!data.price || data.price <= 0) {
//           validationErrors.push(`Invalid rent for ${room.label}`);
//         }
//         if (!data.deposit || data.deposit < 0) {
//           validationErrors.push(`Invalid deposit for ${room.label}`);
//         }
//         if (data.availableCount === undefined || data.availableCount < 0) {
//           validationErrors.push(`Invalid room count for ${room.label}`);
//         }
//       });

//       if (validationErrors.length > 0) {
//         throw new Error(validationErrors.join("\n"));
//       }

//       // Prepare data for API
//       const rentData = selectedRooms.map(room => ({
//         roomType: room.type,
//         price: roomData[room.type].price,
//         deposit: roomData[room.type].deposit,
//         availableCount: roomData[room.type].availableCount,
//         amenities: Object.entries(roomData[room.type].amenities)
//           .filter(([_, isSelected]) => isSelected)
//           .map(([amenity]) => amenity)
//       }));

//       // Save to backend or localStorage
//       if (propertyId) {
//         await roomAPI.saveRoomRentData(rentData);
//       } else {
//         localStorage.setItem("roomRentData", JSON.stringify(roomData));
//       }

//       nextStep();
//     } catch (err) {
//       console.error("Failed to save room rent data:", err);
//       setError(err.message || "Failed to save room configuration");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (initialLoad) {
//     return (
//       <div className="text-center p-8">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
//         <p className="mt-2">Loading room configuration...</p>
//       </div>
//     );
//   }

//   if (!currentRoom) {
//     return (
//       <div className="text-center p-8">
//         <p>No room data available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
//       <h2 className="text-xl font-semibold text-center mb-6">
//         {isEditMode ? "Edit" : "Configure"} Rent & Amenities
//       </h2>

//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Room navigation */}
//       <div className="flex items-center justify-between mb-6">
//         <button 
//           onClick={() => navigateRoom('prev')} 
//           className="p-2 rounded-full hover:bg-gray-200"
//         >
//           <ChevronLeft size={24} />
//         </button>
//         <h3 className="text-xl font-bold text-center">
//           {currentRoom.label}
//         </h3>
//         <button 
//           onClick={() => navigateRoom('next')} 
//           className="p-2 rounded-full hover:bg-gray-200"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       {/* Rent configuration form */}
//       <div className="space-y-4 mb-6">
//         <div>
//           <label className="block text-sm font-medium mb-1">Rent (₹)*</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md"
//             value={currentData.price }
//             onChange={(e) => handleChange("price", e.target.value)}
//             min="1"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Deposit (₹)*</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md"
//             value={currentData.deposit }
//             onChange={(e) => handleChange("deposit", e.target.value)}
//             min="0"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Available Rooms*</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md"
//             value={currentData.availableCount }
//             onChange={(e) => handleChange("availableCount", e.target.value)}
//             min="0"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Amenities</label>
//           <div className="grid grid-cols-2 gap-2">
//             {Object.entries(currentData.amenities || {}).map(([amenity, isSelected]) => (
//               <label key={amenity} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 accent-yellow-500"
//                   checked={isSelected}
//                   onChange={() => handleAmenityToggle(amenity)}
//                 />
//                 <span>{amenity}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Navigation buttons */}
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={prevStep}
//           className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
//         >
//           Back
//         </button>
//         <button
//           className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md ${
//             isSaving ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//           onClick={handleSave}
//           disabled={isSaving}
//         >
//           {isSaving ? 'Saving...' : 'Save and Continue'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HostelRoomSelection;



// import { useState, useEffect } from "react";
// import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
// import { roomAPI } from "../PropertyController";

// const HostelRoomSelection = ({ 
//   selectedRooms, 
//   nextStep, 
//   prevStep,
//   roomTypes,
//   propertyId,
//   isEditMode
// }) => {
//   const [floors, setFloors] = useState(1);
//   const [currentFloor, setCurrentFloor] = useState(1);
//   const [floorData, setFloorData] = useState({});
//   const [roomNumbers, setRoomNumbers] = useState({});
//   const [showRoomRent, setShowRoomRent] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [initialLoad, setInitialLoad] = useState(true);

//   const filteredRooms = roomTypes
//     .filter(room => selectedRooms.includes(room.type))
//     .map(room => ({
//       id: room.type,
//       label: room.label,
//       type: room.type,
//       capacity: room.capacity

//     }));

//   useEffect(() => {
//     const loadFloorData = async () => {
//       if (!propertyId) {
//         setInitialLoad(false);
//         return;
//       }

//       try {
//         setIsSaving(true);
//         const response = await roomAPI.getFloorData(propertyId);

//         if (response.data?.success) {
//           const data = response.data;
//           setFloorData(data.floors || {});

//           // Set number of floors
//           const floorCount = Object.keys(data.floors || {}).length;
//           setFloors(floorCount > 0 ? floorCount : 1);

//           // Initialize with first floor data if available
//           if (data.floors?.[1]) {
//             setRoomNumbers(data.floors[1]);
//           }
//         }
//       } catch (err) {
//         console.error("Failed to load floor data:", err);
//         setError("Failed to load existing floor configuration");
//       } finally {
//         setIsSaving(false);
//         setInitialLoad(false);
//       }
//     };

//     loadFloorData();
//   }, [propertyId]);

//   const handleRoomNumberChange = (roomType, value) => {
//     setRoomNumbers(prev => ({ 
//       ...prev, 
//       [roomType]: value 
//     }));
//   };

//   const saveCurrentFloor = () => {
//   const processedRooms = {};

//   Object.entries(roomNumbers).forEach(([roomType, csv]) => {
//     if (csv) {
//       csv.split(",").map(r => r.trim()).forEach(roomNumber => {
//         if (roomNumber) {
//           processedRooms[roomNumber] = roomType;
//         }
//       });
//     }
//   });

//   setFloorData(prev => ({
//     ...prev,
//     [currentFloor]: processedRooms
//   }));
// };


//   const handleFloorChange = (newFloor) => {
//     saveCurrentFloor();
//     setRoomNumbers(floorData[newFloor] || {});
//     setCurrentFloor(newFloor);
//   };

//   const handleFinalSave = async () => {
//   setIsSaving(true);
//   setError(null);
//   saveCurrentFloor();

//   try {
//     // Prepare floors data for API - ensure proper structure
//     const floorsToSave = [];

//     for (let i = 1; i <= floors; i++) {
//       floorsToSave.push({
//         floor: i, // This is the required field
//         rooms: floorData[i] || {} // Room numbers for this floor
//       });
//     }

//     if (propertyId) {
//       await roomAPI.saveFloorData(propertyId, {
//         selectedRooms: filteredRooms.map(room => room.type),
//         floors: floorsToSave
//       });
//     }

//     setShowRoomRent(true);
//   } catch (err) {
//     console.error("Failed to save floor data:", err);
//     setError(err.response?.data?.message || "Failed to save floor configuration");
//   } finally {
//     setIsSaving(false);
//   }
// };

//   if (initialLoad) {
//     return <div className="text-center p-8">Loading floor configuration...</div>;
//   }

//   if (showRoomRent) {
//     return (
//       <RoomRent
//         nextStep={nextStep}
//         prevStep={() => setShowRoomRent(false)}
//         selectedRooms={filteredRooms}
//         roomTypes={roomTypes}
//         propertyId={propertyId}
//         isEditMode={isEditMode}
//       />
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">
//         {isEditMode ? "Edit" : "Configure"} Room Numbers by Floor
//       </h2>

//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
//           <p>{error}</p>
//         </div>
//       )}

//       <div className="flex items-center gap-4 mb-6">
//         <span className="text-sm font-medium">Number of floors:</span>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => {
//               const newFloors = Math.max(1, floors - 1);
//               setFloors(newFloors);
//               if (currentFloor > newFloors) {
//                 handleFloorChange(newFloors);
//               }
//             }}
//             className="border p-2 rounded-md hover:bg-gray-100"
//             disabled={floors <= 1}
//           >
//             <Minus size={16} />
//           </button>
//           <span className="text-lg font-bold w-8 text-center">{floors}</span>
//           <button
//             onClick={() => setFloors(floors + 1)}
//             className="border p-2 rounded-md hover:bg-gray-100"
//           >
//             <Plus size={16} />
//           </button>
//         </div>
//       </div>

//       <div className="flex items-center justify-center gap-4 mb-6">
//         <button
//           onClick={() => handleFloorChange(currentFloor - 1)}
//           disabled={currentFloor <= 1}
//           className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
//         >
//           <ChevronLeft size={24} />
//         </button>
//         <span className="text-lg font-semibold">Floor {currentFloor}</span>
//         <button
//           onClick={() => handleFloorChange(currentFloor + 1)}
//           disabled={currentFloor >= floors}
//           className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         {filteredRooms.map((room) => (
//           <div key={`${room.type}_${currentFloor}`} className="border p-4 rounded-md">
//             <div className="flex justify-center gap-1 mb-2">
//               {[...Array(Math.min(room.capacity, 6))].map((_, index) => (
//                 <div key={index} className="bg-yellow-400 w-6 h-10 rounded-sm"></div>
//               ))}
//             </div>
//             <h3 className="text-center font-semibold mb-2">{room.label}</h3>
//             <label className="text-xs block mb-1 text-gray-600">
//               Room numbers (comma separated):
//             </label>
//             <input
//               type="text"
//               className="border p-2 rounded-md w-full"
//               placeholder="Eg: 101, 102, 103A"
//               value={roomNumbers[room.type] || ""}
//               onChange={(e) => handleRoomNumberChange(room.type, e.target.value)}
//             />
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           onClick={prevStep}
//           className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
//         >
//           Back
//         </button>
//         <button
//           className={`bg-yellow-400 text-black py-2 px-6 rounded-md hover:bg-yellow-500 ${
//             isSaving ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//           onClick={handleFinalSave}
//           disabled={isSaving}
//         >
//           {isSaving ? 'Saving...' : 'Save & Continue'}
//         </button>
//       </div>
//     </div>
//   );
// };

// const RoomRent = ({ 
//   selectedRooms, 
//   nextStep, 
//   prevStep,
//   roomTypes,
//   propertyId,
//   isEditMode
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [roomData, setRoomData] = useState({});
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [initialLoad, setInitialLoad] = useState(true);

//   // Standard amenities list that can be extended
//   const standardAmenities = [
//     'AC', 'WiFi', 'Laundry', 'Iron', 'TV', 'Geyser',
//     'Attached Bathroom', 'Hot Water', 'Room Cleaning',
//     'Power Backup', 'Parking', 'Lift'
//   ];

//   useEffect(() => {
//     const initializeData = async () => {
//       try {
//         setIsSaving(true);
//         let existingData = {};

//         if (propertyId) {
//           const response = await roomAPI.getRoomRentData(propertyId);
//           if (response.data?.success) {
//             response.data.rentData.forEach(item => {
//               existingData[item.roomType] = {
//                 price: item.price,
//                 deposit: item.deposit,
//                 availableCount: item.availableCount,
//                 amenities: item.amenities.reduce((acc, amenity) => {
//                   acc[amenity] = true;
//                   return acc;
//                 }, {})
//               };
//             });
//           }
//         }

//         // Initialize data structure for all selected rooms
//         const initializedData = {};
//         selectedRooms.forEach(room => {
//           const roomType = roomTypes.find(r => r.type === room.type);
//           if (!roomType) {
//             console.warn(`Room type ${room.type} not found in roomTypes`);

//             return;
//           }


//           // Start with all standard amenities set to false
//           const defaultAmenities = standardAmenities.reduce((acc, amenity) => {

//             acc[amenity] = false;
//             return acc;
//           }, {});

//           // Merge with existing amenities from database
//           const mergedAmenities = {
//             ...defaultAmenities,
//             ...(roomType?.amenities || []).reduce((acc, amenity) => {
//               acc[amenity] = true;
//               return acc;
//             }, {}),
//             ...existingData[room.type]?.amenities
//           };

//           initializedData[room.type] = {
//             price: roomType?.price ,
//             deposit: roomType?.deposit ,
//             availableCount: roomType?.availableCount ,
//             amenities: mergedAmenities,
//             ...existingData[room.type]
//           };
//         });

//         setRoomData(initializedData);
//       } catch (err) {
//         console.error("Failed to initialize room data:", err);
//         setError("Failed to load existing room configuration");
//       } finally {
//         setIsSaving(false);
//         setInitialLoad(false);
//       }
//     };

//     initializeData();
//   }, [selectedRooms, roomTypes, propertyId]);

//   const currentRoom = selectedRooms[currentIndex];
//   const currentData = roomData[currentRoom?.type] || {};

//   // Get all unique amenities from both standard and existing data
//   const getAllAmenities = () => {
//     const allAmenities = new Set(standardAmenities);

//     // Add any custom amenities that might exist in the data
//     if (currentData.amenities) {
//       Object.keys(currentData.amenities).forEach(amenity => {
//         allAmenities.add(amenity);
//       });
//     }

//     return Array.from(allAmenities).sort();
//   };

//   const handleChange = (field, value) => {
//     setRoomData(prev => ({
//       ...prev,
//       [currentRoom.type]: {
//         ...prev[currentRoom.type],
//         [field]: Number(value) 
//       }
//     }));
//   };

//   const handleAmenityToggle = (amenity) => {
//     setRoomData(prev => ({
//       ...prev,
//       [currentRoom.type]: {
//         ...prev[currentRoom.type],
//         amenities: {
//           ...prev[currentRoom.type].amenities,
//           [amenity]: !prev[currentRoom.type].amenities[amenity]
//         }
//       }
//     }));
//   };

//   const handleAddCustomAmenity = (newAmenity) => {
//     if (newAmenity && !currentData.amenities[newAmenity]) {
//       setRoomData(prev => ({
//         ...prev,
//         [currentRoom.type]: {
//           ...prev[currentRoom.type],
//           amenities: {
//             ...prev[currentRoom.type].amenities,
//             [newAmenity]: true
//           }
//         }
//       }));
//     }
//   };

//   const handleRemoveAmenity = (amenity) => {
//     if (currentData.amenities[amenity]) {
//       const newAmenities = {...currentData.amenities};
//       delete newAmenities[amenity];

//       setRoomData(prev => ({
//         ...prev,
//         [currentRoom.type]: {
//           ...prev[currentRoom.type],
//           amenities: newAmenities
//         }
//       }));
//     }
//   };

//   const navigateRoom = (direction) => {
//     setCurrentIndex(prev => 
//       direction === 'next' 
//         ? (prev + 1) % selectedRooms.length 
//         : prev === 0 ? selectedRooms.length - 1 : prev - 1
//     );
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     setError(null);

//     try {
//       const rentData = selectedRooms.map(room => ({
//         roomType: room.type,

//         price: roomData[room.type].price,
//         deposit: roomData[room.type].deposit,
//         availableCount: roomData[room.type].availableCount,
//         amenities: Object.entries(roomData[room.type].amenities)
//           .filter(([_, isSelected]) => isSelected)
//           .map(([amenity]) => amenity)
//       }));

//       if (propertyId) {
//         await roomAPI.saveRoomRentData(propertyId, rentData);
//       }

//       nextStep();
//     } catch (err) {
//       console.error("Failed to save room rent data:", err);
//       setError(err.message || "Failed to save room configuration");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (initialLoad) {
//     return <div className="text-center p-8">Loading room configuration...</div>;
//   }

//   if (!currentRoom) {
//     return <div className="text-center p-8">No room data available</div>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
//       <h2 className="text-xl font-semibold text-center mb-6">
//         {isEditMode ? "Edit" : "Configure"} Rent & Amenities
//       </h2>

//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
//           <p>{error}</p>
//         </div>
//       )}

//       <div className="flex items-center justify-between mb-6">
//         <button onClick={() => navigateRoom('prev')} className="p-2 rounded-full hover:bg-gray-200">
//           <ChevronLeft size={24} />
//         </button>
//         <h3 className="text-xl font-bold text-center">{currentRoom.label}</h3>
//         <button onClick={() => navigateRoom('next')} className="p-2 rounded-full hover:bg-gray-200">
//           <ChevronRight size={24} />
//         </button>
//       </div>

//       <div className="space-y-4 mb-6">
//         <div>
//           <label className="block text-sm font-medium mb-1">Rent (₹)*</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md"
//             value={currentData.price }
//             onChange={(e) => handleChange("price", e.target.value)}
//             min="1"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Deposit (₹)*</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md"
//             value={currentData.deposit }
//             onChange={(e) => handleChange("deposit", e.target.value)}
//             min="0"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Available Rooms*</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md"
//             value={currentData.availableCount }
//             onChange={(e) => handleChange("availableCount", e.target.value)}
//             min="0"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Amenities</label>

//           {/* Add new amenity input */}
//           <div className="flex mb-4">
//             <input
//               type="text"
//               className="flex-1 p-2 border rounded-l-md"
//               placeholder="Add custom amenity"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   handleAddCustomAmenity(e.target.value);
//                   e.target.value = '';
//                 }
//               }}
//             />
//             <button
//               className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 rounded-r-md"
//               onClick={(e) => {
//                 const input = e.target.previousSibling;
//                 handleAddCustomAmenity(input.value);
//                 input.value = '';
//               }}
//             >
//               Add
//             </button>
//           </div>

//           {/* Amenities grid with remove option */}
//           <div className="grid grid-cols-2 gap-2">
//             {getAllAmenities().map(amenity => (
//               <div key={amenity} className="flex items-center justify-between">
//                 <label className="flex items-center space-x-2 flex-1">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 accent-yellow-500"
//                     checked={currentData.amenities?.[amenity] || false}
//                     onChange={() => handleAmenityToggle(amenity)}
//                   />
//                   <span>{amenity}</span>
//                 </label>
//                 {!standardAmenities.includes(amenity) && (
//                   <button 
//                     onClick={() => handleRemoveAmenity(amenity)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     ×
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           onClick={prevStep}
//           className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
//         >
//           Back
//         </button>
//         <button
//           className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md ${
//             isSaving ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//           onClick={handleSave}
//           disabled={isSaving}
//         >
//           {isSaving ? 'Saving...' : 'Save and Continue'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HostelRoomSelection;





import { useState, useEffect } from "react";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { roomAPI } from "../PropertyController";

const HostelRoomSelection = ({
  selectedRooms,
  nextStep,
  prevStep,
  roomTypes,
  propertyId,
  isEditMode
}) => {
  const [floors, setFloors] = useState(1);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [floorData, setFloorData] = useState({});
  const [roomNumbers, setRoomNumbers] = useState({});
  const [showRoomRent, setShowRoomRent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const filteredRooms = roomTypes
    .filter(room => selectedRooms.includes(room.type))
    .map(room => ({
      id: room.type,
      label: room.label,
      type: room.type,
      capacity: room.capacity
    }));

 useEffect(() => {
  const loadFloorData = async () => {
    if (!propertyId) {
      setInitialLoad(false);
      return;
    }
    try {
      setIsSaving(true);
      const response = await roomAPI.getRoomTypes(propertyId);
      const roomConfig = response.data?.roomConfig || {};
      const floorConfig = roomConfig.floors || [];

      console.log("room config-", roomConfig);
      console.log("floor config-", floorConfig);

      const floorsData = {};

      floorConfig.forEach(floor => {
        const rooms = {};
        // Convert Map or object safely
        const roomEntries = floor.rooms instanceof Map ? Object.fromEntries(floor.rooms) : floor.rooms || {};
        Object.entries(roomEntries).forEach(([roomType, roomNumbers]) => {
          // roomNumbers may be array or string
          if (Array.isArray(roomNumbers)) {
            rooms[roomType] = roomNumbers.join(', ');
          } else if (typeof roomNumbers === 'string') {
            rooms[roomType] = roomNumbers.split(',').map(num => num.trim()).join(', ');
          }
        });
        floorsData[floor.floor] = rooms;
      });

      setFloors(floorConfig.length || 1);
      setFloorData(floorsData);
      setRoomNumbers(floorsData[1] || {});
    } catch (err) {
      console.error("Failed to load floor data:", err);
      setError("Failed to load existing floor configuration");
    } finally {
      setIsSaving(false);
      setInitialLoad(false);
    }
  };
  loadFloorData();
}, [propertyId]);


  const handleRoomNumberChange = (roomType, value) => {
    setRoomNumbers(prev => ({ ...prev, [roomType]: value }));
  };

  const saveCurrentFloor = () => {
    const processedRooms = {};
    Object.entries(roomNumbers).forEach(([roomType, roomNumbersStr]) => {
      if (roomNumbersStr) {
        processedRooms[roomType] = roomNumbersStr.split(',').map(num => num.trim()).join(', ');
      }
    });
    setFloorData(prev => ({
      ...prev,
      [currentFloor]: processedRooms
    }));
  };

  const handleFloorChange = (newFloor) => {
    saveCurrentFloor();
    setRoomNumbers(floorData[newFloor] || {});
    setCurrentFloor(newFloor);
  };

 const handleFinalSave = async () => {
  setIsSaving(true);
  setError(null);

  // Create a copy of floorData including the latest current floor
  const updatedFloorData = {
    ...floorData,
    [currentFloor]: {
      ...roomNumbers
    }
  };

  try {
    // Validation using updatedFloorData
    filteredRooms.forEach(room => {
      for (let i = 1; i <= floors; i++) {
        if (!updatedFloorData[i]?.[room.type]) {
          throw new Error(`Please enter room numbers for ${room.label} on floor ${i}`);
        }
      }
    });

    const floorsToSave = [];

    for (let i = 1; i <= floors; i++) {
      const floorObj = {
        floor: i,
        rooms: []
      };
      filteredRooms.forEach(room => {
        const roomNumbersStr = updatedFloorData[i]?.[room.type] || "";
        const roomNumbersArr = roomNumbersStr.split(",").map(num => num.trim()).filter(Boolean);
        roomNumbersArr.forEach(roomNumber => {
          floorObj.rooms.push({
            roomNumber,
            type: room.type
          });
        });
      });
      floorsToSave.push(floorObj);
    }

    if (propertyId) {
      const response = await roomAPI.saveFloorData(propertyId, {
        selectedRooms: filteredRooms.map(room => room.type),
        floors: floorsToSave
      });
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to save floor configuration");
      }
    }

    // Update state with saved data
    setFloorData(updatedFloorData);
    setShowRoomRent(true);
  } catch (err) {
    console.error("Failed to save floor data:", err);
    setError(err.response?.data?.message || err.message || "Failed to save floor configuration");
  } finally {
    setIsSaving(false);
  }
};


  if (initialLoad) {
    return <div className="text-center p-8">Loading floor configuration...</div>;
  }

  if (showRoomRent) {
    return (
      <RoomRent
        nextStep={nextStep}
        prevStep={() => setShowRoomRent(false)}
        selectedRooms={filteredRooms}
        roomTypes={roomTypes}
        propertyId={propertyId}
        isEditMode={isEditMode}
      />
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {isEditMode ? "Edit" : "Configure"} Room Numbers by Floor
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-medium">Number of floors:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newFloors = Math.max(1, floors - 1);
              setFloors(newFloors);
              if (currentFloor > newFloors) {
                handleFloorChange(newFloors);
              }
            }}
            className="border p-2 rounded-md hover:bg-gray-100"
            disabled={floors <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="text-lg font-bold w-8 text-center">{floors}</span>
          <button
            onClick={() => setFloors(floors + 1)}
            className="border p-2 rounded-md hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => handleFloorChange(currentFloor - 1)}
          disabled={currentFloor <= 1}
          className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-semibold">Floor {currentFloor}</span>
        <button
          onClick={() => handleFloorChange(currentFloor + 1)}
          disabled={currentFloor >= floors}
          className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredRooms.map((room) => (
          <div key={`${room.type}_${currentFloor}`} className="border p-4 rounded-md">
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(Math.min(room.capacity, 6))].map((_, index) => (
                <div key={index} className="bg-yellow-400 w-6 h-10 rounded-sm"></div>
              ))}
            </div>
            <h3 className="text-center font-semibold mb-2">{room.label}</h3>
            <label className="text-xs block mb-1 text-gray-600">
              Room numbers (comma separated):
            </label>
            <input
              type="text"
              className="border p-2 rounded-md w-full"
              placeholder="Eg: 101, 102, 103A"
              value={roomNumbers[room.type] || ""}
              onChange={(e) => handleRoomNumberChange(room.type, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          className={`bg-yellow-400 text-black py-2 px-6 rounded-md hover:bg-yellow-500 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={handleFinalSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
    </div>
  );
};

const RoomRent = ({
  selectedRooms,
  nextStep,
  prevStep,
  roomTypes,
  propertyId,
  isEditMode
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roomData, setRoomData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const standardAmenities = [
    'AC', 'WiFi', 'Laundry', 'Iron', 'TV', 'Geyser',
    'Attached Bathroom', 'Hot Water', 'Room Cleaning',
    'Power Backup', 'Parking', 'Lift'
  ];

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsSaving(true);
        let existingData = {};

        if (propertyId) {
          const response = await roomAPI.getRoomTypes(propertyId);
          const roomConfig = response.data?.roomConfig || {};
          const fetchedRoomTypes = roomConfig.roomTypes || [];

          fetchedRoomTypes.forEach(room => {
            existingData[room.type] = {
              price: room.price,
              deposit: room.deposit,
              availableCount: room.availableCount,
              amenities: (room.amenities || []).reduce((acc, amenity) => {
                acc[amenity] = true;
                return acc;
              }, {})
            };
          });
        }

        // Initialize data structure for all selected rooms
        const initializedData = {};
        selectedRooms.forEach(room => {
          const roomType = roomTypes.find(r => r.type === room.type) || {};

          // Start with all standard amenities set to false
          const defaultAmenities = standardAmenities.reduce((acc, amenity) => {
            acc[amenity] = false;
            return acc;
          }, {});

          // Merge with existing data
          initializedData[room.type] = {
            price: roomType.price,
            deposit: roomType.deposit,
            availableCount: roomType.availableCount,
            amenities: {
              ...defaultAmenities,
              ...existingData[room.type]?.amenities
            }
          };
        });

        setRoomData(initializedData);
      } catch (err) {
        console.error("Failed to initialize room data:", err);
        setError("Failed to load existing room configuration");
      } finally {
        setIsSaving(false);
        setInitialLoad(false);
      }
    };

    initializeData();
  }, [selectedRooms, roomTypes, propertyId]);

  const currentRoom = selectedRooms[currentIndex];
  const currentData = roomData[currentRoom?.type] || {};

  const getAllAmenities = () => {
    const allAmenities = new Set(standardAmenities);

    if (currentData.amenities) {
      Object.keys(currentData.amenities).forEach(amenity => {
        allAmenities.add(amenity);
      });
    }

    return Array.from(allAmenities).sort();
  };

  const handleChange = (field, value) => {
    setRoomData(prev => ({
      ...prev,
      [currentRoom.type]: {
        ...prev[currentRoom.type],
        [field]: value === "" ? "" : Number(value), // allow clearing
      },
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setRoomData(prev => ({
      ...prev,
      [currentRoom.type]: {
        ...prev[currentRoom.type],
        amenities: {
          ...prev[currentRoom.type].amenities,
          [amenity]: !prev[currentRoom.type].amenities[amenity]
        }
      }
    }));
  };

  const handleAddCustomAmenity = (newAmenity) => {
    if (newAmenity && !currentData.amenities[newAmenity]) {
      setRoomData(prev => ({
        ...prev,
        [currentRoom.type]: {
          ...prev[currentRoom.type],
          amenities: {
            ...prev[currentRoom.type].amenities,
            [newAmenity]: true
          }
        }
      }));
    }
  };

  const handleRemoveAmenity = (amenity) => {
    if (currentData.amenities[amenity]) {
      const newAmenities = { ...currentData.amenities };
      delete newAmenities[amenity];

      setRoomData(prev => ({
        ...prev,
        [currentRoom.type]: {
          ...prev[currentRoom.type],
          amenities: newAmenities
        }
      }));
    }
  };

  const navigateRoom = (direction) => {
    setCurrentIndex(prev =>
      direction === 'next'
        ? (prev + 1) % selectedRooms.length
        : prev === 0 ? selectedRooms.length - 1 : prev - 1
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const rentData = selectedRooms.map(room => ({
        roomType: room.type,
        price: roomData[room.type].price,
        deposit: roomData[room.type].deposit,
        availableCount: roomData[room.type].availableCount,
        amenities: Object.entries(roomData[room.type].amenities)
          .filter(([_, isSelected]) => isSelected)
          .map(([amenity]) => amenity)
      }));

      if (propertyId) {
        await roomAPI.saveRoomRentData(propertyId, rentData);
      }

      nextStep();
    } catch (err) {
      console.error("Failed to save room rent data:", err);
      setError(err.message || "Failed to save room configuration");
    } finally {
      setIsSaving(false);
    }
  };

  if (initialLoad) {
    return <div className="text-center p-8">Loading room configuration...</div>;
  }

  if (!currentRoom) {
    return <div className="text-center p-8">No room data available</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-6">
        {isEditMode ? "Edit" : "Configure"} Rent & Amenities
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigateRoom('prev')} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-bold text-center">{currentRoom.label}</h3>
        <button onClick={() => navigateRoom('next')} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Rent (₹)*</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={currentData.price ?? ""}
            onChange={(e) => handleChange("price", e.target.value)}
            min="0"
            placeholder="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deposit (₹)*</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={currentData.deposit ?? ""}
            onChange={(e) => handleChange("deposit", e.target.value)}
            min="0"
            placeholder="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Available Rooms*</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={currentData.availableCount ?? ""}
            onChange={(e) => handleChange("availableCount", e.target.value)}
            min="0"
            placeholder="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Amenities</label>

          <div className="flex mb-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-md"
              placeholder="Add custom amenity"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddCustomAmenity(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 rounded-r-md"
              onClick={(e) => {
                const input = e.target.previousSibling;
                handleAddCustomAmenity(input.value);
                input.value = '';
              }}
            >
              Add
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {getAllAmenities().map(amenity => (
              <div key={amenity} className="flex items-center justify-between">
                <label className="flex items-center space-x-2 flex-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-yellow-500"
                    checked={currentData.amenities?.[amenity] || false}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
                {!standardAmenities.includes(amenity) && (
                  <button
                    onClick={() => handleRemoveAmenity(amenity)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md ${isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save and Continue'}
        </button>
      </div>
    </div>
  );
};

export default HostelRoomSelection;