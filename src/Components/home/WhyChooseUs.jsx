import React from "react";
import {
  FaRegCalendarAlt,
  FaStar,
  FaListAlt,
  FaWallet,
  FaRegBookmark,
} from "react-icons/fa";
// import VirtualBookingSection from "./VirtualBookingSection";
import BookingSection from "./BookingSection";
import CategoryGrid from "./CategoryGrid";

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* ✅ Decorative SVG */}
        <div className="w-full flex justify-center py-10 overflow-x-hidden">
          <svg
            className="max-w-full"
            width="1440"
            height="80"
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="39.5" x2="1440" y2="39.5" stroke="#333333" />
            <rect width="700" height="80" transform="translate(370)" fill="#F8F8FF" />
            {/* … (rest of path omitted for brevity) */}
          </svg>
        </div>

        {/* ✅ Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center space-y-3">
            <FaRegCalendarAlt className="text-blue-800 text-3xl" />
            <h3 className="text-sm font-bold text-blue-800 uppercase">
              Avoid Physical Visit
            </h3>
            <p className="text-xs text-gray-500">
              By utilizing virtual Visit and online Enroll system
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center space-y-3">
            <FaStar className="text-blue-800 text-3xl" />
            <h3 className="text-sm font-bold text-blue-800 uppercase">
              Customer Reviews
            </h3>
            <p className="text-xs text-gray-500">
              Provide instant feedback, helping users make informed decisions
              based on reviews.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center space-y-3">
            <FaListAlt className="text-blue-800 text-3xl" />
            <h3 className="text-sm font-bold text-blue-800 uppercase">
              Amenities
            </h3>
            <p className="text-xs text-gray-500">
              Users to filter and select accommodations based on available
              features
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center space-y-3">
            <FaWallet className="text-blue-800 text-3xl" />
            <h3 className="text-sm font-bold text-blue-800 uppercase">
              Pay Online
            </h3>
            <p className="text-xs text-gray-500">
              Pay fee online without any hassle, ensuring a quick and Secure
              Payment With PayU or RazorPay
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center space-y-3">
            <FaRegBookmark className="text-blue-800 text-3xl" />
            <h3 className="text-sm font-bold text-blue-800 uppercase">
              Add To Favorites
            </h3>
            <p className="text-xs text-gray-500">
              Allows users to save and easily access their preferred hostels,
              PGs
            </p>
          </div>
        </div>

        {/* ✅ Stats Section */}
        <div className="flex flex-wrap justify-center gap-10 sm:gap-16 lg:gap-20 text-center text-[#333333]">
          <div>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold">20+</p>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600">Cities</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold">999+</p>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600">
              Hostel&apos;s & PG&apos;s
            </p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold">10k+</p>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600">
              Customers
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Additional Sections */}
      <BookingSection />
      <CategoryGrid />
    </section>
  );
}
