import React from "react";
import { FaShareAlt, FaHeart, FaStar } from "react-icons/fa";

const trendingPGs = [
  {
    id: 1,
    img: "/assets/room1.jpg",
    title: "Hic doloremque odit sunt nulla et sed.",
    address: "Address Hic doloremque odit sunt...",
    price: "₹4,599",
  },
  {
    id: 2,
    img: "/assets/room2.jpg",
    title: "Hic doloremque odit sunt nulla et sed.",
    address: "Address Hic doloremque odit sunt...",
    price: "₹4,599",
  },
  {
    id: 3,
    img: "/assets/room3.jpg",
    title: "Hic doloremque odit sunt nulla et sed.",
    address: "Address Hic doloremque odit sunt...",
    price: "₹4,599",
  },
  {
    id: 4,
    img: "/assets/room3.jpg",
    title: "Hic doloremque odit sunt nulla et sed.",
    address: "Address Hic doloremque odit sunt...",
    price: "₹4,599",
  },
  {
    id: 5,
    img: "/assets/room3.jpg",
    title: "Hic doloremque odit sunt nulla et sed.",
    address: "Address Hic doloremque odit sunt...",
    price: "₹4,599",
  },
];

export default function TrendingPGCarousel() {
  return (
    <div className="bg-[#FFDC82] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-10">Trending PGs</h2>

        <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory space-x-6 pb-4">
          {trendingPGs.map((pg) => (
            <div
              key={pg.id}
              className="snap-start shrink-0 w-[280px] bg-white rounded-2xl shadow-md p-4"
            >
              <div className="relative">
                <img
                  src={pg.img}
                  alt={pg.title}
                  className="rounded-lg h-40 w-full object-cover"
                />
                <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                  +10
                </span>
                <div className="absolute top-2 right-2 flex space-x-2 text-gray-600">
                  <FaShareAlt />
                  <FaHeart />
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-gray-800 text-sm font-medium">{pg.title}</h3>
                <p className="text-gray-500 text-xs">{pg.address}</p>
              </div>

              <div className="mt-3 text-sm">
                <p className="text-gray-500">
                  Starting from <span className="font-bold">{pg.price}</span>
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
                  {[1, 2, 3, 4].map((_, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 rounded-full border border-gray-400"
                    />
                  ))}
                  <p className="text-gray-500">+5 more</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
