import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const UserDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
    const navigate = useNavigate();
    const item = location.state || {};
  const { id } = useParams();
//   const [user, setUser] = useState(null);

  const images = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
  ];
  
  return (
    <div className="bg-white min-h-screen p-0">
      <div className="bg-white p-6 max-w-6xl mx-auto">
        <button 
        onClick={() => navigate(-1)}
        className="text-gray-600 text-lg">
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold mt-4 py-5">User Details</h2>
        <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-md">{item.role}</span>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="User Name" className="border p-2 w-full rounded" defaultValue={item.owner} />
          <input type="text" placeholder="Mobile Number" className="border p-2 w-full rounded" defaultValue={item.contact} />
          <input type="text" placeholder="Email" className="border p-2 w-full rounded" defaultValue={item.email} />
          <input type="text" placeholder="Last Login Date" className="border p-2 w-full rounded" defaultValue={item.date} />
          <input type="text" placeholder="Role" className="border p-2 w-full rounded" defaultValue={item.role} />
          <input type="text" placeholder="Status" className="border p-2 w-full rounded" defaultValue={item.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <textarea placeholder="Residential Address" className="border p-2 w-full h-24 rounded">abc</textarea>
          <textarea placeholder="Permanent Address" className="border p-2 w-full h-24 rounded">abc</textarea>
        </div>

        {/* Uploaded Documents Section */}
        <div className="flex justify-between items-center mt-6">
          <h3 className="font-semibold">Uploaded Documents</h3>
          <button
            className="text-blue-600 text-sm hover:underline"
            onClick={() => setIsModalOpen(true)}
          >
            View All →
          </button>
        </div>

        <div className="relative mt-4">
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            pagination={{ clickable: true }}
            navigation
            modules={[Navigation, Pagination]}
            className="mt-4"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="w-24 h-24 object-cover rounded border shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Modal for Viewing All Images */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-3xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">All Uploaded Documents</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-32 object-cover rounded border shadow"
                />
              ))}
            </div>
          </div>
        </Dialog>

        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Mark as Verified</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
