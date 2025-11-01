// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { API_BASE_URL } from '.././Clients-components/PropertyController'; // Adjust the import based on your project structure
// import { FaBell, FaHome, FaHeart, FaHotel, FaCommentDots, FaMobileAlt } from 'react-icons/fa';
// import { BiHomeAlt } from "react-icons/bi";
// import { IoChatbubbleOutline } from "react-icons/io5";
// import { HiOutlineHome } from "react-icons/hi";
// import { FaRegHeart } from "react-icons/fa";
// import { BsPhone } from "react-icons/bs";
// import { MdArrowDropDown } from 'react-icons/md';
// import { FiMenu, FiX } from 'react-icons/fi';
// import logo from "../assets/livco logo.png"; 
// import userImg from '../assets/react.svg'; // Replace with actual user image

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const profileDropdownRef = useRef(null);
//   const [user, setUser] = useState(null); // State to hold user data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const isLoggedIn = !!user && !!localStorage.getItem('token');

//   // const clientId = user ? user.clientId : null; // Get clientId from user state
//   //   const idToken = user ? user.token : null; // Get token from user state
//     const navigate = useNavigate();


//   // const isLoggedIn = !!user && !!localStorage.getItem('token');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${API_BASE_URL}/api/auth/user`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (response.data.success) {
//           setUser(response.data.user);
          
//           // Only redirect if user is not a regular user (i.e., is a client)
//           if (response.data.user.role !== 'user') {
//             alert('Access restricted to users only. Redirecting to login.');
//             navigate('/user/login');
//           }
//         } else {
//           throw new Error(response.data.message || 'Failed to fetch user');
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         setError(error.message);
        
//         // If token is invalid, remove it and redirect to login
//         if (error.response?.status === 401) {
//           localStorage.removeItem('token');
//           navigate('/user/login');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
//         setProfileDropdownOpen(false);
//       }
//     };


//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//   localStorage.removeItem('token');
//   setUser(null);
//   navigate('/user/login');
// };

//   const toggleProfileDropdown = () => {
//     setProfileDropdownOpen(!profileDropdownOpen);
//   };

//   return (
//     <header className="w-full backdrop-blur-lg bg-[#0019A5]/90 text-white shadow-md fixed z-50">
//       <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-0 flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center">
//           <img src={logo} alt="Logo" className="h-16 w-14 mt-2 p-0 rounded-lg justify-start" />
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-8 items-center text-sm font-medium">
//           <Link to="/">
//           <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1">
//             <BiHomeAlt className='text-xl'/> Home
//           </li>
//           </Link>
//           {isLoggedIn ? (
//             <>
//             <Link to="/user/chats">
//               <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
//                 <IoChatbubbleOutline className='text-xl'/> Chats
//               </li>
//               </Link>
//               <Link to="/user/pgsearch">
//               <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
//                 <HiOutlineHome className='text-xl'/> Hostel
//               </li>
//               </Link>
//               <Link to="/user/wishlist">
//               <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
//                 <FaRegHeart className='text-xl'/> Wishlist
//               </li>
//               </Link>
//               <li className="relative hover:text-yellow-400 transition">
//                 <FaBell className='text-xl'/>
//                 <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full" />
//               </li>
//               <li className="relative" ref={profileDropdownRef}>
//                 <div 
//                   className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full cursor-pointer"
//                   onClick={toggleProfileDropdown}
//                 >
//                   <img src={userImg} alt="user" className="w-6 h-6 rounded-full" />
//                   {user?.name || "Guest"} <MdArrowDropDown size={20} />
//                 </div>
                
//                 {profileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//                     <Link 
//                       to="/user/profile">
//                     <a 
//                       // href="/user/profile" 
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       // onClick={(e) => {
//                       //   e.preventDefault();
//                       //   // Handle profile click
//                       //   // console.log('Profile clicked');
//                       //   setProfileDropdownOpen(false);
//                       // }}
//                     >
//                       Profile
//                     </a>
//                     </Link>
//                     <a 
//                       href="#" 
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleLogout();
//                         setProfileDropdownOpen(false);
//                       }}
//                     >
//                       Logout
//                     </a>
//                   </div>
//                 )}
//               </li>
//             </>
//           ) : (
//             <>
//               <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
//                 <BsPhone className='text-xl'/> Get App
//               </li>
//               <li>
//                 <Link to="/user/login">
//                 <button className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition">
//                   Login
//                 </button>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-2xl"
//         >
//           {menuOpen ? <FiX /> : <FiMenu />}
//         </button>
//       </nav>

//       {/* Mobile Menu Drawer */}
//       {menuOpen && (
//         <div className="md:hidden bg-[#0019A5] backdrop-blur-lg border-t border-white/20">
//           <ul className="flex flex-col gap-4 p-4 text-sm font-medium">
//             <Link to="/">
//             <li className="flex items-center gap-2">
//               <BiHomeAlt /> Home
//             </li>
//             </Link>
//             {isLoggedIn ? (
//               <>
//               <Link to="/user/chats">
//                   <li className="flex items-center gap-2">
 
//                     <IoChatbubbleOutline /> Chats
//                   </li>
//                 </Link>
//                 <Link to="/user/pgsearch">
//                   <li className="flex items-center gap-2">
//                     <HiOutlineHome /> Hostel
//                   </li>
//                 </Link>
//                 <Link to="/user/wishlist">
//                   <li className="flex items-center gap-2">
//                     <FaRegHeart /> Wishlist
//                   </li>
//                 </Link>
//                 <li className="flex items-center gap-2">
//                   <BsPhone /> Get App
//                 </li>
               
//                 <li className="flex items-center gap-2">
//                   <FaBell /> Notifications
//                 </li>
                
//                 <li className="relative" ref={profileDropdownRef}>
//                   <div 
//                     className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-2 rounded-md"
//                     onClick={toggleProfileDropdown}
//                   >
//                     <img src={userImg} alt="user" className="w-6 h-6 rounded-full" />
//                     {user?.name || "Guest"}
//                     <MdArrowDropDown />
//                   </div>
                  
//                   {profileDropdownOpen && (
//                     <div className="mt-2 w-full bg-white rounded-md shadow-lg py-1 z-50">
//                       <Link 
//                         to="/user/profile">
//                       <a 
//                         // href="/user/profile" 
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         // onClick={(e) => {
//                         //   e.preventDefault();
//                         //   // Handle profile click
//                         //   // console.log('Profile clicked');
//                         //   setProfileDropdownOpen(false);
//                         // }}
//                       >
//                         Profile
//                       </a>
//                       </Link>
//                       <a 
//                         href="#" 
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           handleLogout();
//                           setProfileDropdownOpen(false);
//                         }}
//                       >
//                         Logout
//                       </a>
//                     </div>
//                   )}
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="flex items-center gap-2">
//                   <BsPhone /> Get App
//                 </li>
//                 <li>
//                   <Link to="/user/login" className="w-full">
//                   <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition w-full text-left">
//                     Login
//                   </button>
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;


import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '.././Clients-components/PropertyController';
import { BiHomeAlt } from "react-icons/bi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi";
import { FaRegHeart, FaBell } from "react-icons/fa";
import { BsPhone } from "react-icons/bs";
import { MdArrowDropDown } from 'react-icons/md';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from "../assets/livco logo.png"; 
import userImg from '../assets/react.svg';
import Notifications from './notification/Notifications'; // Import your Notifications component

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const profileDropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = !!user && !!localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/auth/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setUser(response.data.user);
          
          if (response.data.user.role !== 'user') {
            alert('Access restricted to users only. Redirecting to login.');
            navigate('/user/login');
          }
        } else {
          throw new Error(response.data.message || 'Failed to fetch user');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
        
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/user/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      
      // Close notifications panel
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setNotificationsOpen(false);
    navigate('/user/login');
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  // Close mobile menu when clicking on a link
  const handleMobileLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="w-full backdrop-blur-lg bg-[#0019A5]/90 text-white shadow-md fixed z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-0 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 w-14 mt-2 p-0 rounded-lg justify-start" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center text-sm font-medium">
            <Link to="/">
              <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1">
                <BiHomeAlt className='text-xl'/> Home
              </li>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/user/chats">
                  <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
                    <IoChatbubbleOutline className='text-xl'/> Chats
                  </li>
                </Link>
                <Link to="/user/pgsearch">
                  <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
                    <HiOutlineHome className='text-xl'/> Hostel
                  </li>
                </Link>
                <Link to="/user/wishlist">
                  <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
                    <FaRegHeart className='text-xl'/> Wishlist
                  </li>
                </Link>
                
                {/* Notification Bell with Slide-in Panel */}
                <li className="relative" ref={notificationsRef}>
                  <button 
                    onClick={toggleNotifications}
                    className="flex items-center gap-1 hover:text-yellow-400 transition relative"
                  >
                    <FaBell className='text-xl'/>
                    <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full" />
                  </button>
                </li>

                {/* Profile Dropdown */}
                <li className="relative" ref={profileDropdownRef}>
                  <div 
                    className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full cursor-pointer"
                    onClick={toggleProfileDropdown}
                  >
                    <img src={userImg} alt="user" className="w-6 h-6 rounded-full" />
                    {user?.name || "Guest"} <MdArrowDropDown size={20} />
                  </div>
                  
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link to="/user/profile">
                        <div 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Profile
                        </div>
                      </Link>
                      <div 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
                  <BsPhone className='text-xl'/> Get App
                </li>
                <li>
                  <Link to="/user/login">
                    <button className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition">
                      Login
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-[#0019A5] backdrop-blur-lg border-t border-white/20">
            <ul className="flex flex-col gap-4 p-4 text-sm font-medium">
              <Link to="/" onClick={handleMobileLinkClick}>
                <li className="flex items-center gap-2">
                  <BiHomeAlt /> Home
                </li>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/user/chats" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-2">
                      <IoChatbubbleOutline /> Chats
                    </li>
                  </Link>
                  <Link to="/user/pgsearch" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-2">
                      <HiOutlineHome /> Hostel
                    </li>
                  </Link>
                  <Link to="/user/wishlist" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-2">
                      <FaRegHeart /> Wishlist
                    </li>
                  </Link>
                  <li className="flex items-center gap-2">
                    <BsPhone /> Get App
                  </li>
                 
                  {/* Notification in Mobile */}
                  <li className="flex items-center gap-2" onClick={toggleNotifications}>
                    <FaBell /> Notifications
                  </li>
                  
                  {/* Profile in Mobile */}
                  <li className="relative" ref={profileDropdownRef}>
                    <div 
                      className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-2 rounded-md"
                      onClick={toggleProfileDropdown}
                    >
                      <img src={userImg} alt="user" className="w-6 h-6 rounded-full" />
                      {user?.name || "Guest"}
                      <MdArrowDropDown />
                    </div>
                    
                    {profileDropdownOpen && (
                      <div className="mt-2 w-full bg-white rounded-md shadow-lg py-1 z-50">
                        <Link to="/user/profile" onClick={handleMobileLinkClick}>
                          <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Profile
                          </div>
                        </Link>
                        <div 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </div>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <BsPhone /> Get App
                  </li>
                  <li>
                    <Link to="/user/login" className="w-full" onClick={handleMobileLinkClick}>
                      <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition w-full text-left">
                        Login
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </header>

      {/* Notification Slide-in Panel */}
      <div 
        ref={notificationsRef}
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          notificationsOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            <button
              onClick={toggleNotifications}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Notifications Content */}
          <div className="flex-1 overflow-hidden">
            <Notifications />
          </div>
        </div>
      </div>

      {/* Backdrop for notifications panel */}
      {notificationsOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleNotifications}
        />
      )}
    </>
  );
};

export default Header;