import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaShareAlt } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const {
    name = "Property Title",
    street = "",
    locality = "",
    city = "",
    images = [],
    startingPrice = "0",
    amenities = [],
    rating = 0
  } = property;

  const [isFavorite, setIsFavorite] = useState(false);

  // Format address
  const address = `${street}, ${locality}, ${city}`.replace(/, ,/g, ',').replace(/^, |, $/g, '');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full transition-all hover:shadow-xl">
      <div className="relative">
        <img
          src={images[0]?.url || "/fallback-image.png"}
          alt={name}
          className="w-full h-48 object-cover"
          onError={(e) => (e.target.src = "/fallback-image.png")}
        />
        <div className="absolute top-2 right-2 flex gap-3 p-2 text-gray-600">
          <FaShareAlt 
            className="text-xl hover:text-blue-500 cursor-pointer" 
            onClick={() => alert('Share functionality coming soon')}
          />
          {isFavorite ? (
            <FaHeart 
              className="text-xl text-red-500 cursor-pointer" 
              onClick={() => setIsFavorite(false)}
            />
          ) : (
            <FaRegHeart 
              className="text-xl hover:text-red-500 cursor-pointer" 
              onClick={() => setIsFavorite(true)}
            />
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg truncate">{name}</h3>
        <p className="text-gray-500 text-sm truncate">{address}</p>
        <p className="text-gray-700 font-semibold mt-2">
          Starting from <span className="font-bold">₹{startingPrice}</span>
        </p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-lg ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
            />
          ))}
        </div>
        <p className="text-gray-600 mt-2">Amenities</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-gray-500">+{amenities.length} more</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;