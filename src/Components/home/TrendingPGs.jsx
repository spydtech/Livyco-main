// import React from "react";
// import { FaShareAlt, FaHeart, FaStar } from "react-icons/fa";
// import { useEffect } from "react";
// import { propertyAPI } from "../../Clients-components/PropertyController";

// // const trendingPGs = [
// //   {
// //     id: 1,
// //     img: "/assets/room1.jpg",
// //     title: "Hic doloremque odit sunt nulla et sed.",
// //     address: "Address Hic doloremque odit sunt...",
// //     price: "₹4,599",
// //   },
// //   {
// //     id: 2,
// //     img: "/assets/room2.jpg",
// //     title: "Hic doloremque odit sunt nulla et sed.",
// //     address: "Address Hic doloremque odit sunt...",
// //     price: "₹4,599",
// //   },
// //   {
// //     id: 3,
// //     img: "/assets/room3.jpg",
// //     title: "Hic doloremque odit sunt nulla et sed.",
// //     address: "Address Hic doloremque odit sunt...",
// //     price: "₹4,599",
// //   },
// //   {
// //     id: 4,
// //     img: "/assets/room3.jpg",
// //     title: "Hic doloremque odit sunt nulla et sed.",
// //     address: "Address Hic doloremque odit sunt...",
// //     price: "₹4,599",
// //   },
// //   {
// //     id: 5,
// //     img: "/assets/room3.jpg",
// //     title: "Hic doloremque odit sunt nulla et sed.",
// //     address: "Address Hic doloremque odit sunt...",
// //     price: "₹4,599",
// //   },
// // ];

// export default function TrendingPGCarousel() {
//   const [pgList, setPgList] = React.useState(trendingPGs);
//   const [originalPgList, setOriginalPgList] = React.useState(trendingPGs);
//   const [selectedPg, setSelectedPg] = React.useState(null);
//   // const navigate = React.useNavigate();
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [isError, setIsError] = React.useState(false);

//    useEffect(() => {
//       const fetchProperties = async () => {
//         try {
//           setLoading(true);
//           const response = await propertyAPI.getAllClientProperties();
//           if (response.data?.success) {
//             // Transform API data to match your frontend structure
//             const transformedData = response.data.data.map(item => ({
//               id: item.property._id,
//               name: item.property.name,
//               city: item.property.city,
//               locality: item.property.locality,
//               street: item.property.street,
//               price: item.rooms?.roomTypes?.[0]?.price || 0, // Get price from first room type
//               rating: item.property.rating || 0,
//               reviews: item.property.reviews || 0,
//               image: item.media?.images?.[0] || "", // Get first image
//               // description: item.property.description || "",
//               pgProperty: item.pgProperty || {},
//               pgPropertyId: item.pgProperty?.description || "",
//               rooms: item.rooms || {},
//               amenities: item.pgProperty?.amenities || [],
//               roomType: item.rooms?.roomTypes?.map(rt => rt.type) || [],
//               gender: item.pgProperty?.gender || "Not specified",
//               recommended: false, // You might want to calculate this
//               images: item.media?.images || []
//             }));
//             setPgList(transformedData);
//             console.log("Fetched properties:", transformedData);
//           }
//         } catch (err) {
//           setError(err.message);
//           console.error("Error fetching properties:", err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchProperties();
//     }, []);
//   return (
//     <div className="bg-[#FFDC82] py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-2xl font-semibold text-center mb-10">Trending PGs</h2>

//         <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory space-x-6 pb-4">
//           {trendingPGs.map((pg) => (
//             <div
//               key={pg.id}
//               className="snap-start shrink-0 w-[280px] bg-white rounded-2xl shadow-md p-4"
//             >
//               <div className="relative">
//                 <img
//                   src={pg.img}
//                   alt={pg.title}
//                   className="rounded-lg h-40 w-full object-cover"
//                 />
//                 <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
//                   +10
//                 </span>
//                 <div className="absolute top-2 right-2 flex space-x-2 text-gray-600">
//                   <FaShareAlt />
//                   <FaHeart />
//                 </div>
//               </div>

//               <div className="mt-4 space-y-1">
//                 <h3 className="text-gray-800 text-sm font-medium">{pg.title}</h3>
//                 <p className="text-gray-500 text-xs">{pg.address}</p>
//               </div>

//               <div className="mt-3 text-sm">
//                 <p className="text-gray-500">
//                   Starting from <span className="font-bold">{pg.price}</span>
//                 </p>
//               </div>

//               <div className="flex items-center text-yellow-400 text-xs mt-2">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar key={i} />
//                 ))}
//               </div>

//               <div className="mt-4 text-xs">
//                 <p className="font-medium">Amenities</p>
//                 <div className="flex space-x-2 mt-2">
//                   {[1, 2, 3, 4].map((_, idx) => (
//                     <div
//                       key={idx}
//                       className="w-4 h-4 rounded-full border border-gray-400"
//                     />
//                   ))}
//                   <p className="text-gray-500">+5 more</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




import React from "react";
import { FaShareAlt, FaHeart, FaStar } from "react-icons/fa";
import { useEffect } from "react";
import { propertyAPI } from "../../Clients-components/PropertyController";
import { useNavigate } from "react-router-dom";

export default function TrendingPGCarousel() {
  const [pgList, setPgList] = React.useState([]);
  const [originalPgList, setOriginalPgList] = React.useState([]);
  const [selectedPg, setSelectedPg] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await propertyAPI.getAllClientProperties();
        if (response.data?.success) {
          const transformedData = response.data.data.map(item => ({
            id: item.property._id,
            name: item.property.name,
            city: item.property.city,
            locality: item.property.locality,
            street: item.property.street,
            price: item.rooms?.roomTypes?.[0]?.price || 0,
            rating: item.property.rating || 0,
            reviews: item.property.reviews || 0,
            image: item.media?.images?.[0]?.url || "/assets/room1.jpg",
            pgProperty: item.pgProperty || {},
            pgPropertyId: item.pgProperty?.description || "",
            rooms: item.rooms || {},
            amenities: item.pgProperty?.amenities || [],
            roomType: item.rooms?.roomTypes?.map(rt => rt.type) || [],
            gender: item.pgProperty?.gender || "Not specified",
            recommended: false,
            images: item.media?.images?.map(img => img.url) || [],
          }));
          setPgList(transformedData);
          setOriginalPgList(transformedData);
          console.log("Fetched properties:", transformedData);
        }
      } catch (err) {
        setIsError(err.message);
        console.error("Error fetching properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="bg-[#FFDC82] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-10">Trending PGs</h2>

        <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory space-x-6 pb-4">
          {pgList.map((pg) => (
            <div
              key={pg.id}
              onClick={() => {
                navigate(`/user/view-pg/${pg.id}`, { state: { pg } });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="snap-start cursor-pointer shrink-0 w-[280px] bg-white rounded-2xl shadow-md p-4"
            >
              <div
                className="relative ">
                <img
                  src={pg.image}
                  alt={pg.name}
                  className="rounded-lg h-40 w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/room1.jpg"; // Fallback if image fails to load
                  }}
                />
                {pg.images.length > 1 && (
                  <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                    +{pg.images.length - 1}
                  </span>
                )}
                <div className="absolute top-2 right-2 flex space-x-2 text-gray-600">
                  <FaShareAlt />
                  <FaHeart />
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-gray-800 text-sm font-medium">{pg.name}</h3>
                <p className="text-gray-500 text-xs">
                  {pg.locality}, {pg.city}
                </p>
              </div>

              <div className="mt-3 text-sm">
                <p className="text-gray-500">
                  Starting from <span className="font-bold">₹{pg.price}</span>
                </p>
              </div>

              <div className="flex items-center text-yellow-400 text-xs mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <div className="mt-4 text-xs">
                <p className="font-medium">Amenities</p>
                <div className="flex space-x-2 mt-2">
                  {pg.amenities.slice(0, 4).map((amenity, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-gray-500"
                    >
                      {amenity}
                    </div>
                  ))}
                  {pg.amenities.length > 4 && (
                    <p className="text-gray-500">+{pg.amenities.length - 4} more</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}