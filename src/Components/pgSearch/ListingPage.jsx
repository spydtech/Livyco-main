import React, { useState, useEffect } from "react";
import data from "./pgData.json";
import UserFilters from "./UserFilters";
import SearchBar from "./SearchBar";
import ListingCard from "./ListingCard";

import image from "../../assets/user/pgsearch/images/image.png";




export default function ListingPage() {
  const [pgList, setPgList] = useState(data);
  const [filters, setFilters] = useState({
    city: "",
    gender: "",
    roomType: [],
    budget: "",
    recommended: false,
    rating: "",
    amenities: [],
  });

  const ITEMS_PER_PAGE = 4;
  const [activeIndex, setActiveIndex] = useState(0); // Page index

  // Filter logic
  useEffect(() => {
    let filtered = [...data];

    if (filters.city?.trim()) {
      filtered = filtered.filter((pg) =>
        pg.city?.toLowerCase().includes(filters.city.trim().toLowerCase())
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(
        (pg) => pg.gender?.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    if (filters.roomType.length > 0) {
      filtered = filtered.filter((pg) =>
        filters.roomType.includes(pg.roomType)
      );
    }

    if (filters.budget) {
      const [min, max] = filters.budget.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter((pg) => pg.price >= min && pg.price <= max);
      }
    }

    if (filters.recommended) {
      filtered = filtered.filter((pg) => pg.recommended === true);
    }

    if (filters.rating) {
      filtered = filtered.filter(
        (pg) => Math.floor(pg.rating) >= filters.rating
      );
    }

    if (filters.amenities?.length > 0) {
      filtered = filtered.filter((pg) =>
        filters.amenities.every((a) => pg.amenities?.includes(a))
      );
    }

    setPgList(filtered);
    setActiveIndex(0); // Reset to first page on filter change
  }, [filters]);

  const totalPages = Math.ceil(pgList.length / ITEMS_PER_PAGE);
  const paginatedList = pgList.slice(
    activeIndex * ITEMS_PER_PAGE,
    (activeIndex + 1) * ITEMS_PER_PAGE
  );

  const prev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const next = () => {
    setActiveIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalPages - 1)
    );
  };

  return (
    <div
      className="w-full bg-center bg-cover p-6 min-h-screen"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <SearchBar setFilters={setFilters} />
      <div className="flex flex-col md:flex-row items-start justify-center gap-2.6 md:gap-4 p-6">
        <div className="w-full md:w-96 md:ml-0">
          <UserFilters filters={filters} setFilters={setFilters} />
        </div>

        <div className="w-full md:w-3/4 px-4">
          <div className="flex flex-col gap-6">

         
            {paginatedList.length > 0 ? (
              paginatedList.map((pg) => <ListingCard key={pg.id} pg={pg} />)
            ) : (
              <div>
              
              <p className="text-center text-gray-500">
                No PGs match your filters.
              </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {pgList.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center py-6 space-x-6">
          <button
            onClick={prev}
            className="w-14 h-14 border-2 border-gray-400 rounded-full text-xl font-bold flex items-center justify-center"
            disabled={activeIndex === 0}
          >
            ⟵
          </button>

          <div className="flex space-x-3">
            {[...Array(totalPages)].map((_, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-14 h-14 rounded-full cursor-pointer flex justify-center items-center border text-xl ${
                  activeIndex === index
                    ? "bg-yellow-400 text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <button
            onClick={next}
            className="w-14 h-14 border-2 border-gray-400 rounded-full text-xl font-bold flex items-center justify-center"
            disabled={activeIndex === totalPages - 1}
          >
            ⟶
          </button>
        </div>
      )}
    </div>
  );
}