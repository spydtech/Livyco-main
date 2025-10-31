import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Wifi, Dumbbell, Car, Shield, Snowflake, Bolt, Utensils,
  UserCheck, Flame, Shirt, Building2, Sun, Refrigerator,
  MapPin
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Dialog } from "@headlessui/react";
import propertyAPI from "../adminController";
import { mediaAPI, pgAPIadmin, roomAPIadmin, mapAPI } from "../adminController";
import FreeMapComponent from "../../Components/usermaps/FreeMapComponent"; // Import your FreeMapComponent


const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [property, setProperty] = useState(location.state?.property || null);
  const [rooms, setRooms] = useState(location.state?.rooms || null);
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(!location.state?.property);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalReason, setModalReason] = useState("");
  const [pgDetails, setPgDetails] = useState(null);
  const [roomRentData, setRoomRentData] = useState([]);
  
  // Map states
  const [locationData, setLocationData] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapApiError, setMapApiError] = useState(null);
  const [showMapView, setShowMapView] = useState(false);

  // ✅ Fetch property media using mediaAPI
  useEffect(() => {
    const fetchPropertyAndMedia = async () => {
      try {
        setIsLoading(true);

        if (id) {
          const mediaRes = await mediaAPI.getMediaByProperty(id);
         

          if (mediaRes.data.success) {
            const mediaData = mediaRes.data.media || { images: [], videos: [] };
            const allMedia = [...(mediaData.images || []), ...(mediaData.videos || [])];
            
            setMedia(allMedia);
          }
          
          const pgRes = await pgAPIadmin.getPGProperty(id);
        
          if (pgRes.data.success) {
            setPgDetails(pgRes.data.pgData || null);
          }
          
          const res = await roomAPIadmin.getRoomRentData(id); 
          if (res.data.success) {
            setRoomRentData(res.data.rentData || []);
          } else {
            setRoomRentData([]);
          }

          // Fetch location data
          await fetchLocationData();
        }
      } catch (err) {
        console.error("Error loading property/media:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyAndMedia();
  }, [id]);

  // Fetch location data for the property
  const fetchLocationData = async () => {
    try {
      setMapLoading(true);
      setMapApiError(null);

     

      const res = await mapAPI.getMapByProperty(id);
     

      if (res.data && res.data.success && res.data.location) {
        setLocationData(res.data.location);
      } else {
        setLocationData(null);
        setMapApiError("No location data found for this property");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      
      if (error.response?.status === 404) {
        setLocationData(null);
        setMapApiError("Location data not found for this property");
      } else if (error.response?.status === 500) {
        setMapApiError("Server error. Please try again later.");
        setLocationData(null);
      } else if (error.code === 'NETWORK_ERROR') {
        setMapApiError("Network error. Please check your connection.");
        setLocationData(null);
      } else {
        setMapApiError("No Map locations found for this property");
        setLocationData(null);
      }
    } finally {
      setMapLoading(false);
    }
  };

  // Approve property
  const handleApprove = async () => {
    try {
      const response = await propertyAPI.approveProperty(id);
      if (response.data.success) {
        alert("Property approved successfully!");
        setProperty(prev => ({ ...prev, status: "approved" }));
        navigate(-1);
      } else {
        alert(response.data.message || "Failed to approve property");
      }
    } catch (err) {
      console.error("Approval error:", err);
      alert(err.response?.data?.message || "Error approving property");
    }
  };

  // Reject property
  const handleReject = async () => {
    if (modalReason.trim().length < 10) {
      alert("Rejection reason must be at least 10 characters.");
      return;
    }
    try {
      const response = await propertyAPI.rejectProperty(id, { rejectionReason: modalReason });
      if (response.data.success) {
        alert("Listing rejected successfully");
        setProperty(prev => ({ ...prev, status: "rejected", rejectionReason: modalReason }));
        setModalType(null);
        setModalReason("");
        navigate(-1);
      } else {
        alert(response.data.message || "Failed to reject property");
      }
    } catch (err) {
      console.error("Error rejecting listing:", err);
      alert(err.response?.data?.message || "Error rejecting listing.");
    }
  };

  // Request revision
  const handleRevision = async () => {
    if (modalReason.trim().length < 10) {
      alert("Revision notes must be at least 10 characters.");
      return;
    }
    try {
      const response = await propertyAPI.requestRevision(id, { revisionNotes: modalReason });
      if (response.data.success) {
        alert("Revision requested successfully");
        setProperty(prev => ({ ...prev, status: "revision_requested", revisionNotes: modalReason }));
        setModalType(null);
        setModalReason("");
      } else {
        alert(response.data.message || "Failed to request revision");
      }
    } catch (err) {
      console.error("Error requesting revision:", err);
      alert(err.response?.data?.message || "Error requesting revision.");
    }
  };

  const toggleMapView = () => {
    setShowMapView(!showMapView);
  };

  if (isLoading)
    return (
      <div className="p-6 h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-2 border-blue-500 rounded-full border-b-transparent"></div>
      </div>
    );

  if (error) return <div className="p-6">Error: {error}</div>;
  if (!property) return <div className="p-6">Property not found</div>;

  const images = media.length > 0 ? media.map(m => m.url || m.filePath) : ["/images/property1.jpg"];
  const pins = locationData?.pins || [];
  const hasPins = pins.length > 0;

  const iconMap = {
    Internet: Wifi,
    Gym: Dumbbell,
    Parking: Car,
    "CCTV Camera": Shield,
    AC: Snowflake,
    Backup: Bolt,
    Food: Utensils,
    Security: UserCheck,
    "Fire Safety": Flame,
    Iron: Shirt,
    Lift: Building2,
    "Solar Power": Sun,
    Fridge: Refrigerator
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <button onClick={() => navigate(-1)} className="text-gray-700 mb-4 flex items-center">
        <FaArrowLeft className="mr-2" />Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Property Details</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {[["Property Name", property.property],
          ["Location", property.location],
          ["Client ID", property.clientId],
          ["Owner Name", property.name],
          ["Contact Number", property.phone],
          ["Status", property.status],
          ["Accommodation Type", pgDetails?.gender || "N/A"]
          ].map(([label, value], i) => (
            <div key={i}>
              <label className="text-gray-600">{label}</label>
              <input readOnly value={value || "N/A"} className="w-full border p-2 rounded" />
            </div>
          ))}
        </div>

        <label className="text-gray-600">Description</label>
        <textarea
          readOnly
          className="w-full border p-2 rounded mb-6"
          value={property.description || "No description available"}
        />

        {/* Pricing & Amenities */}
        <div className="grid grid-cols-2 gap-10 bg-white p-8">
          {/* Pricing */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Pricing</h3>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-medium text-gray-600">Sharing Type</span>
              <span className="font-medium text-gray-600">Advance</span>
              <span className="font-medium text-gray-600">Monthly Fee</span>

              {roomRentData.length > 0 ? (
                roomRentData.map((room, index) => (
                  <React.Fragment key={index}>
                    <span className="text-gray-700">{room.roomType}</span>
                    <input className="border p-2 rounded" value={`₹ ${room.deposit || 0}`} readOnly />
                    <input className="border p-2 rounded" value={`₹ ${room.price || 0}`} readOnly />
                  </React.Fragment>
                ))
              ) : (
                <span className="text-gray-700 col-span-3">No pricing data available</span>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-y-3">
              {pgDetails?.amenities?.length > 0 ? (
                pgDetails.amenities.map((amenity) => {
                  const Icon = iconMap[amenity]; 
                  return (
                    <div key={amenity} className="flex items-center gap-2 text-gray-700">
                      {Icon && <Icon className="w-4 h-4" />}
                      {amenity}
                    </div>
                  );
                })
              ) : (
                <span className="text-gray-700 col-span-2">No amenities available</span>
              )}
            </div>
          </div>
        </div>

        {/* Media Swiper */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 flex justify-between">
            Images
            <span onClick={() => setModalType("images")} className="text-blue-500 cursor-pointer">View All →</span>
          </h3>
          <Swiper modules={[Navigation, Pagination]} spaceBetween={10} slidesPerView={3} navigation pagination={{ clickable: true }}>
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt="Property" className="rounded h-32 w-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Location Section with Map */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b flex justify-between items-center">
            <p className="flex items-center gap-2 text-gray-700 font-semibold">
              <MapPin className="w-5 h-5" />
              Property Location
              {hasPins && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({pins.length} location pin{pins.length !== 1 ? 's' : ''})
                </span>
              )}
            </p>
            <button
              onClick={toggleMapView}
              className="bg-[#facc14] text-black px-4 py-2 rounded-lg text-sm  transition-colors"
            >
              {showMapView ? "Show Simple View" : "Show Detailed Map"}
            </button>
          </div>

          {showMapView ? (
            <div className="p-4">
              <FreeMapComponent pins={pins} propertyName={property.property || property.name} />
            </div>
          ) : (
            // Simple map view
            <div className="p-4">
              {mapLoading ? (
                <div className="p-8 text-center">
                  <p>Loading property location...</p>
                </div>
              ) : mapApiError ? (
                <div className="p-6 text-center">
                  <div className=" rounded-lg p-4 max-w-md mx-auto">
                    {/* <div className="text-red-600 mb-2">⚠️ Error Loading Map</div> */}
                    <p className=" text-sm mb-4">{mapApiError}</p>
                    {/* <button
                      onClick={fetchLocationData}
                      className=" px-4 py-2 rounded text-sm hover:bg-red-700"
                    >
                      Retry
                    </button> */}
                  </div>
                </div>
              ) : !hasPins ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold mb-2">Location Not Available</h3>
                  <p className="text-gray-600">
                    Location details for this property are not available.
                  </p>
                </div>
              ) : (
                <div>
                  
                  {/* Location Details - Scrollable */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    
                    {/* Scrollable container with fixed height for 2 items */}
                    <div className="max-h-48 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {pins.map((pin, index) => (
                        <div 
                          key={index} 
                          className="text-sm text-gray-600 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                                  📍 Pin {index + 1}
                                </span>
                              </div>
                              <p className="font-medium text-gray-800">{pin.address}</p>
                              <div className="text-xs text-gray-500 mt-1 space-y-1">
                                <p><span className="font-medium">Latitude:</span> {pin.lat.toFixed(6)}</p>
                                <p><span className="font-medium">Longitude:</span> {pin.lng.toFixed(6)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Show count if there are more than 2 pins */}
                    {pins.length > 2 && (
                      <div className="mt-3 text-center">
                        <p className="text-xs text-gray-500">
                          Showing 2 of {pins.length} locations • Scroll to see more
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleApprove}
            disabled={property?.status === "approved"}
            className={`bg-[#0827B2] text-white px-6 py-2 rounded-lg ${property?.status === "approved" ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
          >
            {property?.status === "approved" ? "Approved" : "Approve Listing"}
          </button>

          <button onClick={() => setModalType("revision")} className="border border-blue-700 text-blue-700 px-6 py-2 rounded hover:bg-blue-50 transition-colors">
            Request Revision
          </button>
          <button onClick={() => setModalType("reject")} className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50 transition-colors">
            Reject
          </button>
        </div>
      </div>

      {/* Reject / Revision Modal */}
      <Dialog open={modalType === "reject" || modalType === "revision"} onClose={() => setModalType(null)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded w-96">
          <h3 className="text-lg font-bold mb-2">{modalType === "revision" ? "Request Revision" : "Reject Listing"}</h3>
          <textarea 
            className="w-full border p-2 rounded mb-4" 
            placeholder="Enter reason..." 
            value={modalReason} 
            onChange={(e) => setModalReason(e.target.value)} 
            rows="4"
          />
          <div className="flex justify-between">
            <button 
              onClick={() => modalType === "revision" ? handleRevision() : handleReject()} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button 
              onClick={() => setModalType(null)} 
              className="text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={modalType === "images"} onClose={() => setModalType(null)} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
        <div className="bg-white p-6 rounded max-w-3xl w-full">
          <h3 className="text-lg font-semibold mb-4">All Images</h3>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <img key={idx} src={img} alt="" className="rounded h-32 object-cover w-full" />
            ))}
          </div>
          <div className="mt-4 text-right">
            <button onClick={() => setModalType(null)} className="text-blue-600 hover:text-blue-800">Close</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PropertyDetails;