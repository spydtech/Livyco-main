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

  useEffect(() => {
    let filtered = [...data];

    // City
    if (filters.city?.trim()) {
      filtered = filtered.filter((pg) =>
        pg.city?.toLowerCase().includes(filters.city.trim().toLowerCase())
      );
    }

    // Gender
    if (filters.gender) {
      filtered = filtered.filter(
        (pg) => pg.gender?.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    // Room Type
    if (filters.roomType.length > 0) {
      filtered = filtered.filter((pg) =>
        filters.roomType.includes(pg.roomType)
      );
    }

    // Budget
    if (filters.budget) {
      const [min, max] = filters.budget.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter((pg) => pg.price >= min && pg.price <= max);
      }
    }

    // Recommended
    if (filters.recommended) {
      filtered = filtered.filter((pg) => pg.recommended === true);
    }

    // Rating
    if (filters.rating) {
      filtered = filtered.filter(
        (pg) => Math.floor(pg.rating) >= filters.rating
      );
    }

    // Amenities
    if (filters.amenities?.length > 0) {
      filtered = filtered.filter((pg) =>
        filters.amenities.every((a) => pg.amenities?.includes(a))
      );
    }

    setPgList(filtered);
  }, [filters]);

  return (
    <div
      className="w-full bg-center bg-cover p-6 min-h-screen"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <SearchBar setFilters={setFilters} />
      <div className="flex flex-col md:flex-row items-start justify-center gap-2.5 md:gap-5 p-6 ">
        {/* Filters Panel */}
        <div className="w-full md:w-72 md:ml-10 ">
          <UserFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Listings Panel */}
        <div className="w-full md:w-2/4 px-4">
          <div className="flex flex-col gap-6">
            {pgList.length > 0 ? (
              pgList.map((pg) => <ListingCard key={pg.id} pg={pg} />)
            ) : (
              <p className="text-center text-gray-500">
                No PGs match your filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
