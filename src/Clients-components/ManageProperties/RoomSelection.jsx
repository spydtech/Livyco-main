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
import { useState, useEffect } from "react";
import HostelRoomSelection from "./HostelRoomSelection";

const RoomSelection = ({ nextStep }) => {
  const [selectedRooms, setSelectedRooms] = useState(() => {
    // Retrieve selected rooms from local storage or default to an empty array
    const storedRooms = localStorage.getItem("selectedRooms");
    return storedRooms ? JSON.parse(storedRooms) : [];
  });

  const [proceed, setProceed] = useState(false);

  const rooms = [
    { id: 1, label: "Single Room", blocks: 1 },
    { id: 2, label: "Double Sharing", blocks: 2 },
    { id: 3, label: "Triple Sharing", blocks: 3 },
    { id: 4, label: "Four Sharing", blocks: 4 },
    { id: 5, label: "Five Sharing", blocks: 5 },
    { id: 6, label: "Six Sharing", blocks: 6 },
  ];

  // Save selected rooms to local storage whenever the selection changes
  useEffect(() => {
    localStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
  }, [selectedRooms]);

  const toggleSelection = (id) => {
    setSelectedRooms((prev) =>
      prev.includes(id) ? prev.filter((roomId) => roomId !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedRooms.length > 0) {
      setProceed(true);
    } else {
      alert("Please select at least one room type before continuing.");
    }
  };

  return (
    <div className="mx-auto p-6 rounded-lg">
      {proceed ? (
        <HostelRoomSelection
          nextStep={nextStep}
          selectedRooms={selectedRooms}
        />
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Select types of room available
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${
                  selectedRooms.includes(room.id) ? "bg-yellow-200" : ""
                }`}
                onClick={() => toggleSelection(room.id)}
              >
                <div className="grid grid-cols-2 gap-1 w-16 h-16 bg-yellow-100">
                  {[...Array(room.blocks)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-yellow-400 w-full h-full"
                    ></div>
                  ))}
                </div>
                <p className="mt-2 text-sm">{room.label}</p>
                <input
                  type="checkbox"
                  checked={selectedRooms.includes(room.id)}
                  readOnly
                  className="mt-2"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleContinue}
            className="w-full bg-yellow-400 text-black py-2 mt-6 rounded-lg font-semibold"
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
};

export default RoomSelection;
