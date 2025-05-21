import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
    Wifi,
    Dumbbell,
    Car,
    Shield,
    Snowflake,
    Bolt,
    Utensils,
    UserCheck,
    Flame,
    Shirt, // ✅ Replaced 'Iron' with 'Shirt'
    Building2, // ✅ Use 'Building2' instead of 'Lift'
    Sun,
    Refrigerator
  } from "lucide-react";
  
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { FaArrowLeft } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const images = [
    "/images/property1.jpg",
    "/images/property2.jpg",
    "/images/property3.jpg",
    "/images/property4.jpg",
    "/images/property5.jpg",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen">
      {/* Back Button */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-700">
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>

      {/* Property Details */}
      <div className="bg-white p-8 rounded-lg ">
        <h2 className="text-3xl font-semibold mb-6">Property Details</h2>

        {/* Property Info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-gray-600">Property Name</label>
            <input className="w-full border p-2 rounded" value="Iure Industor Stone" readOnly />
          </div>
          <div>
            <label className="text-gray-600">Location</label>
            <input className="w-full border p-2 rounded" value="Palm Coast" readOnly />
          </div>
          <div>
            <label className="text-gray-600">Hostel Reg ID</label>
            <input className="w-full border p-2 rounded" value="0000000" readOnly />
          </div>
          <div>
            <label className="text-gray-600">FSSAI No.</label>
            <input className="w-full border p-2 rounded" value="FSSAI Number" readOnly />
          </div>
          <div>
            <label className="text-gray-600">GST Number</label>
            <input className="w-full border p-2 rounded" value="GST Number" readOnly />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="text-gray-600">Description</label>
          <textarea className="w-full border p-2 rounded h-24" readOnly>
            Sample description of the property. This is where all details will be displayed.
          </textarea>
        </div>

        {/* Pricing & Amenities */}
        <div className="grid grid-cols-2 gap-10 bg-white p-8 ">
          {/* Pricing Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Pricing</h3>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium text-gray-600">Sharing Type</span>
              <span className="font-medium text-gray-600">Advance</span>
              <span className="font-medium text-gray-600">Fee</span>

              {["Single Sharing", "Double Sharing", "Triple Sharing", "Four Sharing", "Five Sharing", "Six Sharing"].map((type) => (
                <React.Fragment key={type}>
                  <span className="text-gray-700">{type}</span>
                  <input className="border p-2 rounded text-gray-700" value="₹ 2,000" readOnly />
                  <input className="border p-2 rounded text-gray-700" value="₹ 8,000" readOnly />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Amenities Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-y-4">
              {[
                { name: "Internet", icon: Wifi },
                { name: "Gym", icon: Dumbbell },
                { name: "Parking Area", icon: Car },
                { name: "CCTV Camera", icon: Shield },
                { name: "A.C", icon: Snowflake },
                { name: "Power Backup", icon: Bolt },
                { name: "Food", icon: Utensils },
                { name: "Security", icon: UserCheck },
                { name: "Fire Safety", icon: Flame },
                { name: "Iron", icon: Shirt },
                { name: "Lift", icon: Building2 },
                { name: "Solar Power", icon: Sun },
                { name: "Refrigerator", icon: Refrigerator },
              ].map(({ name, icon: Icon }) => (
                <div key={name} className="flex items-center gap-2 text-gray-700">
                  <Icon className="w-5 h-5" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex justify-between">
            Images / Videos{" "}
            <span className="text-blue-600 cursor-pointer" onClick={() => setIsModalOpen(true)}>
              View All →
            </span>
          </h3>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            className="w-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Property ${index + 1}`} className="w-full h-32 rounded-lg object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View Owner Details */}
        <div className="mb-6">
          <button className="text-blue-600 flex items-center">View Owner Details →</button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="bg-[#0827B2] text-white px-6 py-2 rounded-lg">Approve Listing</button>
          <button 
          onClick={() => setModalType("revision")}
          className="bg-white border-[#0827B2] border text-[#0827B2] px-6 py-2 rounded-lg">Request Revision</button>
          <button 
          onClick={() => setModalType("cancel")}
          className="bg-white border border-[#FF0404] text-[#FF0404] px-6 py-2 rounded-lg">Reject Listing</button>
        </div>
      </div>
       {/* Modal for Request Revision */}
       <Dialog open={modalType === "revision"} onClose={() => setModalType(null)} className="fixed inset-0 flex items-center justify-center bg-white ">
        <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
          <h3 className="text-xl font-semibold">Request Revision</h3>
          <p className="text-gray-600 text-sm mt-2">Please provide details about the necessary revisions.</p>
          <textarea className="w-full border p-2 rounded h-24 mt-4" placeholder="Enter revision details..."></textarea>
          <div className="flex justify-between mt-4">
            <button className="bg-[#0827B2] text-white px-6 py-2 rounded-lg">Update</button>
            <button className="border border-[#0827B2] text-[#0827B2] px-6 py-2 rounded-lg">Save</button>
            <button className="border border-[#FF0404] text-[#FF0404] px-6 py-2 rounded-lg" onClick={() => setModalType(null)}>Cancel</button>
          </div>
        </div>
      </Dialog>

      {/* Modal for Cancel Listing */}
      <Dialog open={modalType === "cancel"} onClose={() => setModalType(null)} className="fixed inset-0 flex items-center justify-center bg-white ">
        <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
          <h3 className="text-xl font-semibold">Cancel Listing</h3>
          <p className="text-gray-600 text-sm mt-2">Provide a reason for canceling this listing.</p>
          <textarea className="w-full border p-2 rounded h-24 mt-4" placeholder="Enter reason..."></textarea>
          <div className="mt-4 flex justify-center">
            <button className="border border-[#FF0404] text-[#FF0404] px-6 py-2 rounded-lg w-full" onClick={() => setModalType(null)}>Cancel Listing</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PropertyDetails;
