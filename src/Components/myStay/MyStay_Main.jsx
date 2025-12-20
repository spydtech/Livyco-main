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
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const MyStay_Main = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [bookings, setBookings] = useState({ current: null, previous: [] });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Image gallery state
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [propertyImages, setPropertyImages] = useState([]);

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
          console.log("response for bookings",response.data);
          
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

  // Image gallery functions
  const openImageGallery = (images, index = 0) => {
    // Filter out the last image (exclude the last element)
    const filteredImages = images ? images.slice(0, -1) : [];
    setPropertyImages(filteredImages);
    setCurrentImageIndex(index >= filteredImages.length ? 0 : index);
    setShowImageGallery(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageGallery = () => {
    setShowImageGallery(false);
    document.body.style.overflow = 'auto';
  };

  const goToNextImage = () => {
    if (propertyImages.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === propertyImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const goToPrevImage = () => {
    if (propertyImages.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? propertyImages.length - 1 : prevIndex - 1
      );
    }
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showImageGallery) return;
      
      if (e.key === 'Escape') {
        closeImageGallery();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showImageGallery]);

  // Get active data based on tab
  const getActiveData = () => {
    console.log("Active tab:", activeTab);
    console.log("Bookings state:", bookings);
    
    if (activeTab === "current") {
      if (!bookings.current) return null;
      
      // Get the first image URL from the images array (excluding last image)
      const firstImage = bookings.current.property.images && 
                         bookings.current.property.images.length > 0 
        ? bookings.current.property.images[0].url 
        : null;
      
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
        image: firstImage || "default-image-path.jpg",
        images: bookings.current.property.images || [],
        bookingId: bookings.current._id
      };
    } else {
      if (bookings.previous.length === 0) return null;
      
      // Show the first previous booking
      const prevBooking = bookings.previous[0];
      
      // Get the first image URL from the images array (excluding last image)
      const firstImage = prevBooking.property.images && 
                         prevBooking.property.images.length > 0 
        ? prevBooking.property.images[0].url 
        : null;
      
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
        image: firstImage || "default-image-path.jpg",
        images: prevBooking.property.images || [],
        bookingId: prevBooking._id
      };
    }
  };

  const activeData = getActiveData();
  
  console.log("Active data:", activeData);

  // Check if there are images (excluding the last one)
  const hasGalleryImages = activeData?.images && activeData.images.length > 1;

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

  const hasImages = activeData.image !== "default-image-path.jpg";

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
          {/* Image - Clickable to open gallery */}
          <div 
            className="w-full md:w-[300px] h-[200px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => hasGalleryImages && openImageGallery(activeData.images, 0)}
          >
            {hasImages ? (
              <img
                src={activeData.image}
                alt="hostel"
                className="w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
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

      {/* Image Gallery Modal */}
      {showImageGallery && propertyImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={closeImageGallery}
              className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Image Display */}
            <div className="flex-1 relative flex items-center justify-center">
              {/* Previous Button */}
              {propertyImages.length > 1 && (
                <button
                  onClick={goToPrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Main Image */}
              <div className="w-full h-[70vh] flex items-center justify-center">
                <img
                  src={
                    propertyImages[currentImageIndex]?.url ||
                    propertyImages[currentImageIndex] ||
                    "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYzkuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9ldF90ZW1w/L0RKSV8wNjk4LTQ0/NzAwMzRfNTAwWnhN/MzUuanBn"
                  }
                  alt={`Property image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDBaeMzM1/LmpwZw";
                  }}
                />
              </div>

              {/* Next Button */}
              {propertyImages.length > 1 && (
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Image Counter */}
              {propertyImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {propertyImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {propertyImages.length > 1 && (
              <div className="mt-4 px-8">
                <div className="flex gap-2 overflow-x-auto py-2">
                  {propertyImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-yellow-400"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image.url || image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDBaeMzM1/LmpwZw";
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Instructions */}
            <div className="text-center text-white text-sm mt-4 opacity-70">
              <p>Use arrow keys or click thumbnails to navigate • Press ESC to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStay_Main;