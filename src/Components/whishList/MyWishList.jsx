// import React from "react";
// import { FaPhone, FaCommentDots, FaHeart, FaShareAlt } from "react-icons/fa";
// import Pgimg from "../../assets/user/home page/homepage image.png"; // Ensure this path is correct
// import Header from "../Header"; // Import Header component

// export default function MyWishList() {
//   const wishlistData = [1, 2, 3];

//   return (
//     <>
//     <Header />
//     <div className="p-6 bg-white min-h-screen py-24">
//       {/* Header */}
//       <div className="flex items-center text-blue-700 mb-6 text-lg font-semibold">
//         <span className="cursor-pointer mr-2">&larr;</span> My Wishlist
//       </div>

//       {/* Cards */}
//       <div className="space-y-6 w-full md:w-3/5 ">
//         {wishlistData.map((item, index) => (
//           <div
//             key={index}
//             className="flex bg-gray-100 rounded-lg overflow-hidden shadow"
//           >
//             {/* Image */}
//             <div className="relative">
//               <img
//                 src={Pgimg}
//                 alt="PG"
//                 className="w-96 h-40 object-cover"
//               />
//               {/* Price tag at bottom-left */}
//               <div className="absolute bottom-2 left-2 bg-white text-yellow-500 font-bold text-sm px-2 py-1 rounded shadow">
//                 ₹0000.00
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex flex-col justify-between p-4 flex-grow">
//               {/* Title + Share/Heart */}
//               <div className="flex justify-between items-start mb-2">
//                 <div className="font-bold text-lg text-gray-800">Name</div>
//                 <div className="flex gap-3 text-gray-500 text-lg">
//                   <FaShareAlt className="cursor-pointer" />
//                   <FaHeart className="cursor-pointer" />
//                 </div>
//               </div>

//               {/* Description */}
//               <p className="text-gray-600 text-sm mb-3">
//                 Sapiente aperiores ut inventore. Voluptatem molestiae atque minima
//                 corporis adipisci fugit a. Earum assumenda qui beatae aperiam
//                 quaerat est quis hic sit.
//               </p>

//               {/* Bottom Icons Row */}
//               <div className="flex items-center gap-3">
//                 <button className="bg-blue-700 text-white px-4 py-1 rounded text-sm w-40">
//                   View
//                 </button>
//                 <FaPhone className="text-yellow-400 text-lg cursor-pointer" />
//                 <FaCommentDots className="text-yellow-400 text-lg cursor-pointer" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import { FaPhone, FaCommentDots, FaHeart, FaShareAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Pgimg from "../../assets/user/home page/homepage image.png";
import bgImage from "../../assets/user/pgsearch/image (5).png"; 
import Header from "../Header";
import { toast } from "react-toastify";
import { wishlistAPI } from "../../Clients-components/PropertyController";

export default function MyWishList() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getCurrentUserId = () => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return user.userId || user._id || user.id || user.clientId;
      }
    } catch (error) {
      console.error("Error getting user:", error);
    }
    return null;
  };

  const fetchWishlist = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      toast.error("Please login to view wishlist");
      setLoading(false);
      setError("User not logged in");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await wishlistAPI.getUserWishlist(userId);

      if (response.data.success) {
        setWishlistItems(response.data.wishlistItems || []);
      } else {
        setError("Failed to load wishlist");
        toast.error("Failed to load wishlist");
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to load wishlist. Please try again.");
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (propertyId, e) => {
    e.stopPropagation();
    const userId = getCurrentUserId();
    if (!userId) return;

    try {
      const response = await wishlistAPI.removeFromWishlist(userId, propertyId);
      if (response.data.success) {
        setWishlistItems((prev) => prev.filter((item) => item.propertyId !== propertyId));
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleViewProperty = (property) => {
    navigate(`/user/view-pg/${property.propertyId}`, {
      state: { pg: property.propertyData },
    });
  };

  useEffect(() => {
    fetchWishlist();

    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  // Updated container styles without fixed background
  const containerStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={containerStyle} className="min-h-screen py-24 flex justify-center items-center">
          <div className="text-lg bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">Loading your wishlist...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div style={containerStyle} className="min-h-screen py-24">
          <div className="container mx-auto px-4">
            <div className="bg-white bg-opacity-95 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center text-blue-700 mb-6 text-lg font-semibold">
                <button onClick={() => navigate(-1)} className="cursor-pointer mr-2 flex items-center">
                  <FaArrowLeft className="mr-1" /> Back
                </button>
                <span className="ml-2">My Wishlist</span>
              </div>
              <div className="text-center py-8 text-red-600">
                <div className="text-lg mb-4">Error: {error}</div>
                <button
                  onClick={fetchWishlist}
                  className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={containerStyle} className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          {/* Header Section - Removed white background */}
          <div className="mb-8">
            <div className="rounded-lg p-4 md:p-6 max-w-4xl mx-auto">
              <div className="flex items-center text-blue-700 text-lg font-semibold">
                <button 
                  onClick={() => navigate(-1)} 
                  className="cursor-pointer mr-3 flex items-center bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <FaArrowLeft className="mr-2" /> Back
                </button>
                <span className="text-xl md:text-2xl text-white bg-blue-700 bg-opacity-80 px-4 py-2 rounded-lg">
                  My Wishlist ({wishlistItems.length} items)
                </span>
              </div>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="max-w-4xl mx-auto">
            {wishlistItems.length === 0 ? (
              <div className="bg-white bg-opacity-95 rounded-lg shadow-lg p-8 text-center">
                <div className="text-gray-600 text-lg mb-6">Your wishlist is empty</div>
                <button
                  onClick={() => navigate("/user/pgsearch")}
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors text-lg font-medium"
                >
                  Browse Properties
                </button>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {wishlistItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white bg-opacity-95 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => handleViewProperty(item)}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="relative md:w-2/5 lg:w-1/3">
                        <img
                          src={item.propertyData?.image?.url || Pgimg}
                          alt={item.propertyData?.name || "Property"}
                          className="w-full h-48 md:h-56 lg:h-64 object-cover"
                        />
                        <div className="absolute bottom-3 left-3 bg-white text-yellow-600 font-bold text-sm px-3 py-1 rounded-lg shadow-md">
                          ₹{item.propertyData?.price || "0"}/
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-col justify-between p-4 md:p-6 flex-grow">
                        {/* Header with title and actions */}
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-3 md:mb-4 gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-lg md:text-xl text-gray-800 truncate">
                              {item.propertyData?.name || "Unknown Property"}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {item.propertyData?.locality || ""}, {item.propertyData?.city || ""}
                            </div>
                          </div>
                          <div className="flex gap-3 text-gray-500">
                            <FaShareAlt
                              className="cursor-pointer hover:text-blue-600 transition-colors p-1 text-lg md:text-xl"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/share/${item.propertyId}`);
                              }}
                              title="Share"
                            />
                            <FaHeart
                              className="cursor-pointer text-red-500 hover:text-red-600 transition-colors p-1 text-xl md:text-2xl"
                              onClick={(e) => removeFromWishlist(item.propertyId, e)}
                              title="Remove from wishlist"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2 md:line-clamp-3">
                          {item.propertyData?.pgProperty?.description ||
                            "Comfortable accommodation with great amenities"}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewProperty(item);
                              }}
                              className="bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm md:text-base font-medium"
                            >
                              View Details
                            </button>
                            <div className="flex gap-3">
                              <FaPhone 
                                className="text-yellow-500 text-lg cursor-pointer hover:text-yellow-600 transition-colors" 
                                title="Call"
                              />
                              <FaCommentDots 
                                className="text-yellow-500 text-lg cursor-pointer hover:text-yellow-600 transition-colors" 
                                title="Message"
                              />
                            </div>
                          </div>
                          
                          {/* Additional info for larger screens */}
                          <div className="hidden md:flex items-center text-sm text-gray-500">
                            {item.propertyData?.pgProperty?.type && (
                              <span className="bg-gray-100 px-3 py-1 rounded-full">
                                {item.propertyData.pgProperty.type}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}