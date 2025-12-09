import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserFilters from "./UserFilters";
import SearchBar from "./SearchBar";
import ListingCard from "./ListingCard";
import image from "../../assets/user/pgsearch/image (5).png";
import Search from "../../assets/pgsearch/undraw_house-searching_g2b8.png";
import Header from "../Header";
import Footer from "../../Clients-components/Footer";
import { propertyAPI } from "../../Clients-components/PropertyController";

export default function PgSearch() {
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const navigate = useNavigate();

  const [pgList, setPgList] = useState([]);
  const [originalPgList, setOriginalPgList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

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

  // Fetch data on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setCurrentPage(1); // Reset to first page on new fetch
        const response = await propertyAPI.getAllClientProperties();
        if (response.data?.success) {
          // Transform API data to match your frontend structure
          const transformedData = response.data.data.map(item => ({
            id: item.property._id,
            name: item.property.name,
            city: item.property.city,
            locality: item.property.locality,
            status: item.property.status,
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
          
          setPgList(transformedData);
          setOriginalPgList(transformedData);
          
          // Calculate total pages
          const totalPages = Math.ceil(transformedData.length / itemsPerPage);
          setTotalPages(totalPages || 1);
          
          console.log("Fetched properties:", transformedData.length, "items");
          console.log("Total pages:", totalPages);
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

  // Filtering logic
  useEffect(() => {
    console.log("Filtering triggered");
    console.log("Original list length:", originalPgList.length);
    console.log("Current filters:", filters);

    if (originalPgList.length === 0) {
      console.log("No original data to filter");
      setPgList([]);
      setTotalPages(1);
      setCurrentPage(1);
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
    
    // Reset to first page when filters change
    setCurrentPage(1);
    
    // Calculate total pages based on filtered results
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(totalPages || 1);
    
  }, [filters, originalPgList, itemsPerPage]);

  // Calculate current items to display
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pgList.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Calculate showing text
  const getShowingText = () => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, pgList.length);
    const totalItems = pgList.length;
    
    if (totalItems === 0) return "No items found";
    if (totalItems <= itemsPerPage) return `Showing all ${totalItems} items`;
    return `Showing ${startIndex}-${endIndex} of ${totalItems} items`;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Near the beginning
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <>
      <Header />
      <div
        className="w-full bg-center bg-cover px-10 py-20 min-h-screen md:justify-normal justify-center"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      >
        {/* Centered SearchBar with Max Width */}
        <div className="flex md:justify-start justify-center w-full max-w-8xl ">
          <div className="">
            <SearchBar setFilters={setFilters} initialCity={filters.city} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-10 -ml-0 p-6 w-full max-w-9xl mx-auto md:-ml-10">
          {/* Sidebar */}
          <div className="">
            <UserFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* PG Listings with Pagination */}
          <div className="w-full md:w-[55%] px-4 bg-white rounded-sm min-h-[600px]">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <p className="text-center text-red-500 py-10">{error}</p>
            ) : pgList.length > 0 ? (
              <>
                {/* Results count */}
                <div className="mb-4 pt-4 px-2 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {getShowingText()}
                  </p>
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>

                {/* Listings */}
                <div className="flex flex-col gap-6">
                  {getCurrentItems().map((pg) => (
                    <ListingCard key={pg.id} pg={pg} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-8 mb-6">
                    {/* Items per page selector */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-600">
                        <span className="mr-2">Items per page:</span>
                        <select
                          value={itemsPerPage}
                          onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to first page
                          }}
                          className="border rounded px-3 py-1 text-sm bg-white"
                        >
                          <option value={3}>3</option>
                          <option value={6}>6</option>
                          <option value={9}>9</option>
                          <option value={12}>12</option>
                        </select>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {pgList.length} total items
                      </div>
                    </div>

                    {/* Pagination buttons */}
                    <div className="flex justify-center items-center space-x-2">
                      {/* Previous button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded border ${currentPage === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        ← Previous
                      </button>

                      {/* Page numbers */}
                      {getPageNumbers().map((pageNum, index) => (
                        <React.Fragment key={index}>
                          {pageNum === '...' ? (
                            <span className="px-3 py-1">...</span>
                          ) : (
                            <button
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-1 rounded border ${currentPage === pageNum 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                              {pageNum}
                            </button>
                          )}
                        </React.Fragment>
                      ))}

                      {/* Next button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded border ${currentPage === totalPages 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center py-10">
                <img 
                  alt="No PGs found"
                  src={Search} 
                  className="w-full max-w-md h-auto mb-4 mt-10"
                />
                <p className="text-center text-gray-500 text-lg font-medium">
                  {originalPgList.length === 0 
                    ? "No PGs available." 
                    : "No PGs match your filters."
                  }
                </p>
                {originalPgList.length > 0 && (
                  <button
                    onClick={() => setFilters({
                      city: "",
                      gender: "",
                      roomType: [],
                      budget: "",
                      recommended: false,
                      rating: "",
                      amenities: [],
                    })}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}










// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import UserFilters from "./UserFilters";
// import SearchBar from "./SearchBar";
// import ListingCard from "./ListingCard";
// import image from "../../assets/user/pgsearch/image (5).png";
// import Search from "../../assets/pgsearch/undraw_house-searching_g2b8.png";
// import Header from "../Header";
// import Footer from "../../Clients-components/Footer";
// import { propertyAPI } from "../../Clients-components/PropertyController";
// import { listItemSecondaryActionClasses } from "@mui/material";

// export default function PgSearch() {
//   const locationHook = useLocation();
//   const queryParams = new URLSearchParams(locationHook.search);
//   const navigate = useNavigate();

//   const [pgList, setPgList] = useState([]);
//   const [originalPgList, setOriginalPgList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   console.log("Query Params:", Array.from(queryParams.entries()));

//   // Set initial filters from query params
//   const [filters, setFilters] = useState({
//     city: queryParams.get("city") || "",
//     gender: queryParams.get("gender") || "",
//     roomType: queryParams.get("roomType") ? queryParams.get("roomType").split(',') : [],
//     budget: queryParams.get("budget") || "",
//     recommended: false,
//     rating: queryParams.get("rating") || "",
//     amenities: queryParams.get("amenities") ? queryParams.get("amenities").split(',') : [],
//   });

//   console.log("Filters", filters);

//   // Fetch data on component mount - FIXED
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
//             status: item.property.status,
//             street: item.property.street,
//             price: item.rooms?.roomTypes?.[0]?.price || 0,
//             rating: item.property.rating || 0,
//             reviews: item.property.reviews || 0,
//             image: item.media?.images?.[0] || "",
//             owner: item.owner || {},
//             pgProperty: item.pgProperty || {},
//             pgPropertyId: item.pgProperty?.description || "",
//             rooms: item.rooms || {},
//             amenities: item.pgProperty?.amenities || [],
//             roomType: item.rooms?.roomTypes?.map(rt => rt.type) || [],
//             gender: item.pgProperty?.gender || "Coliving",
//             recommended: false,
//             images: item.media?.images || []
//           }));
          
//           // ✅ CRITICAL FIX: Set both states
//           setPgList(transformedData);
//           setOriginalPgList(transformedData); // This was missing!
//           console.log("Fetched properties:", transformedData.length, "items");
//           console.log("Sample property:", transformedData[0]);
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

//   // Filtering logic - IMPROVED with better debugging
//   useEffect(() => {
//     console.log(" Filtering triggered");
//     console.log("Original list length:", originalPgList.length);
//     console.log("Current filters:", filters);

//     if (originalPgList.length === 0) {
//       console.log(" No original data to filter");
//       return;
//     }

//     let filtered = [...originalPgList];

//     // City filter
//     if (filters.city?.trim()) {
//       const cityFilter = filters.city.trim().toLowerCase();
//       filtered = filtered.filter((pg) => {
//         const pgCity = (pg.city || "").toLowerCase();
//         const matches = pgCity.includes(cityFilter);
//         console.log(`City filter: ${pgCity} includes ${cityFilter}? ${matches}`);
//         return matches;
//       });
//       console.log(`After city filter: ${filtered.length} items`);
//     }

//     // Gender filter
//     if (filters.gender) {
//       filtered = filtered.filter((pg) => {
//         const pgGender = (pg.gender || "").toLowerCase();
//         const matches = pgGender === filters.gender.toLowerCase();
//         console.log(`Gender filter: ${pgGender} === ${filters.gender.toLowerCase()}? ${matches}`);
//         return matches;
//       });
//       console.log(`After gender filter: ${filtered.length} items`);
//     }

//     // Room Type filter
//     if (filters.roomType.length > 0) {
//       filtered = filtered.filter((pg) => {
//         const pgRoomTypes = pg.roomType || [];
//         const hasMatch = pgRoomTypes.some((type) => filters.roomType.includes(type));
//         console.log(`Room type filter: [${pgRoomTypes}] includes [${filters.roomType}]? ${hasMatch}`);
//         return hasMatch;
//       });
//       console.log(`After room type filter: ${filtered.length} items`);
//     }

//     // Budget filter
//     if (filters.budget) {
//       const [min, max] = filters.budget.split("-").map(Number);
//       if (!isNaN(min) && !isNaN(max)) {
//         filtered = filtered.filter((pg) => {
//           const price = pg.price || 0;
//           const inBudget = price >= min && price <= max;
//           console.log(`Budget filter: ${price} in ${min}-${max}? ${inBudget}`);
//           return inBudget;
//         });
//       }
//       console.log(`After budget filter: ${filtered.length} items`);
//     }

//     // Rating filter
//     if (filters.rating) {
//       const minRating = parseInt(filters.rating);
//       if (!isNaN(minRating)) {
//         filtered = filtered.filter((pg) => {
//           const rating = pg.rating || 0;
//           const meetsRating = Math.floor(rating) >= minRating;
//           console.log(`Rating filter: ${rating} >= ${minRating}? ${meetsRating}`);
//           return meetsRating;
//         });
//       }
//       console.log(`After rating filter: ${filtered.length} items`);
//     }

//     // Amenities filter
//     if (filters.amenities?.length > 0) {
//       filtered = filtered.filter((pg) => {
//         const pgAmenities = pg.amenities || [];
//         const hasAllAmenities = filters.amenities.every((a) => pgAmenities.includes(a));
//         console.log(`Amenities filter: [${pgAmenities}] includes all [${filters.amenities}]? ${hasAllAmenities}`);
//         return hasAllAmenities;
//       });
//       console.log(`After amenities filter: ${filtered.length} items`);
//     }

//     // Recommended filter
//     if (filters.recommended) {
//       filtered = filtered.filter((pg) => pg.recommended === true);
//       console.log(`After recommended filter: ${filtered.length} items`);
//     }

//     console.log("Final filtered results:", filtered.length);
//     setPgList(filtered);
//   }, [filters, originalPgList]);

//   // Debug useEffect to monitor state changes
//   useEffect(() => {
//     console.log("State update - pgList:", pgList.length, "originalPgList:", originalPgList.length);
//   }, [pgList, originalPgList]);

//   return (
//     <>
//       <Header />
//       <div
//         className="w-full bg-center bg-cover px-10 py-20 min-h-screen md:justify-normal justify-center"
//         style={{
//           backgroundImage: `url('${image}')`,
//         }}
//       >
//         {/* ✅ Centered SearchBar with Max Width */}
//         <div className="flex md:justify-start justify-center w-full max-w-8xl ">
//           <div className="">
//             <SearchBar setFilters={setFilters} initialCity={filters.city} />
//           </div>
//         </div>

//         <div className="flex  flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-10 -ml-0 p-6 w-full max-w-9xl  mx-auto md:-ml-10">
//           {/* Sidebar */}
//           <div className=" ">
//             <UserFilters filters={filters} setFilters={setFilters} />
//           </div>

//           {/* PG Listings */}
//           <div className="w-full md:w-[55%] px-4 bg-white rounded-sm ">
//             {loading ? (
//               <p className="text-center text-gray-500">Loading PGs...</p>
//             ) : error ? (
//               <p className="text-center text-red-500">{error}</p>
//             ) : pgList.length > 0 ? (
//               <div className="flex flex-col gap-6 ">
//                 {pgList.map((pg) => (
//                   <ListingCard key={pg.id} pg={pg} />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center">
//                  <img 
//                    alt="No PGs found"
//                    src={Search} 
//                    className="w-full h-auto mb-4 mt-20" // Fixed: ClassName -> className
//                   />
//               <p className="text-center text-gray-500">
//                 {originalPgList.length === 0 
//                   ? "No PGs available." 
//                   : "No PGs match your filters."
//                 }
//               </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }