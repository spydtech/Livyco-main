// import React, { useState,  } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../Header"; // Import Header component
// import { ArrowLeft } from "lucide-react";
// import { useMemo } from "react";
// import { bookingAPI } from "../../Clients-components/PropertyController";



// function SingleBed({ room, bed, booked = false, selected, onToggle }) {
//     let mainBg = booked
//         ? "bg-gray-400 text-black"
//         : selected
//             ? "bg-[#FFBD15] text-black"
//             : "bg-[#008000] text-white";
//     let handleBg = "bg-[#BCBCBC] text-black";

//     return (
//         <div className="inline-block">
//             <div
//                 onClick={() => {
//                     if (booked) return;
//                     onToggle?.();
//                 }}
//                 className="relative flex items-center justify-center w-14 h-10 rounded-lg overflow-hidden cursor-pointer select-none transition"
//             >
//                 <div className={`${mainBg} absolute inset-0 rounded-lg`} />
//                 <div className={`absolute z-20 text-sm font-medium ${mainBg}`}>
//                     {room}-{bed}
//                 </div>
//                 <div
//                     className={`absolute right-0 top-0 w-3 h-6 ${handleBg} rounded-sm`}
//                     style={{ transform: "translate(0.30rem, 33%)" }}
//                 />
//             </div>a
//         </div>
//     );
// }

// const Concern = ({
//     currentRoom = 201,
//     currentBed = "A",
//     currentsharing = 6,
//     beds = [
//         { id: 1, room: currentRoom, bed: "A", booked: currentBed === "A" },
//         { id: 2, room: currentRoom, bed: "B", booked: currentBed === "B" },
//         { id: 3, room: currentRoom, bed: "C", booked: currentBed === "C" },
//         { id: 4, room: currentRoom, bed: "D", booked: currentBed === "D" },
//         { id: 5, room: currentRoom, bed: "E", booked: currentBed === "E" },
//         { id: 6, room: currentRoom, bed: "F", booked: currentBed === "F" },
//     ],
// }) => {
//     const navigate = useNavigate();
//     const [service, setService] = useState("");
//     const [selectedId, setSelectedId] = useState(null); // for bed-change
//     const [selectedSharing, setSelectedSharing] = useState("");
//     const [comment, setComment] = useState("");
//     const [showPopup, setShowPopup] = useState(false);
//     const [requestData, setRequestData] = useState(null);
//     const [selectedRoomChangeBedId, setSelectedRoomChangeBedId] = useState(null);
//     const [selectedFloor, setSelectedFloor] = useState(null);



//    // booking api fetching
//    const [bookingData, setbookingData] = useState(null);
//    const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch booking data on component mount
//     useEffect(() => {
//         const fetchBookingData = async () => {
//             try {
//                 setLoading(true);
//                 const response = await bookingAPI.getUserBookings();
                
//                 if (response.data.success && response.data.bookings.length > 0) {
//                     // Get the most recent booking
//                     const latestBooking = response.data.bookings[0];
//                     setBookingData(latestBooking);
//                 } else {
//                     setError("No bookings found");
//                 }
//             } catch (err) {
//                 setError(err.message || "Failed to fetch booking data");
//                 console.error("Error fetching booking data:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookingData();
//     }, []);



//     // Dummy availability data per sharing broken down by floors
//     const sharingFloors = {
//         Single: [
//             { floor: 1, beds: [{ id: 101, room: 301, bed: "A", booked: false }, { id: 102, room: 301, bed: "B", booked: true }, { id: 103, room: 302, bed: "A", booked: false }, { id: 104, room: 303, bed: "A", booked: false }] }
//         ],
//         Double: [
//             { floor: 1, beds: [{ id: 201, room: 401, bed: "A", booked: false }, { id: 202, room: 401, bed: "B", booked: false }, { id: 203, room: 402, bed: "A", booked: true }, { id: 204, room: 402, bed: "B", booked: false }, { id: 209, room: 405, bed: "A", booked: false }] },
//             { floor: 2, beds: [{ id: 205, room: 403, bed: "A", booked: false }, { id: 206, room: 403, bed: "B", booked: true }, { id: 207, room: 404, bed: "A", booked: false }, { id: 208, room: 404, bed: "B", booked: false }, { id: 210, room: 406, bed: "A", booked: false }] }
//         ],
//         Triple: [
//             { floor: 1, beds: [{ id: 301, room: 501, bed: "A", booked: false }, { id: 302, room: 501, bed: "B", booked: false }, { id: 303, room: 501, bed: "C", booked: true }] },
//             { floor: 2, beds: [{ id: 304, room: 502, bed: "A", booked: false }, { id: 305, room: 502, bed: "B", booked: false }, { id: 306, room: 502, bed: "C", booked: false }] },
//             { floor: 3, beds: [{ id: 307, room: 503, bed: "A", booked: false }, { id: 308, room: 503, bed: "B", booked: false }, { id: 309, room: 503, bed: "C", booked: false }] }
//         ],
//         Four: [
//             { floor: 1, beds: [{ id: 401, room: 601, bed: "A", booked: true }, { id: 402, room: 601, bed: "B", booked: false }, { id: 403, room: 601, bed: "C", booked: false }, { id: 404, room: 601, bed: "D", booked: false }] },
//             { floor: 2, beds: [{ id: 405, room: 602, bed: "A", booked: false }, { id: 406, room: 602, bed: "B", booked: false }, { id: 407, room: 602, bed: "C", booked: false }, { id: 408, room: 602, bed: "D", booked: false }] },
//             { floor: 3, beds: [{ id: 409, room: 603, bed: "A", booked: false }, { id: 410, room: 603, bed: "B", booked: false }, { id: 411, room: 603, bed: "C", booked: false }, { id: 412, room: 603, bed: "D", booked: false }] }
//         ],
//         Five: [
//             { floor: 1, beds: [{ id: 501, room: 701, bed: "A", booked: false }, { id: 502, room: 701, bed: "B", booked: false }, { id: 503, room: 701, bed: "C", booked: true }, { id: 504, room: 701, bed: "D", booked: false }, { id: 505, room: 701, bed: "E", booked: false }] },
//             { floor: 2, beds: [{ id: 506, room: 702, bed: "A", booked: false }, { id: 507, room: 702, bed: "B", booked: false }, { id: 508, room: 702, bed: "C", booked: false }, { id: 509, room: 702, bed: "D", booked: false }, { id: 510, room: 702, bed: "E", booked: false }] },
//             { floor: 3, beds: [{ id: 511, room: 703, bed: "A", booked: false }, { id: 512, room: 703, bed: "B", booked: false }, { id: 513, room: 703, bed: "C", booked: false }, { id: 514, room: 703, bed: "D", booked: false }, { id: 515, room: 703, bed: "E", booked: false }] }
//         ],
//         Six: [
//             { floor: 1, beds: [{ id: 601, room: 801, bed: "A", booked: false }, { id: 602, room: 801, bed: "B", booked: false }, { id: 603, room: 801, bed: "C", booked: false }, { id: 604, room: 801, bed: "D", booked: true }, { id: 605, room: 801, bed: "E", booked: false }, { id: 606, room: 801, bed: "F", booked: false }] },
//             { floor: 2, beds: [{ id: 607, room: 802, bed: "A", booked: false }, { id: 608, room: 802, bed: "B", booked: false }, { id: 609, room: 802, bed: "C", booked: false }, { id: 610, room: 802, bed: "D", booked: false }, { id: 611, room: 802, bed: "E", booked: false }, { id: 612, room: 802, bed: "F", booked: false }] },
//             { floor: 3, beds: [{ id: 613, room: 803, bed: "A", booked: false }, { id: 614, room: 803, bed: "B", booked: false }, { id: 615, room: 803, bed: "C", booked: false }, { id: 616, room: 803, bed: "D", booked: false }, { id: 617, room: 803, bed: "E", booked: false }, { id: 618, room: 803, bed: "F", booked: false }] }
//         ]
//     };



//     let visibleBeds = beds.slice(0, currentsharing);
//     if (!visibleBeds.some((b) => b.bed === currentBed)) {
//         const current = beds.find((b) => b.bed === currentBed);
//         if (current) {
//             visibleBeds[visibleBeds.length - 1] = current;
//         }
//     }

//     const toggleBed = (id) => {
//         setSelectedId((prev) => (prev === id ? null : id));
//     };

//     const toggleRoomChangeBed = (id) => {
//         setSelectedRoomChangeBedId((prev) => (prev === id ? null : id));
//     };

//     const isValid = useMemo(() => {
//         if (service === "bed-change") {
//             return selectedId !== null;
//         }
//         if (service === "room-change") {
//             return (
//                 !!selectedSharing &&
//                 selectedFloor !== null &&
//                 selectedRoomChangeBedId !== null
//             );
//         }
//         if (service === "other-services") {
//             return comment.trim().length > 0;
//         }
//         return false;
//     }, [
//         service,
//         selectedId,
//         selectedSharing,
//         comment,
//         selectedRoomChangeBedId,
//         selectedFloor,
//     ]);

//     const handleRaiseRequest = () => {
//         if (service === "bed-change") {
//             const selected = visibleBeds.find((b) => b.id === selectedId);
//             if (!selected) {
//                 alert("Please select a bed.");
//                 return;
//             }
//             setRequestData({
//                 type: service,
//                 bed: selected.bed,
//                 room: selected.room,
//                 originalRoom: currentRoom,
//                 originalBed: currentBed,
//             });
//             setShowPopup(true);
//         } else if (service === "room-change") {
//             if (!selectedSharing) {
//                 alert("Please select a sharing option.");
//                 return;
//             }
//             if (selectedFloor === null) {
//                 alert("Please select a floor.");
//                 return;
//             }
//             const floors = sharingFloors[selectedSharing] || [];
//             const floorInfo = floors.find((f) => f.floor === selectedFloor);
//             if (!floorInfo) {
//                 alert("Invalid floor selected.");
//                 return;
//             }
//             const selected = floorInfo.beds.find(
//                 (b) => b.id === selectedRoomChangeBedId
//             );
//             if (!selected) {
//                 alert("Please select a bed for the room change.");
//                 return;
//             }
//             setRequestData({
//                 type: service,
//                 sharing: selectedSharing,
//                 floor: selectedFloor,
//                 bed: selected.bed,
//                 room: selected.room,
//                 originalRoom: currentRoom,
//                 originalBed: currentBed,
//                 originalSharing: currentsharing,
//             });
//             setShowPopup(true);
//         } else if (service === "other-services") {
//             if (!comment.trim()) {
//                 alert("Please enter a comment.");
//                 return;
//             }
//             setRequestData({
//                 type: service,
//                 comment: comment.trim(),
//                 originalRoom: currentRoom,
//                 originalBed: currentBed,
//                 originalSharing: currentsharing,
//             });
//             setShowPopup(true);
//         } else {
//             alert("Please select a service.");
//         }
//     };

//     const handleConfirmPopup = () => {
//         if (!requestData) return;
//         navigate("/user/concern/:id", {
//             state: {
//                 ...requestData,
//                 currentRoom,
//                 currentBed,
//                 currentsharing,
//             },
//         });
//     };

//     // Beds for current room-change selection
//     const roomChangeFloorBeds =
//         selectedSharing && selectedFloor
//             ? (sharingFloors[selectedSharing] || []).find(
//                 (f) => f.floor === selectedFloor
//             )?.beds || []
//             : [];

//     return (
//         <>
//         <Header />
//         <div className="px-4 md:px-14 py-24 flex flex-col justify-between relative">
//             {/* LEFT MAIN FORM */}
//             <div className="flex-1 md:max-w-3xl">
//                 <div className="flex text-lg space-x-2 ">
//                     <p>My Stay</p>
//                     <p>&gt;</p>
//                     <p>Raise Concern</p>
//                 </div>

//                 <div className="space-y-10 mt-10 w-4/5">
//                     {/* Room Info */}
//                     <div className="flex flex-col md:flex-row md:justify-between gap-3">
//                         <p>Current Room/Bed Details :</p>
//                         <div className="flex flex-wrap gap-3">
//                             <p className="px-10 text-center bg-[#AFD1FF] py-1 rounded-xl text-[#257FFB]">
//                                 Room {currentRoom}-Bed {currentBed}
//                             </p>
//                             <p className="px-16 text-center bg-[#AFD1FF] py-1 rounded-xl text-[#257FFB]">
//                                 {currentsharing} Sharing
//                             </p>
//                         </div>
//                     </div>

//                     {/* Select Service */}
//                     <div>
//                         <p className="my-5">Select what you want to change</p>
//                         <select
//                             value={service}
//                             onChange={(e) => {
//                                 setService(e.target.value);
//                                 // reset dependent selections when switching service
//                                 setSelectedId(null);
//                                 setSelectedSharing("");
//                                 setComment("");
//                                 setSelectedRoomChangeBedId(null);
//                                 setSelectedFloor(null);
//                             }}
//                             className="w-full bg-gray-300 py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="" disabled>
//                                 Choose a service…
//                             </option>
//                             <option value="bed-change">Bed Change</option>
//                             <option value="room-change">Room Change</option>
//                             <option value="other-services">Other Services</option>
//                         </select>

//                         {/* Bed Change */}
//                         {service === "bed-change" && (
//                             <div className="p-4 bg-white rounded-md">
//                                 <h3 className="text-sm mb-5">Select your preferred bed</h3>
//                                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                                     {visibleBeds.map((b) => (
//                                         <SingleBed
//                                             key={b.id}
//                                             room={b.room}
//                                             bed={b.bed}
//                                             booked={b.booked}
//                                             selected={selectedId === b.id}
//                                             onToggle={() => toggleBed(b.id)}
//                                         />
//                                     ))}
//                                 </div>
//                                 <div className="flex mt-5 space-x-5">
//                                     <div className="flex flex-col items-center justify-center">
//                                         <p className="w-4 h-4 rounded-sm bg-[#008000]"></p>
//                                         <p className="text-xs">Available</p>
//                                     </div>
//                                     <div className="flex flex-col items-center justify-center">
//                                         <p className="w-4 h-4 rounded-sm bg-gray-400"></p>
//                                         <p className="text-xs">Not Available</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Room Change */}
//                         {service === "room-change" && (
//                             <div className="p-4 bg-white rounded-md space-y-4">
//                                 <div>
//                                     <h3 className="font-semibold mb-2">
//                                         Select your preferred Sharing
//                                     </h3>
//                                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                                         {[
//                                             "Single",
//                                             "Double",
//                                             "Triple",
//                                             "Four",
//                                             "Five",
//                                             "Six",
//                                         ].map((text) => (
//                                             <div
//                                                 key={text}
//                                                 onClick={() => {
//                                                     setSelectedSharing(text);
//                                                     setSelectedRoomChangeBedId(null);
//                                                     const floors = sharingFloors[text] || [];
//                                                     setSelectedFloor(floors[0]?.floor || null);
//                                                 }}
//                                                 className={`flex flex-col items-center justify-center h-20 border rounded-xl font-medium cursor-pointer transition
//                           ${selectedSharing === text
//                                                         ? "bg-gray-300 text-black"
//                                                         : "bg-white text-gray-500"
//                                                     }`}
//                                             >
//                                                 <p>{text}</p>
//                                                 <p>Sharing</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Floor Tabs */}
//                                 {selectedSharing && (
//                                     <div>
//                                         <h4 className="font-medium mb-2">Select Floor</h4>
//                                         <div className="flex gap-3 flex-wrap">
//                                             {(sharingFloors[selectedSharing] || []).map((f) => (
//                                                 <div
//                                                     key={f.floor}
//                                                     onClick={() => {
//                                                         setSelectedFloor(f.floor);
//                                                         setSelectedRoomChangeBedId(null);
//                                                     }}
//                                                     className={`px-4 py-2 rounded-full cursor-pointer border ${selectedFloor === f.floor
//                                                             ? "bg-[#0827B2] text-white"
//                                                             : "bg-white text-gray-700"
//                                                         }`}
//                                                 >
//                                                     Floor {f.floor}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Bed selection for room-change */}
//                                 {selectedSharing && selectedFloor && (
//                                     <div className="p-4 bg-white rounded-md">
//                                         <h3 className="text-sm mb-5">
//                                             Select preferred bed for the new sharing on Floor{" "}
//                                             {selectedFloor}
//                                         </h3>
//                                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                                             {roomChangeFloorBeds.map((b) => (
//                                                 <SingleBed
//                                                     key={b.id}
//                                                     room={b.room}
//                                                     bed={b.bed}
//                                                     booked={b.booked}
//                                                     selected={selectedRoomChangeBedId === b.id}
//                                                     onToggle={() => toggleRoomChangeBed(b.id)}
//                                                 />
//                                             ))}
//                                         </div>
//                                         <div className="flex mt-5 space-x-5">
//                                             <div className="flex flex-col items-center justify-center">
//                                                 <p className="w-4 h-4 rounded-sm bg-[#008000]"></p>
//                                                 <p className="text-xs">Available</p>
//                                             </div>
//                                             <div className="flex flex-col items-center justify-center">
//                                                 <p className="w-4 h-4 rounded-sm bg-gray-400"></p>
//                                                 <p className="text-xs">Not Available</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {/* Other Services */}
//                         {service === "other-services" && (
//                             <div className="p-4 mt-5 bg-white rounded-md">
//                                 <h3 className="mb-2">Reason for request</h3>
//                                 <textarea
//                                     className="w-full p-2 border rounded-md"
//                                     placeholder="Write your comment..."
//                                     value={comment}
//                                     rows={3}
//                                     onChange={(e) => setComment(e.target.value)}
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             {/* Submit Button */}
//             <div className="flex justify-center items-center mt-16">
//                 <button
//                     className={`px-8 py-2 rounded-xl w-full sm:w-auto transition 
//             ${isValid
//                             ? "bg-[#0827B2] text-white cursor-pointer"
//                             : "bg-gray-400 text-gray-700 cursor-not-allowed"
//                         }`}
//                     onClick={handleRaiseRequest}
//                     disabled={!isValid}
//                     aria-disabled={!isValid}
//                 >
//                     Raise request
//                 </button>
//             </div>

//             {/* Confirmation Popup */}
//             {showPopup && (
//                 <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
//                     <div className="bg-white p-6 rounded-lg text-center shadow-xl space-y-10 w-full max-w-xl">
//                         <h2 className="text-lg font-light">
//                             Your {service} request has been submitted successfully!
//                         </h2>
//                         <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIZGbCvHiBya96wib7Pmp-KswFthzlnCTVSw&s"
//                             className="mx-auto w-44 h-44 object-fill"
//                             alt="Thumbs up"
//                         />
//                         <button
//                             className="bg-[#0827B2] text-white w-full py-2 rounded-lg"
//                             onClick={handleConfirmPopup}
//                         >
//                             Okay, Got it!
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//         </>
//     );
// };

// export default Concern;






import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { bookingAPI } from "../../Clients-components/PropertyController"; // Adjust the import path

function SingleBed({ room, bed, booked = false, selected, onToggle }) {
    let mainBg = booked
        ? "bg-gray-400 text-black"
        : selected
            ? "bg-[#FFBD15] text-black"
            : "bg-[#008000] text-white";
    let handleBg = "bg-[#BCBCBC] text-black";

    return (
        <div className="inline-block">
            <div
                onClick={() => {
                    if (booked) return;
                    onToggle?.();
                }}
                className="relative flex items-center justify-center w-14 h-10 rounded-lg overflow-hidden cursor-pointer select-none transition"
            >
                <div className={`${mainBg} absolute inset-0 rounded-lg`} />
                <div className={`absolute z-20 text-sm font-medium ${mainBg}`}>
                    {room}-{bed}
                </div>
                <div
                    className={`absolute right-0 top-0 w-3 h-6 ${handleBg} rounded-sm`}
                    style={{ transform: "translate(0.30rem, 33%)" }}
                />
            </div>
        </div>
    );
}

const Concern = () => {
    const navigate = useNavigate();
    const [service, setService] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [selectedSharing, setSelectedSharing] = useState("");
    const [comment, setComment] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [requestData, setRequestData] = useState(null);
    const [selectedRoomChangeBedId, setSelectedRoomChangeBedId] = useState(null);
    const [selectedFloor, setSelectedFloor] = useState(null);
    
    // State for booking data
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch booking data on component mount
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                setLoading(true);
                const response = await bookingAPI.getUserBookings();
                
                if (response.data.success && response.data.bookings.length > 0) {
                    // Get the most recent booking
                    const latestBooking = response.data.bookings[0];
                    setBookingData(latestBooking);
                    console.log("bookings data", latestBooking)
                } else {
                    setError("No bookings found");
                }
            } catch (err) {
                setError(err.message || "Failed to fetch booking data");
                console.error("Error fetching booking data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, []);

    // Extract current room details from booking data
    const currentRoom = bookingData?.roomNumber || "";
    const currentBed = bookingData?.roomDetails[0]?.bed?.replace("Bed ", "") || "";
    const currentSharing = bookingData?.roomType?.replace(" Sharing", "") || "";
    
    // Generate beds based on sharing type
    const beds = useMemo(() => {
        if (!currentSharing) return [];
        
        const bedLetters = ["A", "B", "C", "D", "E", "F"].slice(0, parseInt(currentSharing));
        return bedLetters.map((letter, index) => ({
            id: index + 1,
            room: currentRoom,
            bed: letter,
            booked: letter === currentBed
        }));
    }, [currentSharing, currentRoom, currentBed]);

    // Dummy availability data per sharing broken down by floors
    const sharingFloors = {
        Single: [
            { floor: 1, beds: [{ id: 101, room: 301, bed: "A", booked: false }, { id: 102, room: 301, bed: "B", booked: true }, { id: 103, room: 302, bed: "A", booked: false }, { id: 104, room: 303, bed: "A", booked: false }] }
        ],
        Double: [
            { floor: 1, beds: [{ id: 201, room: 401, bed: "A", booked: false }, { id: 202, room: 401, bed: "B", booked: false }, { id: 203, room: 402, bed: "A", booked: true }, { id: 204, room: 402, bed: "B", booked: false }, { id: 209, room: 405, bed: "A", booked: false }] },
            { floor: 2, beds: [{ id: 205, room: 403, bed: "A", booked: false }, { id: 206, room: 403, bed: "B", booked: true }, { id: 207, room: 404, bed: "A", booked: false }, { id: 208, room: 404, bed: "B", booked: false }, { id: 210, room: 406, bed: "A", booked: false }] }
        ],
        Triple: [
            { floor: 1, beds: [{ id: 301, room: 501, bed: "A", booked: false }, { id: 302, room: 501, bed: "B", booked: false }, { id: 303, room: 501, bed: "C", booked: true }] },
            { floor: 2, beds: [{ id: 304, room: 502, bed: "A", booked: false }, { id: 305, room: 502, bed: "B", booked: false }, { id: 306, room: 502, bed: "C", booked: false }] },
            { floor: 3, beds: [{ id: 307, room: 503, bed: "A", booked: false }, { id: 308, room: 503, bed: "B", booked: false }, { id: 309, room: 503, bed: "C", booked: false }] }
        ],
        Four: [
            { floor: 1, beds: [{ id: 401, room: 601, bed: "A", booked: true }, { id: 402, room: 601, bed: "B", booked: false }, { id: 403, room: 601, bed: "C", booked: false }, { id: 404, room: 601, bed: "D", booked: false }] },
            { floor: 2, beds: [{ id: 405, room: 602, bed: "A", booked: false }, { id: 406, room: 602, bed: "B", booked: false }, { id: 407, room: 602, bed: "C", booked: false }, { id: 408, room: 602, bed: "D", booked: false }] },
            { floor: 3, beds: [{ id: 409, room: 603, bed: "A", booked: false }, { id: 410, room: 603, bed: "B", booked: false }, { id: 411, room: 603, bed: "C", booked: false }, { id: 412, room: 603, bed: "D", booked: false }] }
        ],
        Five: [
            { floor: 1, beds: [{ id: 501, room: 701, bed: "A", booked: false }, { id: 502, room: 701, bed: "B", booked: false }, { id: 503, room: 701, bed: "C", booked: true }, { id: 504, room: 701, bed: "D", booked: false }, { id: 505, room: 701, bed: "E", booked: false }] },
            { floor: 2, beds: [{ id: 506, room: 702, bed: "A", booked: false }, { id: 507, room: 702, bed: "B", booked: false }, { id: 508, room: 702, bed: "C", booked: false }, { id: 509, room: 702, bed: "D", booked: false }, { id: 510, room: 702, bed: "E", booked: false }] },
            { floor: 3, beds: [{ id: 511, room: 703, bed: "A", booked: false }, { id: 512, room: 703, bed: "B", booked: false }, { id: 513, room: 703, bed: "C", booked: false }, { id: 514, room: 703, bed: "D", booked: false }, { id: 515, room: 703, bed: "E", booked: false }] }
        ],
        Six: [
            { floor: 1, beds: [{ id: 601, room: 801, bed: "A", booked: false }, { id: 602, room: 801, bed: "B", booked: false }, { id: 603, room: 801, bed: "C", booked: false }, { id: 604, room: 801, bed: "D", booked: true }, { id: 605, room: 801, bed: "E", booked: false }, { id: 606, room: 801, bed: "F", booked: false }] },
            { floor: 2, beds: [{ id: 607, room: 802, bed: "A", booked: false }, { id: 608, room: 802, bed: "B", booked: false }, { id: 609, room: 802, bed: "C", booked: false }, { id: 610, room: 802, bed: "D", booked: false }, { id: 611, room: 802, bed: "E", booked: false }, { id: 612, room: 802, bed: "F", booked: false }] },
            { floor: 3, beds: [{ id: 613, room: 803, bed: "A", booked: false }, { id: 614, room: 803, bed: "B", booked: false }, { id: 615, room: 803, bed: "C", booked: false }, { id: 616, room: 803, bed: "D", booked: false }, { id: 617, room: 803, bed: "E", booked: false }, { id: 618, room: 803, bed: "F", booked: false }] }
        ]
    };

    let visibleBeds = beds.slice(0, parseInt(currentSharing));
    if (!visibleBeds.some((b) => b.bed === currentBed)) {
        const current = beds.find((b) => b.bed === currentBed);
        if (current) {
            visibleBeds[visibleBeds.length - 1] = current;
        }
    }

    const toggleBed = (id) => {
        setSelectedId((prev) => (prev === id ? null : id));
    };

    const toggleRoomChangeBed = (id) => {
        setSelectedRoomChangeBedId((prev) => (prev === id ? null : id));
    };

    const isValid = useMemo(() => {
        if (service === "bed-change") {
            return selectedId !== null;
        }
        if (service === "room-change") {
            return (
                !!selectedSharing &&
                selectedFloor !== null &&
                selectedRoomChangeBedId !== null
            );
        }
        if (service === "other-services") {
            return comment.trim().length > 0;
        }
        return false;
    }, [
        service,
        selectedId,
        selectedSharing,
        comment,
        selectedRoomChangeBedId,
        selectedFloor,
    ]);

    const handleRaiseRequest = () => {
        if (service === "bed-change") {
            const selected = visibleBeds.find((b) => b.id === selectedId);
            if (!selected) {
                alert("Please select a bed.");
                return;
            }
            setRequestData({
                type: service,
                bed: selected.bed,
                room: selected.room,
                originalRoom: currentRoom,
                originalBed: currentBed,
            });
            setShowPopup(true);
        } else if (service === "room-change") {
            if (!selectedSharing) {
                alert("Please select a sharing option.");
                return;
            }
            if (selectedFloor === null) {
                alert("Please select a floor.");
                return;
            }
            const floors = sharingFloors[selectedSharing] || [];
            const floorInfo = floors.find((f) => f.floor === selectedFloor);
            if (!floorInfo) {
                alert("Invalid floor selected.");
                return;
            }
            const selected = floorInfo.beds.find(
                (b) => b.id === selectedRoomChangeBedId
            );
            if (!selected) {
                alert("Please select a bed for the room change.");
                return;
            }
            setRequestData({
                type: service,
                sharing: selectedSharing,
                floor: selectedFloor,
                bed: selected.bed,
                room: selected.room,
                originalRoom: currentRoom,
                originalBed: currentBed,
                originalSharing: currentSharing,
            });
            setShowPopup(true);
        } else if (service === "other-services") {
            if (!comment.trim()) {
                alert("Please enter a comment.");
                return;
            }
            setRequestData({
                type: service,
                comment: comment.trim(),
                originalRoom: currentRoom,
                originalBed: currentBed,
                originalSharing: currentSharing,
            });
            setShowPopup(true);
        } else {
            alert("Please select a service.");
        }
    };

    const handleConfirmPopup = () => {
        if (!requestData) return;
        navigate("/user/concern/:id", {
            state: {
                ...requestData,
                currentRoom,
                currentBed,
                currentSharing,
            },
        });
    };

    // Beds for current room-change selection
    const roomChangeFloorBeds =
        selectedSharing && selectedFloor
            ? (sharingFloors[selectedSharing] || []).find(
                (f) => f.floor === selectedFloor
            )?.beds || []
            : [];

    if (loading) {
        return (
            <>
                <Header />
                <div className="px-4 md:px-14 py-24 flex items-center justify-center">
                    <p>Loading your booking information...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="px-4 md:px-14 py-24 flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </>
        );
    }

    if (!bookingData) {
        return (
            <>
                <Header />
                <div className="px-4 md:px-14 py-24 flex items-center justify-center">
                    <p>No active booking found.</p>
                </div>
            </>
        );
    }

    return (
        <>
        <Header />
        <div className="px-4 md:px-14 py-24 flex flex-col justify-between relative">
            {/* LEFT MAIN FORM */}
            <div className="flex-1 md:max-w-3xl">
                <div className="flex text-lg space-x-2 ">
                    <p>My Stay</p>
                    <p>&gt;</p>
                    <p>Raise Concern</p>
                </div>

                <div className="space-y-10 mt-10 w-4/5">
                    {/* Room Info */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-3">
                        <p>Current Room/Bed Details :</p>
                        <div className="flex flex-wrap gap-3">
                            <p className="px-10 text-center bg-[#AFD1FF] py-1 rounded-xl text-[#257FFB]">
                                Room {currentRoom}-Bed {currentBed}
                            </p>
                            <p className="px-16 text-center bg-[#AFD1FF] py-1 rounded-xl text-[#257FFB]">
                                {currentSharing} Sharing
                            </p>
                        </div>
                    </div>

                    {/* Select Service */}
                    <div>
                        <p className="my-5">Select what you want to change</p>
                        <select
                            value={service}
                            onChange={(e) => {
                                setService(e.target.value);
                                // reset dependent selections when switching service
                                setSelectedId(null);
                                setSelectedSharing("");
                                setComment("");
                                setSelectedRoomChangeBedId(null);
                                setSelectedFloor(null);
                            }}
                            className="w-full bg-gray-300 py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>
                                Choose a service…
                            </option>
                            <option value="bed-change">Bed Change</option>
                            <option value="room-change">Room Change</option>
                            <option value="other-services">Other Services</option>
                        </select>

                        {/* Bed Change */}
                        {service === "bed-change" && (
                            <div className="p-4 bg-white rounded-md">
                                <h3 className="text-sm mb-5">Select your preferred bed</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {visibleBeds.map((b) => (
                                        <SingleBed
                                            key={b.id}
                                            room={b.room}
                                            bed={b.bed}
                                            booked={b.booked}
                                            selected={selectedId === b.id}
                                            onToggle={() => toggleBed(b.id)}
                                        />
                                    ))}
                                </div>
                                <div className="flex mt-5 space-x-5">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="w-4 h-4 rounded-sm bg-[#008000]"></p>
                                        <p className="text-xs">Available</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="w-4 h-4 rounded-sm bg-gray-400"></p>
                                        <p className="text-xs">Not Available</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Room Change */}
                        {service === "room-change" && (
                            <div className="p-4 bg-white rounded-md space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Select your preferred Sharing
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {[
                                            "Single",
                                            "Double",
                                            "Triple",
                                            "Four",
                                            "Five",
                                            "Six",
                                        ].map((text) => (
                                            <div
                                                key={text}
                                                onClick={() => {
                                                    setSelectedSharing(text);
                                                    setSelectedRoomChangeBedId(null);
                                                    const floors = sharingFloors[text] || [];
                                                    setSelectedFloor(floors[0]?.floor || null);
                                                }}
                                                className={`flex flex-col items-center justify-center h-20 border rounded-xl font-medium cursor-pointer transition
                          ${selectedSharing === text
                                                        ? "bg-gray-300 text-black"
                                                        : "bg-white text-gray-500"
                                                    }`}
                                            >
                                                <p>{text}</p>
                                                <p>Sharing</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floor Tabs */}
                                {selectedSharing && (
                                    <div>
                                        <h4 className="font-medium mb-2">Select Floor</h4>
                                        <div className="flex gap-3 flex-wrap">
                                            {(sharingFloors[selectedSharing] || []).map((f) => (
                                                <div
                                                    key={f.floor}
                                                    onClick={() => {
                                                        setSelectedFloor(f.floor);
                                                        setSelectedRoomChangeBedId(null);
                                                    }}
                                                    className={`px-4 py-2 rounded-full cursor-pointer border ${selectedFloor === f.floor
                                                            ? "bg-[#0827B2] text-white"
                                                            : "bg-white text-gray-700"
                                                        }`}
                                                >
                                                    Floor {f.floor}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Bed selection for room-change */}
                                {selectedSharing && selectedFloor && (
                                    <div className="p-4 bg-white rounded-md">
                                        <h3 className="text-sm mb-5">
                                            Select preferred bed for the new sharing on Floor{" "}
                                            {selectedFloor}
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {roomChangeFloorBeds.map((b) => (
                                                <SingleBed
                                                    key={b.id}
                                                    room={b.room}
                                                    bed={b.bed}
                                                    booked={b.booked}
                                                    selected={selectedRoomChangeBedId === b.id}
                                                    onToggle={() => toggleRoomChangeBed(b.id)}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex mt-5 space-x-5">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="w-4 h-4 rounded-sm bg-[#008000]"></p>
                                                <p className="text-xs">Available</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="w-4 h-4 rounded-sm bg-gray-400"></p>
                                                <p className="text-xs">Not Available</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Other Services */}
                        {service === "other-services" && (
                            <div className="p-4 mt-5 bg-white rounded-md">
                                <h3 className="mb-2">Reason for request</h3>
                                <textarea
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Write your comment..."
                                    value={comment}
                                    rows={3}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-center items-center mt-16">
                <button
                    className={`px-8 py-2 rounded-xl w-full sm:w-auto transition 
            ${isValid
                            ? "bg-[#0827B2] text-white cursor-pointer"
                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                    onClick={handleRaiseRequest}
                    disabled={!isValid}
                    aria-disabled={!isValid}
                >
                    Raise request
                </button>
            </div>

            {/* Confirmation Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg text-center shadow-xl space-y-10 w-full max-w-xl">
                        <h2 className="text-lg font-light">
                            Your {service} request has been submitted successfully!
                        </h2>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIZGbCvHiBya96wib7Pmp-KswFthzlnCTVSw&s"
                            className="mx-auto w-44 h-44 object-fill"
                            alt="Thumbs up"
                        />
                        <button
                            className="bg-[#0827B2] text-white w-full py-2 rounded-lg"
                            onClick={handleConfirmPopup}
                        >
                            Okay, Got it!
                        </button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Concern;