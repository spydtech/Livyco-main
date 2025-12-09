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
          // Current booking: bookingStatus is NOT "checked_out"
          const currentBooking = response.data.bookings.find(
            booking => booking.bookingStatus !== "checked_out"
          );
          
          // Previous bookings: bookingStatus IS "checked_out"
          const previousBookings = response.data.bookings.filter(
            booking => booking.bookingStatus === "checked_out"
          );
          
          console.log("Current booking found:", currentBooking);
          console.log("Previous bookings found:", previousBookings);
          
          setBookings({
            current: currentBooking || null,
            previous: previousBookings
          });
        } else {
          console.log("No bookings found");
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setError("Failed to load booking data");
      }
    };
    fetchBookingData();
  }, []);

  // Get active data based on tab
  const getActiveData = () => {
    console.log("Active tab:", activeTab);
    console.log("Bookings state:", bookings);
    
    if (activeTab === "current") {
      if (!bookings.current) return null;
      
      return {
        name: bookings.current.property.name,
        city: bookings.current.property.city,
        address: `${bookings.current.property.locality}, ${bookings.current.property.city}`,
        checkIn: new Date(bookings.current.moveInDate).toLocaleDateString(),
        checkOut: bookings.current.moveOutDate 
          ? new Date(bookings.current.moveOutDate).toLocaleDateString() 
          : "NA",
        room: `Room ${bookings.current.roomNumber} - ${bookings.current.roomDetails[0].bed}`,
        sharing: `${bookings.current.roomType} Sharing`,
        image: bookings.current.property.images && bookings.current.property.images.length > 0 
          ? bookings.current.property.images[0] 
          : "default-image-path.jpg",
        bookingId: bookings.current._id
      };
    } else {
      if (bookings.previous.length === 0) return null;
      
      // Show the first previous booking
      const prevBooking = bookings.previous[0];
      return {
        name: prevBooking.property.name,
        city: prevBooking.property.city,
        address: `${prevBooking.property.locality}, ${prevBooking.property.city}`,
        checkIn: new Date(prevBooking.moveInDate).toLocaleDateString(),
        checkOut: prevBooking.moveOutDate 
          ? new Date(prevBooking.moveOutDate).toLocaleDateString() 
          : "NA",
        room: `Room ${prevBooking.roomNumber} - ${prevBooking.roomDetails[0].bed}`,
        sharing: `${prevBooking.roomType} Sharing`,
        image: prevBooking.property.images && prevBooking.property.images.length > 0 
          ? prevBooking.property.images[0] 
          : "default-image-path.jpg",
        bookingId: prevBooking._id
      };
    }
  };

  const activeData = getActiveData();
  
  console.log("Active data:", activeData);

  // Handle loading state
  if (!bookings.current && bookings.previous.length === 0 && !error) {
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
            <div className="animate-pulse">
              <div className="bg-gray-200 h-48 w-48 mx-auto mb-6 rounded-lg"></div>
              <div className="bg-gray-200 h-4 w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If there's an error
  if (error) {
    return (
      <div>
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // If no data for the active tab
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
            <p className="text-gray-600">No {activeTab} stays found</p>
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
          <div className="w-full md:w-[300px] h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
            {activeData.image !== "default-image-path.jpg" ? (
              <img
                src={activeData.image}
                alt="hostel"
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3">
            <h2 className="text-xl font-semibold">{activeData.name}</h2>
            <p className="text-gray-600">{activeData.address}</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">Check in Date:</span> {activeData.checkIn}</p>
              <p><span className="font-medium">Check out Date:</span> {activeData.checkOut}</p>
              <p><span className="font-medium">Booking Status:</span> {activeTab === "current" ? "Active" : "Checked Out"}</p>
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
                  className="w-full border border-gray-300 py-2 rounded-lg flex justify-between px-4 text-left text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Food Menu <span className="ml-auto">→</span>
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate("/user/raise-concern")}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full hover:bg-blue-800 transition-colors"
                  >
                    Raise Concern
                  </button>
                  <button
                    onClick={() => navigate(`/user/vacate-room`, { 
                      state: { 
                        bookingId: activeData.bookingId,
                        propertyName: activeData.name,
                        roomNumber: activeData.room
                      } 
                    })}
                    className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg font-semibold w-full hover:bg-blue-50 transition-colors"
                  >
                    Vacate Room
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4">
                <button
                  onClick={() => navigate("/refer-friend")}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full hover:bg-blue-800 transition-colors"
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