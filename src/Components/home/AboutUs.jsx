import React from "react";

export default function AboutUs() {
  return (
    <section className="bg-[#F6F7FC] px-4 md:px-16 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Circle */}
        <div className="flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-blue-800 rounded-full"></div>
        </div>

        {/* Right Text */}
        <div>
          <div className="relative mb-6 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 inline-block relative">
              <span className="after:absolute after:w-full after:h-[2px] after:bg-gray-700 after:top-1/2 after:left-0 after:-translate-y-1/2 after:-z-10">
                <span className="bg-[#F6F7FC] relative z-10 px-4">
                  About Us
                </span>
              </span>
            </h2>
          </div>

          <p className="text-gray-800 text-base leading-relaxed">
            Our website is dedicated to helping students and travelers find the
            perfect accommodation that suits their needs. We offer a wide range
            of verified options, including hostels and paying guest
            accommodations, with detailed information on amenities, prices, and
            reviews. Our platform makes it easy to compare, book, and manage
            stays online, ensuring a seamless and hassle-free experience.
            Whether you're looking for budget-friendly options or more premium
            stays, we're here to help you find a place that feels like home.
          </p>

          <div className="mt-8">
            <button className="bg-gradient-to-r from-indigo-900 to-blue-500 text-white px-6 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition-transform">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
