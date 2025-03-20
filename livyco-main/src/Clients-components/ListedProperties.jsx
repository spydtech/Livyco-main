import React from "react";
import { FaHeart, FaRegHeart, FaStar, FaShareAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/client-main/client-main-carousal-1.png";
import img2 from "../assets/client-main/client-main-carousal-2.png";
import img3 from "../assets/client-main/client-main-carousal-3.png";

const properties = [
  {
    id: 1,
    image: img1,
    title: "Hic doloremque odit sunt nulla et sed.",
    address: "Address Hic doloremque odit sunt...",
    price: "₹4,599",
    rating: 4,
    amenities: 5,
  },
  {
    id: 2,
    image: img2,
    title: "Hic doloremque odit sunt nulla et sed.",
    address: "Address Hic doloremque odit sunt...",
    price: "₹4,599",
    rating: 4,
    amenities: 5,
  },
  {
    id: 3,
    image: img3,
    title: "Hic doloremque odit sunt nulla et sed.",
    address: "Address Hic doloremque odit sunt...",
    price: "₹4,599",
    rating: 4,
    amenities: 5,
  },
];

const ListedProperties = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80">
      <div className="relative p-6">
        <img src={property.image} alt={property.title} className="w-full h-48 object-cover py-4 mt-10" />
        <div className="absolute top-2 right-2 flex space-x-2 text-gray-600 cursor-pointer p-4 space-x-4">
          <FaShareAlt className="text-xl hover:text-blue-500" />
          <FaRegHeart className="text-xl hover:text-red-500" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{property.title}</h3>
        <p className="text-gray-500 text-sm">{property.address}</p>
        <p className="text-gray-700 font-semibold mt-2">Starting from <span className="font-bold">{property.price}</span></p>
        <div className="flex items-center text-yellow-500 mt-2">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className={index < property.rating ? "text-yellow-500" : "text-gray-300"} />
          ))}
        </div>
        <p className="text-gray-600 mt-2">Amenities</p>
        <div className="flex items-center space-x-2 mt-1">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-4 h-4 border rounded-full"></div>
          ))}
          <span className="text-gray-500">+{property.amenities} more</span>
        </div>
      </div>
    </div>
  );
};

const RecentlyListedProperties = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#333333] py-10 px-5">
      <h2 className="text-white text-2xl font-semibold text-center mb-6">Recently listed properties</h2>
      <Slider {...settings} className="max-w-6xl mx-auto">
        {properties.map((property) => (
          <div key={property.id} className="px-2">
            <ListedProperties property={property} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecentlyListedProperties;