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


export default function BookPG() {

   const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [data, setData] = useState([])
    const [showAll, setShowAll] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
    
  const { id } = useParams();
  const location = useLocation();
  const pg = location.state?.pg; // Get the pg data from navigation state
  console.log("PG Data:", pg);
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
 
   
      

  // Handle undefined pg gracefully
  if (!pg) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        PG not found
      </div>
    );
  }

  const bg = {
  backgroundImage: `url(${bgImg})`,
   backgroundSize: '100%  ',
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
    const walk = (x - startX) * 1.5; // scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };


  // Function to handle phone call
  const handlePhoneClick = () => {
    // Replace with actual owner phone number from pg data
    const phoneNumber = pg?.owner?.phone || "1234567890";
    window.location.href = `tel:${phoneNumber}`;
  };



  // Function to handle message click
// In BookPG component
const handleMessageClick = () => {
  if (!user) {
    navigate("/user/login");
    return;
  }
  
  // Ensure we're passing all required data
  navigate("/user/chats", { 
    state: { 
      recipientId: pg.ownerId || pg.owner._id, // Handle both cases
      recipientName: pg.owner?.name || "PG Owner",
      propertyId: pg._id || pg.id,
      propertyName: pg.name,
      clientId: pg.owner?.clientId || "client ID", // Handle both cases
      role: "client" // Assuming the user is a client
    } 
    
  });
  console.log('propertyid:', pg._id);
};




  const prev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const next = () => {
    setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  const visibleCount = 4;

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
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

  return (
    <>
    <Header />
      <div
        className="w-full min-h-screen bg-cover bg-no-repeat bg-center px-0 py-2"
        style={{ backgroundImage: `url('${bgImg}')` }}
        >
      <div className=" flex flex-col   mx-10 md:mx-44   ">
        <div>
          <span>Home</span>
          <span>/</span>
          <span>PG Booking</span>
        </div>
        {/*first image box and text */}
        <div className="flex flex-col md:flex-row   p-2  mt-10 md:gap-6 gap-6">
          {/* Image + Thumbnails */}
         <div className="w-full md:w-2/5 flex flex-col gap-3">
  {/* Main Image */}
  <div>
    <img
      src={pg.images?.[0]?.url || "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDB4MzM1/LmpwZw"}
      alt="Main PG"
      className="w-full h-48 object-cover rounded-2xl shadow"
      onError={(e) => {
        e.target.src = "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDB4MzM1/LmpwZw";
      }}
    />
  </div>

  {/* Thumbnails */}
  <div className="flex gap-2">
    {pg.images?.slice(0, 3).map((image, i) => (
      <img
        key={i}
        src={image.url || "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDB4MzM1/LmpwZw"}
        alt={`Thumbnail ${i + 1}`}
        className="flex-1 min-w-0 h-24 object-cover rounded-xl shadow-sm"
        onError={(e) => {
          e.target.src = "https://imgs.search.brave.com/Ros5URNJPBXX5Is7LuoyadPdy4fcQVXtbtPqjf4QOoQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5w/Z2hjYy5jb20vd3At/Y29udGVudC91cGxv/YWRzL2V0X3RlbXAv/REpJXzA2OTgtNDQ3/MDAzNF81MDB4MzM1/LmpwZw";
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
                {pg.pgProperty?.description}
              </p>
            </div>

            {/* Feature Grid */}
            <div className="border border-gray-200 rounded-lg p-4 py-7 relative">
              {/* Horizontal line */}
              <hr className="absolute left-5   right-5 top-1/2 border-t border-gray-300" />

              {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>
                    <p className="text-gray-500 text-sm">Item</p>
                    <p className="font-semibold text-sm">Description</p>
                  </div>
                ))}
              </div> */}
            </div>

          </div>
        </div>

        {/*forst image box and text */}
        {/*Occupenct */}
        <div className="flex flex-col mt-5  bg-white py-3 px-5">
          <p className="text-lg font-semibold">Occupancy Options</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
  {pg.rooms?.roomTypes?.map((roomType) => (
    <div 
      key={roomType.type} 
      className="flex flex-col items-center border border-gray-200 rounded-lg py-10 shadow-sm w-full"
    >
      <p className="text-gray-500 text-xs capitalize">
        {roomType.type} Sharing
      </p>
      <p className="font-semibold">₹{roomType.price}</p>
      <p className="text-gray-500 text-xs mt-2">Deposit</p>
      <p className="font-semibold">
        ₹{roomType.deposit || Math.round(roomType.price * 0.5)} {/* Default to 50% of price if deposit not specified */}
      </p>
    </div>
  ))}
</div>
        </div>

        {/*Occupenct */}
        {/*common ameneties */}
        <div className="flex flex-col  bg-white p-1 my-5">
          <p  >Common Amenities</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
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
                className="flex flex-col items-center   rounded-lg p-4"
              >
                <img src={item.img} alt={item.label} className="w-14 h-14 mb-2" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/*common ameneties end */}
        <div className=" bg-white p-2">
          <p className="mt-1 mb-2 ">PG Rules</p>
          <p className="text-sm text-gray-500">Ruels.</p>
        </div>
        {/*Owner */}
        <div className="mt-5  bg-white p-1 flex justify-between py-2">
          <div className="flex gap-2">
            <div className="flex">
              <img
               src={pg.owner?.profilePicture || "https://placehold.co/150x150"}
                alt="Owner"
                className="w-16 h-14 rounded-full"
              />

            </div>
            <div className="flex flex-col">
              <p>{pg.owner?.name || "PG Owner"}</p>
              <p>Owner</p>
            </div>
          </div>
          <div className="flex gap-4 text-xl justify-center items-center">
            <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center">
               <Phone
                onClick={handlePhoneClick}
               className="w-4 h-4 text-black" /></div>
            <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center"> 
              <MessageCircle 
               onClick={handleMessageClick}
              className="w-4 h-4 text-black" /></div>

          </div>
        </div>
        {/*Owner end */}
        {/*Location */}
        <div>
          <p className="flex items-center gap-2  bg-white p-1 text-gray-700">
            <MapPin className="w-5 h-5" />
            Hostel Address
          </p>
          <div className="rounded-lg overflow-hidden shadow bg-white p-1">
            <div className="rounded-lg overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.548745113867!2d78.44089437421063!3d17.43343050147892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90ce5a6bb089%3A0x9735729ba8a8e87d!2sMADHAVI%20BOYS%20HOSTEL%2F%20PG%20Boys%20Hostel!5e0!3m2!1sen!2sus!4v1753682216942!5m2!1sen!2sus"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=" "
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          <div className="mt-10 px-4 bg-white p-1">
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

        </div>
        {/*Location end */}
        <div className="flex justify-center bg-white py-4 mt-5  ">
          <p className="text-xl">Feedbacks From Our Users</p>
        </div>
        {/*review start */}
        <div className="grid grid-cols-1  bg-white md:grid-cols-3 p-9 gap-4">
          {people.map((item) => (
            <div key={item.id} >
              <div className="min-h-44   relative z-0 overflow-visible mx-auto">
                <div className="bg-gray-700 w-full rounded-tr-xl rounded-bl-xl absolute    z-10    pb-5">
                  <div className="flex flex-col justify-center items-center text-white gap-1 ">
                    <p className="font-semibold mt-5">{item.name}</p>
                    <p className="text-xs">{item.occupation}</p>
                    <p className="text-yellow-500">&#9733; <span className="text-white">{item.rating}</span></p>
                    <p>“{item.comment}”</p>
                  </div>
                </div>
                <div className="bg-gray-700 w-24 h-24 absolute rounded-full 
                      top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                </div>
                <div className="bg-white flex items-center justify-center w-16 h-16 absolute rounded-full 
                      top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                  {/*   insert image */}
                  <img
                    src="data:image/jpeg;base64,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"
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*review end */}
        <div className="flex bg-white mt-5 p-1 ">
          <p className="text-xl ml-5">Nearby Properties</p>
        </div>
        {/*Slide show */}
        <div className="relative w-full max-w-5xl bg-white mx-auto p-3 mb-5  ">
          <div
            className="flex gap-1 overflow-x-auto cursor-grab"
            ref={sliderRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp}
            onMouseUp={onMouseUp}
          >
            {Images.map((item, i) => (
              <div key={i} className="flex-shrink-0 w-1/4 px-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3 text-sm text-gray-700 space-y-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-blue-600">{item.price}</p>
                    <p className="text-yellow-600">Rating: ★ {item.rating}</p>
                    <p className="text-gray-500">{item.distance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*Slide show end */}
        {/*last 2 buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center bg-white gap-4 md:gap-10 p-5">
          <button className="bg-blue-700 px-10 md:px-20 lg:px-44 rounded-md py-3 text-white w-full sm:w-auto">
            Contact
          </button>

          <button 
         onClick={() => navigate("/user/add-proof")}
          className="bg-blue-700 px-10 md:px-20 lg:px-44 rounded-md py-3 text-white w-full sm:w-auto">
            Book Now
          </button>
        </div>


        {/*
        <div className="flex justify-center items-center  py-3 space-x-6">
          
          <button
            onClick={prev}
            className="w-14 h-14 border-2 border-gray-400 rounded-full text-xl font-bold flex items-center justify-center"
          >
            ⟵
          </button>

           
          <div className="flex space-x-3">
            <div
              className={`w-14 h-14 rounded-full   flex justify-center items-center border-1 border-gray-400   text-xl ${activeIndex === 0 ? "bg-yellow-400 text-white" : "bg-white"
                }`}
            >1</div>
            <div
              className={`w-14 h-14 rounded-full  flex justify-center items-center border-1 border-gray-400  text-xl ${activeIndex === 1 ? "bg-yellow-400 text-white" : "bg-white"
                }`}
            >2</div>
            <div
              className={`w-14 h-14 rounded-full  flex justify-center items-center border-1 border-gray-400  text-xl ${activeIndex === 2 ? "bg-yellow-400 text-white" : "bg-white"
                }`}
            >3</div>
          </div>

        
          <button
            onClick={next}
            className="w-14 h-14 border-2 border-gray-400 rounded-full text-xl font-bold flex items-center justify-center"
          >
            ⟶
          </button>
        </div>*/}
      </div>

    </div>
    </>
  )
}