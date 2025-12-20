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
// import profileImg from '../assets/profile/undraw_pic-profile_nr49.png';
// import Notifications from './notification/Notifications';
// import { FaRegUser } from "react-icons/fa6";
// import { PiSignOut } from "react-icons/pi";

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

//   // Close dropdowns when clicking outside - FIXED VERSION
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Close profile dropdown
//       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
//         setProfileDropdownOpen(false);
//       }
      
//       // Close notifications panel - Enhanced detection
//       if (notificationsOpen && notificationsRef.current) {
//         const panel = notificationsRef.current;
//         const isClickInsidePanel = panel.contains(event.target);
//         const isFilterButton = event.target.closest('.filter-button');
//         const isNotificationAction = event.target.closest('.notification-action');
//         const isCloseButton = event.target.closest('.notification-close');
        
//         // Only close if clicking outside AND not on interactive elements
//         if (!isClickInsidePanel || isCloseButton) {
//           setNotificationsOpen(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [notificationsOpen]);

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

//   // Handle filter clicks without closing panel
//   const handleFilterInteraction = () => {
//     // This function is passed to Notifications to prevent panel closing
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
//                 <li className="relative">
//                   <button 
//                     onClick={toggleNotifications}
//                     className="flex items-center gap-1 hover:text-yellow-400 transition relative p-2 rounded-full hover:bg-white/10"
//                   >
//                     <FaBell className='text-xl'/>
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
//                   </button>
//                 </li>

//                 {/* Profile Dropdown */}
//                 <li className="relative" ref={profileDropdownRef}>
//                   <div 
//                     className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full cursor-pointer hover:bg-yellow-500 transition"
//                     onClick={toggleProfileDropdown}
//                   >
//                     <img src={profileImg} alt="user" className="w-6 h-6 rounded-full" />
//                     {user?.name || "Guest"} <MdArrowDropDown size={20} />
//                   </div>
                  
//                   {profileDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-yellow-400 rounded-md shadow-lg py-1 z-50 border border-gray-200">
//                       <Link to="/user/profile">
//                         <div 
//                           className="block px-4 py-2 text-sm text-white hover:text-blue-800 cursor-pointer transition-colors"
//                           onClick={() => setProfileDropdownOpen(false)}
//                         >
//                         <p className='flex flex-1 gap-2'> <FaRegUser className='text-lg' /> Profile</p>
//                         </div>
//                       </Link>
//                       <div 
//                         className="block px-4 py-2 text-sm text-white hover:text-blue-800 cursor-pointer transition-colors"
//                         onClick={handleLogout}
//                       >
//                        <p className='flex flex-1 gap-2'><PiSignOut className='text-lg'/> Logout</p>
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
//                     <button className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition font-medium">
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
//             className="md:hidden text-2xl p-2 rounded-full hover:bg-white/10 transition"
//           >
//             {menuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </nav>

//         {/* Mobile Menu Drawer */}
//         {menuOpen && (
//           <div className="md:hidden bg-[#0019A5] backdrop-blur-lg border-t border-white/20">
//             <ul className="flex flex-col gap-4 p-4 text-sm font-medium">
//               <Link to="/" onClick={handleMobileLinkClick}>
//                 <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
//                   <BiHomeAlt /> Home
//                 </li>
//               </Link>
//               {isLoggedIn ? (
//                 <>
//                   <Link to="/user/chats" onClick={handleMobileLinkClick}>
//                     <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
//                       <IoChatbubbleOutline /> Chats
//                     </li>
//                   </Link>
//                   <Link to="/user/pgsearch" onClick={handleMobileLinkClick}>
//                     <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
//                       <HiOutlineHome /> Hostel
//                     </li>
//                   </Link>
//                   <Link to="/user/wishlist" onClick={handleMobileLinkClick}>
//                     <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
//                       <FaRegHeart /> Wishlist
//                     </li>
//                   </Link>
//                   <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
//                     <BsPhone /> Get App
//                   </li>
                 
//                   {/* Notification in Mobile */}
//                   <li 
//                     className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
//                     onClick={toggleNotifications}
//                   >
//                     <FaBell /> Notifications
//                   </li>
                  
//                   {/* Profile in Mobile */}
//                   <li className="relative" ref={profileDropdownRef}>
//                     <div 
//                       className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition"
//                       onClick={toggleProfileDropdown}
//                     >
//                       <img src={profileImg} alt="user" className="w-6 h-6 rounded-full" />
//                       {user?.name || "Guest"}
//                       <MdArrowDropDown />
//                     </div>
                    
//                     {profileDropdownOpen && (
//                       <div className="absolute right-0 mt-2 w-48 bg-yellow-400 rounded-md shadow-lg py-1 z-50 border border-gray-200">
//                       <Link to="/user/profile">
//                         <div 
//                           className="block px-4 py-2 text-sm text-white hover:text-blue-800 cursor-pointer transition-colors"
//                           onClick={() => setProfileDropdownOpen(false)}
//                         >
//                         <p className='flex flex-1 gap-2'> <FaRegUser className='text-lg' /> Profile</p>
//                         </div>
//                       </Link>
//                       <div 
//                         className="block px-4 py-2 text-sm text-white hover:text-blue-800 cursor-pointer transition-colors"
//                         onClick={handleLogout}
//                       >
//                        <p className='flex flex-1 gap-2'><PiSignOut className='text-lg'/> Logout</p>
//                       </div>
//                     </div>
//                     )}
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition">
//                     <BsPhone /> Get App
//                   </li>
//                   <li>
//                     <Link to="/user/login" className="w-full" onClick={handleMobileLinkClick}>
//                       <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition w-full text-left font-medium">
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
//         className={`fixed top-0 right-0 h-full w-full sm:w-96 lg:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
//           notificationsOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="h-full flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
//             <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
//             <button
//               onClick={toggleNotifications}
//               className="text-gray-500 hover:text-gray-700 text-2xl p-1 rounded-full hover:bg-gray-100 transition notification-close"
//             >
//               ×
//             </button>
//           </div>
          
//           {/* Notifications Content */}
//           <div className="flex-1 overflow-y-auto">
//             <Notifications onFilterInteraction={handleFilterInteraction} />
//           </div>
//         </div>
//       </div>

//       {/* Backdrop for notifications panel */}
//       {notificationsOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:bg-opacity-30"
//           onClick={toggleNotifications}
//         />
//       )}
//     </>
//   );
// };

// export default Header;

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userAPI, notificationAPI } from '.././Clients-components/PropertyController';
import { BiHomeAlt } from "react-icons/bi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi";
import { FaRegHeart, FaBell } from "react-icons/fa";
import { BsPhone } from "react-icons/bs";
import { MdArrowDropDown } from 'react-icons/md';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from "../assets/livco logo.png"; 
import profileImg from '../assets/profile/undraw_pic-profile_nr49.png';
import Notifications from './notification/Notifications';
import { FaRegUser } from "react-icons/fa6";
import { PiSignOut } from "react-icons/pi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = !!user && !!localStorage.getItem('token');

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await userAPI.getUser();

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

  // SIMPLIFIED: Fetch unread notification count
  const fetchUnreadCount = async () => {
    if (!isLoggedIn) {
      setUnreadCount(0);
      return;
    }
    
    try {
      console.log('🔄 Fetching unread count...');
      
      // Call the API
      const response = await notificationAPI.getUnreadCount();
      console.log('🔔 API Response:', response);
      
      // SIMPLIFIED: Extract count from response
      let count = 0;
      
      // If response is a number, use it directly
      if (typeof response === 'number') {
        count = response;
      } 
      // If response has data property
      else if (response && response.data) {
        if (typeof response.data === 'number') {
          count = response.data;
        } else if (response.data.count !== undefined) {
          count = response.data.count;
        } else if (response.data.unreadCount !== undefined) {
          count = response.data.unreadCount;
        }
      }
      // If response has count property directly
      else if (response && response.count !== undefined) {
        count = response.count;
      }
      // If response has unreadCount property directly
      else if (response && response.unreadCount !== undefined) {
        count = response.unreadCount;
      }
      // If response is an object with success property
      else if (response && response.success && response.count !== undefined) {
        count = response.count;
      }

      console.log('✅ Extracted count:', count);
      setUnreadCount(count);
      
    } catch (error) {
      console.error('❌ Error fetching unread count:', error);
      setUnreadCount(0);
    }
  };

  // Fetch unread count when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchUnreadCount();
      
      // Refresh every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    } else {
      setUnreadCount(0);
    }
  }, [isLoggedIn]);

  // TEST: Force fetch count on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        console.log('🚀 Initial unread count fetch');
        fetchUnreadCount();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Close dropdowns when clicking outside - FIXED VERSION
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown if clicked outside
      if (profileDropdownOpen && 
          profileDropdownRef.current && 
          !profileDropdownRef.current.contains(event.target) &&
          profileButtonRef.current &&
          !profileButtonRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      
      // Close notifications if clicked outside
      if (notificationsOpen && notificationsRef.current) {
        const panel = notificationsRef.current;
        const isClickInsidePanel = panel.contains(event.target);
        if (!isClickInsidePanel) {
          setNotificationsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen, notificationsOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setNotificationsOpen(false);
    setProfileDropdownOpen(false);
    setUnreadCount(0);
    navigate('/user/login');
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleCloseNotifications = () => {
    setNotificationsOpen(false);
    // Refresh count after a delay
    setTimeout(fetchUnreadCount, 500);
  };

  const handleMobileLinkClick = () => {
    setMenuOpen(false);
  };

  // Handle profile link click in desktop view
  const handleProfileLinkClick = () => {
    setProfileDropdownOpen(false);
    navigate('/user/profile');
  };

  // Update count from notifications component
  const updateUnreadCount = (count) => {
    console.log('📢 Updating count from notifications:', count);
    setUnreadCount(count);
  };

  // Format count for display
  const formatNotificationCount = (count) => {
    if (count > 99) return '99+';
    return count;
  };

  // TEST: Manual refresh
  // const testUnreadCount = async () => {
  //   console.log('🧪 Testing unread count...');
  //   await fetchUnreadCount();
  // };

  return (
    <>
      <header className="w-full backdrop-blur-lg bg-[#0019A5]/90 text-white shadow-md fixed z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-0 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 w-14 mt-4 p-0 rounded-lg justify-start" />
            <h1 className='md:text-xl text-lg  text-[#FEE123] font-semibold'>Livyco</h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center text-sm font-medium">
            <Link to="/">
              <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition duration-200">
                <BiHomeAlt className='text-xl'/> Home
              </li>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/user/chats">
                  <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition duration-200">
                    <IoChatbubbleOutline className='text-xl'/> Chats
                  </li>
                </Link>
                <Link to="/user/pgsearch">
                  <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition duration-200">
                    <HiOutlineHome className='text-xl'/> Hostel
                  </li>
                </Link>
                <Link to="/user/wishlist">
                  <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition duration-200">
                    <FaRegHeart className='text-xl'/> Wishlist
                  </li>
                </Link>
                
                {/* Notification Bell - FIXED */}
                <li className="relative">
                  <button 
                    onClick={toggleNotifications}
                    className="flex items-center gap-1 hover:text-yellow-400 transition relative p-2 rounded-full hover:bg-white/10 duration-200"
                  >
                    <FaBell className='text-xl'/>
                    {/* ALWAYS SHOW BADGE FOR TESTING */}
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white px-1 font-medium animate-pulse border border-white">
                      {unreadCount > 0 ? formatNotificationCount(unreadCount) : '0'}
                    </span>
                  </button>
                  
                  {/* Debug button */}
                  {/* <button 
                    onClick={testUnreadCount}
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-500 rounded-full text-xs text-white flex items-center justify-center text-[8px]"
                    title="Test unread count"
                  >
                    T
                  </button> */}
                </li>

                {/* Profile Dropdown - FIXED */}
                <li className="relative">
                  <div 
                    ref={profileButtonRef}
                    className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full cursor-pointer hover:bg-yellow-500 transition duration-200"
                    onClick={toggleProfileDropdown}
                  >
                    <img src={profileImg} alt="user" className="w-6 h-6 rounded-full" />
                    <span className="font-medium">{user?.name || "Guest"}</span>
                    <MdArrowDropDown 
                      size={20} 
                      className={`transform transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                  
                  {profileDropdownOpen && (
                    <div 
                      ref={profileDropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-yellow-400 rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >

                      <div className="px-4 py-2 border-b border-yellow-300">
                        <p className="text-sm font-medium text-white">Hello, {user?.name || "Guest"}</p>
                        <p className="text-xs text-white truncate">{user?.email || ""}</p>
                      </div>
                      <div 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:text-blue-800 cursor-pointer transition-colors duration-200 hover:bg-yellow-300"
                        onClick={handleProfileLinkClick}
                      >
                        <FaRegUser className='text-lg' />
                        <span>Profile</span>
                      </div>
                      <div 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:text-blue-800 cursor-pointer transition-colors duration-200 hover:bg-yellow-300"
                        onClick={handleLogout}
                      >
                        <PiSignOut className='text-lg'/>
                        <span>Logout</span>
                      </div>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-1 hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 transition duration-200">
                  <BsPhone className='text-xl'/> Get App
                </li>
                <li>
                  <Link to="/user/login">
                    <button className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition duration-200 font-medium">
                      Login
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Navigation Icons */}
          <div className="flex md:hidden items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* Notification Icon */}
                <button 
                  onClick={toggleNotifications}
                  className="relative p-2 rounded-full hover:bg-white/10 transition duration-200"
                >
                  <FaBell className='text-xl'/>
                  {/* ALWAYS SHOW BADGE FOR TESTING */}
                  <span className="absolute top-1 right-1 min-w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white px-1 font-medium animate-pulse border border-white">
                    {unreadCount > 0 ? formatNotificationCount(unreadCount) : '0'}
                  </span>
                </button>

                {/* Profile Image */}
                <div className="relative">
                  <button 
                    onClick={toggleProfileDropdown}
                    className="flex items-center gap-1 p-1 rounded-full hover:bg-white/10 transition duration-200"
                  >
                    <img 
                      src={profileImg} 
                      alt="user" 
                      className="w-8 h-8 rounded-full border-2 border-yellow-400" 
                    />
                  </button>
                  
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-yellow-400 rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 border-b border-yellow-300">
                        <p className="text-sm font-medium text-white">Hello, {user?.name || "Guest"}</p>
                        <p className="text-xs text-white truncate">{user?.email || ""}</p>
                      </div>
                      {/* <Link to="/user/profile">
                        <div 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:text-blue-800 cursor-pointer transition-colors duration-200 hover:bg-yellow-300"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <FaRegUser className='text-lg' />
                          <span>Profile</span>
                        </div>
                      </Link>
                      <div 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:text-blue-800 cursor-pointer transition-colors duration-200 hover:bg-yellow-300"
                        onClick={handleLogout}
                      >
                        <PiSignOut className='text-lg'/>
                        <span>Logout</span>
                      </div> */}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/user/login">
                <button className="bg-yellow-400 text-black px-3 py-1 rounded-full hover:bg-yellow-500 transition duration-200 font-medium text-sm">
                  Login
                </button>
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl p-2 rounded-full hover:bg-white/10 transition duration-200"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-[#0019A5] backdrop-blur-lg border-t border-white/20">
            <ul className="flex flex-col gap-2 p-4 text-sm font-medium">
              <Link to="/" onClick={handleMobileLinkClick}>
                <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition duration-200">
                  <BiHomeAlt className="text-lg" /> Home
                </li>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/user/chats" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition duration-200">
                      <IoChatbubbleOutline className="text-lg" /> Chats
                    </li>
                  </Link>
                  <Link to="/user/pgsearch" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition duration-200">
                      <HiOutlineHome className="text-lg" /> Hostel
                    </li>
                  </Link>
                  <Link to="/user/wishlist" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition duration-200">
                      <FaRegHeart className="text-lg" /> Wishlist
                    </li>
                  </Link>
                  
                  <li 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition duration-200 cursor-pointer"
                    onClick={() => {
                      toggleNotifications();
                      handleMobileLinkClick();
                    }}
                  >
                    <div className="relative">
                      <FaBell className="text-lg" />
                      <span className="absolute -top-2 -right-2 min-w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white px-1 font-medium border border-white animate-pulse">
                        {unreadCount > 0 ? formatNotificationCount(unreadCount) : '0'}
                      </span>
                    </div>
                    Notifications
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount > 0 ? formatNotificationCount(unreadCount) : '0'}
                    </span>
                  </li>
                  
                  <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition duration-200">
                    <BsPhone className="text-lg" /> Get App
                  </li>
                  
                  <Link to="/user/profile" onClick={handleMobileLinkClick}>
                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition duration-200">
                      <img src={profileImg} alt="user" className="w-6 h-6 rounded-full" />
                      Profile
                    </li>
                  </Link>
                </>
              ) : (
                <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition duration-200">
                  <BsPhone className="text-lg" /> Get App
                </li>
              )}
            </ul>
          </div>
        )}
      </header>

      {/* Notification Panel */}
      <div 
        ref={notificationsRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-96 lg:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          notificationsOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {unreadCount > 0 ? formatNotificationCount(unreadCount) : '0'} unread
              </span>
            </div>
            <button
              onClick={handleCloseNotifications}
              className="text-gray-500 hover:text-gray-700 text-2xl p-1 rounded-full hover:bg-gray-100 transition duration-200"
            >
              ×
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <Notifications onUnreadCountChange={updateUnreadCount} />
          </div>
        </div>
      </div>

      {notificationsOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:bg-opacity-30"
          onClick={handleCloseNotifications}
        />
      )}
    </>
  );
};

export default Header;