import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Phone, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { MapPin } from 'lucide-react';
import { Plane, TrainFront, Bus, Hospital, ShoppingCart } from "lucide-react";
import bgImg from '../../assets/user/pgsearch/image (5).png';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../Header";

import FreeMapComponent from "../usermaps/FreeMapComponent";
import { mapAPI } from "../../Clients-components/PropertyController";

export default function BookPG() {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [data, setData] = useState([])
  const [showAll, setShowAll] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapApiError, setMapApiError] = useState(null);
  const [showMapView, setShowMapView] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const pg = location.state?.pg;
  const navigate = useNavigate();

  // ✅ Get user from localStorage once for the whole component
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate("/user/login", {
        state: { from: `/pg/${id}`, message: "Please login to view PG details" }
      });
    }
  }, [id, user, navigate]);

  // Get the property ID safely
  const getPropertyId = () => {
    return pg?._id || pg?.id || id;
  };

  // Fetch location data for the PG using your actual API
  useEffect(() => {
    const fetchLocationData = async () => {
      const propertyId = getPropertyId();

      if (!propertyId || propertyId === 'undefined') {
        console.log('No valid property ID found:', { pg, id });
        setMapLoading(false);
        setMapApiError("Property ID not available");
        return;
      }

      try {
        setMapLoading(true);
        setMapApiError(null);

        console.log('Fetching location data for property ID:', propertyId);

        // Use your actual API call
        const res = await mapAPI.getMapByProperty(propertyId);

        console.log('Location API response:', res);

        if (res.data && res.data.success && res.data.location) {
          setLocationData(res.data.location);
        } else {
          setLocationData(null);
          setMapApiError("No location data found for this property");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);

        // Handle different types of errors
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
          setMapApiError("Failed to load location data. Please try again.");
          setLocationData(null);
        }
      } finally {
        setMapLoading(false);
      }
    };

    if (pg || id) {
      fetchLocationData();
    } else {
      setMapLoading(false);
      setMapApiError("Property information not available");
    }
  }, [pg, id]);

  // Handle undefined pg gracefully
  if (!pg) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        PG not found. Please go back and try again.
      </div>
    );
  }

  const bg = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: '100%',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  // Function to handle phone call
  const handlePhoneClick = () => {
    const phoneNumber = pg?.owner?.phone || "1234567890";
    window.location.href = `tel:${phoneNumber}`;
  };

  // Function to handle message click
  const handleMessageClick = () => {
    if (!user) {
      navigate("/user/login");
      return;
    }

    navigate("/user/chats", {
      state: {
        recipientId: pg.ownerId || pg.owner._id,
        recipientName: pg.owner?.name || "PG Owner",
        propertyId: getPropertyId(),
        propertyName: pg.name,
        clientId: pg.owner?.clientId || "client ID",
        role: "client"
      }
    });
  };

  const handleview = () => {
    if (!pg) {
      console.error("PG data is missing");
      return;
    }

    const propertyId = getPropertyId();

    if (!propertyId) {
      console.error("Property ID is undefined", pg);
      alert("Unable to book: Property information is incomplete");
      return;
    }

    const propertyName = pg.name || pg.propertyName;
    const roomTypes = pg.rooms?.roomTypes || pg.roomTypes || [];
    const price = roomTypes[0]?.price || 0;
    const rooms = pg.rooms || {};
    const owner = pg.owner || {};

    navigate(`/user/booking`, {
      state: {
        propertyId,
        propertyName,
        roomTypes,
        price,
        rooms,
        owner,
        role: "client",
      }
    });
  };

  const toggleMapView = () => {
    setShowMapView(!showMapView);
  };

  const Images = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0e2OTHsRbRXRY-NYRFZir7YdqURRk1dDD6g&s",
      name: "Fitness Arena",
      price: "00.0000",
      rating: 4.5,
      distance: "Within in Km",
    },
    {
      img: "https://thumbs.dreamstime.com/b/barbel-dumbbell-gym-icon-logo-template-barbel-dumbbell-gym-icon-logo-template-gym-badge-fitness-logo-design-barbell-vector-weight-144308752.jpg",
      name: "Barbell Gym",
      price: "00.0000",
      rating: 4.7,
      distance: "Within in Km",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0e2OTHsRbRXRY-NYRFZir7YdqURRk1dDD6g&s",
      name: "Flex Fit Center",
      price: "00.0000",
      rating: 4.3,
      distance: "Within in Km",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0e2OTHsRbRXRY-NYRFZir7YdqURRk1dDD6g&s",
      name: "Body Zone",
      price: "00.0000",
      rating: 4.4,
      distance: "Within in Km",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0e2OTHsRbRXRY-NYRFZir7YdqURRk1dDD6g&s",
      name: "Muscle Garage",
      price: "00.0000",
      rating: 4.6,
      distance: "Within in Km",
    },
    {
      img: "https://thumbs.dreamstime.com/b/barbel-dumbbell-gym-icon-logo-template-barbel-dumbbell-gym-icon-logo-template-gym-badge-fitness-logo-design-barbell-vector-weight-144308752.jpg",
      name: "Iron Temple",
      price: "00.0000",
      rating: 4.8,
      distance: "Within in Km",
    },
  ];

  const neighborhoodData = [
    {
      icon: <Plane className="w-5 h-5 text-blue-600" />,
      title: "Airport",
      name: "Rajiv Gandhi Intl. Airport",
      walk: "km | hrs",
    },
    {
      icon: <TrainFront />,
      title: "Metro Station",
      name: "Kukatpally Metro Station",
      walk: "km | hrs",
    },
    {
      icon: <Bus />,
      title: "Bus Stop",
      name: "KPHB Bus Stop",
      walk: "km | hrs",
    },
    {
      icon: <TrainFront />,
      title: "Railway Station",
      name: "Hafeezpet Station",
      walk: "km | hrs",
    },
    {
      icon: <Hospital />,
      title: "Hospital",
      name: "Rainbow Hospital",
      walk: "km | hrs",
    },
    {
      icon: <ShoppingCart />,
      title: "Market",
      name: "Forum Mall Kukatpally",
      walk: "km | hrs",
    },
  ];

  const people = [
    {
      id: 1,
      name: "Rahul",
      occupation: "Designer",
      rating: "4.8",
      comment: "Loved the simplicity!",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 2,
      name: "Rahul",
      occupation: "Designer",
      rating: "4.8",
      comment: "Loved the simplicity!",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 3,
      name: "Rahul",
      occupation: "Designer",
      rating: "4.8",
      comment: "Loved the simplicity!",
      avatar: "https://example.com/avatar1.jpg",
    },
  ];

  const displayedData = showAll ? neighborhoodData : neighborhoodData.slice(0, 4);
  const pins = locationData?.pins || [];
  const hasPins = pins.length > 0;
  const property = getPropertyId();

  return (
    <>
      <Header />
      <div
        className="w-full min-h-screen bg-cover bg-no-repeat bg-center px-0 py-2"
        style={{ backgroundImage: `url('${bgImg}')` }}
      >
        <div className="flex flex-col mx-10 md:mx-44">
          <div className="text-sm text-gray-600 mb-4">
            <span>Home</span>
            <span> / </span>
            <span>PG Booking</span>
          </div>

          {/* First image box and text */}
          <div className="flex flex-col md:flex-row p-2 mt-10 md:gap-6 gap-6">
            {/* Image + Thumbnails */}
            <div className="w-full md:w-2/5 flex flex-col gap-3">
              {/* Main Image */}
              <div>
                <img
                  src={
                    pg.images?.[0]?.url ||
                    pg.image ||
                    "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDBaeMzM1/LmpwZw"
                  }
                  alt="Main PG"
                  className="w-full h-48 object-cover rounded-2xl shadow"
                  onError={(e) => {
                    e.target.src =
                      "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDBaeMzM1/LmpwZw";
                  }}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {pg.images?.slice(0, 3).map((image, i) => (
                  <img
                    key={i}
                    src={
                      image.url ||
                      pg.image ||
                      "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDBaeMzM1/LmpwZw"
                    }
                    alt={`Thumbnail ${i + 1}`}
                    className="flex-1 min-w-0 h-24 object-cover rounded-xl shadow-sm"
                    onError={(e) => {
                      e.target.src = "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDBaeMzM1/LmpwZw";
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-3/5 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">{pg.name}</p>
                {/* Stars */}
                <div className="text-yellow-500 py-1">
                  {pg.rating >= 4.5 ? (
                    <span className="text-lg font-semibold">{pg.rating} ★</span>
                  ) : (
                    <span className="text-lg font-semibold">{pg.rating} ☆</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {pg.pgProperty?.description || pg.description || "Comfortable and affordable PG accommodation with all modern amenities."}
                </p>
              </div>

              {/* Feature Grid */}
              <div className="border min-h-[185px] border-gray-200 rounded-lg p-4 py-7 relative">
                <hr className="absolute left-5 right-5 top-1/2 border-t border-gray-300" />
                {/* Add your feature grid content here */}
              </div>
            </div>
          </div>

          {/* Occupancy */}
          <div className="flex flex-col mt-5 bg-white py-3 px-5 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">Occupancy Options</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
              {pg.rooms?.roomTypes?.map((roomType) => (
                <div
                  key={roomType.type}
                  className="flex flex-col items-center border border-gray-200 rounded-lg py-10 shadow-sm w-full hover:shadow-md transition-shadow"
                >
                  <p className="text-gray-500 text-xs capitalize">
                    {roomType.type} Sharing
                  </p>
                  <p className="font-semibold text-lg">₹{roomType.price}</p>
                  <p className="text-gray-500 text-xs mt-2">Deposit</p>
                  <p className="font-semibold">
                    ₹{roomType.deposit || Math.round(roomType.price * 0.5)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Amenities */}
          <div className="flex flex-col bg-white p-1 my-5 rounded-lg shadow-sm">
            <p className="text-lg font-semibold mb-4">Common Amenities</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Wi-Fi", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Rt5IUiRCyA3LX1gWrvm7BEP0L4Mw899riA&s" },
                { label: "Gym", img: "https://thumbs.dreamstime.com/b/barbel-dumbbell-gym-icon-logo-template-barbel-dumbbell-gym-icon-logo-template-gym-badge-fitness-logo-design-barbell-vector-weight-144308752.jpg" },
                { label: "Parking", img: "https://i.fbcd.co/products/resized/resized-750-500/g15584-089613be34d1836ec5c09a3c740fc83f807401500aaead36004e9801cd847962.jpg" },
                { label: "Fire Safety", img: "https://toppng.com/uploads/preview/fire-extinguisher-symbol-png-11553496624yvo8ytv66m.png" },
                { label: "Smoking", img: "https://www.shutterstock.com/image-vector/cigarette-iconsmoke-area-icon-vector-600nw-1403219231.jpg" },
                { label: "Solar Power", img: "https://as1.ftcdn.net/jpg/05/50/51/74/1000_F_550517478_pqKOUpiR65GgyuCvld9Stag97lkPwjdA.jpg" },
                { label: "Lift", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeoYy2pkHEE_k9wKJ1LAzmcXTQjAArYpemuw&s" },
                { label: "Fridge", img: "https://cdn3.iconfinder.com/data/icons/food-drink/512/refrigerator-512.png" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <img src={item.img} alt={item.label} className="w-14 h-14 mb-2" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold mb-2">PG Rules</p>
            <p className="text-sm text-gray-500">Rules and regulations will be provided upon booking.</p>
          </div>

          {/* Owner */}
          <div className="mt-5 bg-white p-4 flex justify-between py-4 rounded-lg shadow-sm">
            <div className="flex gap-3 items-center">
              <img
                src={pg.owner?.profilePicture || "https://placehold.co/150x150"}
                alt="Owner"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-800">
                  {pg.owner?.name?.trim() || pg.name || "PG Owner"}
                </p>
                <p className="text-xs text-gray-500">Property Owner</p>
              </div>
            </div>
            <div className="flex gap-4 text-xl justify-center items-center">
              <button
                onClick={handlePhoneClick}
                className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
              >
                <Phone className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={handleMessageClick}
                className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Location Section with MapLocationAdmin */}
          <div className="mt-5 bg-white rounded-lg shadow-sm">
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
                className="bg-[#facc14] text-black px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {showMapView ? "Show Simple View" : "Show Detailed Map"}
              </button>
            </div>

            {showMapView ? (
              <div className="p-4">
                <FreeMapComponent pins={pins} propertyName={pg.name} />
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
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                      <div className="text-red-600 mb-2">⚠️ Error Loading Map</div>
                      <p className="text-red-700 text-sm mb-4">{mapApiError}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                      >
                        Retry
                      </button>
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
                    {/* Location Details */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Location Details</h4>
                        {pins.length > 2 && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {pins.length} locations
                          </span>
                        )}
                      </div>

                      {/* Scrollable container with gradient fade effect */}
                      <div className="relative">
                        <div className="max-h-44 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                          {pins.map((pin, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-600 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-800 mb-1">{pin.address}</p>
                                  <div className="text-xs text-gray-500 space-y-1">
                                    <div className="flex gap-2">
                                      <span className="font-medium">Lat:</span>
                                      <span>{pin.lat.toFixed(6)}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <span className="font-medium">Lng:</span>
                                      <span>{pin.lng.toFixed(6)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Scroll indicator */}
                        {pins.length > 2 && (
                          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none flex items-end justify-center pb-1">
                            <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
                          </div>
                        )}
                      </div>

                      {/* Help text for scrolling */}
                      {pins.length > 2 && (
                        <div className="mt-2 text-center">
                          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                            <span>⬆️⬇️</span>
                            <span>Scroll to view all {pins.length} locations</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Neighborhood */}
          <div className="mt-5 px-4 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Neighborhood</h2>
            <div className="grid text-xs grid-cols-1 gap-4">
              {displayedData.map((item, index) => (
                <div key={index} className="px-4 rounded-lg text-blue-600">
                  <div className="flex gap-2 items-center">
                    <span className="w-5 h-5 [&>*]:w-full [&>*]:h-full inline-block">
                      {item.icon}
                    </span>
                    {item.title}
                  </div>
                  <hr className="my-2" />
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between text-gray-400">
                      <p>{item.name}</p>
                      <p>{item.walk}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="mt-6 text-blue-600 hover:underline"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>

          {/* Reviews */}
          <div className="flex justify-center bg-white py-4 mt-5 rounded-lg shadow-sm">
            <p className="text-xl font-semibold">Feedbacks From Our Users</p>
          </div>

          <div className="grid grid-cols-1 bg-white md:grid-cols-3 p-6 gap-6 rounded-lg shadow-sm">
            {people.map((item) => (
              <div key={item.id} className="relative min-h-44 overflow-visible">
                <div className="bg-gray-700 w-full rounded-tr-xl rounded-bl-xl absolute z-10 pb-5 pt-8">
                  <div className="flex flex-col justify-center items-center text-white gap-1 px-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs">{item.occupation}</p>
                    <p className="text-yellow-500">&#9733; <span className="text-white">{item.rating}</span></p>
                    <p className="text-sm text-center">"{item.comment}"</p>
                  </div>
                </div>
                <div className="bg-gray-700 w-24 h-24 absolute rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"></div>
                <div className="bg-white flex items-center justify-center w-20 h-20 absolute rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 border-4 border-white">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3E%3Cpath fill='%23999' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Nearby Properties */}
          <div className="flex bg-white mt-5 p-4 rounded-lg shadow-sm">
            <p className="text-xl font-semibold">Nearby Properties</p>
          </div>

          {/* Slideshow */}
          <div className="relative w-full max-w-6xl bg-white mx-auto p-3 mb-5 rounded-lg shadow-sm">
            <div
              className="flex gap-3 overflow-x-auto cursor-grab scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
              ref={sliderRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseUp}
              onMouseUp={onMouseUp}
            >
              {Images.map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] px-2"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 border border-gray-200">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-40 sm:h-44 md:h-48 object-cover"
                    />
                    <div className="p-3 text-sm sm:text-base text-gray-700 space-y-1">
                      <p className="font-semibold truncate">{item.name}</p>
                      <p className="text-blue-600 font-semibold">{item.price}</p>
                      <p className="text-yellow-600">Rating: ★ {item.rating}</p>
                      <p className="text-gray-500 text-sm">{item.distance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center bg-white gap-4 md:gap-10 p-6 rounded-lg shadow-sm mb-8">
            <button className="bg-blue-700 px-10 md:px-20 lg:px-32 rounded-md py-3 text-white w-full sm:w-auto hover:bg-blue-800 transition-colors font-semibold">
              Contact
            </button>

            <button
              onClick={handleview}
              className="bg-blue-700 px-10 md:px-20 lg:px-32 rounded-md py-3 text-white w-full sm:w-auto hover:bg-blue-800 transition-colors font-semibold">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}