// import React, { useState, useEffect } from "react";
// import { FaHeart, FaRegHeart, FaStar, FaShareAlt } from "react-icons/fa";
// import { propertyAPI } from "./PropertyController";

// const ListedProperties = ({ property }) => {
//   const {
//     image = "",
//     name = "Property Title",
//     street = "Street Address",
//     price = "₹0",
//     rating = 0,
//     amenities = 0,
//   } = property;

//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full justify-center">
//       <div className="relative">
//         <img
//           src={image || "/fallback-image.png"}
//           alt={name}
//           className="w-full h-48 object-cover"
//           onError={(e) => (e.target.src = "/fallback-image.png")}
//         />
//         <div className="absolute top-2 right-2 flex gap-3 p-2 text-gray-600">
//           <FaShareAlt className="text-xl hover:text-blue-500 cursor-pointer" />
//           <FaRegHeart className="text-xl hover:text-red-500 cursor-pointer" />
//         </div>
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-800">{name}</h3>
//         <p className="text-gray-500 text-sm">{street}</p>
//         <p className="text-gray-700 font-semibold mt-2">
//           Starting from <span className="font-bold">{price}</span>
//         </p>
//         <div className="flex items-center mt-2">
//           {[...Array(5)].map((_, i) => (
//             <FaStar
//               key={i}
//               className={`text-lg ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
//             />
//           ))}
//         </div>
//         <p className="text-gray-600 mt-2">Amenities</p>
//         <div className="flex items-center space-x-2 mt-1">
//           <span className="text-gray-500">+{amenities} more</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const RecentlyListedProperties = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await propertyAPI.getCompletePropertyData();
//         const data = response?.data;

//         if (data?.success && Array.isArray(data.property)) {
//           setProperties(data.property);
//         } else if (data?.success && data.property) {
//           setProperties([data.property]);
//         } else {
//           setProperties([]);
//         }
//       } catch (err) {
//         setError(err.message || "Failed to fetch properties.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   if (loading) return <div className="text-center text-gray-500">Loading properties...</div>;
//   if (error) return <div className="text-center text-red-500">Error: {error}</div>;
//   if (!properties.length) return <div className="text-center text-gray-500">No properties available.</div>;

//   return (
//     <div className="bg-[#333333] py-10 px-5">
//       <h2 className="text-white text-2xl font-semibold text-center mb-6">Recently listed properties</h2>
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
//         {properties.map((property, idx) => (
//           <ListedProperties key={idx} property={property} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentlyListedProperties;



import React, { useState, useEffect, useRef } from "react";
import { propertyAPI } from "./PropertyController";
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./PropertyCardSkeleton";

const RecentlyListedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertyAPI.getAllClientProperties();
        const data = response?.data;
        console.log("Fetched property data:", data);

        if (data?.success && Array.isArray(data?.data)) {
          const transformedProperties = data.data.map((item) => {
            console.log("Processing item:", item);
            
            const propertyData = item?.property || {};
            const pgData = item?.pgProperty || {};
            const mediaData = item?.media || {};
            const roomData = item?.rooms || {};

            // Extract pricing from room data
            const roomTypes = roomData?.roomTypes || [];
            const startingPrice = roomTypes.length > 0 
              ? Math.min(...roomTypes.map(room => room.price || 0))
              : 0;

            return {
              id: item?._id || propertyData?._id,
              title: propertyData?.name || "Property Title",
              fullAddress: [
                propertyData?.street,
                propertyData?.locality,
                propertyData?.city
              ]
                .filter(Boolean)
                .join(", "),
              images: mediaData?.images?.length ? mediaData.images : [],
              startingPrice: startingPrice,
              amenities: pgData?.amenities || [],
              rating: 4.0, // Default rating since it's not in your API
            };
          });

          console.log("Transformed properties:", transformedProperties);
          setProperties(transformedProperties);
        } else {
          setProperties([]);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch properties.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0827B2] py-10 px-5">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Recently listed properties
        </h2>
        <div className="max-w-6xl mx-auto flex gap-6 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="w-80 flex-shrink-0">
                <PropertyCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0827B2] py-10 px-5 text-center">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Recently listed properties
        </h2>
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="bg-[#0827B2] py-10 px-5 text-center">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Recently listed properties
        </h2>
        <p className="text-gray-300">No properties available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0827B2] py-10 px-5">
      <h2 className="text-white text-2xl font-semibold text-center mb-6">
        Recently listed properties
      </h2>
      <div className="max-w-6xl mx-auto">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto 
                    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                    hover:[&::-webkit-scrollbar]:block hover:[&::-webkit-scrollbar]:h-2
                    hover:[&::-webkit-scrollbar-track]:bg-gray-100 hover:[&::-webkit-scrollbar-track]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 hover:[&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[-ms-overflow-style:auto] hover:[scrollbar-width:thin]
                    snap-x snap-mandatory space-x-6 pb-4"
        >
          <div className="flex gap-6 min-w-max">
            {properties.map((property, idx) => (
              <div key={property.id || idx} className="w-80 flex-shrink-0">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyListedProperties;