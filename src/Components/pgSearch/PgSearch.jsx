// import React, { useState, useEffect } from "react";
// // import data from "./pgData.json";
// import { useNavigate } from "react-router-dom";
// import UserFilters from "./UserFilters";
// import SearchBar from "./SearchBar";
// import ListingCard from "./ListingCard";
// import image from "../../assets/user/pgsearch/image (5).png";
// import Header from "../Header";
// import { propertyAPI } from "../../Clients-components/PropertyController";

// export default function PgSearch() {
//   const [pgList, setPgList] = useState([]);
//   const [originalPgList, setOriginalPgList] = useState([]);
//   const [selectedPg, setSelectedPg] = useState(null);
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const [filters, setFilters] = useState({
//     city: "",
//     gender: "",
//     roomType: [],
//     budget: "",
//     recommended: false,
//     rating: "",
//     amenities: [],
//   });



//    // Fetch data on component mount
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//         const response = await propertyAPI.getAllClientProperties();
//         if (response.data?.success) {
//           // Transform API data to match your frontend structure
//           const transformedData = response.data.data.map(item => ({
//             id: item.property._id,
//             name: item.property.name,
//             city: item.property.city,
//             locality: item.property.locality,
//             street: item.property.street,
//             price: item.rooms?.roomTypes?.[0]?.price || 0, // Get price from first room type
//             rating: item.property.rating || 0,
//             reviews: item.property.reviews || 0,
//             image: item.media?.images?.[0] || "", // Get first image
//             owner: item.owner || {},
//             // description: item.property.description || "",
//             pgProperty: item.pgProperty || {},
//             pgPropertyId: item.pgProperty?.description || "",
//             rooms: item.rooms || {},
//             amenities: item.pgProperty?.amenities || [],
//             roomType: item.rooms?.roomTypes?.map(rt => rt.type) || [],
//             gender: item.pgProperty?.gender || "Not specified",
//             recommended: false, // You might want to calculate this
//             images: item.media?.images || []
//           }));
//           setPgList(transformedData);
//           console.log("Fetched properties:", transformedData);
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching properties:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//      if (originalPgList.length === 0) return;

//   let filtered = [...originalPgList];

   


//     // City
//     if (filters.city?.trim()) {
//       filtered = filtered.filter((pg) =>
//         pg.city?.toLowerCase().includes(filters.city.trim().toLowerCase())
//       );
//     }

//     // Gender
//     if (filters.gender) {
//       filtered = filtered.filter(
//         (pg) => pg.gender?.toLowerCase() === filters.gender.toLowerCase()
//       );
//     }

//     // Room Type
//     if (filters.roomType.length > 0) {
//     filtered = filtered.filter((pg) =>
//   pg.roomType.some((type) => filters.roomType.includes(type))
// );

//     }

//     // Budget
//     if (filters.budget) {
//       const [min, max] = filters.budget.split("-").map(Number);
//       if (!isNaN(min) && !isNaN(max)) {
//         filtered = filtered.filter((pg) => pg.price >= min && pg.price <= max);
//       }
//     }

//     // Recommended
//     if (filters.recommended) {
//       filtered = filtered.filter((pg) => pg.recommended === true);
//     }

//     // Rating
//     if (filters.rating) {
//       filtered = filtered.filter(
//         (pg) => Math.floor(pg.rating) >= filters.rating
//       );
//     }

//     // Amenities
//     if (filters.amenities?.length > 0) {
//       filtered = filtered.filter((pg) =>
//         filters.amenities.every((a) => pg.amenities?.includes(a))
//       );
//     }

//     setPgList(filtered);
//   }, [filters]);

//   return (
//     <>
//     <Header />
//     <div
//       className="w-full bg-center bg-cover px-10 py-20 min-h-screen "
//       style={{
//         backgroundImage: `url('${image}')`,
//       }}
//     >
//       <SearchBar setFilters={setFilters} />
//       <div className="flex flex-col md:flex-row items-start justify-center gap-2.5 md:gap-5 p-6 ">
//         {/* Filters Panel */}
//         <div className="w-full md:w-72 md:ml-10 ">
//           <UserFilters filters={filters} setFilters={setFilters} />
//         </div>

//         {/* Listings Panel */}
//         <div className="w-full md:w-2/4 px-4">
//           <div className="flex flex-col gap-6">
//             {pgList.length > 0 ? (
//               pgList.map((pg) => <ListingCard key={pg.id} pg={pg} />)
//             ) : (
//               <p className="text-center text-gray-500">
//                 No PGs match your filters.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }










import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserFilters from "./UserFilters";
import SearchBar from "./SearchBar";
import ListingCard from "./ListingCard";
import image from "../../assets/user/pgsearch/image (5).png";
import Search from "../../assets/pgsearch/undraw_house-searching_g2b8.png";
import Header from "../Header";
import { propertyAPI } from "../../Clients-components/PropertyController";

export default function PgSearch() {
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const navigate = useNavigate();

  const [pgList, setPgList] = useState([]);
  const [originalPgList, setOriginalPgList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("Query Params:", Array.from(queryParams.entries()));

  // Set initial filters from query params
  const [filters, setFilters] = useState({
    city: queryParams.get("city") || "",
    gender: queryParams.get("gender") || "",
    roomType: queryParams.get("roomType") ? queryParams.get("roomType").split(',') : [],
    budget: queryParams.get("budget") || "",
    recommended: false,
    rating: queryParams.get("rating") || "",
    amenities: queryParams.get("amenities") ? queryParams.get("amenities").split(',') : [],
  });

  console.log("Filters", filters);

  // Fetch data on component mount - FIXED
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertyAPI.getAllClientProperties();
        if (response.data?.success) {
          // Transform API data to match your frontend structure
          const transformedData = response.data.data.map(item => ({
            id: item.property._id,
            name: item.property.name,
            city: item.property.city,
            locality: item.property.locality,
            street: item.property.street,
            price: item.rooms?.roomTypes?.[0]?.price || 0,
            rating: item.property.rating || 0,
            reviews: item.property.reviews || 0,
            image: item.media?.images?.[0] || "",
            owner: item.owner || {},
            pgProperty: item.pgProperty || {},
            pgPropertyId: item.pgProperty?.description || "",
            rooms: item.rooms || {},
            amenities: item.pgProperty?.amenities || [],
            roomType: item.rooms?.roomTypes?.map(rt => rt.type) || [],
            gender: item.pgProperty?.gender || "Coliving",
            recommended: false,
            images: item.media?.images || []
          }));
          
          // ✅ CRITICAL FIX: Set both states
          setPgList(transformedData);
          setOriginalPgList(transformedData); // This was missing!
          console.log("Fetched properties:", transformedData.length, "items");
          console.log("Sample property:", transformedData[0]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filtering logic - IMPROVED with better debugging
  useEffect(() => {
    console.log(" Filtering triggered");
    console.log("Original list length:", originalPgList.length);
    console.log("Current filters:", filters);

    if (originalPgList.length === 0) {
      console.log(" No original data to filter");
      return;
    }

    let filtered = [...originalPgList];

    // City filter
    if (filters.city?.trim()) {
      const cityFilter = filters.city.trim().toLowerCase();
      filtered = filtered.filter((pg) => {
        const pgCity = (pg.city || "").toLowerCase();
        const matches = pgCity.includes(cityFilter);
        console.log(`City filter: ${pgCity} includes ${cityFilter}? ${matches}`);
        return matches;
      });
      console.log(`After city filter: ${filtered.length} items`);
    }

    // Gender filter
    if (filters.gender) {
      filtered = filtered.filter((pg) => {
        const pgGender = (pg.gender || "").toLowerCase();
        const matches = pgGender === filters.gender.toLowerCase();
        console.log(`Gender filter: ${pgGender} === ${filters.gender.toLowerCase()}? ${matches}`);
        return matches;
      });
      console.log(`After gender filter: ${filtered.length} items`);
    }

    // Room Type filter
    if (filters.roomType.length > 0) {
      filtered = filtered.filter((pg) => {
        const pgRoomTypes = pg.roomType || [];
        const hasMatch = pgRoomTypes.some((type) => filters.roomType.includes(type));
        console.log(`Room type filter: [${pgRoomTypes}] includes [${filters.roomType}]? ${hasMatch}`);
        return hasMatch;
      });
      console.log(`After room type filter: ${filtered.length} items`);
    }

    // Budget filter
    if (filters.budget) {
      const [min, max] = filters.budget.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter((pg) => {
          const price = pg.price || 0;
          const inBudget = price >= min && price <= max;
          console.log(`Budget filter: ${price} in ${min}-${max}? ${inBudget}`);
          return inBudget;
        });
      }
      console.log(`After budget filter: ${filtered.length} items`);
    }

    // Rating filter
    if (filters.rating) {
      const minRating = parseInt(filters.rating);
      if (!isNaN(minRating)) {
        filtered = filtered.filter((pg) => {
          const rating = pg.rating || 0;
          const meetsRating = Math.floor(rating) >= minRating;
          console.log(`Rating filter: ${rating} >= ${minRating}? ${meetsRating}`);
          return meetsRating;
        });
      }
      console.log(`After rating filter: ${filtered.length} items`);
    }

    // Amenities filter
    if (filters.amenities?.length > 0) {
      filtered = filtered.filter((pg) => {
        const pgAmenities = pg.amenities || [];
        const hasAllAmenities = filters.amenities.every((a) => pgAmenities.includes(a));
        console.log(`Amenities filter: [${pgAmenities}] includes all [${filters.amenities}]? ${hasAllAmenities}`);
        return hasAllAmenities;
      });
      console.log(`After amenities filter: ${filtered.length} items`);
    }

    // Recommended filter
    if (filters.recommended) {
      filtered = filtered.filter((pg) => pg.recommended === true);
      console.log(`After recommended filter: ${filtered.length} items`);
    }

    console.log("Final filtered results:", filtered.length);
    setPgList(filtered);
  }, [filters, originalPgList]);

  // Debug useEffect to monitor state changes
  useEffect(() => {
    console.log("State update - pgList:", pgList.length, "originalPgList:", originalPgList.length);
  }, [pgList, originalPgList]);

  return (
    <>
      <Header />
      <div
        className="w-full bg-center bg-cover px-10 py-20 min-h-screen"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      >
        {/* ✅ Centered SearchBar with Max Width */}
        <div className="flex justify-center">
          <div className="w-full max-w-8xl">
            <SearchBar setFilters={setFilters} initialCity={filters.city} />
          </div>
        </div>

        <div className="flex  flex-col md:flex-row items-start justify-center gap-2.5 md:gap-3 p-6">
          {/* Sidebar */}
          <div className="w-full md:w-[27%] md:ml-10">
            <UserFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* PG Listings */}
          <div className="w-full md:w-[55%] px-4 bg-white rounded-sm ">
            {loading ? (
              <p className="text-center text-gray-500">Loading PGs...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : pgList.length > 0 ? (
              <div className="flex flex-col gap-6 ">
                {pgList.map((pg) => (
                  <ListingCard key={pg.id} pg={pg} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                 <img 
                   alt="No PGs found"
                   src={Search} 
                   className="w-full h-auto mb-4 mt-20" // Fixed: ClassName -> className
                  />
              <p className="text-center text-gray-500">
                {originalPgList.length === 0 
                  ? "No PGs available." 
                  : "No PGs match your filters."
                }
              </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}