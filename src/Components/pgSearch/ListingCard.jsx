import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Pgimg from "../../assets/user/pgsearch/Pgimg.png";
import image5 from "../../assets/user/pgsearch/images/image5.png";
import image6 from "../../assets/user/pgsearch/images/image6.png";
import image7 from "../../assets/user/pgsearch/images/image7.png";
import image8 from "../../assets/user/pgsearch/images/image8.png";
import image9 from "../../assets/user/pgsearch/images/image9.png";
import image10 from "../../assets/user/pgsearch/images/image10.png";
import image11 from "../../assets/user/pgsearch/images/image11.png";
import image12 from "../../assets/user/pgsearch/images/image12.png";


const amenityImages = {
  "Wi-Fi": image5,
  "CC TV": image6,
  "Security guard": image7,
  "Daily Cleaning": image8,
  Smoking: image9,
  Alcohol: image10,
  "T.V": image11,
  Refrigerator: image12,
};

export default function ListingCard({ pg }) {
  const navigate = useNavigate();
  return (
    
      <div className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg w-full"
      
      onClick={() => navigate(`/user/view-pg/${pg.id}`, { state: { pg } })}

       >
        {/* Left: Image */}
        <div className="w-2/3 h-40 p-4 ">
          <img
            src={Pgimg}
            className="w-full h-full object-cover rounded-md"
            alt={pg.name}
          />
        </div>

        {/* Right: Content */}
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold">{pg.name}</h2>
            <p className="text-sm text-gray-600">{pg.location}</p>
            <p className="text-red-600 font-bold mt-1">₹{pg.price}/-</p>

            {/* Rating */}
            <div className="flex items-center text-yellow-500 text-sm mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {pg.rating >= i + 1 ? "★" : pg.rating >= i + 0.5 ? "★" : "☆"}
                </span>
              ))}
              <span className="ml-2 text-gray-600 text-xs">
                ({pg.rating} - {pg.reviews} reviews)
              </span>
            </div>

            {/* Amenities List */}
            <div className="mt-2 text-xs flex flex-wrap gap-2">
              {pg.amenities?.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                >
                  {amenityImages[amenity] && (
                    <img
                      src={amenityImages[amenity]}
                      alt={amenity}
                      className="w-3 h-3"
                    />
                  )}
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* View All link */}
          <div className="text-right mt-2">
            <p className="text-sm text-blue-600 underline cursor-pointer">
              View all
            </p>
          </div>
        </div>
      </div>
    
  );
}
