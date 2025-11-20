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
import profileImg from '../assets/profile/undraw_pic-profile_nr49.png';
import Notifications from './notification/Notifications';

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

  // Close dropdowns when clicking outside - FIXED VERSION
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      
      // Close notifications panel - Enhanced detection
      if (notificationsOpen && notificationsRef.current) {
        const panel = notificationsRef.current;
        const isClickInsidePanel = panel.contains(event.target);
        const isFilterButton = event.target.closest('.filter-button');
        const isNotificationAction = event.target.closest('.notification-action');
        const isCloseButton = event.target.closest('.notification-close');
        
        // Only close if clicking outside AND not on interactive elements
        if (!isClickInsidePanel || isCloseButton) {
          setNotificationsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen]);

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

  // Handle filter clicks without closing panel
  const handleFilterInteraction = () => {
    // This function is passed to Notifications to prevent panel closing
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
                <li className="relative">
                  <button 
                    onClick={toggleNotifications}
                    className="flex items-center gap-1 hover:text-yellow-400 transition relative p-2 rounded-full hover:bg-white/10"
                  >
                    <FaBell className='text-xl'/>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                  </button>
                </li>

                {/* Profile Dropdown */}
                <li className="relative" ref={profileDropdownRef}>
                  <div 
                    className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full cursor-pointer hover:bg-yellow-500 transition"
                    onClick={toggleProfileDropdown}
                  >
                    <img src={profileImg} alt="user" className="w-6 h-6 rounded-full" />
                    {user?.name || "Guest"} <MdArrowDropDown size={20} />
                  </div>
                  
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link to="/user/profile">
                        <div 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Profile
                        </div>
                      </Link>
                      <div 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
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
                    <button className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition font-medium">
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
            className="md:hidden text-2xl p-2 rounded-full hover:bg-white/10 transition"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-[#0019A5] backdrop-blur-lg border-t border-white/20">
            <ul className="flex flex-col gap-4 p-4 text-sm font-medium">
              <Link to="/" onClick={handleMobileLinkClick}>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
                  <BiHomeAlt /> Home
                </li>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/user/chats" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
                      <IoChatbubbleOutline /> Chats
                    </li>
                  </Link>
                  <Link to="/user/pgsearch" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
                      <HiOutlineHome /> Hostel
                    </li>
                  </Link>
                  <Link to="/user/wishlist" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
                      <FaRegHeart /> Wishlist
                    </li>
                  </Link>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
                    <BsPhone /> Get App
                  </li>
                 
                  {/* Notification in Mobile */}
                  <li 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
                    onClick={toggleNotifications}
                  >
                    <FaBell /> Notifications
                  </li>
                  
                  {/* Profile in Mobile */}
                  <li className="relative" ref={profileDropdownRef}>
                    <div 
                      className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition"
                      onClick={toggleProfileDropdown}
                    >
                      <img src={userImg} alt="user" className="w-6 h-6 rounded-full" />
                      {user?.name || "Guest"}
                      <MdArrowDropDown />
                    </div>
                    
                    {profileDropdownOpen && (
                      <div className="mt-2 w-full bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <Link to="/user/profile" onClick={handleMobileLinkClick}>
                          <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
                            Profile
                          </div>
                        </Link>
                        <div 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
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
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
                    <BsPhone /> Get App
                  </li>
                  <li>
                    <Link to="/user/login" className="w-full" onClick={handleMobileLinkClick}>
                      <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition w-full text-left font-medium">
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
        className={`fixed top-0 right-0 h-full w-full sm:w-96 lg:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          notificationsOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            <button
              onClick={toggleNotifications}
              className="text-gray-500 hover:text-gray-700 text-2xl p-1 rounded-full hover:bg-gray-100 transition notification-close"
            >
              ×
            </button>
          </div>
          
          {/* Notifications Content */}
          <div className="flex-1 overflow-y-auto">
            <Notifications onFilterInteraction={handleFilterInteraction} />
          </div>
        </div>
      </div>

      {/* Backdrop for notifications panel */}
      {notificationsOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:bg-opacity-30"
          onClick={toggleNotifications}
        />
      )}
    </>
  );
};

export default Header;

// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { API_BASE_URL } from '.././Clients-components/PropertyController';
// import { BiHomeAlt } from "react-icons/bi";
// import { IoChatbubbleOutline } from "react-icons/io5";
// import { HiOutlineHome } from "react-icons/hi";
// import { FaRegHeart, FaBell } from "react-icons/fa";
// import { BsPhone } from "react-icons/bs";
// import { MdArrowDropDown } from 'react-icons/md';
// import { FiMenu, FiX } from 'react-icons/fi';
// import logo from "../assets/livco logo.png"; 
// import userImg from '../assets/react.svg';
// import profileImg from '../assets/profile/undraw_pic-profile_nr49.png'; // Replace with actual user image
// import Notifications from './notification/Notifications'; // Import your Notifications component

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [notificationsOpen, setNotificationsOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const profileDropdownRef = useRef(null);
//   const notificationsRef = useRef(null);
//   const navigate = useNavigate();

//   const isLoggedIn = !!user && !!localStorage.getItem('token');

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

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Close profile dropdown
//       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
//         setProfileDropdownOpen(false);
//       }
      
//       // Close notifications panel
//       if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
//         setNotificationsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     setNotificationsOpen(false);
//     navigate('/user/login');
//   };

//   const toggleProfileDropdown = () => {
//     setProfileDropdownOpen(!profileDropdownOpen);
//   };

//   const toggleNotifications = () => {
//     setNotificationsOpen(!notificationsOpen);
//   };

//   // Close mobile menu when clicking on a link
//   const handleMobileLinkClick = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <>
//       <header className="w-full backdrop-blur-lg bg-[#0019A5]/90 text-white shadow-md fixed z-50">
//         <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-0 flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center">
//             <img src={logo} alt="Logo" className="h-16 w-14 mt-2 p-0 rounded-lg justify-start" />
//           </div>

//           {/* Desktop Menu */}
//           <ul className="hidden md:flex gap-8 items-center text-sm font-medium">
//             <Link to="/">
//               <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1">
//                 <BiHomeAlt className='text-xl'/> Home
//               </li>
//             </Link>
//             {isLoggedIn ? (
//               <>
//                 <Link to="/user/chats">
//                   <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
//                     <IoChatbubbleOutline className='text-xl'/> Chats
//                   </li>
//                 </Link>
//                 <Link to="/user/pgsearch">
//                   <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
//                     <HiOutlineHome className='text-xl'/> Hostel
//                   </li>
//                 </Link>
//                 <Link to="/user/wishlist">
//                   <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
//                     <FaRegHeart className='text-xl'/> Wishlist
//                   </li>
//                 </Link>
                
//                 {/* Notification Bell with Slide-in Panel */}
//                 <li className="relative" ref={notificationsRef}>
//                   <button 
//                     onClick={toggleNotifications}
//                     className="flex items-center gap-1 hover:text-yellow-400 transition relative"
//                   >
//                     <FaBell className='text-xl'/>
//                     <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full" />
//                   </button>
//                 </li>

//                 {/* Profile Dropdown */}
//                 <li className="relative" ref={profileDropdownRef}>
//                   <div 
//                     className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full cursor-pointer"
//                     onClick={toggleProfileDropdown}
//                   >
//                     <img src={profileImg} alt="user" className="w-6 h-6 rounded-full" />
//                     {user?.name || "Guest"} <MdArrowDropDown size={20} />
//                   </div>
                  
//                   {profileDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//                       <Link to="/user/profile">
//                         <div 
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                           onClick={() => setProfileDropdownOpen(false)}
//                         >
//                           Profile
//                         </div>
//                       </Link>
//                       <div 
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                         onClick={handleLogout}
//                       >
//                         Logout
//                       </div>
//                     </div>
//                   )}
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition">
//                   <BsPhone className='text-xl'/> Get App
//                 </li>
//                 <li>
//                   <Link to="/user/login">
//                     <button className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition">
//                       Login
//                     </button>
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="md:hidden text-2xl"
//           >
//             {menuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </nav>

//         {/* Mobile Menu Drawer */}
//         {menuOpen && (
//           <div className="md:hidden bg-[#0019A5] backdrop-blur-lg border-t border-white/20">
//             <ul className="flex flex-col gap-4 p-4 text-sm font-medium">
//               <Link to="/" onClick={handleMobileLinkClick}>
//                 <li className="flex items-center gap-2">
//                   <BiHomeAlt /> Home
//                 </li>
//               </Link>
//               {isLoggedIn ? (
//                 <>
//                   <Link to="/user/chats" onClick={handleMobileLinkClick}>
//                     <li className="flex items-center gap-2">
//                       <IoChatbubbleOutline /> Chats
//                     </li>
//                   </Link>
//                   <Link to="/user/pgsearch" onClick={handleMobileLinkClick}>
//                     <li className="flex items-center gap-2">
//                       <HiOutlineHome /> Hostel
//                     </li>
//                   </Link>
//                   <Link to="/user/wishlist" onClick={handleMobileLinkClick}>
//                     <li className="flex items-center gap-2">
//                       <FaRegHeart /> Wishlist
//                     </li>
//                   </Link>
//                   <li className="flex items-center gap-2">
//                     <BsPhone /> Get App
//                   </li>
                 
//                   {/* Notification in Mobile */}
//                   <li className="flex items-center gap-2" onClick={toggleNotifications}>
//                     <FaBell /> Notifications
//                   </li>
                  
//                   {/* Profile in Mobile */}
//                   <li className="relative" ref={profileDropdownRef}>
//                     <div 
//                       className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-2 rounded-md"
//                       onClick={toggleProfileDropdown}
//                     >
//                       <img src={userImg} alt="user" className="w-6 h-6 rounded-full" />
//                       {user?.name || "Guest"}
//                       <MdArrowDropDown />
//                     </div>
                    
//                     {profileDropdownOpen && (
//                       <div className="mt-2 w-full bg-white rounded-md shadow-lg py-1 z-50">
//                         <Link to="/user/profile" onClick={handleMobileLinkClick}>
//                           <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
//                             Profile
//                           </div>
//                         </Link>
//                         <div 
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                           onClick={handleLogout}
//                         >
//                           Logout
//                         </div>
//                       </div>
//                     )}
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li className="flex items-center gap-2">
//                     <BsPhone /> Get App
//                   </li>
//                   <li>
//                     <Link to="/user/login" className="w-full" onClick={handleMobileLinkClick}>
//                       <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition w-full text-left">
//                         Login
//                       </button>
//                     </Link>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         )}
//       </header>

//       {/* Notification Slide-in Panel */}
//       <div 
//         ref={notificationsRef}
//         className={`fixed top-0 right-0 h-full w-96 sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
//           notificationsOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="h-full flex flex-col ">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
//             <button
//               onClick={toggleNotifications}
//               className="text-gray-500 hover:text-gray-700 text-2xl"
//             >
//               ×
//             </button>
//           </div>
          
//           {/* Notifications Content */}
//           <div className="flex-1 overflow-hidden ">
//             <Notifications />
//           </div>
//         </div>
//       </div>

//       {/* Backdrop for notifications panel */}
//       {notificationsOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40  "
//           onClick={toggleNotifications}
//         />
//       )}
//     </>
//   );
// };

// export default Header;