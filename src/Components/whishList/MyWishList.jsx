import React from "react";
import { FaPhone, FaCommentDots, FaHeart, FaShareAlt } from "react-icons/fa";
import Pgimg from "../../assets/user/home page/homepage image.png"; // Ensure this path is correct
import Header from "../Header"; // Import Header component

export default function MyWishList() {
  const wishlistData = [1, 2, 3];

  return (
    <>
    <Header />
    <div className="p-6 bg-white min-h-screen py-24">
      {/* Header */}
      <div className="flex items-center text-blue-700 mb-6 text-lg font-semibold">
        <span className="cursor-pointer mr-2">&larr;</span> My Wishlist
      </div>

      {/* Cards */}
      <div className="space-y-6 w-full md:w-3/5 ">
        {wishlistData.map((item, index) => (
          <div
            key={index}
            className="flex bg-gray-100 rounded-lg overflow-hidden shadow"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={Pgimg}
                alt="PG"
                className="w-96 h-40 object-cover"
              />
              {/* Price tag at bottom-left */}
              <div className="absolute bottom-2 left-2 bg-white text-yellow-500 font-bold text-sm px-2 py-1 rounded shadow">
                ₹0000.00
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-4 flex-grow">
              {/* Title + Share/Heart */}
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-lg text-gray-800">Name</div>
                <div className="flex gap-3 text-gray-500 text-lg">
                  <FaShareAlt className="cursor-pointer" />
                  <FaHeart className="cursor-pointer" />
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3">
                Sapiente aperiores ut inventore. Voluptatem molestiae atque minima
                corporis adipisci fugit a. Earum assumenda qui beatae aperiam
                quaerat est quis hic sit.
              </p>

              {/* Bottom Icons Row */}
              <div className="flex items-center gap-3">
                <button className="bg-blue-700 text-white px-4 py-1 rounded text-sm w-40">
                  View
                </button>
                <FaPhone className="text-yellow-400 text-lg cursor-pointer" />
                <FaCommentDots className="text-yellow-400 text-lg cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
