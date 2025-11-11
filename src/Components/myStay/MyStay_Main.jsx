// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import image15 from "../../assets/user/pgsearch/Pgimg.png";
// import Header from "../Header"; // Assuming you have a Header component
// import { bookingAPI } from "../../Clients-components/PropertyController";

// const MyStay_Main = () => {
//   const [activeTab, setActiveTab] = useState("current");
//   const navigate = useNavigate();

//   useEffect(() => {
//   // Fetch booking data from API
//   const fetchBookingData = async () => {
//     try {
//       const response = await bookingAPI.getUserBookings();
//       // Assuming the API returns data in the required format
//       setData(response.data);
//       console.log("Booking data fetched:", response.data);

//     } catch (error) {
//       console.error("Error fetching booking data:", error);
//     }
//   };
//   fetchBookingData();
// }, []);
//   const [data, setData] = useState({
//     current: {
//       name: "",
//       city: "",
//       checkIn: "",
//       checkOut: "NA",
//       room: "",
//       sharing: "",
//       images: 'images',
//     },
//     previous: {
//       name: "",
//       city: "",
//       checkIn: "",

//       checkOut: "",
//       room: "",
//       sharing: "",
//       images: "images",
//     },
//   });
  

  

//   // const data = {
//   //   current: {
//   //     title: "Abc Boys Hostel",
//   //     address: "PNo 123, abc, dfg xxxx, Hyd 500xxx",
//   //     checkIn: "12/06/2025",
//   //     checkOut: "NA",
//   //     room: "Room 101 - Bed B",
//   //     sharing: "2 Sharing",
//   //     image: image15,
//   //   },
//   //   previous: {
//   //     title: "XYZ Girls Hostel",
//   //     address: "P No 45, Some Lane, Pune, 411xxx",
//   //     checkIn: "01/02/2025",
//   //     checkOut: "01/05/2025",
//   //     room: "Room 202 - Bed A",
//   //     sharing: "3 Sharing",
//   //     image: image15,
//   //   },
//   // };

//   const activeData = data[activeTab];

//   return (
//     <div>
//         <Header />
//     <div className="max-w-6xl mx-auto px-4 py-24">
//       {/* Tabs */}
//       <div className="flex justify-center mb-6 space-x-8">
//         {["current", "previous"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`font-semibold pb-2 border-b-2 ${
//               activeTab === tab
//                 ? "border-blue-700 text-blue-700"
//                 : "border-transparent text-gray-500"
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Card */}
//       <div className="bg-white shadow rounded-xl flex flex-col md:flex-row gap-6 p-6 items-start md:items-center">
//         {/* Image */}
//         <img
//           src={activeData.image}
//           alt="hostel"
//           className="w-full md:w-[300px] rounded-lg object-cover"
//         />

//         {/* Info */}
//         <div className="flex-1 space-y-3">
//           <h2 className="text-xl font-semibold">{activeData.name}</h2>
//           <p className="text-gray-600">{activeData.address}</p>
//           <div className="text-sm text-gray-700 space-y-1">
//             <p>Check in Date: {activeData.checkIn}</p>
//             <p>Check out Date: {activeData.checkOut}</p>
//             <div className="space-y-2 pt-2">
//               <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit">
//                 {activeData.room}
//               </div>
//               <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit">
//                 {activeData.sharing}
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           {activeTab === "current" ? (
//             <div className="space-y-3 pt-4">
//               <button
//                 onClick={() => navigate("/user/food-menu")}
//                 className="w-full border border-gray-300 py-2 rounded-lg flex justify-between px-4 text-left text-sm font-medium"
//               >
//                 Food Menu <span className="ml-auto">→</span>
//               </button>
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => navigate("/user/raise-concern")}
//                   className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full"
//                 >
//                   Raise Concern
//                 </button>
//                 <button
//                   onClick={() => navigate("/user/vacate-room")}
//                   className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg font-semibold w-full"
//                 >
//                   Vacate Room
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="pt-4">
//               <button
//                 onClick={() => navigate("/refer-friend")}
//                 className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full"
//               >
//                 Refer to a friend
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default MyStay_Main;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import notfount from "../../assets/staying not fount/undraw_not-found_6bgl.png";
import { bookingAPI } from "../../Clients-components/PropertyController";

const MyStay_Main = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [bookings, setBookings] = useState({ current: null, previous: [] });
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await bookingAPI.getUserBookings();
        console.log("Booking data fetched:", response.data);
        
        // Process the API response
        if (response.data.success && response.data.bookings.length > 0) {
          // Assuming the first booking is current if it has no checkOut date
          const currentBooking = response.data.bookings.find(
            booking => !booking.checkOutDate || booking.checkOutDate === "NA"
          );
          
          const previousBookings = response.data.bookings.filter(
            booking => booking.checkOutDate && booking.checkOutDate !== ""
          );
          
          setBookings({
            current: currentBooking || null,
            previous: previousBookings
          });
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchBookingData();
  }, []);

  // Get active data based on tab
  const getActiveData = () => {
    if (activeTab === "current") {
      return bookings.current ? {
        name: bookings.current.property.name,
        city: bookings.current.property.city,
        address: `${bookings.current.property.locality}, ${bookings.current.property.city}`,
        checkIn: new Date(bookings.current.moveInDate).toLocaleDateString(),
        checkOut: "NA",
        room: `Room ${bookings.current.roomNumber} - ${bookings.current.roomDetails[0].bed}`,
        sharing: `${bookings.current.roomType} Sharing`,
        image: bookings.current.property.images && bookings.current.property.images.length > 0 
          ? bookings.current.property.images[0] 
          : "default-image-path.jpg" // Add a default image path
      } : null;
    } else {
      // For previous stays, you might want to show the most recent one or a list
      // For simplicity, showing the first previous booking
      return bookings.previous.length > 0 ? {
        name: bookings.previous[0].property.name,
        city: bookings.previous[0].property.city,
        address: `${bookings.previous[0].property.locality}, ${bookings.previous[0].property.city}`,
        checkIn: new Date(bookings.previous[0].moveInDate).toLocaleDateString(),
        checkOut: new Date(bookings.previous[0].checkOutDate).toLocaleDateString(),
        room: `Room ${bookings.previous[0].roomNumber} - ${bookings.previous[0].roomDetails[0].bed}`,
        sharing: `${bookings.previous[0].roomType} Sharing`,
        image: bookings.previous[0].property.images && bookings.previous[0].property.images.length > 0 
          ? bookings.previous[0].property.images[0] 
          : "default-image-path.jpg" // Add a default image path
      } : null;
    }
  };

  const activeData = getActiveData();

  if (!activeData) {
   

    return (
      <div>
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="flex justify-center mb-6 space-x-8">
            {["current", "previous"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-semibold pb-2 border-b-2 ${
                  activeTab === tab
                    ? "border-blue-700 text-blue-700"
                    : "border-transparent text-gray-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="text-center py-10">
            <img
              src={notfount}
              alt="No Data"
              className="mx-auto mb-6 w-48 h-48 object-contain"
            />
            <p>No {activeTab} stays found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-24">
        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-8">
          {["current", "previous"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-semibold pb-2 border-b-2 ${
                activeTab === tab
                  ? "border-blue-700 text-blue-700"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white shadow rounded-xl flex flex-col md:flex-row gap-6 p-6 items-start md:items-center">
          {/* Image */}
          <img
            src={activeData.image}
            alt="hostel"
            className="w-full md:w-[300px] rounded-lg object-cover"
          />

          {/* Info */}
          <div className="flex-1 space-y-3">
            <h2 className="text-xl font-semibold">{activeData.name}</h2>
            <p className="text-gray-600">{activeData.address}</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>Check in Date: {activeData.checkIn}</p>
              <p>Check out Date: {activeData.checkOut}</p>
              <div className="space-y-2 pt-2">
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit">
                  {activeData.room}
                </div>
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit">
                  {activeData.sharing}
                </div>
              </div>
            </div>

            {/* Buttons */}
            {activeTab === "current" ? (
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => navigate("/user/food-menu")}
                  className="w-full border border-gray-300 py-2 rounded-lg flex justify-between px-4 text-left text-sm font-medium"
                >
                  Food Menu <span className="ml-auto">→</span>
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate("/user/raise-concern")}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full"
                  >
                    Raise Concern
                  </button>
                  <button
                    onClick={() => navigate(`/user/vacate-room`, { state: { bookingId: bookings.current._id } })}
                    className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg font-semibold w-full"
                  >
                    Vacate Room
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4">
                <button
                  onClick={() => navigate("/refer-friend")}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full"
                >
                  Refer to a friend
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStay_Main;