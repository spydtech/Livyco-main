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
import Header from "../Header";
import { toast } from "react-toastify";
import { wishlistAPI } from "../../Clients-components/PropertyController";  // Adjust import path as needed

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

    // Listen for wishlist update events
    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-6 bg-white min-h-screen py-24 flex justify-center items-center">
          <div className="text-lg">Loading your wishlist...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="p-6 bg-white min-h-screen py-24">
          <div className="flex items-center text-blue-700 mb-6 text-lg font-semibold">
            <button onClick={() => navigate(-1)} className="cursor-pointer mr-2 flex items-center">
              <FaArrowLeft className="mr-1" /> Back
            </button>
            <span className="ml-2">My Wishlist</span>
          </div>
          <div className="text-center py-12 text-red-600">
            <div className="text-lg mb-4">Error: {error}</div>
            <button
              onClick={fetchWishlist}
              className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 bg-white min-h-screen py-24">
        <div className="flex items-center text-blue-700 mb-6 text-lg font-semibold">
          <button onClick={() => navigate(-1)} className="cursor-pointer mr-2 flex items-center">
            <FaArrowLeft className="mr-1" /> Back
          </button>
          <span className="ml-2">My Wishlist ({wishlistItems.length} items)</span>
        </div>

        <div className="space-y-6 w-full md:w-4/5 lg:w-3/5 mx-auto">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">Your wishlist is empty</div>
              <button
                onClick={() => navigate("/user/pgsearch")}
                className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                onClick={() => handleViewProperty(item)}
              >
                <div className="relative md:w-2/5">
                  <img
                    src={item.propertyData?.image?.url || Pgimg}
                    alt={item.propertyData?.name || "Property"}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-white text-yellow-500 font-bold text-sm px-2 py-1 rounded shadow">
                    ₹{item.propertyData?.price || "0"}/
                  </div>
                </div>

                <div className="flex flex-col justify-between p-4 flex-grow md:w-3/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-lg text-gray-800">
                        {item.propertyData?.name || "Unknown Property"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.propertyData?.locality || ""}, {item.propertyData?.city || ""}
                      </div>
                    </div>
                    <div className="flex gap-3 text-gray-500 text-lg">
                      <FaShareAlt
                        className="cursor-pointer hover:text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/share/${item.propertyId}`);
                        }}
                      />
                      <FaHeart
                        className="cursor-pointer text-red-500 hover:text-red-600"
                        onClick={(e) => removeFromWishlist(item.propertyId, e)}
                      />
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.propertyData?.pgProperty?.description ||
                      "Comfortable accommodation with great amenities"}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleViewProperty(item)}
                      className="bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800"
                    >
                      View Details
                    </button>
                    <FaPhone className="text-yellow-400 text-lg cursor-pointer hover:text-yellow-500" />
                    <FaCommentDots className="text-yellow-400 text-lg cursor-pointer hover:text-yellow-500" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
